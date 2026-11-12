(async function () {
  const $ = s => document.querySelector(s), esc = GH.esc, S = window.SITE;
  const d = await (await fetch("data/academics.json")).json();
  const done = d.modules.filter(m => m.mark != null), pending = d.modules.filter(m => m.mark == null);

  $("#aqual").textContent = d.qualification;
  $("#ainst").textContent = `${d.institution} · ${d.nqf} · record dated ${d.asAt}`;
  $("#gpa").dataset.count = d.gpa; $("#gpa").dataset.dec = 2; $("#gpa").dataset.suffix = "%";
  $("#credits").textContent = `${d.creditsEarned} / ${d.creditsTotal}`;
  $("#ring").style.setProperty("--p", Math.round(d.creditsEarned / d.creditsTotal * 100));
  $("#ringPct").textContent = Math.round(d.creditsEarned / d.creditsTotal * 100) + "%";
  $("#modCount").dataset.count = done.length; $("#dist").dataset.count = done.filter(m => m.mark >= 75).length;
  observeCounters();

  $("#bars").innerHTML = d.yearGpa.map(y => `<div class="bar"><b>${y.gpa}</b><i data-h="${(y.gpa - 40) / 40 * 100}"></i><span class="muted">${y.year}</span></div>`).join("");
  requestAnimationFrame(() => setTimeout(() => document.querySelectorAll(".bar i").forEach(i => i.style.height = i.dataset.h + "%"), 100));

  const byCode = Object.fromEntries(d.modules.map(m => [m.code, m]));
  $("#skillGroups").innerHTML = d.skillGroups.map(g => `<div class="card reveal"><h3><i class="fas ${g.icon}"></i>${esc(g.title)}</h3>
    ${g.skills.map(s => `<div class="skill-row"><span>${esc(s.name)} ${s.inProgress ? '<span class="badge warn">in progress</span>' : ""}</span>
    <small>${s.from.map(c => esc(byCode[c]?.name || c)).slice(0, 2).join(" · ")}</small></div>`).join("")}</div>`).join("");

  const years = ["All", ...[...new Set(d.modules.map(m => m.year))]];
  $("#yearFilters").innerHTML = years.map((y, i) => `<button class="chip ${i ? "" : "on"}" data-y="${y}">${y}</button>`).join("");
  const row = m => {
    const status = m.mark == null ? '<span class="badge warn">In progress</span>' : m.mark >= 75 ? '<span class="badge gold">Distinction</span>' : '<span class="badge ok">Passed</span>';
    return `<tr><td>${m.year}</td><td>${esc(m.code)}</td><td>${esc(m.name)}</td><td>${m.credits}</td>${S.showMarks ? `<td>${m.mark ?? "-"}</td>` : ""}<td>${status}</td></tr>`;
  };
  $("#modHead").innerHTML = `<tr><th>Year</th><th>Code</th><th>Module</th><th>Credits</th>${S.showMarks ? "<th>Mark</th>" : ""}<th>Result</th></tr>`;
  const render = y => $("#modBody").innerHTML = d.modules.filter(m => y === "All" || m.year == y).map(row).join("");
  $("#yearFilters").addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    document.querySelectorAll("#yearFilters .chip").forEach(x => x.classList.toggle("on", x === b)); render(b.dataset.y);
  });
  render("All"); observeReveal();
})();
