import { NextRequest, NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin-auth";
import { rateLimitRequest, tooManyRequestsResponse } from "@/lib/rate-limit";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase-server";

const MAX_PATH_LENGTH = 200;
const MAX_VISITOR_KEY_LENGTH = 100;

function normalizePath(input: unknown) {
  if (typeof input !== "string") return "/";

  const trimmed = input.trim();
  if (!trimmed) return "/";
  if (!trimmed.startsWith("/")) return "/";
  if (trimmed.length > MAX_PATH_LENGTH) return null;
  if (/\s/.test(trimmed)) return null;

  return trimmed;
}

function normalizeVisitorKey(input: unknown) {
  if (typeof input !== "string") return null;

  const trimmed = input.trim();
  if (!trimmed) return null;
  if (trimmed.length > MAX_VISITOR_KEY_LENGTH) return null;
  if (!/^[a-zA-Z0-9._:-]+$/.test(trimmed)) return null;

  return trimmed;
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { count, error } = await supabaseAdmin
    .from("site_visits")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ total: count ?? 0 });
}

export async function POST(req: NextRequest) {
  try {
    const rateLimit = rateLimitRequest(req, {
      key: "site-visits",
      limit: 120,
      windowMs: 60 * 1000,
    });
    if (!rateLimit.allowed) return tooManyRequestsResponse(rateLimit);

    const body = await req.json().catch(() => ({}));
    const path = normalizePath(body?.path);
    const visitorKey = normalizeVisitorKey(body?.visitorKey);

    if (!path) {
      return NextResponse.json({ error: "Invalid path." }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("site_visits").insert({
      path,
      visitor_key: visitorKey,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to record visit" },
      { status: 500 }
    );
  }
}
