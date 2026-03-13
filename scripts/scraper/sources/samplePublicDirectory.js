const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async function scrapeSample() {
const SOURCE_NAME = "Sample Public Directory";
const URL = "https://example.com/public-business-directory"; // replace with approved source

const { data: html } = await axios.get(URL, {
headers: { "User-Agent": "UAEBizConnectBot/1.0 (public data indexer)" },
timeout: 15000,
});

const $ = cheerio.load(html);
const results = [];

// Replace selectors for real source
$(".listing-card").each((_, el) => {
const business_name = $(el).find(".name").text().trim();
const category = $(el).find(".category").text().trim();
const city = $(el).find(".city").text().trim();
const phone = $(el).find(".phone").text().trim();
const website_url = $(el).find("a.website").attr("href") || "";

if (!business_name) return;

results.push({
business_name,
category,
emirate: city,
city,
address: "",
phone,
email: "",
website_url,
source_url: URL,
source_name: SOURCE_NAME,
});
});

return results;
};
