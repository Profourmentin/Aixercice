/* =========================================================================
   AIxercice — gabarits de cartes réutilisés sur plusieurs pages
   ========================================================================= */

function aixDifficultyDots(n) {
  let dots = "";
  for (let i = 1; i <= 5; i++) dots += `<span class="${i <= n ? "on" : ""}"></span>`;
  return `<span class="difficulty" title="Difficulté ${n}/5">${dots}</span>`;
}

function aixTypeTag(type) {
  const label = AIX.TYPE_LABELS[type] || type;
  return `<span class="tag tag-${type}">${label}</span>`;
}

function aixExerciceCard(ex) {
  const theme = AIX.getTheme(ex.themeId);
  const comp = AIX.getCompetence(ex.competenceIds[0]);
  const createur = AIX.getCreateur(ex.createurId);
  return `
    <article class="ex-card">
      <div class="breadcrumb">
        <span style="color:${theme.couleur}">${theme.nom}</span>
        <span class="sep">›</span>
        <span>${comp.nom}</span>
      </div>
      <h3><a href="exercice.html?id=${ex.id}">${ex.titre}</a></h3>
      <div class="ex-meta">
        ${aixTypeTag(ex.type)}
        ${aixDifficultyDots(ex.difficulte)}
        <span>${ex.duree} min</span>
      </div>
      <div class="ex-foot">
        <a class="creator-chip" href="createur.html?id=${createur.id}">
          <span class="avatar">${AIX.initials(createur.nom)}</span>
          ${createur.nom}
        </a>
      </div>
    </article>
  `;
}

function aixCreatorCard(u) {
  const following = AIX_STORE.isFollowing(u.id);
  return `
    <div class="creator-card">
      <div class="cc-head">
        <span class="avatar lg">${AIX.initials(u.nom)}</span>
        <div>
          <h4><a href="createur.html?id=${u.id}">${u.nom}</a></h4>
          <div class="cc-sub">${u.abonnes.toLocaleString("fr-FR")} abonnés</div>
        </div>
      </div>
      <p>${u.bio}</p>
      <button class="follow-btn ${following ? "following" : ""}" data-follow="${u.id}">
        ${following ? "Suivi ✓" : "Suivre"}
      </button>
    </div>
  `;
}

function aixPlaylistCard(pl) {
  const createur = AIX.getCreateur(pl.createurId);
  const exs = AIX.getPlaylistExercices(pl.id);
  const done = exs.filter(e => AIX_STORE.isDone(e.id)).length;
  return `
    <article class="ex-card">
      <div class="breadcrumb"><span>Série de ${exs.length} exercices</span></div>
      <h3><a href="playlist.html?id=${pl.id}">${pl.titre}</a></h3>
      <p style="font-size:13.5px;color:var(--ink-soft)">${pl.description}</p>
      <div class="ex-foot">
        <a class="creator-chip" href="createur.html?id=${createur.id}">
          <span class="avatar">${AIX.initials(createur.nom)}</span>
          ${createur.nom}
        </a>
        ${done > 0 ? `<span style="font-size:12.5px;color:var(--pen-green);font-weight:600">${done}/${exs.length} faits</span>` : ""}
      </div>
    </article>
  `;
}

function aixWireFollowButtons(root = document) {
  root.querySelectorAll("[data-follow]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.follow;
      const now = AIX_STORE.toggleFollow(id);
      btn.classList.toggle("following", now);
      btn.textContent = now ? "Suivi ✓" : "Suivre";
    });
  });
}
