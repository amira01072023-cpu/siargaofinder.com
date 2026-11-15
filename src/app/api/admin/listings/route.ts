import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { isAdminEmail } from "@/lib/admin-auth";

type ListingStatus = "draft" | "published" | "needs_review" | "verified";
type ClaimStatus = "unclaimed" | "pending" | "claimed" | "rejected";

const ALLOWED_LISTING_STATUSES: ListingStatus[] = ["draft", "published", "needs_review", "verified"];
const ALLOWED_CLAIM_STATUSES: ClaimStatus[] = ["unclaimed", "pending", "claimed", "rejected"];

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    return { ok: false as const, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { ok: true as const, supabase, user };
}

export async function GET(request: Request) {
  const admin = await requireAdmin();
  if (!admin.ok) return admin.response;

  const { searchParams } = new URL(request.url);
  const status = String(searchParams.get("listing_status") || "").trim();
  const claimStatus = String(searchParams.get("claim_status") || "").trim();
  const municipality = String(searchParams.get("municipality") || "").trim();
  const category = String(searchParams.get("category") || "").trim();
  const featured = String(searchParams.get("featured") || "").trim();
  const duplicates = String(searchParams.get("duplicates") || "").trim();
  const search = String(searchParams.get("search") || "").trim();

  let query = admin.supabase
    .from("business_listings")
    .select(
      "id,business_name,category,municipality,phone,email,website_url,address,services,socials,listing_status,is_featured,is_duplicate_flagged,claim_status,verification_notes,last_reviewed_at,last_reviewed_by"
    )
    .order("id", { ascending: false });

  if (status && ALLOWED_LISTING_STATUSES.includes(status as ListingStatus)) {
    query = query.eq("listing_status", status);
  }

  if (claimStatus && ALLOWED_CLAIM_STATUSES.includes(claimStatus as ClaimStatus)) {
    query = query.eq("claim_status", claimStatus);
  }

  if (municipality) {
    query = query.ilike("municipality", `%${municipality}%`);
  }

  if (category) {
    query = query.ilike("category", `%${category}%`);
  }

  if (featured === "true" || featured === "false") {
    query = query.eq("is_featured", featured === "true");
  }

  if (duplicates === "true" || duplicates === "false") {
    query = query.eq("is_duplicate_flagged", duplicates === "true");
  }

  if (search) {
    const escaped = search.replace(/,/g, " ").trim();
    query = query.or(
      [
        `business_name.ilike.%${escaped}%`,
        `category.ilike.%${escaped}%`,
        `municipality.ilike.%${escaped}%`,
        `phone.ilike.%${escaped}%`,
        `email.ilike.%${escaped}%`,
      ].join(",")
    );
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function PATCH(req: Request) {
  const admin = await requireAdmin();
  if (!admin.ok) return admin.response;

  try {
    const body = await req.json();
    const id = Number(body?.id);

    if (!id) {
      return NextResponse.json({ error: "Listing id is required." }, { status: 400 });
    }

    const updates: Record<string, string | boolean | null> = {};

    if (body?.listing_status !== undefined) {
      const listingStatus = String(body.listing_status || "").trim() as ListingStatus;
      if (!ALLOWED_LISTING_STATUSES.includes(listingStatus)) {
        return NextResponse.json({ error: "Invalid listing status." }, { status: 400 });
      }
      updates.listing_status = listingStatus;
    }

    if (body?.claim_status !== undefined) {
      const claimStatus = String(body.claim_status || "").trim() as ClaimStatus;
      if (!ALLOWED_CLAIM_STATUSES.includes(claimStatus)) {
        return NextResponse.json({ error: "Invalid claim status." }, { status: 400 });
      }
      updates.claim_status = claimStatus;
    }

    if (body?.is_featured !== undefined) {
      updates.is_featured = Boolean(body.is_featured);
    }

    if (body?.is_duplicate_flagged !== undefined) {
      updates.is_duplicate_flagged = Boolean(body.is_duplicate_flagged);
    }

    if (body?.verification_notes !== undefined) {
      const notes = String(body.verification_notes || "").trim();
      if (notes.length > 4000) {
        return NextResponse.json({ error: "Verification notes are too long." }, { status: 400 });
      }
      updates.verification_notes = notes || null;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No updates provided." }, { status: 400 });
    }

    updates.last_reviewed_at = new Date().toISOString();
    updates.last_reviewed_by = admin.user?.email || null;

    const { data, error } = await admin.supabase
      .from("business_listings")
      .update(updates)
      .eq("id", id)
      .select(
        "id,business_name,category,municipality,phone,email,website_url,address,services,socials,listing_status,is_featured,is_duplicate_flagged,claim_status,verification_notes,last_reviewed_at,last_reviewed_by"
      )
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, item: data });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to update listing workflow" },
      { status: 500 }
    );
  }
}
