import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { getResendClient } from "@/lib/mailer";

const CONTACT_EMAIL = "info@siargaofinder.com";

type RequestType = "access" | "deletion" | "portability" | "correction";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const fullName = String(body?.full_name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const requestType = String(body?.request_type || "").trim() as RequestType;
    const details = String(body?.details || "").trim();

    if (!fullName || !email || !requestType) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
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
      await resend.emails.send({
      from: "Siargao Finder <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Data Subject Request: ${requestType.toUpperCase()} - ${fullName}`,
      html: `
        <p><b>New Data Subject Request</b></p>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Type:</b> ${requestType}</p>
        <p><b>Details:</b><br/>${details ? details.replace(/\n/g, "<br/>") : "(none provided)"}</p>
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
