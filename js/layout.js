// Injects the shared navbar + footer so every page stays in sync.
(function () {
  const S = window.SITE;
  const page = location.pathname.split("/").pop() || "index.html";
  const links = [
    ["index.html", "Home"], ["academics.html", "Academics"], ["projects.html", "Projects"],
    ["certificates.html", "Certificates"], ["contact.html", "Contact"]
  ];
  const nav = links.map(([h, t]) =>
    `<li><a href="${h}" class="nav-link ${page === h ? "active" : ""}">${t}</a></li>`).join("");

  document.body.insertAdjacentHTML("afterbegin", `
    <a class="skip" href="#main">Skip to content</a><div id="progress"></div>
    <nav class="navbar" aria-label="Main"><div class="nav-container">
      <a class="logo" href="index.html"><span class="logo-text">${S.brand}</span><span class="logo-dot"></span></a>
      <ul class="nav-links" id="navLinks">${nav}</ul>
      <div class="nav-actions">
        <button class="download-cv-btn" id="downloadCVBtn"><i class="fas fa-download"></i><span>Download CV</span></button>
        <button class="theme-toggle" id="darkModeToggle" aria-label="Toggle dark mode"><i class="fas fa-moon"></i></button>
        <button class="mobile-menu-btn" id="menuBtn" aria-label="Menu"><i class="fas fa-bars"></i></button>
      </div></div></nav>`);

  document.body.insertAdjacentHTML("beforeend", `
    <button id="toTop" aria-label="Back to top"><i class="fas fa-arrow-up"></i></button>
    <footer class="footer"><div class="container">
      <div class="footer-content">
        <div><span class="logo-text" style="font-size:1.3rem">${S.name}</span>
          <p class="muted">Aspiring Data Analyst &amp; Front-End Developer<br>North-West University</p></div>
        <div class="footer-links">${links.map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}</div>
        <div class="footer-social">
          <a href="${S.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a href="https://github.com/${S.github}" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github"></i></a>
          <a href="mailto:${S.email}" aria-label="Email"><i class="fas fa-envelope"></i></a>
        </div>
      </div>
      <div class="footer-bottom"><p>&copy; ${new Date().getFullYear()} ${S.name}. All rights reserved.</p></div>
    </div></footer>`);
})();
