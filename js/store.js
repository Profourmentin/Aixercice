/* =========================================================================
   AIxercice — état local du visiteur (V1 : localStorage, pas de compte réel)
   Sert à démontrer les interactions (suivre un créateur, cocher un exercice
   fait) sans backend. À remplacer par un vrai compte utilisateur en Phase 1-2.
   ========================================================================= */

const AIX_STORE = (() => {
  const KEY_FOLLOWS = "aix_follows";
  const KEY_PROGRESS = "aix_progress";

  function read(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  }

  function isFollowing(createurId) {
    return read(KEY_FOLLOWS).includes(createurId);
  }
  function toggleFollow(createurId) {
    const list = read(KEY_FOLLOWS);
    const idx = list.indexOf(createurId);
    if (idx === -1) list.push(createurId); else list.splice(idx, 1);
    write(KEY_FOLLOWS, list);
    return list.includes(createurId);
  }
  function getFollows() {
    return read(KEY_FOLLOWS);
  }

  function isDone(exerciceId) {
    return read(KEY_PROGRESS).includes(exerciceId);
  }
  function toggleDone(exerciceId) {
    const list = read(KEY_PROGRESS);
    const idx = list.indexOf(exerciceId);
    if (idx === -1) list.push(exerciceId); else list.splice(idx, 1);
    write(KEY_PROGRESS, list);
    return list.includes(exerciceId);
  }
  function getProgress() {
    return read(KEY_PROGRESS);
  }

  return { isFollowing, toggleFollow, getFollows, isDone, toggleDone, getProgress };
})();
