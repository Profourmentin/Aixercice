document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const u = AIX.getCreateur(id);
  const root = document.getElementById("profile-root");

  if (!u) {
    root.innerHTML = `<div class="container"><div class="empty-state"><h3>Créateur introuvable</h3></div></div>`;
    return;
  }

  const exercices = AIX.getExercicesByCreateur(u.id);
  const playlists = AIX.getPlaylistsByCreateur(u.id);

  root.innerHTML = `
    <header class="profile-head">
      <div class="container">
        <span class="avatar lg" style="width:76px;height:76px;font-size:26px">${AIX.initials(u.nom)}</span>
        <div>
          <h1>${u.nom}</h1>
          <div class="muted">${u.etablissement}</div>
          <div class="profile-stats">
            <span><b>${u.abonnes.toLocaleString("fr-FR")}</b> abonnés</span>
            <span><b>${exercices.length}</b> exercices publiés</span>
            <span><b>${playlists.length}</b> playlist${playlists.length > 1 ? "s" : ""}</span>
          </div>
        </div>
        <button class="follow-btn ${AIX_STORE.isFollowing(u.id) ? "following" : ""}" data-follow="${u.id}" style="margin-left:auto;border-color:var(--chalk);color:var(--chalk)">
          ${AIX_STORE.isFollowing(u.id) ? "Suivi ✓" : "Suivre"}
        </button>
      </div>
    </header>

    <section class="section">
      <div class="container">
        <p style="max-width:62ch;color:var(--ink-soft);margin-bottom:34px">${u.bio}</p>

        ${playlists.length ? `
          <div class="section-head"><h2>Playlists</h2></div>
          <div class="grid grid-2" style="margin-bottom:40px">
            ${playlists.map(aixPlaylistCard).join("")}
          </div>
        ` : ""}

        <div class="section-head"><h2>Exercices publiés</h2></div>
        <div class="grid grid-3">
          ${exercices.map(aixExerciceCard).join("")}
        </div>
      </div>
    </section>
  `;

  const followBtn = root.querySelector(`[data-follow="${u.id}"]`);
  followBtn.addEventListener("click", () => {
    const now = AIX_STORE.toggleFollow(u.id);
    followBtn.classList.toggle("following", now);
    followBtn.textContent = now ? "Suivi ✓" : "Suivre";
  });
  aixWireFollowButtons(root.querySelector(".section"));
});
