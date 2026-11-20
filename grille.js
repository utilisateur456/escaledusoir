/* Grille des programmes de L'Escale du Soir.
   Partagée par index.html (bloc "En ce moment") et programme.html.
   Pour changer un horaire ou une émission, c'est ici. */
/* ===== LES PICTOS ===== */
const PICTOS = {
  soleil: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  etoile: '<svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
  casque: '<svg viewBox="0 0 24 24"><path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="7" rx="1.5"/><rect x="17" y="14" width="4" height="7" rx="1.5"/></svg>',
  clapet: '<svg viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M7 12h10M11 18h2"/><rect x="9" y="5" width="6" height="4" rx=".5"/></svg>',
  vagues: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M2 16c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M2 20.5c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/></svg>',
  guitare: '<svg viewBox="0 0 24 24"><path d="M19 2l3 3-6.5 6.5M15.5 11.5l-3-3"/><path d="M12.5 8.5c-2-1-4.5-.5-5.5 1.5-.8 1.6-2.6 1.4-3.6 2.4-1.8 1.8-1 5 1 7s5.2 2.8 7 1c1-1 .8-2.8 2.4-3.6 2-1 2.5-3.5 1.5-5.5"/><circle cx="9" cy="15" r="1.5"/></svg>',
  eclair: '<svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>',
  flamme: '<svg viewBox="0 0 24 24"><path d="M12 22a7 7 0 0 0 7-7c0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 5-5 8a7 7 0 0 0 7 7z"/></svg>',
  disco: '<svg viewBox="0 0 24 24"><path d="M12 2v3"/><circle cx="12" cy="13" r="8"/><path d="M4 13h16M5.5 9h13M5.5 17h13M12 5c-3 3-3 13 0 16M12 5c3 3 3 13 0 16"/></svg>',
  cassette: '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><circle cx="16" cy="11" r="2"/><path d="M10 11h4M6 19l2-4h8l2 4"/></svg>',
  baladeur: '<svg viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="3"/><rect x="8.5" y="4.5" width="7" height="6" rx="1"/><circle cx="12" cy="16" r="3"/></svg>',
  vinyle: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 6a6 6 0 0 1 6 6M6 12a6 6 0 0 0 6 6"/></svg>',
  lune: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/><path d="M17 3v3M15.5 4.5h3"/></svg>',
  micro: '<svg viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8"/></svg>'
};

/* ===== LES ÉMISSIONS (une couleur par émission) ===== */
const EMISSIONS = {
  morning:     { titre: "Morning Energy",      picto: "soleil",   c1: "#ff9f1c", c2: "#ffd27a", fond: "#5a2a06", slogan: "Le réveil en douceur, mais pas trop.", texte: "Des titres solaires pour démarrer la journée du bon pied. Positive vibes, bonne humeur et zéro morceau qui traîne des pieds. Le café reste à votre charge, l'énergie, on s'en occupe.", genres: ["Pop", "Feel good", "Bonne humeur"] },
  bestpop:     { titre: "Best Pop",            picto: "etoile",   c1: "#ff3fa4", c2: "#ffc2e3", fond: "#5a0f3a", slogan: "Les tubes qu'on fredonne sans le vouloir.", texte: "Le meilleur de la pop actuelle, en continu. Des refrains qui restent en tête toute la matinée et des titres qui donnent envie de monter le son au bureau. Discrètement, bien sûr.", genres: ["Pop", "Hits du moment"] },
  popmix:      { titre: "Pop Mix",             picto: "casque",   c1: "#3d7bff", c2: "#bcd2ff", fond: "#0f1f5a", slogan: "La pause de midi, version playlist.", texte: "Un mélange pop léger pour accompagner le repas, la promenade ou la petite sieste discrète. Du rythme sans prise de tête, des voix qu'on connaît et quelques surprises.", genres: ["Pop", "Mix"] },
  pop2000s:    { titre: "2000s Pop",           picto: "clapet",   c1: "#5ee03a", c2: "#d2ffb8", fond: "#163f0c", slogan: "Retour au temps des téléphones à clapet.", texte: "Les tubes pop des années 2000, ceux qu'on chantait à tue-tête avant les réseaux sociaux. Nostalgie garantie, téléphone à clapet non fourni.", genres: ["Pop", "Années 2000"], artistes: ["Britney Spears", "Beyoncé", "Justin Timberlake", "Shakira", "Robbie Williams"] },
  dance:       { titre: "Dance Mix",           picto: "vagues",   c1: "#a855f7", c2: "#e3c8ff", fond: "#2e0f5a", slogan: "Beach vibes, même quand il pleut.", texte: "Des rythmes dance et électro aux airs de plage pour finir la journée en douceur. Fermez les yeux, vous êtes presque en vacances.", genres: ["Dance", "Électro", "Beach vibes"] },
  rockclassics:{ titre: "Rock Classics",       picto: "guitare",  c1: "#ffd60a", c2: "#fff2b3", fond: "#3a3005", slogan: "Les monuments du rock, sans la poussière.", texte: "Les grands classiques du rock, ceux qui ont tout inventé. Guitares saturées, refrains mythiques et solos qui donnent envie de jouer de la guitare imaginaire dans le salon.", genres: ["Rock", "Classiques"], artistes: ["The Rolling Stones", "Queen", "Led Zeppelin", "AC/DC", "Pink Floyd"] },
  rock90:      { titre: "Rock 90's",           picto: "eclair",   c1: "#ff4d3d", c2: "#ffc0b8", fond: "#4a0f0a", slogan: "Chemise à carreaux recommandée.", texte: "Le rock des années 90, du grunge aux grands hymnes de stade. Montez le volume, les voisins comprendront. Ou pas.", genres: ["Rock", "Années 90", "Grunge"], artistes: ["Nirvana", "Pearl Jam", "Red Hot Chili Peppers", "Oasis", "Foo Fighters"] },
  rock2000:    { titre: "Rock 2000's",         picto: "flamme",   c1: "#22d3ee", c2: "#c9fbff", fond: "#08303a", slogan: "Le rock qui a fait vibrer les années 2000.", texte: "Riffs efficaces, refrains taillés pour les festivals et énergie à revendre. Le rock des années 2000, celui qu'on écoutait en boucle dans la voiture.", genres: ["Rock", "Années 2000"], artistes: ["Linkin Park", "The White Stripes", "Muse", "The Killers", "Green Day"] },
  radio7080:   { titre: "70s 80s Radio",       picto: "disco",    c1: "#ff7a45", c2: "#ffd0bd", fond: "#4a1c0c", slogan: "Paillettes, synthés et brushings audacieux.", texte: "Les tubes pop des années 70 et 80, du disco aux synthés. Des chansons que tout le monde connaît, même ceux qui n'étaient pas nés.", genres: ["Disco", "Pop", "Années 70 et 80"], artistes: ["ABBA", "Michael Jackson", "Madonna", "Bee Gees", "Cyndi Lauper"] },
  radio90:     { titre: "90's Radio",          picto: "cassette", c1: "#7c83ff", c2: "#d9dbff", fond: "#1a1d5a", slogan: "La décennie qui ne vieillit pas.", texte: "Les hits pop des années 90, ceux des boums, des cassettes et des premières radios libres. De la bonne humeur, sans modération.", genres: ["Pop", "Années 90"], artistes: ["Spice Girls", "Backstreet Boys", "Céline Dion", "Whitney Houston", "Ace of Base"] },
  radio2000:   { titre: "2000's Radio",        picto: "baladeur", c1: "#2ee6a6", c2: "#c4ffe9", fond: "#083a2a", slogan: "Les années 2000 en version best of.", texte: "Les grands tubes pop des années 2000, à écouter fort. Idéal pour la soirée, quand il reste encore un peu d'énergie à dépenser.", genres: ["Pop", "Années 2000"], artistes: ["Rihanna", "Black Eyed Peas", "Lady Gaga", "Coldplay", "Kylie Minogue"] },
  mix1990:     { titre: "1990s Mix",           picto: "vinyle",   c1: "#c8f031", c2: "#efffc0", fond: "#34420a", slogan: "Un grand mix des années 90.", texte: "Eurodance, pop, R&B et grands classiques des années 90 dans un mix sans temps mort. Pour finir la soirée en beauté.", genres: ["Eurodance", "Pop", "Années 90"], artistes: ["Dr. Alban", "2 Unlimited", "Haddaway", "Mylène Farmer", "TLC"] },
  mix7080:     { titre: "Radio 70's 80's Mix", picto: "lune",     c1: "#e14eea", c2: "#f7cdfa", fond: "#40104a", slogan: "Les nuits rétro de L'Escale.", texte: "Toute la nuit, les plus belles chansons des années 70 et 80 tournent pour les insomniaques, les travailleurs de nuit et les rêveurs. Le phare reste allumé.", genres: ["Années 70 et 80", "Nuit"], artistes: ["Elton John", "Daniel Balavoine", "Tina Turner", "Earth, Wind & Fire", "Indochine"] },
  libre:       { titre: "La libre antenne",    picto: "micro",    c1: "#f2b45a", c2: "#fff0c4", fond: "#3a2608", slogan: "Programme à définir. Les lignes ouvrent bientôt.", texte: "Vous appelez, on écoute, on en parle. Le voisin bruyant, le chef impossible, le moral en berne. La libre antenne de L'Escale du Soir arrive du lundi au jeudi, de 22h00 à 23h00. Le programme exact sera bientôt dévoilé. Restez à l'écoute.", genres: ["Appels des auditeurs", "Libre antenne"], libre: true }
};

/* ===== LA GRILLE (heure de Suisse) ===== */
const SEMAINE = (rock, retro) => [
  ["00:00","06:00","mix7080"], ["06:00","09:00","morning"], ["09:00","12:00","bestpop"], ["12:00","14:00","popmix"],
  ["14:00","16:00","pop2000s"], ["16:00","18:00","dance"], ["18:00","20:00",rock], ["20:00","22:00",retro],
  ["22:00","23:00","libre"], ["23:00","24:00","mix7080"]
];
const GRILLE = {
  1: SEMAINE("rockclassics", "radio7080"),
  2: SEMAINE("rock90", "radio90"),
  3: SEMAINE("rock2000", "radio2000"),
  4: SEMAINE("rockclassics", "mix1990"),
  5: [["00:00","06:00","mix7080"], ["06:00","09:00","morning"], ["09:00","12:00","bestpop"], ["12:00","14:00","popmix"],
      ["14:00","16:00","pop2000s"], ["16:00","18:00","dance"], ["18:00","20:00","rock90"], ["20:00","22:00","radio7080"], ["22:00","24:00","mix1990"]],
  6: [["00:00","06:00","mix7080"], ["06:00","10:00","morning"], ["10:00","13:00","bestpop"], ["13:00","16:00","pop2000s"],
      ["16:00","19:00","rock2000"], ["19:00","22:00","popmix"], ["22:00","24:00","dance"]],
  0: [["00:00","06:00","mix7080"], ["06:00","10:00","morning"], ["10:00","13:00","radio7080"], ["13:00","16:00","rockclassics"],
      ["16:00","19:00","radio90"], ["19:00","22:00","radio2000"], ["22:00","24:00","mix1990"]]
};
const JOURS = [[1,"Lundi"],[2,"Mardi"],[3,"Mercredi"],[4,"Jeudi"],[5,"Vendredi"],[6,"Samedi"],[0,"Dimanche"]];
const NOMS = Object.fromEntries(JOURS);

/* ===== Heure actuelle en Suisse ===== */
function maintenantSuisse() {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Zurich", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
    .formatToParts(new Date()).map(x => [x.type, x.value]));
  const jour = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[p.weekday];
  return { jour, minutes: (+p.hour) * 60 + (+p.minute) };
}
const enMinutes = h => { const [a, b] = h.split(":").map(Number); return a * 60 + b; };
const affiche = h => h === "24:00" ? "00:00" : h;

