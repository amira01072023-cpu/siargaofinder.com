#!/usr/bin/env node
import fs from "fs";
import path from "path";

const OUT = "/home/pgc/siargao-directory/scripts/scraper/output/siargao_osm_seed.csv";

const overpassQuery = `
[out:json][timeout:120];
(
  node["name"]["tourism"](9.55,125.80,10.20,126.35);
  way["name"]["tourism"](9.55,125.80,10.20,126.35);
  node["name"]["amenity"](9.55,125.80,10.20,126.35);
  way["name"]["amenity"](9.55,125.80,10.20,126.35);
  node["name"]["shop"](9.55,125.80,10.20,126.35);
  way["name"]["shop"](9.55,125.80,10.20,126.35);
);
out center tags;
`;

const municipalities = [
  "General Luna","Dapa","Del Carmen","Pilar","San Benito","Santa Monica","Socorro","Burgos"
];

function inferArea(tags = {}) {
  const text = `${tags["addr:city"] || ""} ${tags["addr:town"] || ""} ${tags["addr:village"] || ""}`.trim();
  for (const m of municipalities) {
    if (text.toLowerCase().includes(m.toLowerCase())) return m;
  }
  return "General Luna";
}

function mapCategory(tags = {}) {
  const amenity = (tags.amenity || "").toLowerCase();
  const tourism = (tags.tourism || "").toLowerCase();
  const shop = (tags.shop || "").toLowerCase();
  const name = (tags.name || "").toLowerCase();

  if (["hotel","hostel","guest_house","apartment","resort"].includes(tourism) || /(resort|hotel|hostel|villa|inn)/.test(name)) return "Accommodation";
  if (["restaurant","cafe","fast_food","bar","pub"].includes(amenity) || /(cafe|coffee|restaurant|kitchen|bar|bistro)/.test(name)) return "Cafés & Restaurants";
  if (/(surf|board)/.test(name) || ["boat_rental","attraction"].includes(tourism)) return "Surf Schools & Rentals";
  if (/(tour|island hopping|boat|adventure|dive)/.test(name)) return "Tours & Island Hopping";
  if (/(rental|rent|scooter|motorbike|bike|car|van)/.test(name)) return "Transport Rentals";
  if (["spa","massage","clinic","doctors","hospital"].includes(amenity) || /(spa|wellness|yoga|gym|fitness|clinic)/.test(name)) return "Wellness & Spa";
  if (/(cowork|workspace)/.test(name)) return "Coworking & Digital Nomad";
  return "Essentials & Services";
}

function esc(v = "") {
  return `"${String(v).replace(/"/g, '""')}"`;
}

function toAddress(tags = {}) {
  const parts = [
    tags["addr:housenumber"],
    tags["addr:street"],
    tags["addr:suburb"],
    tags["addr:village"],
    tags["addr:city"] || tags["addr:town"],
    "Siargao",
  ].filter(Boolean);
  return parts.join(", ");
}

async function main() {
  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: overpassQuery,
  });

  if (!res.ok) {
    throw new Error(`Overpass error: ${res.status}`);
  }

  const json = await res.json();
  const rows = [];

  for (const el of json.elements || []) {
    const tags = el.tags || {};
    const business_name = (tags.name || "").trim();
    if (!business_name) continue;

    const city = inferArea(tags);
    const category = mapCategory(tags);
    const website_url = (tags.website || tags["contact:website"] || "").trim();
    const phone = (tags.phone || tags["contact:phone"] || "").trim();
    const email = (tags.email || tags["contact:email"] || "").trim();
    const address = toAddress(tags);
    const source_url = `https://www.openstreetmap.org/${el.type}/${el.id}`;

    rows.push({
      business_name,
      category,
      emirate: city,
      city,
      address,
      phone,
      email,
      website_url,
      source_url,
      source_name: "OpenStreetMap",
      last_verified_at: new Date().toISOString(),
      services: tags.description || "",
    });
  }

  // dedupe by name+city
  const seen = new Map();
  for (const r of rows) {
    const k = `${r.business_name.toLowerCase()}|${r.city.toLowerCase()}`;
    if (!seen.has(k)) seen.set(k, r);
  }
  const clean = [...seen.values()];

  const headers = [
    "business_name","category","emirate","city","address","phone","email",
    "website_url","source_url","source_name","last_verified_at","services"
  ];

  const csv = [
    headers.join(","),
    ...clean.map(r => headers.map(h => esc(r[h] || "")).join(","))
  ].join("\n");

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, csv);
  console.log(`✅ Saved ${clean.length} real OSM listings -> ${OUT}`);
}

main().catch((e) => {
  console.error("❌", e.message || e);
  process.exit(1);
});
