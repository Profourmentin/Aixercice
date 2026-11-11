/* =========================================================================
   AIxercice — en-tête / pied de page communs à toutes les pages
   Injectés dans <div id="site-header"></div> et <div id="site-footer"></div>.
   La page courante est signalée par <body data-page="...">.
   ========================================================================= */

function aixRenderNav() {
  const page = document.body.dataset.page || "";
  const header = document.getElementById("site-header");
  if (!header) return;

  const links = [
    { href: "catalogue.html", label: "Catalogue", key: "catalogue" },
    { href: "generateur.html", label: "Générateur IA", key: "generateur" },
    { href: "import.html", label: "Magic Import", key: "import" },
  ];

  header.innerHTML = `
    <nav class="site-nav">
      <div class="container">
        <a href="index.html" class="brand">AI<span class="brand-ai">xercice</span></a>
        <form class="nav-search" id="nav-search-form">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input type="text" id="nav-search-input" placeholder="Rechercher une compétence, un exercice…" autocomplete="off">
        </form>
        <div class="nav-links">
          ${links.map(l => `<a href="${l.href}" class="${l.key === page ? "active" : ""}">${l.label}</a>`).join("")}
          <button type="button" class="nav-cta" id="nav-cta-btn">Devenir créateur</button>
        </div>
      </div>
    </nav>
  `;

  const form = document.getElementById("nav-search-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("nav-search-input").value.trim();
    window.location.href = "catalogue.html" + (q ? `?q=${encodeURIComponent(q)}` : "");
  });

  document.getElementById("nav-cta-btn").addEventListener("click", () => {
    alert("L'espace créateur (publication d'exercices, génération IA illimitée, statistiques) arrive dans une prochaine version. Cette V1 se concentre sur la recherche et la consultation.");
  });
}

function aixRenderFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <span>AIxercice — version de démonstration (V1), données d'exemple.</span>
        <span class="footer-links"><a href="index.html">Accueil</a><a href="catalogue.html">Catalogue</a><a href="generateur.html">Générateur IA</a><a href="import.html">Magic Import</a></span>
      </div>
    </footer>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  aixRenderNav();
  aixRenderFooter();
});
