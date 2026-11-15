import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

function isValidEmail(email: string) {
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET(req: Request) {
try {
const supabase = await createClient();
const {
data: { user },
} = await supabase.auth.getUser();

if (!user) {
return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

const { searchParams } = new URL(req.url);
const listing_id = Number(searchParams.get("listing_id"));

if (!listing_id) {
return NextResponse.json({ error: "Listing id is required." }, { status: 400 });
}

const { data, error } = await supabase
.from("listing_claim_requests")
.select("id,listing_id,status,review_note,created_at,reviewed_at")
.eq("listing_id", listing_id)
.eq("claimant_user_id", user.id)
.order("created_at", { ascending: false })
.limit(1);

if (error) {
return NextResponse.json({ error: error.message }, { status: 500 });
}

return NextResponse.json({ item: data?.[0] || null });
} catch (e: unknown) {
return NextResponse.json(
{ error: e instanceof Error ? e.message : "Unexpected error while loading claim status." },
{ status: 500 }
);
}
}

export async function POST(req: Request) {
try {
const supabase = await createClient();
const {
data: { user },
} = await supabase.auth.getUser();

if (!user) {
return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

const body = await req.json();

// exact keys expected from claim form
const listing_id = Number(body?.listing_id);
const claimant_name = String(body?.claimant_name || "").trim();
const claimant_email = String(body?.claimant_email || "").trim().toLowerCase();
const claimant_phone = String(body?.claimant_phone || "").trim();
const relation_to_business = String(body?.relation_to_business || "").trim();
const message = String(body?.message || "").trim();
const proof = String(body?.proof || "").trim();
const socials = body?.socials || {};
const socialSummary = ["facebook", "instagram", "tiktok", "youtube"]
.map((k) => ({ k, v: String(socials?.[k] || "").trim() }))
.filter((x) => !!x.v)
.map((x) => `${x.k}: ${x.v}`)
.join(" | ");

if (
!listing_id ||
!claimant_name ||
!claimant_email ||
!claimant_phone ||
!relation_to_business
) {
return NextResponse.json(
{ error: "Missing required fields in claim request." },
{ status: 400 }
);
}

if (!isValidEmail(claimant_email)) {
return NextResponse.json({ error: "A valid business email is required." }, { status: 400 });
}

if (
claimant_name.length > 160 ||
claimant_email.length > 254 ||
claimant_phone.length > 80 ||
relation_to_business.length > 160 ||
message.length > 1200 ||
proof.length > 1200
) {
return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
}

const existingClaim = await supabase
.from("listing_claim_requests")
.select("id,status")
.eq("listing_id", listing_id)
.eq("claimant_user_id", user.id)
.in("status", ["pending", "approved"])
.limit(1);

if (existingClaim.error) {
return NextResponse.json({ error: existingClaim.error.message }, { status: 500 });
}

if (existingClaim.data && existingClaim.data.length > 0) {
return NextResponse.json(
{ error: "You already have an active claim request for this listing." },
{ status: 409 }
);
}

const listing = await supabase
.from("business_listings")
.select("id,claim_status")
.eq("id", listing_id)
.single();

if (listing.error || !listing.data) {
return NextResponse.json({ error: "Listing not found." }, { status: 404 });
}

if (listing.data.claim_status === "claimed") {
return NextResponse.json({ error: "This listing is already claimed." }, { status: 409 });
}

const messageParts = [
message,
proof ? `[PROOF]\n${proof}` : "",
socialSummary ? `[CLAIM_SOCIALS] ${socialSummary}` : "",
].filter(Boolean);

const { data: insertedClaim, error } = await supabase.from("listing_claim_requests").insert({
listing_id,
claimant_user_id: user.id,
claimant_name,
claimant_email,
claimant_phone,
relation_to_business,
message: messageParts.length ? messageParts.join("\n\n") : null,
status: "pending",
}).select("id,status,created_at").single();

if (error) {
return NextResponse.json({ error: error.message }, { status: 500 });
}

const listingUpdate = await supabase
.from("business_listings")
.update({ claim_status: "pending" })
.eq("id", listing_id);

if (listingUpdate.error) {
return NextResponse.json({ error: listingUpdate.error.message }, { status: 500 });
}

return NextResponse.json({ success: true, item: insertedClaim });
} catch (e: unknown) {
return NextResponse.json(
{ error: e instanceof Error ? e.message : "Unexpected error while creating claim." },
{ status: 500 }
);
}
}
