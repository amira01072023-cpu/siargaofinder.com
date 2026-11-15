import { NextResponse } from "next/server";
import { getPublicListingFacets } from "@/lib/public-listing-data";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export async function GET() {
try {
const { categoryBuckets } = await getPublicListingFacets();

return NextResponse.json({ categories: categoryBuckets }, {
headers: {
"Cache-Control": "public, s-maxage=300, stale-while-revalidate=1800",
},
});
} catch (e: unknown) {
return NextResponse.json({ error: e instanceof Error ? e.message : "Failed to load categories" }, { status: 500 });
}
}
