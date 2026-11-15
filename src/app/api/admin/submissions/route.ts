import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { getMailerFrom, getResendClient } from "@/lib/mailer";
import { isAdminEmail } from "@/lib/admin-auth";

const REVIEW_ACTIONS = ["approve", "reject", "mark_duplicate", "request_info"] as const;

type ReviewAction = (typeof REVIEW_ACTIONS)[number];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function GET() {
const supabase = await createClient();
const {
data: { user },
} = await supabase.auth.getUser();

if (!isAdminEmail(user?.email)) {
return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

const { data, error } = await supabase
.from("business_submissions")
.select("*")
.neq("status", "email_unverified")
.order("created_at", { ascending: false });

if (error) return NextResponse.json({ error: error.message }, { status: 500 });

return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: Request) {
const supabase = await createClient();
const {
data: { user },
} = await supabase.auth.getUser();

if (!isAdminEmail(user?.email)) {
return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

const body = await req.json();
const id = Number(body?.id);
const action = String(body?.action || "").trim() as ReviewAction;
const review_note = String(body?.review_note || "").trim();

if (!id || !REVIEW_ACTIONS.includes(action)) {
return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
}

if (review_note.length > 2000) {
return NextResponse.json({ error: "Review note is too long" }, { status: 400 });
}

if (["reject", "mark_duplicate", "request_info"].includes(action) && !review_note) {
return NextResponse.json({ error: "Review note is required for this action" }, { status: 400 });
}

const { data: submission, error: fetchErr } = await supabase
.from("business_submissions")
.select("*")
.eq("id", id)
.single();

if (fetchErr || !submission) {
return NextResponse.json({ error: "Submission not found" }, { status: 404 });
}

if (submission.status !== "pending") {
return NextResponse.json({ error: "Submission already reviewed" }, { status: 409 });
}

if (action === "approve") {
const { data: dup, error: dupErr } = await supabase
.from("business_listings")
.select("id,business_name")
.ilike("business_name", submission.business_name)
.limit(1);

if (dupErr) return NextResponse.json({ error: dupErr.message }, { status: 500 });

if (dup && dup.length > 0) {
return NextResponse.json(
{ error: "Duplicate business name exists in published listings." },
{ status: 409 }
);
}

const baseServices = String(submission.services || "").split("\n[SOCIALS]")[0].trim();
const parsedSocials = (() => {
  const m = String(submission.services || "").match(/\[SOCIALS\]([\s\S]*)$/);
  if (!m) return null;
  try { return JSON.parse(m[1].trim()); } catch { return null; }
})();

const { error: insErr } = await supabase.from("business_listings").insert({
business_name: submission.business_name,
category: submission.category,
municipality: submission.city,
city: submission.city,
phone: submission.phone,
email: submission.email,
website_url: submission.website_url,
address: submission.address,
services: baseServices,
socials: parsedSocials || null,
source_url: "user_submission",
source_name: "Business Owner Submission",
last_verified_at: new Date().toISOString(),
});

if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });
}

const statusByAction: Record<ReviewAction, string> = {
approve: "approved",
reject: "rejected",
mark_duplicate: "duplicate",
request_info: "needs_info",
};

const newStatus = statusByAction[action];

const { error: updErr } = await supabase
.from("business_submissions")
.update({
status: newStatus,
review_note: review_note || null,
reviewed_at: new Date().toISOString(),
})
.eq("id", id);

if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });

// Notify submitter email (optional if RESEND_API_KEY not set)
const resend = getResendClient();

if (resend && submission.email) {
const safeBusinessName = escapeHtml(String(submission.business_name || ""));
const safeReviewNote = escapeHtml(review_note);
const subjectByStatus: Record<string, string> = {
approved: `Approved: ${safeBusinessName}`,
rejected: `Update on your listing: ${safeBusinessName}`,
duplicate: `Duplicate listing notice: ${safeBusinessName}`,
needs_info: `More info needed: ${safeBusinessName}`,
};
const htmlByStatus: Record<string, string> = {
approved: `
<p>Hello,</p>
<p>Your listing <b>${safeBusinessName}</b> has been <b>approved</b> and published on Siargao Finder.</p>
<p>Thank you.</p>
`,
rejected: `
<p>Hello,</p>
<p>Your listing <b>${safeBusinessName}</b> was <b>not approved</b> at this time.</p>
<p><b>Reason:</b> ${safeReviewNote}</p>
<p>Please update details and submit again.</p>
`,
duplicate: `
<p>Hello,</p>
<p>Your listing <b>${safeBusinessName}</b> appears to duplicate an existing Siargao Finder listing.</p>
<p><b>Note:</b> ${safeReviewNote}</p>
<p>If this is a different business, please reply with the details that distinguish it.</p>
`,
needs_info: `
<p>Hello,</p>
<p>We need a little more information before reviewing <b>${safeBusinessName}</b>.</p>
<p><b>Requested info:</b> ${safeReviewNote}</p>
<p>Please reply with the missing details.</p>
`,
};

await resend.emails.send({
from: getMailerFrom(),
to: submission.email,
subject: subjectByStatus[newStatus],
html: htmlByStatus[newStatus],
});
}

return NextResponse.json({
success: true,
status: newStatus,
message:
newStatus === "approved"
? "Submission approved and published."
: "Submission review status updated.",
});
}
