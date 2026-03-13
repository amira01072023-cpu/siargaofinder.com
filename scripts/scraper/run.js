const fs = require("fs");
const path = require("path");
const { createObjectCsvWriter } = require("csv-writer");
const scrapeSample = require("./sources/samplePublicDirectory");

function normalizePhone(phone = "") {
return phone.replace(/\s+/g, " ").trim();
}

function cleanRecord(r) {
return {
business_name: (r.business_name || "").trim(),
category: (r.category || "").trim(),
emirate: (r.emirate || "").trim(),
city: (r.city || "").trim(),
address: (r.address || "").trim(),
phone: normalizePhone(r.phone || ""),
email: (r.email || "").trim(),
website_url: (r.website_url || "").trim(),
source_url: (r.source_url || "").trim(),
source_name: (r.source_name || "").trim(),
last_verified_at: new Date().toISOString(),
};
}

function dedupe(records) {
const map = new Map();
for (const r of records) {
const key = `${r.business_name.toLowerCase()}|${(r.phone || "").toLowerCase()}|${(r.website_url || "").toLowerCase()}`;
if (!map.has(key)) map.set(key, r);
}
return [...map.values()];
}

(async () => {
try {
const all = [
...(await scrapeSample()),
];

const cleaned = all.map(cleanRecord).filter(
(r) => r.business_name && r.source_url
);

const unique = dedupe(cleaned);

const outDir = path.join(__dirname, "output");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const outFile = path.join(outDir, "listings.csv");
const csvWriter = createObjectCsvWriter({
path: outFile,
header: [
{ id: "business_name", title: "business_name" },
{ id: "category", title: "category" },
{ id: "emirate", title: "emirate" },
{ id: "city", title: "city" },
{ id: "address", title: "address" },
{ id: "phone", title: "phone" },
{ id: "email", title: "email" },
{ id: "website_url", title: "website_url" },
{ id: "source_url", title: "source_url" },
{ id: "source_name", title: "source_name" },
{ id: "last_verified_at", title: "last_verified_at" },
],
});

await csvWriter.writeRecords(unique);
console.log(`✅ Done. ${unique.length} records saved to: ${outFile}`);
} catch (err) {
console.error("❌ Scraper failed:", err.message);
process.exit(1);
}
})();
