/* =========================================================================
   AIxercice — données d'exemple (V1 statique)
   Contenu original écrit pour cette démo, aligné sur le programme officiel
   de physique-chimie de seconde. Aucune donnée ici n'est réelle (créateurs,
   abonnés, dates) : c'est un jeu de données de démonstration à remplacer
   par une vraie base au moment du passage en Phase 1 (voir specs).
   ========================================================================= */

window.AIX_DATA = {

  themes: [
    { id: "t1", nom: "Constitution et transformations de la matière", couleur: "#B8863B" },
    { id: "t2", nom: "Mouvement et interactions", couleur: "#2A58A6" },
    { id: "t3", nom: "Ondes et signaux", couleur: "#2E8C7A" },
  ],

  competences: [
    { id: "c1-1", themeId: "t1", nom: "Réaliser une dilution" },
    { id: "c1-2", themeId: "t1", nom: "Identifier réactifs et produits d'une transformation" },
    { id: "c2-1", themeId: "t2", nom: "Décrire un mouvement" },
    { id: "c2-2", themeId: "t2", nom: "Choisir un référentiel" },
    { id: "c2-3", themeId: "t2", nom: "Modéliser une action par une force" },
    { id: "c3-1", themeId: "t3", nom: "Caractériser une onde" },
    { id: "c3-2", themeId: "t3", nom: "Analyser la perception des couleurs" },
  ],

  createurs: [
    {
      id: "u1", nom: "Camille Rousseau",
      etablissement: "Lycée Jean Moulin, Nantes",
      bio: "Professeure agrégée de physique-chimie. Je publie des exercices progressifs pour consolider les bases avant les évaluations.",
      abonnes: 1240, nbExercices: 5,
    },
    {
      id: "u2", nom: "Yanis Belkacem",
      etablissement: "Académie de Lyon",
      bio: "Professeur en lycée général. Mes séries d'exercices suivent l'ordre du cours, du plus guidé au plus autonome.",
      abonnes: 2310, nbExercices: 6,
    },
    {
      id: "u3", nom: "Sophie Lenoir",
      etablissement: "Formatrice numérique, académie de Versailles",
      bio: "J'accompagne les équipes sur les usages numériques. Mes exercices mêlent calcul et argumentation scientifique.",
      abonnes: 860, nbExercices: 3,
    },
    {
      id: "u4", nom: "Hugo Picard",
      etablissement: "Académie de Lille",
      bio: "Professeur stagiaire. Je publie surtout des QCM courts pour des révisions rapides entre deux cours.",
      abonnes: 140, nbExercices: 2,
    },
  ],

  exercices: [
    // ---- Thème 1 : Constitution et transformations de la matière ----
    {
      id: "ex-c101", titre: "Préparer une solution diluée de sulfate de cuivre",
      themeId: "t1", competenceIds: ["c1-1"], type: "calcul", difficulte: 2, duree: 12,
      createurId: "u1", source: "original",
      enonce: `<p>On dispose d'une solution mère de sulfate de cuivre (II) de concentration en masse
        \\( c_m = 40\\,\\text{g/L} \\). On souhaite préparer un volume \\( V_f = 250\\,\\text{mL} \\)
        d'une solution fille de concentration \\( c_f = 8\\,\\text{g/L} \\).</p>`,
      questions: [
        "Calculer le facteur de dilution \\( F \\) à réaliser.",
        "En déduire le volume \\( V_m \\) de solution mère à prélever.",
        "Décrire en une phrase le matériel de verrerie utilisé pour réaliser cette dilution avec précision.",
      ],
      correction: `<p><strong>1.</strong> Le facteur de dilution vaut \\( F = \\dfrac{c_m}{c_f} = \\dfrac{40}{8} = 5 \\).</p>
        <p><strong>2.</strong> Comme \\( F = \\dfrac{V_f}{V_m} \\), on a
        \\( V_m = \\dfrac{V_f}{F} = \\dfrac{250}{5} = 50\\,\\text{mL} \\).</p>
        <p><strong>3.</strong> On prélève les \\( 50\\,\\text{mL} \\) à la pipette jaugée, puis on complète
        jusqu'au trait de jauge d'une fiole jaugée de \\( 250\\,\\text{mL} \\) avec de l'eau distillée.</p>`,
    },
    {
      id: "ex-c102", titre: "Dilutions en cascade",
      themeId: "t1", competenceIds: ["c1-1"], type: "calcul", difficulte: 4, duree: 18,
      createurId: "u1", source: "original",
      enonce: `<p>Une solution mère \\( S_0 \\) a pour concentration \\( c_0 = 1{,}0\\,\\text{mol/L} \\).
        On réalise deux dilutions successives : \\( S_0 \\to S_1 \\) avec un facteur \\( F_1 = 10 \\),
        puis \\( S_1 \\to S_2 \\) avec un facteur \\( F_2 = 4 \\).</p>`,
      questions: [
        "Calculer la concentration \\( c_1 \\) de la solution \\( S_1 \\).",
        "Calculer la concentration \\( c_2 \\) de la solution \\( S_2 \\).",
        "Quel facteur de dilution unique aurait permis de passer directement de \\( S_0 \\) à \\( S_2 \\) ?",
      ],
      correction: `<p><strong>1.</strong> \\( c_1 = \\dfrac{c_0}{F_1} = \\dfrac{1{,}0}{10} = 0{,}10\\,\\text{mol/L} \\).</p>
        <p><strong>2.</strong> \\( c_2 = \\dfrac{c_1}{F_2} = \\dfrac{0{,}10}{4} = 0{,}025\\,\\text{mol/L} \\).</p>
        <p><strong>3.</strong> Les facteurs de dilution successifs se multiplient :
        \\( F = F_1 \\times F_2 = 40 \\). On vérifie : \\( \\dfrac{1{,}0}{40} = 0{,}025\\,\\text{mol/L} \\). ✓</p>`,
    },
    {
      id: "ex-c121", titre: "Combustion du méthane : réactifs ou produits ?",
      themeId: "t1", competenceIds: ["c1-2"], type: "qcm", difficulte: 1, duree: 6,
      createurId: "u4", source: "original",
      enonce: `<p>La combustion complète du méthane dans le dioxygène s'écrit :</p>
        <p style="text-align:center">\\( CH_4 + 2\\,O_2 \\rightarrow CO_2 + 2\\,H_2O \\)</p>
        <p>Pour chaque espèce ci-dessous, indique s'il s'agit d'un réactif ou d'un produit de cette transformation.</p>`,
      questions: [
        "Le méthane \\( CH_4 \\)",
        "Le dioxygène \\( O_2 \\)",
        "Le dioxyde de carbone \\( CO_2 \\)",
      ],
      correction: `<p>Les réactifs sont les espèces consommées, à gauche de la flèche : le méthane et le dioxygène
        sont donc des <strong>réactifs</strong>. Le dioxyde de carbone et l'eau sont formés par la réaction,
        à droite de la flèche : ce sont des <strong>produits</strong>.</p>`,
    },

    // ---- Thème 2 : Mouvement et interactions ----
    {
      id: "ex-c211", titre: "Vitesse moyenne d'un coureur de 100 m",
      themeId: "t2", competenceIds: ["c2-1"], type: "calcul", difficulte: 1, duree: 8,
      createurId: "u2", source: "original",
      enonce: `<p>Un athlète parcourt le 100 mètres en \\( 10{,}2\\,\\text{s} \\).</p>`,
      questions: [
        "Calculer sa vitesse moyenne en \\( \\text{m/s} \\).",
        "Convertir cette vitesse en \\( \\text{km/h} \\).",
      ],
      correction: `<p><strong>1.</strong> \\( v = \\dfrac{d}{t} = \\dfrac{100}{10{,}2} \\approx 9{,}8\\,\\text{m/s} \\).</p>
        <p><strong>2.</strong> \\( 9{,}8 \\times 3{,}6 \\approx 35{,}3\\,\\text{km/h} \\).</p>`,
      playlistId: "p1", playlistIndex: 1,
    },
    {
      id: "ex-c212", titre: "Train à vitesse variable : moyenne sur un trajet",
      themeId: "t2", competenceIds: ["c2-1"], type: "redaction", difficulte: 3, duree: 15,
      createurId: "u2", source: "original",
      enonce: `<p>Un TER parcourt \\( 84\\,\\text{km} \\) entre deux gares. Il roule à \\( 110\\,\\text{km/h} \\)
        pendant les deux tiers du trajet, puis ralentit pour le dernier tiers à cause de travaux.
        La durée totale du trajet est de \\( 52\\,\\text{minutes} \\).</p>`,
      questions: [
        "Calculer la vitesse moyenne du train sur l'ensemble du trajet.",
        "Cette vitesse moyenne a-t-elle un sens physique si le mouvement n'est pas uniforme ? Justifier.",
      ],
      correction: `<p><strong>1.</strong> \\( v_{moy} = \\dfrac{d}{t} = \\dfrac{84}{52/60} \\approx 96{,}9\\,\\text{km/h} \\).</p>
        <p><strong>2.</strong> Oui : la vitesse moyenne a toujours un sens, qu'elle que soit la nature du
        mouvement. Elle ne décrit pas le détail du trajet (ici un mouvement varié, puisque la vitesse change),
        mais elle reste correctement définie comme le rapport de la distance totale sur la durée totale.</p>`,
      playlistId: "p1", playlistIndex: 2,
    },
    {
      id: "ex-c221", titre: "Référentiel terrestre ou géocentrique ?",
      themeId: "t2", competenceIds: ["c2-2"], type: "qcm", difficulte: 2, duree: 7,
      createurId: "u2", source: "original",
      enonce: `<p>Pour chacune des situations suivantes, indique le référentiel le plus adapté pour
        décrire le mouvement étudié : <em>référentiel terrestre</em> ou <em>référentiel géocentrique</em>.</p>`,
      questions: [
        "L'étude de la trajectoire d'un ballon de basket lors d'un tir.",
        "L'étude du mouvement de la Lune autour de la Terre.",
        "L'étude du décollage d'une fusée depuis son pas de tir.",
      ],
      correction: `<p>Le <strong>référentiel terrestre</strong> est adapté pour un mouvement observé depuis la
        surface de la Terre, sur de courtes distances et durées (le ballon, le décollage). Le
        <strong>référentiel géocentrique</strong>, centré sur le centre de la Terre mais dont les axes
        pointent vers des étoiles lointaines, est adapté à l'étude de mouvements autour de la Terre,
        comme celui de la Lune ou d'un satellite.</p>`,
      playlistId: "p1", playlistIndex: 3,
    },
    {
      id: "ex-c222", titre: "Un passager est-il immobile ?",
      themeId: "t2", competenceIds: ["c2-2"], type: "redaction", difficulte: 3, duree: 12,
      createurId: "u3", source: "original",
      enonce: `<p>Un passager est assis dans un train qui roule à vitesse constante sur une voie
        parfaitement rectiligne.</p>`,
      questions: [
        "Le passager est-il immobile par rapport au train ? Justifier.",
        "Le passager est-il immobile par rapport au sol ? Justifier.",
        "Que peut-on en conclure sur la notion de mouvement ?",
      ],
      correction: `<p><strong>1.</strong> Oui : par rapport au référentiel lié au train, la position du passager
        ne change pas au cours du temps. Il est immobile dans ce référentiel.</p>
        <p><strong>2.</strong> Non : par rapport au référentiel terrestre, le passager se déplace avec le
        train. Sa position change par rapport au sol.</p>
        <p><strong>3.</strong> Le mouvement d'un objet dépend du référentiel choisi pour l'observer : on dit
        qu'il est <strong>relatif</strong>. Un objet peut être immobile dans un référentiel et en mouvement
        dans un autre.</p>`,
    },
    {
      id: "ex-c231", titre: "Bilan des forces sur un livre posé sur une table",
      themeId: "t2", competenceIds: ["c2-3"], type: "redaction", difficulte: 2, duree: 10,
      createurId: "u2", source: "original",
      enonce: `<p>Un livre est posé, immobile, sur une table horizontale.</p>`,
      questions: [
        "Faire l'inventaire des forces qui s'exercent sur le livre.",
        "Représenter ces forces par des vecteurs sur un schéma (décrire leur direction, sens et longueur relative).",
        "Que peut-on dire de la somme de ces forces, sachant que le livre est immobile ?",
      ],
      correction: `<p><strong>1.</strong> Deux forces s'exercent sur le livre : son poids \\( \\vec{P} \\), exercé
        par la Terre, et la réaction normale du support \\( \\vec{N} \\), exercée par la table.</p>
        <p><strong>2.</strong> \\( \\vec{P} \\) est vertical, dirigé vers le bas, d'intensité \\( P = mg \\).
        \\( \\vec{N} \\) est vertical, dirigé vers le haut, de même intensité que \\( \\vec{P} \\).</p>
        <p><strong>3.</strong> Le livre étant immobile (et le restant), la somme vectorielle des forces est
        nulle : \\( \\vec{P} + \\vec{N} = \\vec{0} \\). Les deux forces se compensent exactement.</p>`,
      playlistId: "p1", playlistIndex: 4,
    },
    {
      id: "ex-c232", titre: "Palet de hockey sur glace : quelles forces après le tir ?",
      themeId: "t2", competenceIds: ["c2-3"], type: "redaction", difficulte: 4, duree: 14,
      createurId: "u3", source: "original",
      enonce: `<p>Juste après avoir été frappé, un palet de hockey glisse en ligne droite sur la glace,
        à vitesse quasiment constante, les frottements étant négligés.</p>`,
      questions: [
        "Faire l'inventaire des forces qui s'exercent sur le palet pendant qu'il glisse.",
        "Le mouvement est rectiligne et la vitesse est constante. Que peut-on en déduire sur la somme des forces, d'après le principe d'inertie ?",
        "Expliquer pourquoi, dans la réalité, le palet finit par ralentir.",
      ],
      correction: `<p><strong>1.</strong> Le poids \\( \\vec{P} \\) et la réaction normale de la glace \\( \\vec{N} \\)
        (les frottements étant négligés dans cette modélisation).</p>
        <p><strong>2.</strong> D'après le principe d'inertie, un mouvement rectiligne uniforme correspond à
        une somme des forces nulle : \\( \\vec{P} + \\vec{N} = \\vec{0} \\).</p>
        <p><strong>3.</strong> Dans la réalité, des frottements (glace, air) existent même s'ils sont faibles :
        ils exercent une force supplémentaire qui s'oppose au mouvement, ce qui ralentit progressivement
        le palet. Le modèle « somme des forces nulle » n'est qu'une approximation.</p>`,
    },

    // ---- Thème 3 : Ondes et signaux ----
    {
      id: "ex-c311", titre: "Onde sonore dans l'air : période et fréquence",
      themeId: "t3", competenceIds: ["c3-1"], type: "calcul", difficulte: 2, duree: 9,
      createurId: "u3", source: "original",
      enonce: `<p>Un haut-parleur émet un son pur de fréquence \\( f = 440\\,\\text{Hz} \\) (la note La).</p>`,
      questions: [
        "Calculer la période \\( T \\) de cette onde sonore.",
        "Sachant que la vitesse du son dans l'air est \\( v = 340\\,\\text{m/s} \\), calculer la longueur d'onde \\( \\lambda \\).",
      ],
      correction: `<p><strong>1.</strong> \\( T = \\dfrac{1}{f} = \\dfrac{1}{440} \\approx 2{,}3 \\times 10^{-3}\\,\\text{s} \\).</p>
        <p><strong>2.</strong> \\( \\lambda = v \\times T = 340 \\times 2{,}3 \\times 10^{-3} \\approx 0{,}77\\,\\text{m} \\).</p>`,
    },
    {
      id: "ex-c312", titre: "Houle : mesurer une longueur d'onde sur un schéma",
      themeId: "t3", competenceIds: ["c3-1"], type: "calcul", difficulte: 3, duree: 11,
      createurId: "u4", source: "original",
      enonce: `<p>Sur une photographie de houle, on mesure la distance entre 4 crêtes successives :
        elle vaut \\( 27\\,\\text{m} \\). La houle se déplace à \\( v = 4{,}5\\,\\text{m/s} \\).</p>`,
      questions: [
        "En déduire la longueur d'onde \\( \\lambda \\) de la houle.",
        "Calculer la période \\( T \\) de cette onde.",
      ],
      correction: `<p><strong>1.</strong> 4 crêtes successives délimitent 3 longueurs d'onde :
        \\( \\lambda = \\dfrac{27}{3} = 9\\,\\text{m} \\).</p>
        <p><strong>2.</strong> \\( T = \\dfrac{\\lambda}{v} = \\dfrac{9}{4{,}5} = 2\\,\\text{s} \\).</p>`,
    },
    {
      id: "ex-c321", titre: "Pourquoi un écran est-il noir si on coupe les trois couleurs ?",
      themeId: "t3", competenceIds: ["c3-2"], type: "redaction", difficulte: 2, duree: 9,
      createurId: "u1", source: "original",
      enonce: `<p>Un écran de smartphone est composé de pixels, chacun formé de trois sous-pixels
        rouge, vert et bleu.</p>`,
      questions: [
        "Quel est le nom du mode de synthèse des couleurs utilisé par un écran ?",
        "Expliquer pourquoi un pixel apparaît noir lorsque ses trois sous-pixels sont éteints.",
        "Quelle couleur obtient-on en allumant uniquement les sous-pixels rouge et vert à pleine intensité ?",
      ],
      correction: `<p><strong>1.</strong> Un écran utilise la <strong>synthèse additive</strong> des couleurs :
        il ajoute de la lumière colorée sur un fond sombre.</p>
        <p><strong>2.</strong> Si aucun sous-pixel n'émet de lumière, aucune lumière n'atteint l'œil : la
        sensation perçue est l'absence de couleur, c'est-à-dire le noir.</p>
        <p><strong>3.</strong> Rouge + vert donne du <strong>jaune</strong> en synthèse additive.</p>`,
    },
  ],

  playlists: [
    {
      id: "p1",
      titre: "Réviser le mouvement — Thème 2",
      description: "Une série ordonnée pour consolider vitesse moyenne, référentiel et bilan des forces, du plus simple au plus exigeant.",
      createurId: "u2",
    },
    {
      id: "p2",
      titre: "Les bases des solutions",
      description: "Deux exercices pour s'entraîner aux calculs de dilution avant le prochain contrôle.",
      createurId: "u1",
    },
  ],
};

// Rattache les exercices à la playlist p2 (dilutions), sans alourdir la liste ci-dessus
window.AIX_DATA.exercices.find(e => e.id === "ex-c101").playlistId = "p2";
window.AIX_DATA.exercices.find(e => e.id === "ex-c101").playlistIndex = 1;
window.AIX_DATA.exercices.find(e => e.id === "ex-c102").playlistId = "p2";
window.AIX_DATA.exercices.find(e => e.id === "ex-c102").playlistIndex = 2;
