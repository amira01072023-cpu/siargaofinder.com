#!/usr/bin/env node
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

function parseEnv(path) {
  const env = {};
  const text = fs.readFileSync(path, "utf8");
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    const k = line.slice(0, i).trim();
    const v = line.slice(i + 1).trim();
    env[k] = v;
  }
  return env;
}

const SOURCE_ENV = "/home/pgc/uae-directory-pro/.env.local";
const TARGET_ENV = "/home/pgc/siargao-directory/.env.local";

const srcEnv = parseEnv(SOURCE_ENV);
const dstEnv = parseEnv(TARGET_ENV);

const src = createClient(srcEnv.NEXT_PUBLIC_SUPABASE_URL, srcEnv.SUPABASE_SERVICE_ROLE_KEY);
const dst = createClient(dstEnv.NEXT_PUBLIC_SUPABASE_URL, dstEnv.SUPABASE_SERVICE_ROLE_KEY);

const TABLE = "business_listings";
const BATCH = 500;

async function main() {
  // check target table exists
  const check = await dst.from(TABLE).select("id", { count: "exact", head: true });
  if (check.error) {
    console.error(`Target table missing or inaccessible: ${check.error.message}`);
    process.exit(1);
  }

  const srcHead = await src.from(TABLE).select("id", { count: "exact", head: true });
  if (srcHead.error) {
    console.error(`Source table error: ${srcHead.error.message}`);
    process.exit(1);
  }
  const total = srcHead.count || 0;
  console.log(`Source rows: ${total}`);

  // clear target
  const del = await dst.from(TABLE).delete().gte("id", 0);
  if (del.error) {
    console.error(`Failed to clear target: ${del.error.message}`);
    process.exit(1);
  }

  let copied = 0;
  for (let from = 0; from < total; from += BATCH) {
    const to = Math.min(from + BATCH - 1, total - 1);
    const chunk = await src
      .from(TABLE)
      .select("*")
      .order("id", { ascending: true })
      .range(from, to);

    if (chunk.error) {
      console.error(`Read failed at ${from}-${to}: ${chunk.error.message}`);
      process.exit(1);
    }

    const rows = chunk.data || [];
    if (!rows.length) continue;

    const ins = await dst.from(TABLE).insert(rows);
    if (ins.error) {
      console.error(`Insert failed at ${from}-${to}: ${ins.error.message}`);
      process.exit(1);
    }

    copied += rows.length;
    console.log(`Copied ${copied}/${total}`);
  }

  console.log("✅ Migration complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
