(async function () {
  const $ = s => document.querySelector(s), grid = $("#certGrid"), esc = GH.esc;
  const load = async u => { try { const r = await fetch(u + "?v=" + Date.now()); return r.ok ? r.json() : null; } catch { return null; } };
  const [manual, credly] = await Promise.all([load("data/certificates.json"), load("data/credly-badges.json")]);
  const seen = new Set(), all = [];
  [...(manual?.certificates || []), ...(credly?.badges || [])].forEach(c => {
    const k = c.name.toLowerCase().trim(); if (seen.has(k)) return; seen.add(k); all.push(c);
  });
  all.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const cats = ["All", ...new Set(all.map(c => c.category || "Other"))];
  $("#certFilters").innerHTML = cats.map((c, i) => `<button class="chip ${i ? "" : "on"}" data-c="${esc(c)}">${esc(c)}</button>`).join("");
  $("#certCount").textContent = all.length;
  if (credly?.updated) $("#certSync").textContent = "Cisco badges last synced " + new Date(credly.updated).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });

  const card = c => `<article class="card cert reveal">
    ${c.image ? `<img class="cert-img" src="${esc(c.image)}" alt="" loading="lazy">` : `<div class="cert-icon"><i class="fas ${c.category === "Cisco" ? "fa-network-wired" : "fa-award"}"></i></div>`}
    <h3>${esc(c.name)}</h3><p class="muted" style="font-size:.9rem">${esc(c.issuer)}</p>
    ${c.description ? `<p style="font-size:.9rem">${esc(c.description)}</p>` : ""}
    <div class="meta"><span class="badge gold">${esc(c.date || "")}</span><span class="badge">${esc(c.category || "Other")}</span>
    ${c.url ? `<a class="badge ok" href="${esc(c.url)}" target="_blank" rel="noopener" style="text-decoration:none"><i class="fas fa-circle-check"></i> Verify</a>` : ""}</div></article>`;
  function render(cat) {
    const list = all.filter(c => cat === "All" || (c.category || "Other") === cat);
    grid.innerHTML = list.length ? list.map(card).join("") : '<div class="notice" style="grid-column:1/-1">No certificates yet.</div>';
    observeReveal(grid);
  }
  $("#certFilters").addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    document.querySelectorAll("#certFilters .chip").forEach(x => x.classList.toggle("on", x === b)); render(b.dataset.c);
  });
  render("All");
})();
