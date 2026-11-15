import { NextResponse } from "next/server";
import { getMailerFrom, getResendClient } from "@/lib/mailer";

const CONTACT_EMAIL = "info@siargaofinder.com";

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
    const body = await req.json();
    const fullName = String(body?.full_name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const pageUrl = String(body?.page_url || "").trim();
    const details = String(body?.details || "").trim();

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const pageUrlOk = /^https?:\/\//i.test(pageUrl);

    if (!fullName || !email || !pageUrl || !details) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!emailOk) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (!pageUrlOk) {
      return NextResponse.json({ error: "Invalid page URL." }, { status: 400 });
    }

    if (fullName.length > 120 || email.length > 200 || pageUrl.length > 500 || details.length > 5000) {
      return NextResponse.json({ error: "Input too long." }, { status: 400 });
    }

    const safeFullName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safePageUrl = escapeHtml(pageUrl);
    const safeDetails = escapeHtml(details).replace(/\n/g, "<br/>");

    const resend = getResendClient();
    if (!resend) {
      return NextResponse.json({ error: "Reporting email service is not configured." }, { status: 503 });
    }

    await resend.emails.send({
      from: getMailerFrom(),
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Content Report - ${safeFullName}`,
      html: `
        <p><b>New Content Report</b></p>
        <p><b>Name:</b> ${safeFullName}</p>
        <p><b>Email:</b> ${safeEmail}</p>
        <p><b>Page URL:</b> ${safePageUrl}</p>
        <p><b>Details:</b><br/>${safeDetails}</p>
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
