import { NextResponse } from "next/server";
import { getMailerFrom, getResendClient } from "@/lib/mailer";
import { rateLimitRequest, tooManyRequestsResponse } from "@/lib/rate-limit";

const ADMIN_EMAIL = "info@siargaofinder.com";

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
      key: "signup-notifications",
      limit: 5,
      windowMs: 60 * 60 * 1000,
    });
    if (!rateLimit.allowed) return tooManyRequestsResponse(rateLimit);

    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const redirectTo = String(body?.redirectTo || "").trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: true });
    }

    const resend = getResendClient();
    if (!resend) {
      return NextResponse.json({ ok: true, sent: false, reason: "missing_resend_api_key" });
    }

    await resend.emails.send({
      from: getMailerFrom(),
      to: ADMIN_EMAIL,
      subject: "New SiargaoFinder account signup",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
          <h2 style="margin:0 0 12px">New account signup</h2>
          <p>A new account signup was submitted on SiargaoFinder.</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${redirectTo ? `<p><strong>Confirmation redirect:</strong> ${escapeHtml(redirectTo)}</p>` : ""}
        </div>
      `,
    });

    return NextResponse.json({ ok: true, sent: true });
  } catch (error) {
    console.warn("Could not send signup notification:", error);
    return NextResponse.json({ ok: true, sent: false, reason: "send_failed" });
  }
}
