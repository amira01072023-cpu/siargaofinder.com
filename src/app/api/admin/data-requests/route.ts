import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { isAdminEmail } from "@/lib/admin-auth";

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

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin.ok) return admin.response;

    const adminDb = createAdminClient();
    const { data, error } = await adminDb
      .from("data_subject_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      // Graceful fallback so admin dashboard remains usable even when
      // DSR storage is not ready/misconfigured.
      return NextResponse.json({
        items: [],
        warning: "data_subject_requests unavailable",
        details: error.message,
        code: (error as { code?: string }).code || null,
      });
    }

    return NextResponse.json({ items: data ?? [] });
  } catch (e: unknown) {
    return NextResponse.json({
      items: [],
      warning: "data_subject_requests unavailable",
      details: e instanceof Error ? e.message : "unknown error",
    });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin.ok) return admin.response;

    const body = await req.json();
    const id = Number(body?.id);
    const status = String(body?.status || "").trim();
    const review_note = String(body?.review_note || "").trim();

    const allowed = ["pending", "in_progress", "completed", "rejected"];
    if (!id || !allowed.includes(status)) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    if (status === "rejected" && !review_note) {
      return NextResponse.json({ error: "Review note is required when rejecting." }, { status: 400 });
    }

    const adminDb = createAdminClient();
    const { error } = await adminDb
      .from("data_subject_requests")
      .update({
        status,
        review_note: review_note || null,
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, status });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to update data request" },
      { status: 500 }
    );
  }
}
