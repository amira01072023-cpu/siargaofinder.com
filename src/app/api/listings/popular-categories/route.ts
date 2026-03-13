import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
const { data, error } = await supabase
.from("business_listings")
.select("category")
.not("category", "is", null);

if (error) {
return NextResponse.json({ error: error.message }, { status: 500 });
}

const counts = new Map<string, number>();
for (const row of data ?? []) {
const cat = (row.category || "").trim();
if (!cat) continue;
counts.set(cat, (counts.get(cat) || 0) + 1);
}

const categories = [...counts.entries()]
.map(([name, count]) => ({ name, count }))
.sort((a, b) => b.count - a.count)
.slice(0, 8);

return NextResponse.json({ categories });
}
