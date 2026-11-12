document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  location.href = "mailto:" + SITE.email + "?subject=" + encodeURIComponent(f.get("subject") || "Portfolio enquiry from " + f.get("name")) +
    "&body=" + encodeURIComponent(f.get("message") + "\n\n- " + f.get("name") + " (" + f.get("email") + ")");
});
