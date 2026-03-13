#!/usr/bin/env node
import fs from "fs";
import path from "path";

const OUT = "/home/pgc/siargao-directory/scripts/scraper/output/siargao_osm_expanded.csv";
const BBOX = "9.55,125.80,10.20,126.35";
const groups = ["tourism", "amenity", "shop", "office", "aeroway"];
const endpoints = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];

const municipalities = ["General Luna", "Dapa", "Del Carmen", "Pilar", "San Benito", "Santa Monica", "Socorro", "Burgos"];

function makeQuery(key) {
  return `
[out:json][timeout:120];
(
  node["name"]["${key}"](${BBOX});
  way["name"]["${key}"](${BBOX});
);
out center tags;
`;
}

function area(tags = {}) {
  const t = `${tags["addr:city"] || ""} ${tags["addr:town"] || ""} ${tags["addr:village"] || ""}`.toLowerCase();
  for (const m of municipalities) if (t.includes(m.toLowerCase())) return m;
  return "General Luna";
}

function category(tags = {}) {
  const a = (tags.amenity || "").toLowerCase();
  const t = (tags.tourism || "").toLowerCase();
  const s = (tags.shop || "").toLowerCase();
  const o = (tags.office || "").toLowerCase();
  const aw = (tags.aeroway || "").toLowerCase();
  const n = (tags.name || "").toLowerCase();

  if (aw || /(airport|airstrip|terminal)/.test(n)) return "Airports & Transport Terminals";
  if (a === "school" || a === "college" || a === "university" || /(school|academy|learning center)/.test(n)) return "Schools & Education";
  if (o === "government" || a === "townhall" || a === "police" || a === "courthouse" || /(municipal|government|barangay hall|city hall)/.test(n)) return "Government Offices";
  if (o === "lawyer" || /(law firm|attorney|law office)/.test(n)) return "Law Firms";
  if (/(survey|geodetic|mapping)/.test(n)) return "Survey Firms";

  if (a === "bank" || s === "bank" || /(bank|atm|bdo|bpi|metrobank|landbank|security bank)/.test(n)) return "Banks & ATMs";
  if (/(pera padala|remittance|western union|moneygram|cebuana|palawan pawnshop|mlhuillier)/.test(n)) return "Remittance & Pera Padala";

  if (s === "supermarket" || s === "mall" || /(supermarket|hypermarket|mall|grocery|mart|department store)/.test(n)) return "Supermarkets, Malls & Hypermarkets";
  if (s === "hardware" || /(hardware|construction supply|building materials)/.test(n)) return "Hardware Stores";
  if (a === "fuel" || /(gasoline|fuel|petron|shell|caltex)/.test(n)) return "Gasoline Stations";
  if (a === "marketplace" || /(wet market|public market|palengke)/.test(n)) return "Wet Market";

  if (/(ticket|ticketing|travel & tours|travel agency)/.test(n) || o === "travel_agent") return "Ticketing & Travel Offices";
  if (/(carenderia|carinderia|eatery|turo-turo)/.test(n)) return "Carinderias & Eateries";

  if (["hotel", "hostel", "guest_house", "resort", "apartment"].includes(t) || /(resort|hotel|hostel|villa|inn|beach house)/.test(n)) return "Hotels & Stays";
  if (["restaurant", "cafe", "fast_food", "bar", "pub"].includes(a) || /(restaurant|cafe|coffee|kitchen|bistro|food|chicken|pizza|jollibee|mcdo)/.test(n)) return "Food Chains & Restaurants";
  if (/(surf|board)/.test(n)) return "Surf Schools & Rentals";
  if (/(tour|boat|island hopping|adventure)/.test(n)) return "Tours & Island Hopping";
  if (/(rental|rent|scooter|motorbike|car|van)/.test(n)) return "Transport Rentals";

  return "Essentials & Services";
}

function addr(tags = {}) {
  return [tags["addr:housenumber"], tags["addr:street"], tags["addr:suburb"], tags["addr:village"], tags["addr:city"] || tags["addr:town"], "Siargao"]
    .filter(Boolean)
    .join(", ");
}

const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchGroup(key) {
  const body = makeQuery(key);
  for (const ep of endpoints) {
    const res = await fetch(ep, { method: "POST", headers: { "Content-Type": "text/plain" }, body });
    if (res.ok) return res.json();
    if (res.status === 429 || res.status >= 500) continue;
  }
  throw new Error(`${key}: all endpoints failed`);
}

(async () => {
  const rows = [];
  for (const g of groups) {
    try {
      const json = await fetchGroup(g);
      for (const el of json.elements || []) {
        const tags = el.tags || {};
        const name = (tags.name || "").trim();
        if (!name) continue;
        const city = area(tags);
        rows.push({
          business_name: name,
          category: category(tags),
          emirate: city,
          city,
          address: addr(tags),
          phone: (tags.phone || tags["contact:phone"] || "").trim(),
          email: (tags.email || tags["contact:email"] || "").trim(),
          website_url: (tags.website || tags["contact:website"] || "").trim(),
          source_url: `https://www.openstreetmap.org/${el.type}/${el.id}`,
          source_name: "OpenStreetMap",
          last_verified_at: new Date().toISOString(),
          services: tags.description || "",
        });
      }
      console.log(`Fetched group ${g}`);
    } catch (e) {
      console.log(`Skip group ${g}: ${e.message}`);
    }
    await sleep(1200);
  }

  const seen = new Map();
  for (const r of rows) {
    const k = `${r.business_name.toLowerCase()}|${r.city.toLowerCase()}|${r.category.toLowerCase()}`;
    if (!seen.has(k)) seen.set(k, r);
  }
  const clean = [...seen.values()];

  const headers = ["business_name", "category", "emirate", "city", "address", "phone", "email", "website_url", "source_url", "source_name", "last_verified_at", "services"];
  const csv = [headers.join(","), ...clean.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, csv);
  console.log(`✅ Saved ${clean.length} expanded records -> ${OUT}`);
})();