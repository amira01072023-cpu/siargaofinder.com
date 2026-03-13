#!/usr/bin/env node
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const db = createClient(url, key);

const blockedNamePatterns = [
  /\broad\b/i,
  /\bstreet\b/i,
  /\bhighway\b/i,
  /\bbridge\b/i,
  /\bmunicipal\b/i,
  /\bbarangay\b/i,
  /\bchurch\b/i,
  /\bschool\b/i,
  /\bchapel\b/i,
  /\bcemetery\b/i,
  /\bpark\b/i,
];

function score(row) {
  let s = 0;
  if (row.website_url) s += 3;
  if (row.phone) s += 2;
  if (row.email) s += 1;
  if (row.address) s += 1;
  if (row.category && row.category !== "Essentials & Services") s += 1;
  return s;
}

function isLikelyBusiness(name = "") {
  if (!name || name.trim().length < 3) return false;
  return !blockedNamePatterns.some((p) => p.test(name));
}

(async () => {
  const { data, error } = await db.from("business_listings").select("*").order("id", { ascending: true }).limit(5000);
  if (error) {
    console.error(error.message);
    process.exit(1);
  }

  const rows = (data || [])
    .filter((r) => isLikelyBusiness(r.business_name))
    .map((r) => ({ ...r, _score: score(r) }))
    .filter((r) => r._score >= 3)
    .sort((a, b) => b._score - a._score || a.business_name.localeCompare(b.business_name));

  // keep top high-confidence set
  const refined = rows.slice(0, 450).map(({ _score, ...rest }) => rest);

  const del = await db.from("business_listings").delete().gte("id", 0);
  if (del.error) {
    console.error("Delete failed:", del.error.message);
    process.exit(1);
  }

  // re-id compactly for current schema
  const payload = refined.map((r, i) => ({ ...r, id: i + 1 }));

  const BATCH = 300;
  let inserted = 0;
  for (let i = 0; i < payload.length; i += BATCH) {
    const chunk = payload.slice(i, i + BATCH);
    const ins = await db.from("business_listings").insert(chunk);
    if (ins.error) {
      console.error("Insert failed:", ins.error.message);
      process.exit(1);
    }
    inserted += chunk.length;
  }

  console.log(`✅ Phase 1.2 refined dataset loaded: ${inserted} high-confidence listings.`);
})();
