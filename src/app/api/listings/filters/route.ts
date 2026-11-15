import { NextResponse } from "next/server";
import { getPublicListingFacets } from "@/lib/public-listing-data";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export async function GET() {
try {
const facets = await getPublicListingFacets();

return NextResponse.json(facets, {
headers: {
"Cache-Control": "public, s-maxage=300, stale-while-revalidate=1800",
},
});
} catch (e: unknown) {
return NextResponse.json({ error: e instanceof Error ? e.message : "Failed to load filters" }, { status: 500 });
}
}
