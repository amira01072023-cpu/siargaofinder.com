import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const SIARGAO_MUNICIPALITIES = [
  "General Luna",
  "Dapa",
  "Del Carmen",
  "Pilar",
  "San Benito",
  "Santa Monica",
  "Socorro",
  "Burgos",
];

export async function GET(req: NextRequest) {
const { searchParams } = new URL(req.url);

const q = (searchParams.get("q") || "").trim();
const category = (searchParams.get("category") || "").trim();
const city = (searchParams.get("city") || "").trim();

const page = Math.max(Number(searchParams.get("page") || 1), 1);
const limit = Math.min(Math.max(Number(searchParams.get("limit") || 10), 1), 50);
const from = (page - 1) * limit;
const to = from + limit - 1;

let query = supabase
.from("business_listings")
.select("*", { count: "exact" })
.in("city", SIARGAO_MUNICIPALITIES);

if (q) query = query.ilike("business_name", `%${q}%`);
if (category) query = query.ilike("category", `%${category}%`);
if (city) query = query.ilike("city", `%${city}%`);

const { data, error, count } = await query.order("id", { ascending: false });

if (error) return NextResponse.json({ error: error.message }, { status: 500 });

const trustScore = (row: { phone?: string | null; website_url?: string | null }) => {
const hasPhone = !!(row.phone || "").trim();
const hasWebsite = !!(row.website_url || "").trim();
if (hasPhone && hasWebsite) return 3;
if (hasWebsite) return 2;
if (hasPhone) return 1;
return 0;
};

const sorted = (data ?? []).sort((a, b) => {
const s = trustScore(b) - trustScore(a);
if (s !== 0) return s;
return (b.id || 0) - (a.id || 0);
});

const items = sorted.slice(from, to + 1);

return NextResponse.json({
items,
page,
limit,
total: count ?? sorted.length,
totalPages: Math.max(Math.ceil((count ?? sorted.length) / limit), 1),
});
}