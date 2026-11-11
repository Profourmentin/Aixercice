document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const state = {
    q: params.get("q") || "",
    themeIds: [],
    competenceIds: params.get("competence") ? [params.get("competence")] : [],
    types: [],
    difficultes: [],
  };

  // Pré-déplie le thème contenant la compétence passée en paramètre
  function themeForCompetence(compId) {
    const c = AIX.getCompetence(compId);
    return c ? c.themeId : null;
  }

  function renderFacetThemes() {
    const preOpenTheme = state.competenceIds.length ? themeForCompetence(state.competenceIds[0]) : null;
    document.getElementById("facet-themes").innerHTML = AIX.data.themes.map(theme => {
      const comps = AIX.getCompetencesByTheme(theme.id);
      const open = theme.id === preOpenTheme ? "open" : "";
      return `
        <details class="facet-theme" ${open}>
          <summary>
            <span class="theme-dot" style="background:${theme.couleur}"></span>
            ${theme.nom}
          </summary>
          ${comps.map(c => `
            <label class="facet-comp">
              <input type="checkbox" value="${c.id}" data-facet="competence" ${state.competenceIds.includes(c.id) ? "checked" : ""}>
              ${c.nom}
            </label>
          `).join("")}
        </details>
      `;
    }).join("");

    document.querySelectorAll('[data-facet="competence"]').forEach(cb => {
      cb.addEventListener("change", () => {
        const id = cb.value;
        if (cb.checked) state.competenceIds.push(id);
        else state.competenceIds = state.competenceIds.filter(x => x !== id);
        render();
      });
    });
  }

  function renderFacetTypes() {
    const types = [
      { id: "qcm", label: "QCM" },
      { id: "calcul", label: "Calcul" },
      { id: "redaction", label: "Rédaction" },
    ];
    document.getElementById("facet-types").innerHTML = types.map(t => `
      <button class="chip-filter ${state.types.includes(t.id) ? "active" : ""}" data-type="${t.id}">${t.label}</button>
    `).join("");
    document.querySelectorAll("[data-type]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.type;
        if (state.types.includes(id)) state.types = state.types.filter(x => x !== id);
        else state.types.push(id);
        render();
      });
    });
  }

  function renderFacetDifficulty() {
    document.getElementById("facet-difficulty").innerHTML = [1, 2, 3, 4, 5].map(n => `
      <button class="chip-filter ${state.difficultes.includes(n) ? "active" : ""}" data-diff="${n}">${n}</button>
    `).join("");
    document.querySelectorAll("[data-diff]").forEach(btn => {
      btn.addEventListener("click", () => {
        const n = parseInt(btn.dataset.diff);
        if (state.difficultes.includes(n)) state.difficultes = state.difficultes.filter(x => x !== n);
        else state.difficultes.push(n);
        render();
      });
    });
  }

  function activeFilterPills() {
    const pills = [];
    if (state.q) pills.push({ label: `« ${state.q} »`, clear: () => { state.q = ""; } });
    state.competenceIds.forEach(id => {
      const c = AIX.getCompetence(id);
      pills.push({ label: c.nom, clear: () => { state.competenceIds = state.competenceIds.filter(x => x !== id); } });
    });
    state.types.forEach(id => {
      pills.push({ label: AIX.TYPE_LABELS[id], clear: () => { state.types = state.types.filter(x => x !== id); } });
    });
    state.difficultes.forEach(n => {
      pills.push({ label: `Difficulté ${n}`, clear: () => { state.difficultes = state.difficultes.filter(x => x !== n); } });
    });
    return pills;
  }

  function render() {
    const results = AIX.searchExercices(state);

    // Résultats
    document.getElementById("results-grid").innerHTML = results.map(aixExerciceCard).join("");
    document.getElementById("empty-state").style.display = results.length ? "none" : "block";
    document.getElementById("results-grid").style.display = results.length ? "grid" : "none";
    document.getElementById("results-count").textContent =
      `${results.length} exercice${results.length > 1 ? "s" : ""} trouvé${results.length > 1 ? "s" : ""}`;

    // Filtres actifs
    const pills = activeFilterPills();
    document.getElementById("active-filters").innerHTML = pills.map((p, i) => `
      <span class="active-filter-pill">${p.label}<button data-pill="${i}" aria-label="Retirer ce filtre">×</button></span>
    `).join("");
    document.querySelectorAll("[data-pill]").forEach(btn => {
      btn.addEventListener("click", () => {
        pills[parseInt(btn.dataset.pill)].clear();
        render();
      });
    });
    document.getElementById("reset-filters").style.display = pills.length ? "inline-flex" : "none";

    renderFacetTypes();
    renderFacetDifficulty();
  }

  document.getElementById("reset-filters").addEventListener("click", () => {
    state.q = ""; state.themeIds = []; state.competenceIds = []; state.types = []; state.difficultes = [];
    render();
  });

  renderFacetThemes();
  render();
});
