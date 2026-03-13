import { NextResponse } from "next/server";
import { getResendClient } from "@/lib/mailer";

const CONTACT_EMAIL = "info@siargaofinder.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const fullName = String(body?.full_name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const pageUrl = String(body?.page_url || "").trim();
    const details = String(body?.details || "").trim();

    if (!fullName || !email || !pageUrl || !details) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const resend = getResendClient();
    if (!resend) {
      return NextResponse.json({ error: "Reporting email service is not configured." }, { status: 503 });
    }

    await resend.emails.send({
      from: "Siargao Finder <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Content Report - ${fullName}`,
      html: `
        <p><b>New Content Report</b></p>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Page URL:</b> ${pageUrl}</p>
        <p><b>Details:</b><br/>${details.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to submit report." },
      { status: 500 }
    );
  }
}
