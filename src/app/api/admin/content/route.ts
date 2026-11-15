import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { isAdminEmail } from "@/lib/admin-auth";

type ContentStatus = "idea" | "researching" | "outlining" | "drafting" | "published";
type ContentPriority = "low" | "medium" | "high";

const ALLOWED_STATUSES: ContentStatus[] = ["idea", "researching", "outlining", "drafting", "published"];
const ALLOWED_PRIORITIES: ContentPriority[] = ["low", "medium", "high"];

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
  const priority = String(searchParams.get("priority") || "").trim();
  const category = String(searchParams.get("category") || "").trim();
  const search = String(searchParams.get("search") || "").trim();

  let query = admin.supabase.from("content_items").select("*").order("created_at", { ascending: false });

  if (status && ALLOWED_STATUSES.includes(status as ContentStatus)) {
    query = query.eq("status", status);
  }

  if (priority && ALLOWED_PRIORITIES.includes(priority as ContentPriority)) {
    query = query.eq("priority", priority);
  }

  if (category) {
    query = query.ilike("related_category", `%${category}%`);
  }

  if (search) {
    const escaped = search.replace(/,/g, " ").trim();
    query = query.or(
      [
        `title.ilike.%${escaped}%`,
        `target_keyword.ilike.%${escaped}%`,
        `search_intent.ilike.%${escaped}%`,
        `notes.ilike.%${escaped}%`,
        `related_category.ilike.%${escaped}%`,
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

    const title = String(body?.title || "").trim();
    const slug = String(body?.slug || "").trim();
    const target_keyword = String(body?.target_keyword || "").trim();
    const search_intent = String(body?.search_intent || "").trim();
    const status = String(body?.status || "idea").trim() as ContentStatus;
    const priority = String(body?.priority || "medium").trim() as ContentPriority;
    const related_category = String(body?.related_category || "").trim();
    const related_listing_id = body?.related_listing_id ? Number(body.related_listing_id) : null;
    const notes = String(body?.notes || "").trim();
    const published_url = String(body?.published_url || "").trim();

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid content status." }, { status: 400 });
    }

    if (!ALLOWED_PRIORITIES.includes(priority)) {
      return NextResponse.json({ error: "Invalid content priority." }, { status: 400 });
    }

    const published_at = status === "published" ? new Date().toISOString() : null;

    const { data, error } = await admin.supabase
      .from("content_items")
      .insert({
        title,
        slug: slug || null,
        target_keyword: target_keyword || null,
        search_intent: search_intent || null,
        status,
        priority,
        related_category: related_category || null,
        related_listing_id,
        notes: notes || null,
        published_url: published_url || null,
        published_at,
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, item: data }, { status: 201 });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to create content item" },
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
      return NextResponse.json({ error: "Content item id is required." }, { status: 400 });
    }

    const updates: Record<string, string | number | null> = {};

    if (body?.title !== undefined) {
      const title = String(body.title || "").trim();
      if (!title) {
        return NextResponse.json({ error: "Title is required." }, { status: 400 });
      }
      updates.title = title;
    }

    if (body?.slug !== undefined) {
      updates.slug = String(body.slug || "").trim() || null;
    }

    if (body?.target_keyword !== undefined) {
      updates.target_keyword = String(body.target_keyword || "").trim() || null;
    }

    if (body?.search_intent !== undefined) {
      updates.search_intent = String(body.search_intent || "").trim() || null;
    }

    if (body?.status !== undefined) {
      const status = String(body.status || "").trim() as ContentStatus;
      if (!ALLOWED_STATUSES.includes(status)) {
        return NextResponse.json({ error: "Invalid content status." }, { status: 400 });
      }
      updates.status = status;
      updates.published_at = status === "published" ? new Date().toISOString() : null;
    }

    if (body?.priority !== undefined) {
      const priority = String(body.priority || "").trim() as ContentPriority;
      if (!ALLOWED_PRIORITIES.includes(priority)) {
        return NextResponse.json({ error: "Invalid content priority." }, { status: 400 });
      }
      updates.priority = priority;
    }

    if (body?.related_category !== undefined) {
      updates.related_category = String(body.related_category || "").trim() || null;
    }

    if (body?.related_listing_id !== undefined) {
      updates.related_listing_id = body.related_listing_id ? Number(body.related_listing_id) : null;
    }

    if (body?.notes !== undefined) {
      updates.notes = String(body.notes || "").trim() || null;
    }

    if (body?.published_url !== undefined) {
      updates.published_url = String(body.published_url || "").trim() || null;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No updates provided." }, { status: 400 });
    }

    const { data, error } = await admin.supabase
      .from("content_items")
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
      { error: e instanceof Error ? e.message : "Failed to update content item" },
      { status: 500 }
    );
  }
}
