/* Petite flèche "remonter en haut", centrée en bas de page.
   Apparaît après un peu de défilement. */
(function () {
  const st = document.createElement("style");
  st.textContent = `
  .haut-page{position:fixed;left:50%;bottom:22px;z-index:29;width:46px;height:46px;border-radius:50%;cursor:pointer;
    display:grid;place-items:center;color:#f2b45a;background:rgba(13,18,32,.75);border:1px solid rgba(242,180,90,.55);
    backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);box-shadow:0 10px 26px -10px rgba(0,0,0,.7);
    opacity:0;pointer-events:none;transform:translate(-50%,12px);transition:opacity .25s,transform .25s,background .15s,color .15s}
  .haut-page.visible{opacity:1;pointer-events:auto;transform:translate(-50%,0)}
  .haut-page:hover{background:#f2b45a;color:#0d1220;transform:translate(-50%,-3px)}
  .haut-page svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
  footer{padding-bottom:96px !important}
  @media (prefers-reduced-motion:reduce){.haut-page{transition:none}}`;
  document.head.appendChild(st);

  const b = document.createElement("button");
  b.type = "button";
  b.className = "haut-page";
  b.setAttribute("aria-label", "Remonter en haut de la page");
  b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  b.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(b);

  const maj = () => b.classList.toggle("visible", window.scrollY > 400);
  window.addEventListener("scroll", maj, { passive: true });
  maj();
})();
