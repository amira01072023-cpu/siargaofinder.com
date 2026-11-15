import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function htmlPage(title: string, message: string, status = 200) {
  return new NextResponse(
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 32px; }
    main { max-width: 640px; margin: 48px auto; background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; }
    a { color: #92400e; }
  </style>
</head>
<body>
  <main>
    <h1>${title}</h1>
    <p>${message}</p>
    <p><a href="/list-your-business">Back to Siargao Finder</a></p>
  </main>
</body>
</html>`,
    {
      status,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = String(searchParams.get("token") || "").trim();

  if (!token || token.length < 32) {
    return htmlPage("Invalid verification link", "This verification link is missing or invalid.", 400);
  }

  const verificationNote = `email_verification_sha256:${hashToken(token)}`;

  const { data: submission, error: fetchErr } = await supabaseAdmin
    .from("business_submissions")
    .select("id,status")
    .eq("status", "email_unverified")
    .eq("review_note", verificationNote)
    .single();

  if (fetchErr || !submission) {
    return htmlPage(
      "Verification link not found",
      "This verification link may have already been used or is no longer valid.",
      404
    );
  }

  const { error: updateErr } = await supabaseAdmin
    .from("business_submissions")
    .update({
      status: "pending",
      review_note: null,
    })
    .eq("id", submission.id);

  if (updateErr) {
    return htmlPage("Verification failed", "We could not verify this submission. Please try again later.", 500);
  }

  return htmlPage(
    "Email verified",
    "Your business submission is now pending admin review. Thank you for helping keep Siargao Finder clean."
  );
}
