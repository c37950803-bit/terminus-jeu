// Test du patch sauvegarde : simule un navigateur en file:// où les cookies
// natifs sont bloqués, puis vérifie que les fonctions Cookie du jeu
// (parse/check/stringify/read/write, copiées de a_deobfuscated/deobfuscated.js)
// font un aller-retour correct à travers le shim.
"use strict";
const fs = require("fs");

// --- Mock navigateur : localStorage disponible, cookies natifs bloqués ---
// Reproduit le comportement de Chrome en file:// : le setter natif de
// document.cookie existe toujours mais ignore silencieusement l'écriture.
const store = {};
let rawCookie = ""; // en file:// les écritures natives sont ignorées
function makeDocument() {
  const doc = {};
  Object.defineProperty(doc, "cookie", {
    configurable: true,
    get: () => rawCookie,
    set: () => { /* Chrome file:// : écriture perdue */ },
  });
  return doc;
}
global.window = {
  localStorage: {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
  },
};
global.document = makeDocument();

// --- Extrait le shim du patch depuis le fichier HTML passé en argument ---
const htmlFile = process.argv[2] || "Terminus.html";
const html = fs.readFileSync(htmlFile, "utf8");
const start = html.indexOf("// Patch sauvegarde");
if (start === -1) throw new Error("Shim introuvable dans " + htmlFile);
const iifeStart = html.indexOf("(function () {", start);
const iifeEnd = html.indexOf("})();", iifeStart);
const shimSrc = html.slice(iifeStart, iifeEnd + 5);
eval(shimSrc);

// --- Fonctions Cookie du jeu (copiées de a_deobfuscated/deobfuscated.js) ---
const dom = global.document;
function Cookie(e, t) { this.name = e; this.minutes = t; }
Cookie.prototype = {
  parse: function (e) {
    var t = null;
    for (var n = e.split(";"), r = 0; r < n.length; r++) {
      for (var o = n[r]; o.charAt(0) == " ";) o = o.substring(1, o.length);
      if (o.indexOf(this.name) === 0) {
        t = {};
        var i = o.split("=");
        i.shift();
        for (var s = 0; s < i.length; s++) {
          var a = i[s].split(":");
          if (a.length == 2 && a[1] !== "undefined") t[a[0]] = a[1];
        }
        break;
      }
    }
    return t;
  },
  check: function () {
    for (var e = dom.cookie.split(";"), t = 0; t < e.length; t++) {
      for (var n = e[t]; n.charAt(0) == " ";) n = n.substring(1, n.length);
      if (n.indexOf(this.name) === 0) return true;
    }
    return false;
  },
  stringify: function (e) {
    var t = "";
    for (var n in e) if (e.hasOwnProperty(n)) t += n + ":" + e[n] + "=";
    return t;
  },
  read: function () { return this.parse(dom.cookie); },
  write: function (e) {
    var t = new Date();
    t.setTime(t.getTime() + this.minutes * 60 * 1000);
    dom.cookie = this.name + "=" + this.stringify(e) + "; expires=" + t.toGMTString() + "; path=/";
  },
};

// --- Scénario de jeu : comme start_game / setCurrentRoom / saveCookie ---
const cookie_version = "terminus0.1beta";
const state = {
  params: { "": "$home", usr: "Alice", adr: "Prairie", mvBoulder: 1 },
  cookie: new Cookie(cookie_version, 10080),
  saveCookie() { if (this.cookie) this.cookie.write(this.params); },
};

state.saveCookie(); // premier passage "oui (nouveau jeu)"

// 1. check() doit trouver le cookie (équivalent du rechargement de la page)
const found = new Cookie(cookie_version).check();
console.log("check() après écriture :", found);

// 2. read() doit restituer exactement les paramètres sauvegardés
const loaded = new Cookie(cookie_version).read();
console.log("read() :", JSON.stringify(loaded));
const ok =
  found === true &&
  loaded[""] === "$home" &&
  loaded.usr === "Alice" &&
  loaded.adr === "Prairie" &&
  loaded.mvBoulder === "1";

// 3. Simule un rechargement complet : nouveau document (setters natifs
//    bloqués comme en file://), même localStorage
rawCookie = "";
global.document = makeDocument();
eval(shimSrc);
const reloaded = new Cookie(cookie_version).read();
console.log("read() après rechargement simulé :", JSON.stringify(reloaded));
const okReload = reloaded && reloaded.usr === "Alice" && reloaded[""] === "$home";

// 4. Un cookie d'un autre nom ne doit pas être confondu avec le nôtre
const other = new Cookie("autrejeu1.0").check();
console.log("check() autre jeu :", other);

if (ok && okReload && other === false) {
  console.log("\n✔ SUCCÈS : la sauvegarde passe correctement par localStorage.");
  process.exit(0);
} else {
  console.log("\n✘ ÉCHEC du test.");
  process.exit(1);
}
