document.addEventListener("DOMContentLoaded", () => {
  // Recherche du hero
  document.getElementById("hero-search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("hero-search-input").value.trim();
    window.location.href = "catalogue.html" + (q ? `?q=${encodeURIComponent(q)}` : "");
  });

  // Chips de compétences populaires
  const popularComp = ["c2-1", "c2-3", "c1-1", "c3-1"];
  document.getElementById("hero-chips").innerHTML = popularComp
    .map(id => AIX.getCompetence(id))
    .map(c => `<a class="hero-chip" href="catalogue.html?competence=${c.id}">${c.nom}</a>`)
    .join("");

  // Créateurs
  document.getElementById("creators-rail").innerHTML =
    AIX.data.createurs.map(aixCreatorCard).join("");
  aixWireFollowButtons(document.getElementById("creators-rail"));

  // Exercices tendance (thème Mouvement et interactions)
  const trending = AIX.searchExercices({ themeIds: ["t2"] }).slice(0, 6);
  document.getElementById("trending-grid").innerHTML = trending.map(aixExerciceCard).join("");

  // Playlists
  document.getElementById("playlists-grid").innerHTML =
    AIX.data.playlists.map(aixPlaylistCard).join("");
});
