// Snapshots all public repos to data/repos.json (fallback if the browser hits GitHub's rate limit)
import { writeFileSync, readFileSync } from "node:fs";
const user = (readFileSync("js/config.js", "utf8").match(/github:\s*"([^"]+)"/) || [])[1];
let all = [];
for (let page = 1; page <= 10; page++) {
  const r = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&page=${page}&sort=pushed`, {
    headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } });
  if (!r.ok) { console.error("HTTP", r.status); process.exit(1); }
  const b = await r.json(); all = all.concat(b); if (b.length < 100) break;
}
const keep = ["name","html_url","description","language","stargazers_count","forks_count","pushed_at","homepage","topics","fork","archived"];
writeFileSync("data/repos.json", JSON.stringify(all.map(r => Object.fromEntries(keep.map(k => [k, r[k]]))), null, 2) + "\n");
console.log(`Saved ${all.length} repo(s).`);
