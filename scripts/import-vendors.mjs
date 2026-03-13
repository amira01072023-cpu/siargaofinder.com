#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { createClient } from "@supabase/supabase-js";

// ---------- Config ----------
const CSV_PATH = process.argv[2] || "/home/pgc/uae-directory-pro Vendors_with_verified_websites.csv";
const BATCH_SIZE = 500;

// Requires env:
// NEXT_PUBLIC_SUPABASE_URL
// SUPABASE_SERVICE_ROLE_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
console.error("Missing env vars: NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY");
process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

// ---------- Helpers ----------
const normalize = (s) =>
String(s || "")
.toLowerCase()
.trim()
.replace(/\uFEFF/g, "")
.replace(/[^a-z0-9]+/g, "_")
.replace(/^_+|_+$/g, "");

const pick = (row, candidates) => {
for (const c of candidates) {
const key = Object.keys(row).find((k) => normalize(k) === normalize(c));
if (key && row[key] != null && String(row[key]).trim() !== "") return String(row[key]).trim();
}
return "";
};

function mapRow(row) {
const company_name = pick(row, [
"company_name",
"company",
"business_name",
"vendor_name",
"name",
]);

const services = pick(row, [
"services",
"service",
"category",
"categories",
"description",
]);

let website_url = pick(row, [
"website_url",
"website",
"url",
"web",
"company_website",
"verified_website",
]);

if (website_url && !/^https?:\/\//i.test(website_url)) {
website_url = `https://${website_url}`;
}

return { company_name, services, website_url: website_url || null };
}

async function insertBatches(rows) {
let inserted = 0;
for (let i = 0; i < rows.length; i += BATCH_SIZE) {
const batch = rows.slice(i, i + BATCH_SIZE);

const { error } = await supabase.from("vendors").insert(batch);
if (error) {
console.error(`Batch ${i / BATCH_SIZE + 1} failed:`, error.message);
process.exit(1);
}

inserted += batch.length;
console.log(`Inserted ${inserted}/${rows.length}`);
}
}

async function main() {
if (!fs.existsSync(CSV_PATH)) {
console.error(`CSV not found: ${CSV_PATH}`);
process.exit(1);
}

const csvText = fs.readFileSync(CSV_PATH, "utf8");
const records = parse(csvText, {
columns: true,
skip_empty_lines: true,
relax_column_count: true,
bom: true,
trim: true,
});

const mapped = records
.map(mapRow)
.filter((r) => r.company_name && r.services); // required columns

if (!mapped.length) {
console.error("No valid rows to import (need at least company_name + services).");
process.exit(1);
}

console.log(`CSV rows: ${records.length}`);
console.log(`Valid mapped rows: ${mapped.length}`);
await insertBatches(mapped);
console.log("✅ Import complete.");
}

main().catch((e) => {
console.error("Import failed:", e);
process.exit(1);
});