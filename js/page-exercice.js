document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const ex = AIX.getExercice(id);
  const root = document.getElementById("ex-detail-root");

  if (!ex) {
    root.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <h3>Exercice introuvable</h3>
        <p>Il a peut-être été retiré. <a href="catalogue.html" style="color:var(--pen-blue)">Retour au catalogue</a>.</p>
      </div>
    `;
    return;
  }

  const theme = AIX.getTheme(ex.themeId);
  const createur = AIX.getCreateur(ex.createurId);
  const competences = ex.competenceIds.map(AIX.getCompetence);
  const done = AIX_STORE.isDone(ex.id);

  const questionsHtml = ex.questions && ex.questions.length
    ? `<ol class="questions">${ex.questions.map(q => `<li>${q}</li>`).join("")}</ol>`
    : "";

  const playlistBlock = ex.playlistId ? (() => {
    const pl = AIX.getPlaylist(ex.playlistId);
    const items = AIX.getPlaylistExercices(pl.id);
    return `
      <div class="side-card">
        <h4>Playlist : ${pl.titre}</h4>
        <div class="playlist-nav">
          ${items.map(item => `
            <a class="playlist-nav-item ${item.id === ex.id ? "current" : ""} ${AIX_STORE.isDone(item.id) ? "done" : ""}" href="exercice.html?id=${item.id}">
              <span class="pn-check">${AIX_STORE.isDone(item.id) ? "✓" : ""}</span>
              ${item.titre}
            </a>
          `).join("")}
        </div>
      </div>
    `;
  })() : "";

  root.innerHTML = `
    <article class="ex-statement">
      <div class="statement-label">${theme.nom}</div>
      <h1>${ex.titre}</h1>
      <div class="ex-meta" style="margin-bottom:22px">
        ${aixTypeTag(ex.type)}
        ${aixDifficultyDots(ex.difficulte)}
        <span>${ex.duree} min</span>
      </div>
      <div class="statement-body">
        ${ex.enonce}
        ${questionsHtml}
      </div>

      <div class="correction-toggle">
        <button class="btn btn-ghost" id="toggle-correction">Afficher la correction</button>
        <div class="correction-body" id="correction-body">${ex.correction}</div>
      </div>
    </article>

    <aside class="ex-side">
      <div class="side-card">
        <h4>Créateur</h4>
        <div class="cc-head" style="margin-bottom:12px">
          <span class="avatar lg">${AIX.initials(createur.nom)}</span>
          <div>
            <div style="font-weight:600;font-size:15px"><a href="createur.html?id=${createur.id}">${createur.nom}</a></div>
            <div style="font-size:13px;color:var(--ink-faint)">${createur.etablissement}</div>
          </div>
        </div>
        <button class="follow-btn ${AIX_STORE.isFollowing(createur.id) ? "following" : ""}" data-follow="${createur.id}" style="width:100%">
          ${AIX_STORE.isFollowing(createur.id) ? "Suivi ✓" : "Suivre"}
        </button>
      </div>

      <div class="side-card">
        <h4>Compétences travaillées</h4>
        <div class="comp-list">
          ${competences.map(c => `<a href="catalogue.html?competence=${c.id}">${c.nom}</a>`).join("")}
        </div>
      </div>

      <div class="side-card">
        <h4>Progression</h4>
        <button class="btn ${done ? "btn-primary" : "btn-ghost"}" id="toggle-done" style="width:100%">
          ${done ? "✓ Exercice fait" : "Marquer comme fait"}
        </button>
      </div>

      ${playlistBlock}
    </aside>
  `;

  document.getElementById("toggle-correction").addEventListener("click", () => {
    const body = document.getElementById("correction-body");
    const btn = document.getElementById("toggle-correction");
    const visible = body.classList.toggle("visible");
    btn.textContent = visible ? "Masquer la correction" : "Afficher la correction";
    if (window.MathJax && window.MathJax.typesetPromise) window.MathJax.typesetPromise([body]);
  });

  document.getElementById("toggle-done").addEventListener("click", () => {
    const now = AIX_STORE.toggleDone(ex.id);
    const btn = document.getElementById("toggle-done");
    btn.classList.toggle("btn-primary", now);
    btn.classList.toggle("btn-ghost", !now);
    btn.textContent = now ? "✓ Exercice fait" : "Marquer comme fait";
  });

  aixWireFollowButtons(root);

  if (window.MathJax && window.MathJax.typesetPromise) window.MathJax.typesetPromise();
});
