/* =========================================================================
   Magic Import — SIMULATION pour cette V1.
   Aucune analyse d'image réelle n'est effectuée : on affiche un exemple fixe
   de ce que rendrait le pipeline (vision → JSON structuré → suggestion de
   compétences), pour démontrer le flux de relecture avant publication.
   À remplacer par un vrai appel à un modèle de vision (voir specs, section 6).
   ========================================================================= */

const IMPORT_SAMPLE = {
  titreExtrait: "Chute d'une bille dans l'huile",
  enonceExtrait: `Une bille d'acier est lâchée sans vitesse initiale dans un tube rempli d'huile.
Elle parcourt 18 cm en 3 s à vitesse constante (régime permanent).
1) Calculer la vitesse de la bille.
2) Convertir cette vitesse en km/h.`,
  suggestions: ["c2-1", "c2-3"],
  confiance: "manuscrit — confiance modérée, à vérifier ligne à ligne",
};

document.addEventListener("DOMContentLoaded", () => {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("file-input");
  const dropzoneContent = document.getElementById("dropzone-content");
  const submitBtn = document.getElementById("import-submit");
  const resultBox = document.getElementById("import-result");
  let hasImage = false;

  dropzone.addEventListener("click", () => fileInput.click());
  dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("drag"); });
  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("drag"));
  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("drag");
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener("change", () => {
    if (fileInput.files[0]) handleFile(fileInput.files[0]);
  });

  function handleFile(file) {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    dropzoneContent.innerHTML = `<img src="${url}" alt="Photo de l'exercice">`;
    hasImage = true;
    submitBtn.disabled = false;
  }

  submitBtn.addEventListener("click", () => {
    if (!hasImage) return;
    submitBtn.disabled = true;
    resultBox.classList.remove("ready");
    resultBox.innerHTML = `
      <div class="placeholder">
        <p style="margin-bottom:10px">Extraction du texte et des formules…</p>
        <span class="loading-dots"><span></span><span></span><span></span></span>
      </div>
    `;

    setTimeout(() => {
      resultBox.classList.add("ready");
      const comps = IMPORT_SAMPLE.suggestions.map(AIX.getCompetence);
      resultBox.innerHTML = `
        <span class="demo-badge">Extraction simulée — exemple de démonstration</span>
        <div class="notice" style="margin-top:14px">
          Confiance de l'extraction : ${IMPORT_SAMPLE.confiance}. Relis chaque ligne avant de publier.
        </div>

        <div class="form-row">
          <label for="imp-titre">Titre détecté</label>
          <input type="text" id="imp-titre" value="${IMPORT_SAMPLE.titreExtrait}">
        </div>
        <div class="form-row">
          <label for="imp-enonce">Texte extrait (modifiable)</label>
          <textarea id="imp-enonce" rows="7" style="width:100%;padding:10px 12px;border:1.5px solid var(--line-strong);border-radius:var(--radius-sm);font-family:var(--font-body);font-size:14.5px;background:var(--paper)">${IMPORT_SAMPLE.enonceExtrait}</textarea>
        </div>

        <div class="form-row">
          <label>Compétences suggérées</label>
          <div class="chip-group">
            ${comps.map(c => `<span class="chip-filter active">${c.nom}</span>`).join("")}
          </div>
        </div>

        <div style="display:flex;gap:10px;margin-top:6px">
          <button class="btn btn-ghost" disabled title="Désactivé dans cette démonstration">Publier dans le catalogue</button>
          <button class="btn btn-ghost btn-sm" id="imp-reset">Recommencer</button>
        </div>
      `;

      document.getElementById("imp-reset").addEventListener("click", () => {
        dropzoneContent.innerHTML = `
          <p style="margin-bottom:6px;font-weight:600;color:var(--ink-soft)">Clique pour choisir une image</p>
          <p style="font-size:13px">ou dépose-la ici — JPG, PNG</p>
        `;
        hasImage = false;
        fileInput.value = "";
        submitBtn.disabled = true;
        resultBox.classList.remove("ready");
        resultBox.innerHTML = `<div class="placeholder">Le texte structuré extrait de la photo apparaîtra ici, prêt à être relu.</div>`;
      });

      submitBtn.disabled = false;
    }, 1100);
  });
});
