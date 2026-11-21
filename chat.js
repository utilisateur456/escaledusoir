/* Assistant automatique de Radio Escale (bulle en bas à droite).
   Réponses prédéfinies, aucune donnée envoyée nulle part.
   Utilise grille.js pour l'émission en cours quand il est chargé. */
(function () {
  const surAccueil = !!document.getElementById("form-contact");

  /* ---------- Style ---------- */
  const css = `
  .ac-bulle{position:fixed;right:18px;bottom:18px;z-index:30;width:60px;height:60px;border-radius:50%;border:none;cursor:pointer;
    background:linear-gradient(145deg,#f6cf86,#d99a45);color:#0d1220;display:grid;place-items:center;
    box-shadow:0 12px 30px -8px rgba(242,180,90,.65),0 0 0 1px rgba(255,255,255,.15) inset;transition:transform .2s}
  .ac-bulle:hover{transform:scale(1.07)}
  .ac-bulle svg{width:28px;height:28px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
  .ac-bulle .ac-point{position:absolute;top:6px;right:6px;width:12px;height:12px;border-radius:50%;background:#e8574a;border:2px solid #0d1220}
  .ac-fenetre{position:fixed;right:18px;bottom:90px;z-index:30;width:min(370px,calc(100vw - 24px));height:min(560px,calc(100vh - 120px));
    display:flex;flex-direction:column;border-radius:22px;overflow:hidden;border:1px solid rgba(242,180,90,.35);
    background:linear-gradient(180deg,#151d33,#0f1526);box-shadow:0 30px 80px rgba(0,0,0,.55);
    opacity:0;transform:translateY(14px) scale(.98);pointer-events:none;transition:opacity .2s,transform .2s;
    font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Inter","Helvetica Neue",Arial,sans-serif;color:#ece7dd}
  .ac-ouvert .ac-fenetre{opacity:1;transform:none;pointer-events:auto}
  .ac-tete{display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.08);
    background:radial-gradient(circle at 10% 0%,rgba(242,180,90,.18),transparent 70%)}
  .ac-avatar{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:rgba(242,180,90,.15);border:1px solid rgba(242,180,90,.45);color:#f2b45a;flex:none}
  .ac-avatar svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
  .ac-tete b{display:block;font-size:.98rem}
  .ac-tete span{font-size:.78rem;color:#a9a6a0}
  .ac-fermer{margin-left:auto;width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.12);background:transparent;color:#a9a6a0;font-size:1.3rem;cursor:pointer;line-height:1}
  .ac-fermer:hover{color:#f2b45a;border-color:#f2b45a}
  .ac-fil{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth}
  .ac-msg{max-width:86%;padding:10px 14px;border-radius:16px;font-size:.92rem;line-height:1.45;white-space:pre-line}
  .ac-bot{align-self:flex-start;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-bottom-left-radius:6px}
  .ac-moi{align-self:flex-end;background:#f2b45a;color:#0d1220;font-weight:500;border-bottom-right-radius:6px}
  .ac-actions{display:flex;flex-wrap:wrap;gap:6px;align-self:flex-start;max-width:95%}
  .ac-actions button,.ac-actions a{font:600 .8rem inherit;font-family:inherit;padding:7px 12px;border-radius:999px;cursor:pointer;text-decoration:none;
    border:1px solid rgba(242,180,90,.55);background:transparent;color:#f2b45a;transition:background .15s,color .15s}
  .ac-actions button:hover,.ac-actions a:hover{background:#f2b45a;color:#0d1220}
  .ac-saisie{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(255,255,255,.08)}
  .ac-saisie input{flex:1;min-width:0;padding:11px 14px;border-radius:14px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:#ece7dd;font:400 .92rem inherit;font-family:inherit}
  .ac-saisie input:focus{outline:none;border-color:#f2b45a}
  .ac-saisie button{width:44px;border-radius:14px;border:none;background:#f2b45a;color:#0d1220;cursor:pointer;display:grid;place-items:center}
  .ac-saisie button svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
  .ac-ecrit{align-self:flex-start;color:#a9a6a0;font-size:.85rem;padding:4px 6px}
  @media (max-width:520px){.ac-fenetre{right:12px;bottom:84px}.ac-bulle{right:14px;bottom:14px}}
  @media (prefers-reduced-motion:reduce){.ac-fenetre,.ac-bulle{transition:none}}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* ---------- Structure ---------- */
  const racine = document.createElement("div");
  racine.className = "ac";
  racine.innerHTML = `
    <div class="ac-fenetre" role="dialog" aria-label="Assistant Radio Escale">
      <div class="ac-tete">
        <div class="ac-avatar" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8"/></svg></div>
        <div><b>Radio Escale</b><span>Assistant · répond tout de suite</span></div>
        <button class="ac-fermer" type="button" aria-label="Fermer">&times;</button>
      </div>
      <div class="ac-fil" aria-live="polite"></div>
      <form class="ac-saisie">
        <input type="text" placeholder="Posez votre question..." aria-label="Votre question" autocomplete="off">
        <button type="submit" aria-label="Envoyer"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
      </form>
    </div>
    <button class="ac-bulle" type="button" aria-label="Ouvrir l'assistant">
      <svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/></svg>
      <span class="ac-point" aria-hidden="true"></span>
    </button>`;
  document.body.appendChild(racine);

  const fil = racine.querySelector(".ac-fil");
  const champ = racine.querySelector(".ac-saisie input");
  const bulle = racine.querySelector(".ac-bulle");
  let demarre = false;

  /* ---------- Actions ---------- */
  const ACTIONS = {
    ecouter: ["Écouter maintenant", () => surAccueil ? document.body.classList.add("radio-ouverte") : location.href = "index.html#ecouter"],
    grille: ["Voir la grille", () => (window.radioEstLancee && window.radioEstLancee()) ? window.ouvrirGrille("programme.html") : (location.href = "programme.html")],
    appel: ["Passer à l'antenne", () => surAccueil ? document.getElementById("appel").showModal() : location.href = "index.html#appel"],
    contact: ["Nous écrire", () => surAccueil ? document.getElementById("contact").showModal() : location.href = "index.html#contact"]
  };

  /* ---------- Émission en cours (grille.js) ---------- */
  function enCeMoment() {
    try {
      const n = maintenantSuisse(), jour = GRILLE[n.jour];
      const i = jour.findIndex(([d, f]) => n.minutes >= enMinutes(d) && n.minutes < enMinutes(f));
      if (i < 0) return null;
      const [d, f, id] = jour[i], suivant = jour[i + 1] || GRILLE[(n.jour + 1) % 7][0];
      return `En ce moment : ${EMISSIONS[id].titre}, de ${affiche(d)} à ${affiche(f)}.\nEnsuite à ${affiche(suivant[0])} : ${EMISSIONS[suivant[2]].titre}.`;
    } catch (e) { return null; }
  }

  /* ---------- Réponses ---------- */
  const R = [
    { cles: ["bonjour", "salut", "hello", "bonsoir", "coucou", "hey"],
      rep: () => "Bonjour ! Je peux vous aider à écouter la radio, découvrir les émissions ou passer à l'antenne. Que voulez-vous savoir ?",
      act: ["ecouter", "grille", "appel"] },
    { cles: ["ecouter", "ecoute", "comment ecouter", "play", "lecteur", "son", "direct", "live"],
      rep: () => "Pour écouter Radio Escale, cliquez sur « Écouter en direct » puis sur PLAY dans le lecteur. Ça marche sur ordinateur, tablette et téléphone, sans application ni inscription.\nAstuce : la musique continue même si vous fermez la fenêtre du lecteur.",
      act: ["ecouter"] },
    { cles: ["en ce moment", "maintenant", "quoi passe", "qu est ce qui passe", "actuellement", "en cours"],
      rep: () => enCeMoment() || "Toute la programmation est dans la grille, jour par jour.",
      act: ["ecouter", "grille"] },
    { cles: ["horaire", "heure", "grille", "programme", "emission", "planning", "quand"],
      rep: () => (enCeMoment() ? enCeMoment() + "\n\n" : "") + "Toutes les émissions, jour par jour, sont dans la grille des programmes. Cliquez sur une émission pour voir sa description et ses horaires.",
      act: ["grille"] },
    { cles: ["escale du soir", "libre antenne", "soir", "parler", "probleme", "temoign", "confier"],
      rep: () => "L'Escale du Soir, c'est la libre antenne de Radio Escale, du lundi au jeudi de 22h00 à 23h00. Vous appelez pour parler de ce qui coince au quotidien : voisinage, travail, moral. On écoute, sans jugement.\nLe programme exact arrive bientôt.",
      act: ["appel", "grille"] },
    { cles: ["passer a l antenne", "antenne", "appeler", "appel", "telephone", "rappel", "intervenir", "participer"],
      rep: () => "Pour passer à l'antenne, cliquez sur « Passer à l'antenne » et laissez votre prénom, votre numéro et le sujet qui vous tient à cœur. On vous rappelle, puis on vous envoie par SMS le lien pour intervenir en direct.\nPensez à couper le son de la radio pendant l'appel, sinon vous vous entendrez en écho.",
      act: ["appel"] },
    { cles: ["musique", "style", "genre", "chanson", "rock", "pop", "dance", "annee", "80", "90", "70", "2000", "titre", "artiste"],
      rep: () => "Sur Radio Escale : de la pop, du rock, de la dance et les grands tubes des années 70, 80, 90 et 2000. Chaque style a son émission, de Morning Energy le matin aux nuits rétro.",
      act: ["grille", "ecouter"] },
    { cles: ["gratuit", "prix", "payer", "abonnement", "cout", "inscription"],
      rep: () => "Oui, Radio Escale est 100 % gratuite. Pas d'abonnement, pas d'inscription.",
      act: ["ecouter"] },
    { cles: ["application", "appli", "app", "iphone", "android", "smartphone", "mobile", "portable"],
      rep: () => "Pas besoin d'application : ouvrez radioescale.ch dans le navigateur de votre téléphone et cliquez sur « Écouter en direct ». Vous pouvez aussi ajouter le site à votre écran d'accueil pour le retrouver en un geste.",
      act: ["ecouter"] },
    { cles: ["ou", "suisse", "romand", "vaud", "pays", "origine", "qui etes", "qui est", "c est quoi", "radio escale"],
      rep: () => "Radio Escale est une radio en ligne de Suisse romande, basée dans le canton de Vaud. Elle s'écoute partout dans le monde : de la musique toute la journée, et L'Escale du Soir, la libre antenne, le soir.",
      act: ["ecouter", "grille"] },
    { cles: ["contact", "ecrire", "mail", "email", "message", "joindre", "question", "pub", "publicite", "partenariat", "collabor"],
      rep: () => "Pour nous écrire, utilisez le formulaire de contact. Votre message arrive directement à l'équipe, on vous répond vite.",
      act: ["contact"] },
    { cles: ["dedicace", "demande", "chanson pour", "proposer", "suggestion", "idee"],
      rep: () => "Une idée, une dédicace ou un sujet pour la libre antenne ? Envoyez-le-nous avec le formulaire de contact, on lit tout.",
      act: ["contact"] },
    { cles: ["merci", "super", "top", "genial", "parfait", "cool"],
      rep: () => "Avec plaisir ! Bonne écoute sur Radio Escale.",
      act: ["ecouter"] },
    { cles: ["au revoir", "bye", "a plus", "bonne nuit", "bonne soiree"],
      rep: () => "À bientôt sur Radio Escale !", act: [] }
  ];

  const normaliser = t => " " + t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim() + " ";

  function repondre(texte) {
    const t = normaliser(texte);
    let meilleur = null, score = 0;
    for (const r of R) {
      let s = 0;
      for (const c of r.cles) { const k = normaliser(c); if (t.includes(k)) s += k.length; }
      if (s > score) { score = s; meilleur = r; }
    }
    if (meilleur) return { texte: meilleur.rep(), act: meilleur.act };
    return { texte: "Je n'ai pas la réponse à cette question. Écrivez-nous avec le formulaire de contact, l'équipe vous répondra personnellement.", act: ["contact", "grille"] };
  }

  /* ---------- Affichage ---------- */
  function ajouter(texte, qui) {
    const m = document.createElement("div");
    m.className = "ac-msg " + (qui === "moi" ? "ac-moi" : "ac-bot");
    m.textContent = texte;
    fil.appendChild(m);
    fil.scrollTop = fil.scrollHeight;
  }
  function boutons(liste) {
    if (!liste || !liste.length) return;
    const z = document.createElement("div"); z.className = "ac-actions";
    liste.forEach(k => {
      const [label, fn] = ACTIONS[k];
      const b = document.createElement("button"); b.type = "button"; b.textContent = label;
      b.addEventListener("click", () => { if (k !== "grille") fermer(); fn(); });
      z.appendChild(b);
    });
    fil.appendChild(z); fil.scrollTop = fil.scrollHeight;
  }
  function suggestions() {
    const z = document.createElement("div"); z.className = "ac-actions";
    ["Comment écouter ?", "Qu'est-ce qui passe ?", "Passer à l'antenne", "C'est gratuit ?"].forEach(q => {
      const b = document.createElement("button"); b.type = "button"; b.textContent = q;
      b.addEventListener("click", () => question(q));
      z.appendChild(b);
    });
    fil.appendChild(z); fil.scrollTop = fil.scrollHeight;
  }
  function botDit(rep) {
    const e = document.createElement("div"); e.className = "ac-ecrit"; e.textContent = "Radio Escale écrit...";
    fil.appendChild(e); fil.scrollTop = fil.scrollHeight;
    setTimeout(() => { e.remove(); ajouter(rep.texte, "bot"); boutons(rep.act); }, 450);
  }
  function question(q) { ajouter(q, "moi"); botDit(repondre(q)); }

  /* ---------- Ouverture ---------- */
  function ouvrir() {
    racine.classList.add("ac-ouvert");
    bulle.setAttribute("aria-label", "Fermer l'assistant");
    const p = bulle.querySelector(".ac-point"); if (p) p.remove();
    if (!demarre) {
      demarre = true;
      ajouter("Bonjour et bienvenue sur Radio Escale ! Je réponds à vos questions sur la radio, les émissions et la libre antenne.", "bot");
      const m = enCeMoment(); if (m) ajouter(m, "bot");
      suggestions();
    }
    setTimeout(() => champ.focus(), 200);
  }
  function fermer() { racine.classList.remove("ac-ouvert"); bulle.setAttribute("aria-label", "Ouvrir l'assistant"); }

  bulle.addEventListener("click", () => racine.classList.contains("ac-ouvert") ? fermer() : ouvrir());
  racine.querySelector(".ac-fermer").addEventListener("click", fermer);
  document.addEventListener("keydown", e => { if (e.key === "Escape") fermer(); });
  racine.querySelector(".ac-saisie").addEventListener("submit", e => {
    e.preventDefault();
    const q = champ.value.trim(); if (!q) return;
    champ.value = ""; question(q);
  });
})();
