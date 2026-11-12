// Live GitHub data (public API, no token needed). Cached 10 min to respect the rate limit.
(function () {
  const S = window.SITE, API = "https://api.github.com";
  const COLORS = { JavaScript: "#f1e05a", HTML: "#e34c26", CSS: "#563d7c", Python: "#3572A5", Java: "#b07219", "C#": "#178600", "C++": "#f34b7d", TypeScript: "#3178c6", SQL: "#e38c00", PLpgSQL: "#336790", Jupyter: "#DA5B0B", "Jupyter Notebook": "#DA5B0B", Shell: "#89e051", PHP: "#4F5D95" };
  const color = l => COLORS[l] || "#8b8f98";
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ago = d => { const m = (Date.now() - new Date(d)) / 6e4; if (m < 60) return `${Math.max(1, m | 0)}m ago`; if (m < 1440) return `${m / 60 | 0}h ago`; const dd = m / 1440 | 0; return dd < 31 ? `${dd}d ago` : dd < 365 ? `${dd / 30 | 0}mo ago` : `${dd / 365 | 0}y ago`; };

  async function getRepos() {
    const key = "gh-repos-all-" + S.github;
    try { const c = JSON.parse(localStorage.getItem(key)); if (c && Date.now() - c.t < 6e5) return c.d; } catch {}
    let data = [];
    try {
      // Live: every public repo (paginated), including forks and archived ones
      for (let page = 1; page <= 10; page++) {
        const r = await fetch(`${API}/users/${S.github}/repos?per_page=100&page=${page}&sort=pushed`, { headers: { Accept: "application/vnd.github+json" } });
        if (!r.ok) throw new Error("GitHub returned " + r.status);
        const batch = await r.json(); data = data.concat(batch);
        if (batch.length < 100) break;
      }
    } catch (e) {
      // Fallback: the daily snapshot written by the GitHub Action (avoids rate limits)
      const r = await fetch("data/repos.json?v=" + Date.now()).catch(() => null);
      const snap = r && r.ok ? await r.json() : null;
      if (!snap || !snap.length) throw new Error("Could not reach GitHub right now - try again shortly.");
      data = snap;
    }
    data = data.filter(x => !S.hiddenRepos.includes(x.name));
    data.sort((a, b) => (S.pinnedRepos.includes(b.name) - S.pinnedRepos.includes(a.name)) || new Date(b.pushed_at) - new Date(a.pushed_at));
    try { localStorage.setItem(key, JSON.stringify({ t: Date.now(), d: data })); } catch {}
    return data;
  }

  function repoCard(r) {
    const live = r.homepage ? `<a href="${esc(r.homepage)}" target="_blank" rel="noopener"><i class="fas fa-up-right-from-square"></i> Live</a>` : "";
    const topics = (r.topics || []).slice(0, 4).map(t => `<span class="badge">${esc(t)}</span>`).join("");
    return `<article class="card repo reveal">
      <h3><i class="far fa-folder-open" style="color:var(--highlight)"></i><a href="${esc(r.html_url)}" target="_blank" rel="noopener">${esc(r.name)}</a></h3>
      <p>${esc(r.description || "No description yet.")}</p>
      ${(topics || r.fork || r.archived) ? `<div class="badges">${r.fork ? '<span class="badge warn">fork</span>' : ""}${r.archived ? '<span class="badge">archived</span>' : ""}${topics}</div>` : ""}
      <div class="repo-meta">
        ${r.language ? `<span><s style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color(r.language)};margin-right:5px"></s>${esc(r.language)}</span>` : ""}
        <span><i class="far fa-star"></i> ${r.stargazers_count}</span>
        <span><i class="fas fa-code-branch"></i> ${r.forks_count}</span>
        <span>Updated ${ago(r.pushed_at)}</span></div>
      <div class="repo-links"><a href="${esc(r.html_url)}" target="_blank" rel="noopener"><i class="fab fa-github"></i> Code</a>${live}</div>
    </article>`;
  }

  function summary(repos) {
    const langs = {}; repos.forEach(r => r.language && (langs[r.language] = (langs[r.language] || 0) + 1));
    const total = Object.values(langs).reduce((a, b) => a + b, 0) || 1;
    const ranked = Object.entries(langs).sort((a, b) => b[1] - a[1]);
    return { ranked, total, stars: repos.reduce((a, r) => a + r.stargazers_count, 0) };
  }

  window.GH = { getRepos, repoCard, summary, color, esc };
})();
