document.getElementById("contribImg").src = "https://ghchart.rshah.org/a8803a/" + window.SITE.github;
(async function () {
  const S = window.SITE, $ = s => document.querySelector(s), grid = $("#repoGrid");
  grid.innerHTML = '<div class="skeleton"></div>'.repeat(6);
  let repos = [];
  try { repos = await GH.getRepos(); }
  catch (e) {
    grid.innerHTML = `<div class="notice" style="grid-column:1/-1"><i class="fas fa-triangle-exclamation"></i> ${GH.esc(e.message)}<br>
      <a href="https://github.com/${S.github}?tab=repositories" target="_blank" rel="noopener" style="color:var(--highlight)">View my repositories directly on GitHub</a></div>`;
    return;
  }
  const sm = GH.summary(repos);
  $("#ghStats").innerHTML = [[repos.length, "Repositories"], [sm.ranked.length, "Languages used"], [sm.stars, "Stars earned"]]
    .map(([n, l]) => `<div class="stat-box"><b data-count="${n}">0</b><span>${l}</span></div>`).join("");
  observeCounters($("#ghStats"));
  $("#langBar").innerHTML = sm.ranked.map(([l, n]) => `<i title="${GH.esc(l)}" style="width:${n / sm.total * 100}%;background:${GH.color(l)}"></i>`).join("");
  $("#langLegend").innerHTML = sm.ranked.map(([l, n]) => `<span><s style="background:${GH.color(l)}"></s>${GH.esc(l)} · ${Math.round(n / sm.total * 100)}%</span>`).join("");

  const sel = $("#langFilter");
  sel.insertAdjacentHTML("beforeend", sm.ranked.map(([l]) => `<option>${GH.esc(l)}</option>`).join(""));
  function render() {
    const q = $("#repoSearch").value.toLowerCase(), lang = sel.value, sort = $("#repoSort").value;
    let list = repos.filter(r => (!lang || r.language === lang) && (r.name + " " + (r.description || "")).toLowerCase().includes(q));
    if (sort === "stars") list.sort((a, b) => b.stargazers_count - a.stargazers_count);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    grid.innerHTML = list.length ? list.map(GH.repoCard).join("") : '<div class="notice" style="grid-column:1/-1">No repositories match.</div>';
    observeReveal(grid);
  }
  ["input", "change"].forEach(ev => document.querySelector(".controls").addEventListener(ev, render));
  render();
})();
