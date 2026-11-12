// Theme, nav, progress bar, reveal animations, typed text, counters
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} }
  };

  // Theme (defaults to system preference)
  const saved = store.get("theme");
  const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.classList.toggle("dark", dark);
  const toggle = $("#darkModeToggle");
  const icon = () => toggle && (toggle.innerHTML = `<i class="fas fa-${document.body.classList.contains("dark") ? "sun" : "moon"}"></i>`);
  icon();
  toggle && toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    store.set("theme", document.body.classList.contains("dark") ? "dark" : "light");
    icon();
  });

  // Mobile menu
  const menu = $("#navLinks");
  $("#menuBtn")?.addEventListener("click", () => menu.classList.toggle("open"));
  menu?.addEventListener("click", e => e.target.matches("a") && menu.classList.remove("open"));

  // Progress bar + back to top
  const bar = $("#progress"), top = $("#toTop");
  addEventListener("scroll", () => {
    const h = document.documentElement;
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100 + "%";
    top.classList.toggle("show", h.scrollTop > 600);
  }, { passive: true });
  top?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  // Reveal on scroll
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .1, rootMargin: "0px 0px -40px 0px" });
  window.observeReveal = (root = document) => root.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
  observeReveal();

  // Typed roles
  const typed = $("#typed");
  if (typed) {
    const words = JSON.parse(typed.dataset.words);
    let w = 0, c = 0, del = false;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) typed.textContent = words[0];
    else (function tick() {
      const word = words[w];
      typed.textContent = word.slice(0, c);
      if (!del && c++ === word.length) { del = true; return setTimeout(tick, 1400); }
      if (del && --c === 0) { del = false; w = (w + 1) % words.length; }
      setTimeout(tick, del ? 35 : 70);
    })();
  }

  // Animated counters  (<b data-count="63.46" data-dec="2" data-suffix="%">)
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, dec = +(el.dataset.dec || 0), suf = el.dataset.suffix || "";
    const t0 = performance.now();
    (function step(t) {
      const p = Math.min((t - t0) / 1100, 1);
      el.textContent = (end * (1 - Math.pow(1 - p, 3))).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
    cio.unobserve(el);
  }), { threshold: .5 });
  window.observeCounters = (root = document) => root.querySelectorAll("[data-count]").forEach(el => cio.observe(el));
  observeCounters();
})();
