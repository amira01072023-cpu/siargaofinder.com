#!/usr/bin/env node
import fs from "fs";
import { parse } from "csv-parse/sync";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const csvPath = "/home/pgc/siargao-directory/scripts/scraper/output/siargao_osm_seed.csv";

if (!url || !key) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const db = createClient(url, key);

const blocked = [
  /\broad\b/i, /\bstreet\b/i, /\bhighway\b/i, /\bbridge\b/i,
  /\bmunicipal\b/i, /\bbarangay\b/i, /\bchurch\b/i, /\bschool\b/i,
  /\bchapel\b/i, /\bcemetery\b/i, /\bpark\b/i,
];

function likelyBusiness(name = "") {
  if (!name || name.trim().length < 3) return false;
  return !blocked.some((r) => r.test(name));
}

function score(r) {
  let s = 0;
  if (r.website_url) s += 3;
  if (r.phone) s += 2;
  if (r.email) s += 1;
  if (r.address) s += 1;
  if (r.category && r.category !== "Essentials & Services") s += 1;
  return s;
}

(async () => {
  const raw = fs.readFileSync(csvPath, "utf8");
  const rows = parse(raw, { columns: true, skip_empty_lines: true, bom: true, trim: true });

  const cleaned = rows
    .filter((r) => likelyBusiness(r.business_name))
    .map((r) => ({ ...r, _score: score(r) }))
    .filter((r) => r._score >= 2)
    .sort((a, b) => b._score - a._score || (a.business_name || "").localeCompare(b.business_name || ""));

  const target = cleaned.slice(0, 180).map(({ _score, ...r }) => r);

  const del = await db.from("business_listings").delete().gte("id", 0);
  if (del.error) {
    console.error("Delete failed:", del.error.message);
    process.exit(1);
  }

  const payload = target.map((r, i) => ({
    id: i + 1,
    business_name: r.business_name || null,
    category: r.category || null,
    emirate: r.emirate || r.city || null,
    city: r.city || null,
    address: r.address || null,
    phone: r.phone || null,
    email: r.email || null,
    website_url: r.website_url || null,
    source_url: r.source_url || null,
    source_name: r.source_name || "OpenStreetMap",
    last_verified_at: r.last_verified_at || new Date().toISOString(),
    services: r.services || null,
  }));

  const BATCH = 250;
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

  console.log(`✅ Phase 1.3 loaded ${inserted} expanded listings.`);
})();
