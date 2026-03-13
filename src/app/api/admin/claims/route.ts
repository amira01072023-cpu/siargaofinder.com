import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { isAdminEmail } from "@/lib/admin-auth";

export async function GET() {
const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();

if (!isAdminEmail(user?.email)) {
return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

const { data, error } = await supabase
.from("listing_claim_requests")
.select("*")
.order("created_at", { ascending: false });

if (error) return NextResponse.json({ error: error.message }, { status: 500 });
return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: Request) {
const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();

if (!isAdminEmail(user?.email)) {
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

const { data: claim, error: fetchErr } = await supabase
.from("listing_claim_requests")
.select("*")
.eq("id", id)
.single();

if (fetchErr || !claim) {
return NextResponse.json({ error: "Claim request not found" }, { status: 404 });
}

const status = action === "approve" ? "approved" : "rejected";

const { error: updErr } = await supabase
.from("listing_claim_requests")
.update({
status,
review_note: review_note || null,
reviewed_at: new Date().toISOString(),
})
.eq("id", id);

if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });

return NextResponse.json({ success: true, status });
}
