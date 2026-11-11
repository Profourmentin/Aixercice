/* =========================================================================
   Générateur d'exercices IA — SIMULATION pour cette V1.
   Aucun appel à un modèle n'est effectué : un petit jeu de scénarios
   paramétrés imite ce que produirait un pipeline RAG (retrieval sur les
   exercices existants de la compétence, puis génération). À remplacer par
   un vrai appel API (voir specs, section 5) quand le backend existera.
   ========================================================================= */

function fmtFR(x) {
  const r = Math.round(x * 100) / 100;
  return (Number.isInteger(r) ? String(r) : r.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")).replace(".", ",");
}
function choice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const GEN_SCENARIOS = {
  "c1-1": () => {
    const cm = choice([24, 32, 40, 48, 60]);
    const F = choice([2, 4, 5, 10]);
    const cf = cm / F;
    const Vf = choice([100, 200, 250, 500]);
    const Vm = Vf / F;
    return {
      titre: `Préparer une solution diluée à ${fmtFR(cf)} g/L`,
      statement: `<p>On dispose d'une solution mère de concentration en masse \\( c_m = ${fmtFR(cm)}\\,\\text{g/L} \\).
        On souhaite préparer un volume \\( V_f = ${fmtFR(Vf)}\\,\\text{mL} \\) d'une solution fille de
        concentration \\( c_f = ${fmtFR(cf)}\\,\\text{g/L} \\).</p>`,
      question: `Calculer le facteur de dilution \\( F \\), puis le volume \\( V_m \\) de solution mère à prélever.`,
      correction: `<p>\\( F = \\dfrac{c_m}{c_f} = \\dfrac{${fmtFR(cm)}}{${fmtFR(cf)}} = ${fmtFR(F)} \\).</p>
        <p>\\( V_m = \\dfrac{V_f}{F} = \\dfrac{${fmtFR(Vf)}}{${fmtFR(F)}} = ${fmtFR(Vm)}\\,\\text{mL} \\).</p>`,
    };
  },
  "c1-2": () => {
    const reac = choice([
      { eq: "C_3H_8 + 5\\,O_2 \\rightarrow 3\\,CO_2 + 4\\,H_2O", reactifs: ["le propane (C₃H₈)", "le dioxygène (O₂)"], produits: ["le dioxyde de carbone (CO₂)", "l'eau (H₂O)"] },
      { eq: "2\\,H_2 + O_2 \\rightarrow 2\\,H_2O", reactifs: ["le dihydrogène (H₂)", "le dioxygène (O₂)"], produits: ["l'eau (H₂O)"] },
    ]);
    return {
      titre: "Identifier réactifs et produits d'une combustion",
      statement: `<p>Une transformation chimique est modélisée par l'équation suivante :</p>
        <p style="text-align:center">\\( ${reac.eq} \\)</p>`,
      question: `Dresser la liste des réactifs, puis celle des produits de cette transformation.`,
      correction: `<p>Les réactifs, consommés par la transformation, sont : ${reac.reactifs.join(" et ")}.</p>
        <p>Les produits, formés par la transformation, sont : ${reac.produits.join(" et ")}.</p>`,
    };
  },
  "c2-1": () => {
    const d = choice([60, 100, 150, 200, 400]);
    const t = Math.round((d / choice([3, 4, 5, 8, 9])) * 10) / 10;
    const v = d / t;
    return {
      titre: `Vitesse moyenne sur ${fmtFR(d)} m`,
      statement: `<p>Un coureur parcourt une distance \\( d = ${fmtFR(d)}\\,\\text{m} \\) en une durée \\( t = ${fmtFR(t)}\\,\\text{s} \\).</p>`,
      question: `Calculer sa vitesse moyenne en \\( \\text{m/s} \\), puis la convertir en \\( \\text{km/h} \\).`,
      correction: `<p>\\( v = \\dfrac{d}{t} = \\dfrac{${fmtFR(d)}}{${fmtFR(t)}} \\approx ${fmtFR(v)}\\,\\text{m/s} \\).</p>
        <p>\\( ${fmtFR(v)} \\times 3{,}6 \\approx ${fmtFR(v * 3.6)}\\,\\text{km/h} \\).</p>`,
    };
  },
  "c2-2": () => {
    const scenario = choice([
      { sujet: "un patineur qui tourne sur une patinoire", cadre: "la patinoire (référentiel terrestre)" },
      { sujet: "un satellite en orbite autour de la Terre", cadre: "le référentiel géocentrique" },
      { sujet: "une valise posée sur le tapis roulant d'un aéroport", cadre: "le sol de l'aéroport (référentiel terrestre)" },
    ]);
    return {
      titre: "Choisir un référentiel adapté",
      statement: `<p>On souhaite décrire le mouvement de ${scenario.sujet}.</p>`,
      question: `Proposer un référentiel adapté à cette étude et justifier ce choix.`,
      correction: `<p>Le référentiel le plus adapté ici est ${scenario.cadre} : il permet de décrire le
        mouvement sur l'échelle de temps et de distance pertinente pour cette situation.</p>`,
    };
  },
  "c2-3": () => {
    const objet = choice([
      { nom: "une lampe suspendue au plafond par un fil, immobile", forces: "son poids \\( \\vec{P} \\) et la tension du fil \\( \\vec{T} \\)" },
      { nom: "une voiture roulant en ligne droite à vitesse constante sur une route plate", forces: "son poids \\( \\vec{P} \\), la réaction de la route \\( \\vec{N} \\), et les forces de frottement/moteur qui se compensent" },
      { nom: "un verre posé, immobile, sur une table", forces: "son poids \\( \\vec{P} \\) et la réaction normale de la table \\( \\vec{N} \\)" },
    ]);
    return {
      titre: "Bilan des forces à l'équilibre",
      statement: `<p>On étudie ${objet.nom}.</p>`,
      question: `Faire l'inventaire des forces qui s'exercent sur cet objet, puis indiquer ce que l'on peut dire de leur somme.`,
      correction: `<p>Les forces en présence sont : ${objet.forces}.</p>
        <p>L'objet étant immobile ou en mouvement rectiligne uniforme, la somme des forces qui s'exercent
        sur lui est nulle (principe d'inertie).</p>`,
    };
  },
  "c3-1": () => {
    const f = choice([220, 262, 330, 440, 523]);
    const T = 1 / f;
    const v = 340;
    const lambda = v * T;
    return {
      titre: `Période et longueur d'onde d'un son à ${fmtFR(f)} Hz`,
      statement: `<p>Un haut-parleur émet un son pur de fréquence \\( f = ${fmtFR(f)}\\,\\text{Hz} \\).</p>`,
      question: `Calculer la période \\( T \\) de cette onde, puis sa longueur d'onde \\( \\lambda \\) dans l'air (\\( v = 340\\,\\text{m/s} \\)).`,
      correction: `<p>\\( T = \\dfrac{1}{f} = \\dfrac{1}{${fmtFR(f)}} \\approx ${(T * 1000).toFixed(2).replace(".", ",")} \\times 10^{-3}\\,\\text{s} \\).</p>
        <p>\\( \\lambda = v \\times T \\approx ${fmtFR(lambda)}\\,\\text{m} \\).</p>`,
    };
  },
  "c3-2": () => {
    const combo = choice([
      { a: "rouge", b: "vert", res: "jaune" },
      { a: "rouge", b: "bleu", res: "magenta" },
      { a: "vert", b: "bleu", res: "cyan" },
    ]);
    return {
      titre: "Synthèse additive de deux couleurs",
      statement: `<p>Sur un écran, on allume simultanément, à pleine intensité, les sous-pixels
        ${combo.a} et ${combo.b} d'un même pixel.</p>`,
      question: `Quelle couleur perçoit-on ? Expliquer en nommant le mode de synthèse des couleurs utilisé par un écran.`,
      correction: `<p>Un écran fonctionne par <strong>synthèse additive</strong> : il ajoute de la lumière colorée.
        En additionnant le ${combo.a} et le ${combo.b} à pleine intensité, on perçoit du <strong>${combo.res}</strong>.</p>`,
    };
  },
};

const TYPE_QUESTION_PREFIX = {
  calcul: "", // la question du scénario est déjà formulée pour un calcul
  qcm: "Choisis la bonne réponse parmi plusieurs propositions, en justifiant ton choix : ",
  redaction: "Rédige une réponse argumentée à la question suivante : ",
};

document.addEventListener("DOMContentLoaded", () => {
  // Remplit les menus thème/compétence
  const themeSelect = document.getElementById("gen-theme");
  const compSelect = document.getElementById("gen-competence");

  themeSelect.innerHTML = AIX.data.themes.map(t => `<option value="${t.id}">${t.nom}</option>`).join("");

  function refreshCompetences() {
    const comps = AIX.getCompetencesByTheme(themeSelect.value);
    compSelect.innerHTML = comps.map(c => `<option value="${c.id}">${c.nom}</option>`).join("");
  }
  themeSelect.addEventListener("change", refreshCompetences);
  refreshCompetences();

  document.getElementById("gen-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const compId = compSelect.value;
    const type = document.getElementById("gen-type").value;
    const diff = parseInt(document.getElementById("gen-diff").value);
    const resultBox = document.getElementById("gen-result");
    const submitBtn = document.getElementById("gen-submit");

    const references = AIX.searchExercices({ competenceIds: [compId] }).slice(0, 2);

    submitBtn.disabled = true;
    resultBox.classList.remove("ready");
    resultBox.innerHTML = `
      <div class="placeholder">
        <p style="margin-bottom:10px">
          ${references.length
            ? `Analyse de ${references.length} exercice${references.length > 1 ? "s" : ""} existant${references.length > 1 ? "s" : ""} sur cette compétence…`
            : "Aucun exercice existant sur cette compétence pour le moment — génération sans référence…"}
        </p>
        <span class="loading-dots"><span></span><span></span><span></span></span>
      </div>
    `;

    setTimeout(() => {
      const build = GEN_SCENARIOS[compId] || GEN_SCENARIOS["c2-1"];
      const gen = build();
      const comp = AIX.getCompetence(compId);
      const theme = AIX.getTheme(comp.themeId);

      resultBox.classList.add("ready");
      resultBox.innerHTML = `
        <span class="demo-badge">Brouillon généré — à valider</span>
        <div class="breadcrumb" style="margin-top:14px">
          <span style="color:${theme.couleur}">${theme.nom}</span>
          <span class="sep">›</span><span>${comp.nom}</span>
        </div>
        <h3 style="font-size:19px;margin:10px 0 14px">${gen.titre}</h3>
        <div class="ex-meta" style="margin-bottom:16px">
          ${aixTypeTag(type)}
          ${aixDifficultyDots(diff)}
        </div>
        <div style="font-size:16px;line-height:1.65">${gen.statement}</div>
        <p style="margin-top:14px;font-weight:600;font-size:15px">${TYPE_QUESTION_PREFIX[type]}${gen.question}</p>

        ${references.length ? `
          <div style="margin-top:22px;padding-top:16px;border-top:1px dashed var(--line)">
            <h4 style="font-family:var(--font-display);font-size:13px;color:var(--ink-faint);margin-bottom:8px">Inspiré de</h4>
            ${references.map(r => `<div style="font-size:13.5px"><a href="exercice.html?id=${r.id}" style="color:var(--pen-blue)">${r.titre}</a> — ${AIX.getCreateur(r.createurId).nom}</div>`).join("")}
          </div>
        ` : ""}

        <div style="margin-top:22px;display:flex;gap:10px">
          <button class="btn btn-ghost" disabled title="Désactivé dans cette démonstration">Publier dans le catalogue</button>
          <button class="btn btn-ghost btn-sm" id="gen-show-correction">Voir la correction générée</button>
        </div>
        <div class="correction-body" id="gen-correction" style="margin-top:14px">${gen.correction}</div>
      `;

      document.getElementById("gen-show-correction").addEventListener("click", () => {
        const body = document.getElementById("gen-correction");
        body.classList.toggle("visible");
        if (window.MathJax && window.MathJax.typesetPromise) window.MathJax.typesetPromise([body]);
      });

      submitBtn.disabled = false;
      if (window.MathJax && window.MathJax.typesetPromise) window.MathJax.typesetPromise([resultBox]);
    }, 900);
  });
});
