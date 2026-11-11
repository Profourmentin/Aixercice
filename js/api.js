/* =========================================================================
   AIxercice — couche d'accès aux données (V1 : lit window.AIX_DATA en mémoire)
   À remplacer par de vrais appels réseau (REST/GraphQL) quand le backend
   existera — l'interface de ces fonctions peut rester la même.
   ========================================================================= */

const AIX = (() => {
  const D = window.AIX_DATA;

  const getTheme = (id) => D.themes.find(t => t.id === id);
  const getCompetence = (id) => D.competences.find(c => c.id === id);
  const getCompetencesByTheme = (themeId) => D.competences.filter(c => c.themeId === themeId);
  const getCreateur = (id) => D.createurs.find(u => u.id === id);
  const getExercice = (id) => D.exercices.find(e => e.id === id);
  const getPlaylist = (id) => D.playlists.find(p => p.id === id);

  const getPlaylistExercices = (playlistId) =>
    D.exercices
      .filter(e => e.playlistId === playlistId)
      .sort((a, b) => a.playlistIndex - b.playlistIndex);

  const getExercicesByCreateur = (createurId) =>
    D.exercices.filter(e => e.createurId === createurId);

  const getPlaylistsByCreateur = (createurId) =>
    D.playlists.filter(p => p.createurId === createurId);

  function initials(nom) {
    return nom.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  }

  /**
   * Recherche facettée sur les exercices.
   * filters = { q, themeIds: [], competenceIds: [], types: [], difficultes: [], createurId }
   */
  function searchExercices(filters = {}) {
    let results = [...D.exercices];

    if (filters.q && filters.q.trim()) {
      const q = filters.q.trim().toLowerCase();
      results = results.filter(e => {
        const comps = e.competenceIds.map(getCompetence).map(c => c.nom.toLowerCase()).join(" ");
        return e.titre.toLowerCase().includes(q) || comps.includes(q);
      });
    }
    if (filters.themeIds && filters.themeIds.length) {
      results = results.filter(e => filters.themeIds.includes(e.themeId));
    }
    if (filters.competenceIds && filters.competenceIds.length) {
      results = results.filter(e => e.competenceIds.some(c => filters.competenceIds.includes(c)));
    }
    if (filters.types && filters.types.length) {
      results = results.filter(e => filters.types.includes(e.type));
    }
    if (filters.difficultes && filters.difficultes.length) {
      results = results.filter(e => filters.difficultes.includes(e.difficulte));
    }
    if (filters.createurId) {
      results = results.filter(e => e.createurId === filters.createurId);
    }
    return results;
  }

  const TYPE_LABELS = { qcm: "QCM", calcul: "Calcul", redaction: "Rédaction" };

  return {
    data: D,
    getTheme, getCompetence, getCompetencesByTheme, getCreateur, getExercice, getPlaylist,
    getPlaylistExercices, getExercicesByCreateur, getPlaylistsByCreateur,
    searchExercices, initials, TYPE_LABELS,
  };
})();
