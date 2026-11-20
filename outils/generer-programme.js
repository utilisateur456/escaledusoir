/* Regénère le résumé invisible de programme.html (balise noscript, lu par Google et les IA) et llms.txt
   à partir de grille.js. À lancer après chaque changement de grille :
   node outils/generer-programme.js */
const fs = require("fs"), path = require("path"), vm = require("vm");
const racine = path.join(__dirname, "..");
const ctx = {};
vm.runInNewContext(fs.readFileSync(path.join(racine, "grille.js"), "utf8") + "\nthis.R={EMISSIONS,GRILLE,JOURS,affiche};", ctx);
const { EMISSIONS, GRILLE, JOURS, affiche } = ctx.R;
const esc = t => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const creneaux = id => {
  const out = [];
  JOURS.forEach(([j, nom]) => GRILLE[j].filter(c => c[2] === id).forEach(([d, f]) => out.push(`${nom} de ${affiche(d)} à ${affiche(f)}`)));
  return out;
};

let html = `<section class="resume" id="toutes-les-emissions">
  <h2>Toutes les émissions</h2>
  <p class="resume-intro">L'Escale du Soir, radio en ligne de Suisse romande, diffuse de la musique 24 heures sur 24 et une libre antenne du lundi au jeudi de 22h00 à 23h00. Heures de Suisse.</p>
  <div class="resume-liste">\n`;
for (const [id, e] of Object.entries(EMISSIONS)) {
  html += `    <article class="resume-item" style="--c1:${e.c1}">
      <h3>${esc(e.titre)}</h3>
      <p class="resume-slogan">${esc(e.slogan)}</p>
      <p>${esc(e.texte)}</p>
      <p class="resume-horaires"><strong>Horaires :</strong> ${esc(creneaux(id).join(", "))}.</p>${e.artistes ? `\n      <p class="resume-horaires"><strong>L'époque de :</strong> ${esc(e.artistes.join(", "))}.</p>` : ""}
    </article>\n`;
}
html += `  </div>\n</section>`;

const ld = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": "https://escaledusoir.ch/programme.html", "url": "https://escaledusoir.ch/programme.html",
      "name": "Grille des programmes de L'Escale du Soir", "inLanguage": "fr-CH",
      "isPartOf": { "@type": "WebSite", "@id": "https://escaledusoir.ch/#site", "url": "https://escaledusoir.ch/" },
      "about": { "@type": "RadioStation", "@id": "https://escaledusoir.ch/#radio", "name": "L'Escale du Soir", "url": "https://escaledusoir.ch/" } },
    { "@type": "ItemList", "name": "Émissions de L'Escale du Soir",
      "itemListElement": Object.entries(EMISSIONS).map(([id, e], i) => ({
        "@type": "ListItem", "position": i + 1,
        "item": { "@type": "RadioSeries", "name": e.titre, "description": e.slogan + " " + e.texte, "inLanguage": "fr",
          "genre": e.genres, "url": "https://escaledusoir.ch/programme.html?e=" + id }
      })) }
  ]
};

const f = path.join(racine, "programme.html");
let s = fs.readFileSync(f, "utf8");
const remplace = (debut, fin, contenu) => {
  const a = s.indexOf(debut), b = s.indexOf(fin);
  if (a < 0 || b < 0) throw new Error("Repère manquant : " + debut);
  s = s.slice(0, a + debut.length) + "\n" + contenu + "\n" + s.slice(b);
};
remplace("<!-- RESUME:DEBUT -->", "<!-- RESUME:FIN -->", html);
remplace("<!-- LD:DEBUT -->", "<!-- LD:FIN -->", '<script type="application/ld+json">\n' + JSON.stringify(ld, null, 1) + "\n</script>");
fs.writeFileSync(f, s);

// llms.txt : même résumé, en texte simple pour les IA
const fl = path.join(racine, "llms.txt");
let l = fs.readFileSync(fl, "utf8");
const txt = Object.entries(EMISSIONS).map(([id, e]) =>
  `### ${e.titre}\n${e.slogan} ${e.texte}\nHoraires (heure de Suisse) : ${creneaux(id).join(", ")}.` + (e.artistes ? `\nL'époque de : ${e.artistes.join(", ")}.` : "")
).join("\n\n");
const a = l.indexOf("<!-- EMISSIONS:DEBUT -->"), b = l.indexOf("<!-- EMISSIONS:FIN -->");
if (a >= 0 && b >= 0) { l = l.slice(0, a + 24) + "\n" + txt + "\n" + l.slice(b); fs.writeFileSync(fl, l); }
console.log("programme.html mis à jour :", Object.keys(EMISSIONS).length, "émissions");
