const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

const input = "/home/pgc/Downloads/Thunderbit_d47ddd_20260307_064013.csv";
const output = path.join(process.cwd(), "scripts/scraper/output/listings_clean.csv");

const raw = fs.readFileSync(input, "utf8");

// Proper CSV parse (handles quoted multiline fields)
const records = parse(raw, {
  columns: true,
  skip_empty_lines: true,
  relax_quotes: true,
  bom: true,
});

function norm(v = "") {
  return String(v).replace(/\s+/g, " ").trim();
}

const rows = records.map((r) => {
  const business_name = norm(r["Company Name"]);
  const address = norm(r["Location"]);
  const city = norm(r["City"]);
  const phone = norm(r["Phone Number"]);
  const category = norm(r["Products & Services"]);
  const website_url = norm(r["Company Website"]);

  return {
    business_name,
    category,
    emirate: city,
    city,
    address,
    phone,
    email: "",
    website_url,
    source_url: "manual_import_thunderbit",
    source_name: "Thunderbit CSV",
    last_verified_at: new Date().toISOString(),
  };
}).filter(r => r.business_name);

// dedupe
const map = new Map();
for (const r of rows) {
  const key = `${r.business_name.toLowerCase()}|${r.phone.toLowerCase()}|${r.website_url.toLowerCase()}`;
  if (!map.has(key)) map.set(key, r);
}
const clean = [...map.values()];

const headers = [
  "business_name","category","emirate","city","address","phone","email",
  "website_url","source_url","source_name","last_verified_at"
];
const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

const csv = [
  headers.join(","),
  ...clean.map(r => headers.map(h => esc(r[h])).join(","))
].join("\n");

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, csv);

console.log(`✅ Clean file created: ${output}`);
console.log(`Records: ${clean.length}`);
