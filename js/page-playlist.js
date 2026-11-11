document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const pl = AIX.getPlaylist(id);
  const root = document.getElementById("playlist-root");

  if (!pl) {
    root.innerHTML = `<div class="empty-state"><h3>Playlist introuvable</h3></div>`;
    return;
  }

  const createur = AIX.getCreateur(pl.createurId);

  function render() {
    const items = AIX.getPlaylistExercices(pl.id);
    const doneCount = items.filter(e => AIX_STORE.isDone(e.id)).length;
    const pct = items.length ? Math.round((doneCount / items.length) * 100) : 0;

    root.innerHTML = `
      <div class="playlist-head">
        <h1>${pl.titre}</h1>
        <p class="lede">${pl.description}</p>
        <a class="creator-chip" href="createur.html?id=${createur.id}" style="margin-top:14px;display:inline-flex">
          <span class="avatar">${AIX.initials(createur.nom)}</span>
          ${createur.nom}
        </a>
        <div class="playlist-progress-bar"><div style="width:${pct}%"></div></div>
        <div style="font-size:13.5px;color:var(--ink-faint)">${doneCount} / ${items.length} exercices faits</div>
      </div>

      <div class="playlist-list">
        ${items.map((ex, i) => `
          <div class="playlist-row ${AIX_STORE.isDone(ex.id) ? "done" : ""}">
            <span class="pr-num">${i + 1}</span>
            <button class="pr-check" data-toggle="${ex.id}" aria-label="Marquer comme fait">✓</button>
            <div class="pr-main">
              <h4><a href="exercice.html?id=${ex.id}">${ex.titre}</a></h4>
              <div class="ex-meta">
                ${aixTypeTag(ex.type)}
                ${aixDifficultyDots(ex.difficulte)}
                <span>${ex.duree} min</span>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    root.querySelectorAll("[data-toggle]").forEach(btn => {
      btn.addEventListener("click", () => {
        AIX_STORE.toggleDone(btn.dataset.toggle);
        render();
      });
    });
  }

  render();
});
