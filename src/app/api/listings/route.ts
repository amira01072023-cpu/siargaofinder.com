import { NextRequest, NextResponse } from "next/server";
import { getListingCategoryGroup } from "@/lib/listing-category-groups";
import { getListingBusinessSearchTerms } from "@/lib/listing-search-intent";
import { SIARGAO_MUNICIPALITIES } from "@/lib/siargao-municipalities";
import { supabase } from "@/lib/supabase";

const RANDOM_LISTINGS_POOL_SIZE = 50;

export const dynamic = "force-dynamic";

function shuffleItems<T>(items: T[]) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET(req: NextRequest) {
const { searchParams } = new URL(req.url);

const q = (searchParams.get("q") || "").trim();
const businessName = (searchParams.get("businessName") || "").trim().slice(0, 160);
const category = (searchParams.get("category") || "").trim();
const categoryGroup = (searchParams.get("categoryGroup") || "").trim();
const municipality = (searchParams.get("municipality") || searchParams.get("city") || "").trim();
const hasPhone = searchParams.get("hasPhone") === "1";
const random = searchParams.get("random") === "1";

const page = Math.max(Number(searchParams.get("page") || 1), 1);
const limit = Math.min(Math.max(Number(searchParams.get("limit") || 10), 1), 50);
const from = (page - 1) * limit;
const to = from + limit - 1;
const searchPlan = getListingBusinessSearchTerms(q);
const effectiveCategoryGroup = categoryGroup || searchPlan.categoryGroup;
const effectiveMunicipality = municipality || searchPlan.municipality;

const buildQuery = (head = false) => {
let query = supabase
  .from("business_listings")
  .select("id, business_name, category, municipality, phone, email, website_url, socials, address, services, last_verified_at", {
    count: "exact",
    head,
  })
  .in("municipality", SIARGAO_MUNICIPALITIES);

if (businessName) query = query.ilike("business_name", businessName);
else if (searchPlan.terms.length === 1) query = query.ilike("business_name", `%${searchPlan.terms[0]}%`);
else if (searchPlan.terms.length > 1) query = query.or(searchPlan.terms.map((term) => `business_name.ilike.%${term.replace(/[,%()]/g, " ")}%`).join(","));
if (category) query = query.ilike("category", `%${category}%`);
if (effectiveCategoryGroup) {
  const group = getListingCategoryGroup(effectiveCategoryGroup);
  if (group) {
    query = query.or(group.terms.map((term) => `category.ilike.%${term}%`).join(","));
  }
}
if (effectiveMunicipality) query = query.ilike("municipality", `%${effectiveMunicipality}%`);
if (hasPhone) query = query.not("phone", "is", null).neq("phone", "");

return query;
};

if (random && !q && !businessName && !category && !categoryGroup && !municipality && !hasPhone && page === 1) {
const countResult = await buildQuery(true);
if (countResult.error) return NextResponse.json({ error: countResult.error.message }, { status: 500 });

const total = countResult.count ?? 0;
const randomOffset = Math.floor(
  Math.random() * Math.max(total - RANDOM_LISTINGS_POOL_SIZE + 1, 1),
);

const result = await buildQuery()
  .order("id", { ascending: false })
  .range(randomOffset, randomOffset + RANDOM_LISTINGS_POOL_SIZE - 1);

if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 });

return NextResponse.json({
items: shuffleItems(result.data ?? []).slice(0, limit),
page,
limit,
total,
totalPages: Math.max(Math.ceil(total / limit), 1),
}, {
headers: {
"Cache-Control": "public, s-maxage=180, stale-while-revalidate=900",
},
});
}

const result = await buildQuery()
  .order("id", { ascending: false })
  .range(from, to);

if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 });

return NextResponse.json({
items: result.data ?? [],
page,
limit,
total: result.count ?? 0,
totalPages: Math.max(Math.ceil((result.count ?? 0) / limit), 1),
}, {
headers: {
"Cache-Control": q || businessName
? "public, s-maxage=60, stale-while-revalidate=300"
: "public, s-maxage=180, stale-while-revalidate=900",
},
});
}
