# AIxercice — V1 (démo front-end statique)

Première version visuelle et interactive du « YouTube des exercices » décrit dans les
specs du projet : recherche par compétence, créateurs, playlists, et aperçus du
générateur d'exercices IA et du Magic Import.

Cette V1 est un **prototype front-end statique**, sans backend ni base de données réelle.
Elle sert à valider l'expérience et le design avant de construire les briques serveur
décrites dans les specs (modèle de données, RAG, pipeline vision).

## Lancer le site en local

Aucune dépendance à installer. Depuis ce dossier :

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000` dans un navigateur.

(Ouvrir directement les fichiers `.html` avec `file://` fonctionne aussi, sauf que
certains navigateurs bloquent `fetch`/modules dans ce mode — le serveur local est plus sûr.)

## Structure

```
index.html         Accueil (recherche, créateurs, exercices tendance, playlists)
catalogue.html      Recherche facettée par compétence / type / difficulté
exercice.html        Page d'un exercice (énoncé MathJax, correction repliable, playlist)
createur.html        Profil d'un créateur (bio, exercices publiés, playlists)
playlist.html         Série d'exercices ordonnée avec suivi de progression
generateur.html       Générateur d'exercices IA (aperçu)
import.html          Magic Import — photo vers exercice numérique (aperçu)

css/style.css        Design system complet (palette, typographie, composants)
js/data.js           Données d'exemple (thèmes, compétences, exercices, créateurs, playlists)
js/api.js            Couche d'accès aux données (recherche facettée, lookups)
js/store.js          État du visiteur en localStorage (suivis, progression)
js/nav.js            En-tête / pied de page communs
js/cards.js          Gabarits de cartes réutilisés
js/page-*.js         Logique propre à chaque page
```

## Ce qui est réel vs simulé dans cette V1

**Réel et fonctionnel :**
- Recherche facettée (compétence, type, difficulté, texte libre)
- Navigation compétence → exercices, créateur → exercices/playlists
- Suivi d'un créateur et suivi de progression d'exercice (persistés en `localStorage`,
  donc propres à ce navigateur, pas de vrai compte utilisateur)
- Playlist avec barre de progression et navigation entre exercices
- Rendu LaTeX des énoncés et corrections via MathJax (nécessite une connexion internet :
  la police Google Fonts et MathJax sont chargés depuis un CDN)

**Simulé, clairement labellisé « Aperçu de fonctionnalité » dans l'interface :**
- **Générateur d'exercices IA** : les scénarios générés viennent d'un petit jeu de
  gabarits paramétrés côté client (voir `GEN_SCENARIOS` dans `js/page-generateur.js`),
  pas d'un appel à un modèle. Le panneau « Inspiré de » montre une vraie recherche parmi
  les exercices existants, pour illustrer le principe du RAG décrit dans les specs.
- **Magic Import** : l'« extraction » affichée après upload d'une photo est un exemple
  fixe (voir `IMPORT_SAMPLE` dans `js/page-import.js`), pas une analyse d'image réelle.
- Dans les deux cas, le bouton « Publier dans le catalogue » est volontairement désactivé.

## Données

Les thèmes, compétences, exercices, créateurs et playlists dans `js/data.js` sont des
données d'exemple écrites pour cette démo, alignées sur le programme de seconde. Rien
n'est tiré d'une vraie base — à remplacer par les vraies données / API au moment de
construire le backend (voir `specs-youtube-exercices.md` dans l'historique du projet,
section « Phasage suggéré »).

## Prochaines étapes (vers la Phase 1 des specs)

1. Remplacer `js/data.js` + `js/api.js` par de vrais appels à une API backend
   (PostgreSQL + référentiel de compétences complet)
2. Remplacer `js/store.js` (localStorage) par de vrais comptes utilisateurs
3. Brancher le générateur sur un vrai pipeline RAG (embeddings + appel API Claude)
4. Brancher Magic Import sur une vraie analyse d'image
