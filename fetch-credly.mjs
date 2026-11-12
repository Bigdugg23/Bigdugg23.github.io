// Pulls your public Credly badges (Cisco Networking Academy issues badges via Credly)
// and writes them to data/credly-badges.json. Run by .github/workflows/update-certificates.yml
import { writeFileSync, readFileSync } from "node:fs";

const cfg = readFileSync("js/config.js", "utf8");
const user = (cfg.match(/credlyUsername:\s*"([^"]*)"/) || [])[1];
if (!user) {
  console.log("credlyUsername is empty in js/config.js - nothing to fetch.");
  process.exit(0);
}

const urls = [
  `https://www.credly.com/users/${user}/badges.json`,
  `https://www.credly.com/users/${user}/badges?sort=-state_updated_at&format=json`
];

let json = null;
for (const u of urls) {
  try {
    const r = await fetch(u, { headers: { Accept: "application/json", "User-Agent": "portfolio-sync" } });
    if (r.ok) { json = await r.json(); break; }
    console.log("HTTP", r.status, "for", u);
  } catch (e) { console.log("fetch failed", u, e.message); }
}
if (!json) { console.error("Could not read Credly badges (is your profile public?)"); process.exit(1); }

const list = json.data || json.badges || [];
const badges = list.map(b => {
  const t = b.badge_template || {};
  const issuer = (b.issuer?.entities || []).map(e => e.entity?.name).filter(Boolean).join(", ") || "Credly";
  return {
    name: t.name || b.name,
    issuer,
    date: (b.issued_at_date || b.issued_at || "").slice(0, 10),
    category: /cisco/i.test(issuer + " " + (t.name || "")) ? "Cisco" : "Other",
    description: t.description || "",
    url: b.id ? `https://www.credly.com/badges/${b.id}/public_url` : (t.url || ""),
    image: t.image_url || t.image?.url || ""
  };
}).filter(b => b.name);

writeFileSync("data/credly-badges.json", JSON.stringify({ updated: new Date().toISOString(), badges }, null, 2) + "\n");
console.log(`Saved ${badges.length} badge(s).`);
