import { NextRequest, NextResponse } from "next/server";
import { LISTING_CATEGORY_GROUPS } from "@/lib/listing-category-groups";
import { SIARGAO_MUNICIPALITIES } from "@/lib/siargao-municipalities";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const rawQuery = (new URL(request.url).searchParams.get("q") || "").trim().slice(0, 80);
  const normalized = rawQuery.toLowerCase();

  if (normalized.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  const suggestions: Array<{
    type: "business" | "category" | "municipality";
    label: string;
    value: string;
    detail?: string;
  }> = [];

  for (const municipality of SIARGAO_MUNICIPALITIES) {
    if (municipality.toLowerCase().includes(normalized)) {
      suggestions.push({ type: "municipality", label: municipality, value: municipality, detail: "Municipality" });
    }
  }

  for (const group of LISTING_CATEGORY_GROUPS) {
    if (
      group.label.toLowerCase().includes(normalized) ||
      group.terms.some((term) => term.includes(normalized) || normalized.includes(term))
    ) {
      suggestions.push({ type: "category", label: group.label, value: group.id, detail: "Category" });
    }
  }

  const safeQuery = rawQuery.replace(/[,%()]/g, " ").replace(/\s+/g, " ").trim();
  if (safeQuery) {
    const result = await supabase
      .from("business_listings")
      .select("business_name, category, municipality")
      .ilike("business_name", `%${safeQuery}%`)
      .in("municipality", SIARGAO_MUNICIPALITIES)
      .order("id", { ascending: false })
      .limit(5);

    if (!result.error) {
      for (const listing of result.data ?? []) {
        suggestions.push({
          type: "business",
          label: listing.business_name,
          value: listing.business_name,
          detail: [listing.category, listing.municipality].filter(Boolean).join(" · "),
        });
      }
    }
  }

  return NextResponse.json(
    { suggestions: suggestions.slice(0, 8) },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
  );
}
