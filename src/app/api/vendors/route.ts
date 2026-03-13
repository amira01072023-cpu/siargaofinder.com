import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getProjectRefFromUrl(url: string) {
try {
const host = new URL(url).host; // e.g. lvyqayarwgdydrlqpanu.supabase.co
return host.split(".")[0] || null;
} catch {
return null;
}
}

function getRefFromJwtLikeKey(key: string) {
try {
if (!key.startsWith("eyJ")) return null;
const parts = key.split(".");
if (parts.length < 2) return null;
const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
return payload?.ref ?? null;
} catch {
return null;
}
}

export async function GET(req: NextRequest) {
try {
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

if (!supabaseUrl || !serviceKey) {
return NextResponse.json(
{ error: "Server env missing: Supabase keys are not configured." },
{ status: 500 }
);
}

// Optional safety check (works for JWT-style keys)
const urlRef = getProjectRefFromUrl(supabaseUrl);
const keyRef = getRefFromJwtLikeKey(serviceKey);

if (urlRef && keyRef && urlRef !== keyRef) {
return NextResponse.json(
{ error: "Supabase key/project mismatch", urlRef, keyRef },
{ status: 500 }
);
}

const supabase = createClient(supabaseUrl, serviceKey);

const { searchParams } = new URL(req.url);
const q = (searchParams.get("q") || "").trim();
const page = Number(searchParams.get("page") || 1);
const limit = Number(searchParams.get("limit") || 10);
const from = (page - 1) * limit;
const to = from + limit - 1;

let query = supabase
.from("vendors")
.select("id, company_name, services, website_url", { count: "exact" });

if (q) {
query = query.or(`company_name.ilike.%${q}%,services.ilike.%${q}%`);
}

const { data, error, count } = await query
.order("id", { ascending: false })
.range(from, to);

if (error) {
return NextResponse.json(
{ error: error.message, details: error },
{ status: 500 }
);
}

return NextResponse.json({
items: data ?? [],
page,
limit,
total: count ?? 0,
totalPages: Math.max(1, Math.ceil((count ?? 0) / limit)),
});
} catch (e: unknown) {
return NextResponse.json(
{ error: e instanceof Error ? e.message : "Failed to load vendors" },
{ status: 500 }
);
}
}