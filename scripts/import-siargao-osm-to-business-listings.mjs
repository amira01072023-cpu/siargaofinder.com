#!/usr/bin/env node
import fs from "fs";
import { parse } from "csv-parse/sync";
import { createClient } from "@supabase/supabase-js";

const CSV = "/home/pgc/siargao-directory/scripts/scraper/output/siargao_osm_seed.csv";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const db = createClient(url, key);

(async () => {
  const raw = fs.readFileSync(CSV, "utf8");
  const rows = parse(raw, { columns: true, skip_empty_lines: true, bom: true, trim: true });

  // reset current table for clean phase-1 seed
  const del = await db.from("business_listings").delete().gte("id", 0);
  if (del.error) {
    console.error("Delete failed:", del.error.message);
    process.exit(1);
  }

  const payload = rows.map((r) => ({
    business_name: r.business_name || null,
    category: r.category || null,
    emirate: r.emirate || null,
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

  const batch = 500;
  let inserted = 0;
  for (let i = 0; i < payload.length; i += batch) {
    const chunk = payload.slice(i, i + batch);
    const ins = await db.from("business_listings").insert(chunk);
    if (ins.error) {
      console.error(`Insert failed at ${i}-${i + chunk.length - 1}:`, ins.error.message);
      process.exit(1);
    }
    inserted += chunk.length;
  }

  console.log(`✅ Imported ${inserted} rows into business_listings from OSM seed.`);
})();
