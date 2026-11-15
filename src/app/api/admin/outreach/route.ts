import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { isAdminEmail } from "@/lib/admin-auth";

type OutreachStatus = "not_contacted" | "contacted" | "replied" | "follow_up_needed" | "closed";
type BusinessType = "hotel" | "villa" | "surf_school" | "cafe" | "coworking" | "transport" | "tours" | "other";

const ALLOWED_STATUSES: OutreachStatus[] = ["not_contacted", "contacted", "replied", "follow_up_needed", "closed"];
const ALLOWED_TYPES: BusinessType[] = ["hotel", "villa", "surf_school", "cafe", "coworking", "transport", "tours", "other"];

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
  const businessType = String(searchParams.get("business_type") || "").trim();
  const premiumInterest = String(searchParams.get("premium_interest") || "").trim();
  const search = String(searchParams.get("search") || "").trim();

  let query = admin.supabase.from("outreach_contacts").select("*").order("created_at", { ascending: false });

  if (status && ALLOWED_STATUSES.includes(status as OutreachStatus)) {
    query = query.eq("status", status);
  }

  if (businessType && ALLOWED_TYPES.includes(businessType as BusinessType)) {
    query = query.eq("business_type", businessType);
  }

  if (premiumInterest === "true" || premiumInterest === "false") {
    query = query.eq("premium_interest", premiumInterest === "true");
  }

  if (search) {
    const escaped = search.replace(/,/g, " ").trim();
    query = query.or(
      [
        `business_name.ilike.%${escaped}%`,
        `contact_person.ilike.%${escaped}%`,
        `email.ilike.%${escaped}%`,
        `phone.ilike.%${escaped}%`,
        `instagram.ilike.%${escaped}%`,
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

    const business_name = String(body?.business_name || "").trim();
    const contact_person = String(body?.contact_person || "").trim();
    const business_type = String(body?.business_type || "other").trim() as BusinessType;
    const phone = String(body?.phone || "").trim();
    const email = String(body?.email || "").trim();
    const instagram = String(body?.instagram || "").trim();
    const website_url = String(body?.website_url || "").trim();
    const status = String(body?.status || "not_contacted").trim() as OutreachStatus;
    const reminder_date = String(body?.reminder_date || "").trim();
    const premium_interest = Boolean(body?.premium_interest);
    const notes = String(body?.notes || "").trim();
    const linked_listing_id = body?.linked_listing_id ? Number(body.linked_listing_id) : null;

    if (!business_name) {
      return NextResponse.json({ error: "Business name is required." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(business_type)) {
      return NextResponse.json({ error: "Invalid business type." }, { status: 400 });
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid outreach status." }, { status: 400 });
    }

    const { data, error } = await admin.supabase
      .from("outreach_contacts")
      .insert({
        business_name,
        contact_person: contact_person || null,
        business_type,
        phone: phone || null,
        email: email || null,
        instagram: instagram || null,
        website_url: website_url || null,
        status,
        reminder_date: reminder_date || null,
        premium_interest,
        notes: notes || null,
        linked_listing_id,
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, item: data }, { status: 201 });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to create outreach contact" },
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
      return NextResponse.json({ error: "Outreach contact id is required." }, { status: 400 });
    }

    const updates: Record<string, string | number | boolean | null> = {};

    if (body?.business_name !== undefined) {
      const business_name = String(body.business_name || "").trim();
      if (!business_name) {
        return NextResponse.json({ error: "Business name is required." }, { status: 400 });
      }
      updates.business_name = business_name;
    }

    if (body?.contact_person !== undefined) {
      updates.contact_person = String(body.contact_person || "").trim() || null;
    }

    if (body?.business_type !== undefined) {
      const business_type = String(body.business_type || "").trim() as BusinessType;
      if (!ALLOWED_TYPES.includes(business_type)) {
        return NextResponse.json({ error: "Invalid business type." }, { status: 400 });
      }
      updates.business_type = business_type;
    }

    if (body?.status !== undefined) {
      const status = String(body.status || "").trim() as OutreachStatus;
      if (!ALLOWED_STATUSES.includes(status)) {
        return NextResponse.json({ error: "Invalid outreach status." }, { status: 400 });
      }
      updates.status = status;
    }

    if (body?.phone !== undefined) {
      updates.phone = String(body.phone || "").trim() || null;
    }

    if (body?.email !== undefined) {
      updates.email = String(body.email || "").trim() || null;
    }

    if (body?.instagram !== undefined) {
      updates.instagram = String(body.instagram || "").trim() || null;
    }

    if (body?.website_url !== undefined) {
      updates.website_url = String(body.website_url || "").trim() || null;
    }

    if (body?.reminder_date !== undefined) {
      updates.reminder_date = String(body.reminder_date || "").trim() || null;
    }

    if (body?.premium_interest !== undefined) {
      updates.premium_interest = Boolean(body.premium_interest);
    }

    if (body?.notes !== undefined) {
      updates.notes = String(body.notes || "").trim() || null;
    }

    if (body?.linked_listing_id !== undefined) {
      updates.linked_listing_id = body.linked_listing_id ? Number(body.linked_listing_id) : null;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No updates provided." }, { status: 400 });
    }

    const { data, error } = await admin.supabase
      .from("outreach_contacts")
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
      { error: e instanceof Error ? e.message : "Failed to update outreach contact" },
      { status: 500 }
    );
  }
}
