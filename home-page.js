(async function () {
  const grid = document.querySelector("#featuredRepos");
  if (!grid) return;
  try {
    const repos = (await GH.getRepos()).slice(0, 3);
    grid.innerHTML = repos.length ? repos.map(GH.repoCard).join("") : '<div class="notice" style="grid-column:1/-1">Repositories will appear here as soon as you publish them on GitHub.</div>';
    observeReveal(grid);
  } catch (e) {
    grid.innerHTML = `<div class="notice" style="grid-column:1/-1">${GH.esc(e.message)} <a href="projects.html" style="color:var(--highlight)">See all projects</a></div>`;
  }
})();
