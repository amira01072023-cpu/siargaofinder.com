import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { isAdminEmail } from "@/lib/admin-auth";

type LeadStatus = "new" | "contacted" | "interested" | "closed";
type LeadSource = "listing_page" | "contact_form" | "blog_page" | "recommendation_request" | "manual";

const ALLOWED_STATUSES: LeadStatus[] = ["new", "contacted", "interested", "closed"];
const ALLOWED_SOURCES: LeadSource[] = [
  "listing_page",
  "contact_form",
  "blog_page",
  "recommendation_request",
  "manual",
];

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    return { ok: false as const, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { ok: true as const, supabase };
}

export async function GET(request: Request) {
  const admin = await requireAdmin();
  if (!admin.ok) return admin.response;

  const { searchParams } = new URL(request.url);
  const status = String(searchParams.get("status") || "").trim();
  const source = String(searchParams.get("source") || "").trim();
  const category = String(searchParams.get("category") || "").trim();
  const search = String(searchParams.get("search") || "").trim();

  let query = admin.supabase.from("leads").select("*").order("created_at", { ascending: false });

  if (status && ALLOWED_STATUSES.includes(status as LeadStatus)) {
    query = query.eq("status", status);
  }

  if (source && ALLOWED_SOURCES.includes(source as LeadSource)) {
    query = query.eq("source", source);
  }

  if (category) {
    query = query.ilike("category", `%${category}%`);
  }

  if (search) {
    const escaped = search.replace(/,/g, " ").trim();
    query = query.or(
      [
        `full_name.ilike.%${escaped}%`,
        `email.ilike.%${escaped}%`,
        `phone.ilike.%${escaped}%`,
        `category.ilike.%${escaped}%`,
        `notes.ilike.%${escaped}%`,
      ].join(",")
    );
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin.ok) return admin.response;

  try {
    const body = await req.json();

    const full_name = String(body?.full_name || "").trim();
    const email = String(body?.email || "").trim();
    const phone = String(body?.phone || "").trim();
    const source = String(body?.source || "manual").trim() as LeadSource;
    const status = String(body?.status || "new").trim() as LeadStatus;
    const message = String(body?.message || "").trim();
    const category = String(body?.category || "").trim();
    const notes = String(body?.notes || "").trim();
    const assigned_to = String(body?.assigned_to || "").trim();
    const business_listing_id = body?.business_listing_id ? Number(body.business_listing_id) : null;

    if (!full_name && !email && !phone) {
      return NextResponse.json({ error: "At least one contact field is required." }, { status: 400 });
    }

    if (!ALLOWED_SOURCES.includes(source)) {
      return NextResponse.json({ error: "Invalid lead source." }, { status: 400 });
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid lead status." }, { status: 400 });
    }

    const { data, error } = await admin.supabase
      .from("leads")
      .insert({
        full_name: full_name || null,
        email: email || null,
        phone: phone || null,
        source,
        status,
        message: message || null,
        category: category || null,
        notes: notes || null,
        assigned_to: assigned_to || null,
        business_listing_id,
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, item: data }, { status: 201 });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to create lead" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const admin = await requireAdmin();
  if (!admin.ok) return admin.response;

  try {
    const body = await req.json();
    const id = Number(body?.id);

    if (!id) {
      return NextResponse.json({ error: "Lead id is required." }, { status: 400 });
    }

    const updates: Record<string, string | number | null> = {};

    if (body?.status !== undefined) {
      const status = String(body.status || "").trim() as LeadStatus;
      if (!ALLOWED_STATUSES.includes(status)) {
        return NextResponse.json({ error: "Invalid lead status." }, { status: 400 });
      }
      updates.status = status;
      updates.closed_at = status === "closed" ? new Date().toISOString() : null;
    }

    if (body?.source !== undefined) {
      const source = String(body.source || "").trim() as LeadSource;
      if (!ALLOWED_SOURCES.includes(source)) {
        return NextResponse.json({ error: "Invalid lead source." }, { status: 400 });
      }
      updates.source = source;
    }

    if (body?.notes !== undefined) {
      updates.notes = String(body.notes || "").trim() || null;
    }

    if (body?.category !== undefined) {
      updates.category = String(body.category || "").trim() || null;
    }

    if (body?.assigned_to !== undefined) {
      updates.assigned_to = String(body.assigned_to || "").trim() || null;
    }

    if (body?.message !== undefined) {
      updates.message = String(body.message || "").trim() || null;
    }

    if (body?.full_name !== undefined) {
      updates.full_name = String(body.full_name || "").trim() || null;
    }

    if (body?.email !== undefined) {
      updates.email = String(body.email || "").trim() || null;
    }

    if (body?.phone !== undefined) {
      updates.phone = String(body.phone || "").trim() || null;
    }

    if (body?.business_listing_id !== undefined) {
      updates.business_listing_id = body.business_listing_id ? Number(body.business_listing_id) : null;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No updates provided." }, { status: 400 });
    }

    const { data, error } = await admin.supabase
      .from("leads")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, item: data });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to update lead" },
      { status: 500 }
    );
  }
}
