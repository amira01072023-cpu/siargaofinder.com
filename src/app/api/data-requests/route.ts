import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { getMailerFrom, getResendClient } from "@/lib/mailer";
import { rateLimitRequest, tooManyRequestsResponse } from "@/lib/rate-limit";

const CONTACT_EMAIL = "info@siargaofinder.com";

type RequestType = "access" | "deletion" | "portability" | "correction";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const rateLimit = rateLimitRequest(req, {
      key: "data-rights-requests",
      limit: 3,
      windowMs: 60 * 60 * 1000,
    });
    if (!rateLimit.allowed) return tooManyRequestsResponse(rateLimit);

    const body = await req.json();
    const fullName = String(body?.full_name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const requestType = String(body?.request_type || "").trim() as RequestType;
    const details = String(body?.details || "").trim();

    if (!fullName || !email || !requestType) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (fullName.length > 120 || email.length > 254 || details.length > 5000) {
      return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
    }

    const allowed: RequestType[] = ["access", "deletion", "portability", "correction"];
    if (!allowed.includes(requestType)) {
      return NextResponse.json({ error: "Invalid request type." }, { status: 400 });
    }

    const adminDb = createAdminClient();
    const { error: insertError } = await adminDb.from("data_subject_requests").insert({
      full_name: fullName,
      email,
      request_type: requestType,
      details: details || null,
    });

    const resend = getResendClient();
    if (!resend && insertError) {
      return NextResponse.json(
        {
          error:
            "Data request channels are not available. Configure Resend or create data_subject_requests table.",
        },
        { status: 503 }
      );
    }

    if (resend) {
      const safeFullName = escapeHtml(fullName);
      const safeEmail = escapeHtml(email);
      const safeRequestType = escapeHtml(requestType);
      const safeDetails = escapeHtml(details).replace(/\n/g, "<br/>");

      await resend.emails.send({
      from: getMailerFrom(),
      to: CONTACT_EMAIL,
      replyTo: email,
        subject: `Data Subject Request: ${requestType.toUpperCase()} - ${fullName}`,
      html: `
        <p><b>New Data Subject Request</b></p>
        <p><b>Name:</b> ${safeFullName}</p>
        <p><b>Email:</b> ${safeEmail}</p>
        <p><b>Type:</b> ${safeRequestType}</p>
        <p><b>Details:</b><br/>${safeDetails || "(none provided)"}</p>
      `,
      });
    }

    return NextResponse.json({ success: true, message: "Request submitted." });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to submit request." },
      { status: 500 }
    );
  }
}
