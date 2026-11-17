import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimitRequest, tooManyRequestsResponse } from "@/lib/rate-limit";

const MAX_MESSAGE_LENGTH = 120;

const MUNICIPALITIES = [
  "General Luna",
  "Dapa",
  "Del Carmen",
  "Pilar",
  "San Benito",
  "San Isidro",
  "Santa Monica",
  "Socorro",
  "Burgos",
];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "Surf Schools & Rentals": ["surf", "surf school", "surf schools", "board rental"],
  "Food Chains & Restaurants": ["restaurant", "restaurants", "food", "cafe", "cafes", "coffee"],
  "Tours & Island Hopping": ["tour", "tours", "island hopping", "boat"],
  "Transport Rentals": ["transport", "scooter", "van", "motorbike", "car rental"],
  "Hotels & Stays": ["hotel", "hotels", "stay", "stays", "resort", "resorts", "accommodation"],
  "Essentials & Services": ["service", "services", "clinic", "atm", "bank", "laundry"],
};

function normalizeMessage(input: string) {
  return input
    .slice(0, MAX_MESSAGE_LENGTH)
    .replace(/[,%()]/g, " ")
    .replace(/[^a-zA-Z0-9\s&\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function detectMunicipality(message: string) {
  const lower = message.toLowerCase();
  return MUNICIPALITIES.find((city) => lower.includes(city.toLowerCase())) || "";
}

function detectCategory(message: string) {
  const lower = message.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((keyword) => lower.includes(keyword))) return category;
  }
  return "";
}

function getCategorySearchTerms(category: string, rawText: string) {
  const directTerms = normalizeMessage(rawText).split(/\s+/).filter(Boolean);
  const keywordTerms = category && CATEGORY_KEYWORDS[category] ? CATEGORY_KEYWORDS[category] : [];
  return [...new Set([...directTerms, ...keywordTerms].map((term) => term.trim()).filter(Boolean))];
}

export async function POST(req: NextRequest) {
  try {
    const rateLimit = rateLimitRequest(req, {
      key: "directory-chat",
      limit: 30,
      windowMs: 60 * 1000,
    });
    if (!rateLimit.allowed) return tooManyRequestsResponse(rateLimit);

    const { message } = await req.json();
    const rawText = String(message || "").trim();
    const text = normalizeMessage(rawText);

    if (!text) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const city = detectMunicipality(text);
    const category = detectCategory(text);

    let query = supabase
      .from("business_listings")
      .select("id,business_name,category,municipality,phone,website_url")
      .limit(5)
      .order("id", { ascending: false });

    if (city) query = query.ilike("municipality", `%${city}%`);
    if (category) {
      const categoryTerms = getCategorySearchTerms(category, rawText);
      const categoryOr = categoryTerms.map((term) => `category.ilike.%${term}%`).join(",");
      if (categoryOr) query = query.or(categoryOr);
    }
    if (!city && !category) {
      const searchTerm = text.slice(0, 60);
      query = query.or(`business_name.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%,municipality.ilike.%${searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const results = data ?? [];

    const summaryParts = [];
    if (category) summaryParts.push(category);
    if (city) summaryParts.push(`in ${city}`);
    const summary = summaryParts.length > 0 ? summaryParts.join(" ") : "your search";

    const answer = results.length
      ? `I found ${results.length} listing${results.length === 1 ? "" : "s"} for ${summary}.`
      : `I couldn’t find a strong match for ${summary} yet, but you can still browse the directory manually.`;

    return NextResponse.json({
      answer,
      results,
      detected: { city, category },
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
