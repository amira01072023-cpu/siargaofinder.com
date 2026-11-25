import { NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getMailerFrom, getResendClient } from "@/lib/mailer";
import { rateLimitRequest, tooManyRequestsResponse } from "@/lib/rate-limit";
import { getSiteUrl } from "@/lib/site-url";
import {
  areBusinessNamesEqual,
  getBusinessSubmissionValidationError,
} from "@/lib/business-submission-validation";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function clean(v: unknown) {
  return String(v ?? "").trim();
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function verifyTurnstile(token: string, remoteIp: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const form = new URLSearchParams({ secret, response: token });
  if (remoteIp) form.set("remoteip", remoteIp);

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
      cache: "no-store",
    });
    const result = await response.json() as { success?: boolean };
    return response.ok && result.success === true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const rateLimit = rateLimitRequest(req, {
      key: "business-submissions",
      limit: 5,
      windowMs: 60 * 60 * 1000,
    });
    if (!rateLimit.allowed) return tooManyRequestsResponse(rateLimit);

    const body = await req.json();

    const nickname = clean(body?.nickname);
    const turnstileToken = clean(body?.turnstile_token);
    const startedAt = Number(body?.started_at);
    const business_name = clean(body?.business_name);
    const category = clean(body?.category);
    const city = clean(body?.city);
    const phone = clean(body?.phone);
    const email = clean(body?.email).toLowerCase();
    const website_url = clean(body?.website_url) || null;
    const address = clean(body?.address);
    const services = clean(body?.services);

    const socials = {
      facebook: clean(body?.facebook),
      instagram: clean(body?.instagram),
      tiktok: clean(body?.tiktok),
      youtube: clean(body?.youtube),
    };

    if (nickname) {
      return NextResponse.json({ success: true, status: "pending" });
    }

    const remoteIp = req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")?.trim()
      || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || null;
    if (!(await verifyTurnstile(turnstileToken, remoteIp))) {
      return NextResponse.json({ error: "Anti-spam verification failed. Please try again." }, { status: 400 });
    }

    const submissionElapsedMs = Date.now() - startedAt;

    if (
      !Number.isFinite(startedAt) ||
      startedAt <= 0 ||
      submissionElapsedMs < 2500 ||
      submissionElapsedMs > 24 * 60 * 60 * 1000
    ) {
      return NextResponse.json(
        { error: "Please wait a moment before submitting." },
        { status: 400 }
      );
    }

    const validationError = getBusinessSubmissionValidationError({
      business_name,
      category,
      city,
      phone,
      email,
      website_url,
      address,
      services,
      socials,
    });
    if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

    const existingListing = await supabaseAdmin
      .from("business_listings")
      .select("id,business_name")
      .ilike("business_name", business_name)
      .limit(1);

    if (existingListing.error) {
      return NextResponse.json({ error: existingListing.error.message }, { status: 500 });
    }

    if (
      existingListing.data?.some(
        (listing) => areBusinessNamesEqual(String(listing.business_name ?? ""), business_name)
      )
    ) {
      return NextResponse.json(
        { error: "This business appears to already be listed. Please search the directory first." },
        { status: 409 }
      );
    }

    const pendingSubmission = await supabaseAdmin
      .from("business_submissions")
      .select("id,business_name")
      .in("status", ["email_unverified", "pending"])
      .ilike("business_name", business_name)
      .limit(1);

    if (pendingSubmission.error) {
      return NextResponse.json({ error: pendingSubmission.error.message }, { status: 500 });
    }

    if (
      pendingSubmission.data?.some(
        (submission) =>
          areBusinessNamesEqual(String(submission.business_name ?? ""), business_name)
      )
    ) {
      return NextResponse.json(
        { error: "A pending submission already exists for this business." },
        { status: 409 }
      );
    }

    const socialsPayload = Object.values(socials).some(Boolean)
      ? `\n[SOCIALS] ${JSON.stringify(socials)}`
      : "";

    const resend = getResendClient();

    if (!resend) {
      return NextResponse.json(
        { error: "Email verification is not available right now. Please try again later." },
        { status: 503 }
      );
    }

    const verificationToken = randomBytes(32).toString("hex");
    const verificationHash = hashToken(verificationToken);
    const verificationNote = `email_verification_sha256:${verificationHash}`;

    const { data: insertedSubmission, error } = await supabaseAdmin.from("business_submissions").insert({
      business_name,
      category,
      city,
      phone,
      email,
      website_url,
      address,
      services: `${services}${socialsPayload}`,
      status: "email_unverified",
      review_note: verificationNote,
    }).select("id").single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const verifyUrl = `${getSiteUrl()}/api/business-submissions/verify?token=${verificationToken}`;
    const safeBusinessName = escapeHtml(business_name);

    try {
      await resend.emails.send({
        from: getMailerFrom(),
        to: email,
        subject: `Verify your Siargao Finder listing: ${safeBusinessName}`,
        html: `
<p>Hello,</p>
<p>Please verify your email to finish submitting <b>${safeBusinessName}</b> to Siargao Finder.</p>
<p><a href="${verifyUrl}">Verify this business submission</a></p>
<p>If you did not submit this listing, you can ignore this email.</p>
`,
      });
    } catch (mailErr: unknown) {
      if (insertedSubmission?.id) {
        await supabaseAdmin
          .from("business_submissions")
          .update({
            status: "verification_email_failed",
            review_note: mailErr instanceof Error ? mailErr.message.slice(0, 2000) : "Verification email failed",
          })
          .eq("id", insertedSubmission.id);
      }

      return NextResponse.json(
        { error: "Could not send verification email. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      status: "email_unverified",
      message: "Please check your email and click the verification link before admin review.",
    });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unexpected error while submitting listing." },
      { status: 500 }
    );
  }
}
