// "Download CV" serves your own CV file: assets/Phetho_Tsoeu_CV.docx
// To update your CV later, replace that file (keep the same name).
document.addEventListener("click", e => {
  if (!e.target.closest("#downloadCVBtn, #heroDownloadBtn")) return;
  const a = document.createElement("a");
  a.href = "assets/Phetho_Tsoeu_CV.docx";
  a.download = "Phetho_Tsoeu_CV.docx";
  document.body.appendChild(a); a.click(); a.remove();
});
