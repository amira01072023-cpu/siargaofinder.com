#!/usr/bin/env node
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

function parseEnv(path) {
  const env = {};
  const text = fs.readFileSync(path, "utf8");
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    env[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return env;
}

const srcEnv = parseEnv('/home/pgc/uae-directory-pro/.env.local');
const dstEnv = parseEnv('/home/pgc/siargao-directory/.env.local');

const src = createClient(srcEnv.NEXT_PUBLIC_SUPABASE_URL, srcEnv.SUPABASE_SERVICE_ROLE_KEY);
const dst = createClient(dstEnv.NEXT_PUBLIC_SUPABASE_URL, dstEnv.SUPABASE_SERVICE_ROLE_KEY);

const TABLES = [
  'business_listings',
  'vendors',
  'business_submissions',
  'listing_claim_requests',
  'data_subject_requests',
];

const BATCH = 500;

async function copyTable(table) {
  const head = await src.from(table).select('id', { count: 'exact', head: true });
  if (head.error) throw new Error(`[${table}] source error: ${head.error.message}`);
  const total = head.count || 0;

  const del = await dst.from(table).delete().gte('id', 0);
  if (del.error) throw new Error(`[${table}] clear target failed: ${del.error.message}`);

  let copied = 0;
  for (let from = 0; from < total; from += BATCH) {
    const to = Math.min(from + BATCH - 1, total - 1);
    const chunk = await src.from(table).select('*').order('id', { ascending: true }).range(from, to);
    if (chunk.error) throw new Error(`[${table}] read failed ${from}-${to}: ${chunk.error.message}`);

    const rows = chunk.data || [];
    if (!rows.length) continue;

    const ins = await dst.from(table).insert(rows);
    if (ins.error) throw new Error(`[${table}] insert failed ${from}-${to}: ${ins.error.message}`);
    copied += rows.length;
  }

  return { table, total, copied };
}

(async () => {
  for (const t of TABLES) {
    const r = await copyTable(t);
    console.log(`${r.table}: ${r.copied}/${r.total}`);
  }
  console.log('✅ Core tables migrated');
})().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
