import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { getResendClient } from "@/lib/mailer";

const ALLOWED_ADMIN_EMAIL = "amira.01072023@gmail.com";

function normalize(v: string | null | undefined) {
return (v || "").trim().toLowerCase();
}

function isAdmin(email?: string | null) {
return normalize(email) === normalize(ALLOWED_ADMIN_EMAIL);
}

export async function GET() {
const supabase = await createClient();
const {
data: { user },
} = await supabase.auth.getUser();

if (!isAdmin(user?.email)) {
return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

const { data, error } = await supabase
.from("business_submissions")
.select("*")
.order("created_at", { ascending: false });

if (error) return NextResponse.json({ error: error.message }, { status: 500 });

return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: Request) {
const supabase = await createClient();
const {
data: { user },
} = await supabase.auth.getUser();

if (!isAdmin(user?.email)) {
return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

const body = await req.json();
const id = Number(body?.id);
const action = String(body?.action || "").trim();
const review_note = String(body?.review_note || "").trim();

if (!id || !["approve", "reject"].includes(action)) {
return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
}

if (action === "reject" && !review_note) {
return NextResponse.json({ error: "Rejection reason is required" }, { status: 400 });
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

const newStatus = action === "approve" ? "approved" : "rejected";

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
await resend.emails.send({
from: "Siargao Finder <onboarding@resend.dev>",
to: submission.email,
subject:
newStatus === "approved"
? `Approved: ${submission.business_name}`
: `Update on your listing: ${submission.business_name}`,
html:
newStatus === "approved"
? `
<p>Hello,</p>
<p>Your listing <b>${submission.business_name}</b> has been <b>approved</b> and published on Siargao Finder.</p>
<p>Thank you.</p>
`
: `
<p>Hello,</p>
<p>Your listing <b>${submission.business_name}</b> was <b>not approved</b> at this time.</p>
<p><b>Reason:</b> ${review_note}</p>
<p>Please update details and submit again.</p>
`,
});
}

return NextResponse.json({
success: true,
status: newStatus,
message:
newStatus === "approved"
? "Submission approved and published."
: "Submission rejected with reason.",
});
}