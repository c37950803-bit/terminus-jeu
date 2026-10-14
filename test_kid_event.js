// Diagnostic de l'événement « libérer l'enfant » dans le vrai jeu (headless) :
// - où se trouve l'enfant, si traversee("kidnapped") le résout depuis la grotte
// - si fire("...freekid") déclenche l'écouteur "...freeKid" (sensibilité casse)
// - état initial de lady / CryingMan / Kid
"use strict";
const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawn } = require("child_process");
const http = require("http");

const HERE = __dirname;
const htmlFile = process.argv[2] || path.join(HERE, "Terminus.html");
const fileUrl = "file:///" + path.resolve(htmlFile).replace(/\\/g, "/");

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "terminus-kid-"));
const PORT = 9336;

const chrome = spawn(CHROME, [
  "--headless=new", "--remote-debugging-port=" + PORT,
  "--user-data-dir=" + userDataDir, "--no-first-run",
  "--no-default-browser-check", "--disable-gpu", "--mute-audio",
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function getJson(p) {
  return new Promise((resolve, reject) => {
    http.get({ host: "127.0.0.1", port: PORT, path: p }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => { try { resolve(JSON.parse(d)); } catch (e) { reject(e); } });
    }).on("error", reject);
  });
}

function cdp(ws, onEvent) {
  let id = 0;
  const pending = {};
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(typeof ev.data === "string" ? ev.data : ev.data.toString());
    if (msg.id && pending[msg.id]) { pending[msg.id](msg); delete pending[msg.id]; }
    else if (msg.method && onEvent) onEvent(msg);
  });
  return (method, params) =>
    new Promise((resolve) => {
      const mid = ++id;
      pending[mid] = resolve;
      ws.send(JSON.stringify({ id: mid, method, params: params || {} }));
    });
}

async function waitForPage() {
  for (let i = 0; i < 80; i++) {
    try {
      const list = await getJson("/json/list");
      const page = list.find((t) => t.type === "page");
      if (page && page.webSocketDebuggerUrl) return page;
    } catch (e) {}
    await sleep(250);
  }
  throw new Error("page target introuvable");
}

(async () => {
  try {
    const page = await waitForPage();
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    const logs = [];
    const send = cdp(ws, (msg) => {
      if (msg.method === "Runtime.consoleAPICalled") {
        logs.push("[log] " + (msg.params.args || []).map((a) => a.value || a.description || "").join(" ").slice(0, 200));
      } else if (msg.method === "Runtime.exceptionThrown") {
        const d = msg.params.exceptionDetails;
        logs.push("[EXC] " + (d.text || "") + " " + (d.exception && d.exception.description || ""));
      }
    });
    await send("Runtime.enable");
    await send("Page.navigate", { url: fileUrl });

    const evalExpr = async (expr) => {
      const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: false });
      if (r.error) throw new Error("CDP: " + JSON.stringify(r.error));
      const body = r.result;
      if (body.exceptionDetails) throw new Error("JS: " + (body.exceptionDetails.text || "") + " " + (body.exceptionDetails.exception && body.exceptionDetails.exception.description || ""));
      return body.result && body.result.value;
    };

    // Attendre que les objets du jeu soient créés
    let ready = false;
    for (let i = 0; i < 40; i++) {
      await sleep(500);
      try {      ready = await evalExpr("!!(window.vt && window.Kid && window.$cage && window.$trollcave && window.lady && window.CryingMan)"); } catch (e) {}
      if (ready) break;
    }
    if (!ready) throw new Error("objets du jeu introuvables");

    // Scan de TOUS les objets avec cmd_event : l'écouteur existe-t-il ?
    const scan = await evalExpr(`(function(){
      var broken = [], ok = [], seen = {};
      function check(o, path) {
        if (!o || typeof o !== "object" || !o.uid || seen[o.uid]) return;
        seen[o.uid] = 1;
        if (o.cmd_event) {
          for (var evt in o.cmd_event) {
            if (!o.cmd_event.hasOwnProperty(evt)) continue;
            var v = o.cmd_event[evt];
            if (typeof v !== "string") continue;
            var name = o.uid + v;
            var has = o._listeners && o._listeners[name] && o._listeners[name].length;
            (has ? ok : broken).push(path + " [" + evt + "] -> " + v + " (listener:" + !!has + ")");
          }
        }
        var lists = [];
        if (o.items) lists.push(o.items);
        if (o.children) lists.push(o.children);
        if (o.parents) lists.push(o.parents);
        for (var i = 0; i < lists.length; i++)
          for (var j = 0; j < lists[i].length; j++) check(lists[i][j], path + "/" + (lists[i][j].name || "?"));
      }
      var keys = Object.keys(window);
      for (var k = 0; k < keys.length; k++) {
        var o = window[keys[k]];
        if (o && typeof o === "object" && (o.items || o.children || o.cmd_event)) check(o, keys[k]);
      }
      return JSON.stringify({broken: broken, okCount: ok.length}, null, 1);
    })()`);
    console.log("=== SCAN DES ÉVÉNEMENTS ===");
    console.log(scan);

    const diag = await evalExpr(`JSON.stringify({
      kidRoom: Kid.room ? Kid.room.varname : null,
      kidUid: Kid.uid,
      kidName: Kid.name,
      kidToString: String(Kid),
      kidCmdTextMv: (Kid.cmd_text && Kid.cmd_text.mv || "").slice(0, 40),
      ladyName: String(lady),
      cryingName: String(CryingMan),
      cageItems: $cage.items.map(String),
      trollChildren: $trollcave.children.map(String),
      travTrollKidId: !!$trollcave.traversee("kidnapped").item,
      travTrollKidDisp: !!$trollcave.traversee(String(Kid)).item,
      travCageKidId: !!$cage.traversee("kidnapped").item,
      travCageKidDisp: !!$cage.traversee(String(Kid)).item,
      roomMeadowName: _("room_meadow"),
      cmdEventMv: Kid.cmd_event.mv,
      listenersKid: Object.keys(Kid._listeners || {}),
      actionsKid: Object.keys(state.actions).filter(k => k.indexOf("kidn") >= 0),
      dialogMeadow: (typeof room_meadow !== "undefined" ? room_meadow : null)
    }, null, 1)`);
    console.log("=== DIAGNOSTIC INITIAL ===");
    console.log(diag);

    // Déclencher l'événement comme le ferait la commande mv
    console.log("=== FIRE (tel que la commande mv le ferait) ===");
    logs.length = 0;
    const before = await evalExpr("JSON.stringify({kid: Kid.room.varname, lady: lady.room.varname})");
    await evalExpr('Kid.fire_event(null, "mv", ["EnfantKidnapé", "Cage"], 0)');
    await sleep(600);
    const after = await evalExpr(`JSON.stringify({
      kid: Kid.room.varname,
      lady: lady.room.varname,
      crying: CryingMan.room.varname,
      kidfreed: state.params["kidfreed"],
      actionParam: state.params["kidn1freeKid"],
      ladyLessEvent: lady.cmd_event.less_done,
      ladyLessText: (lady.cmd_text.less || "").slice(0, 60),
      cryingLessText: (CryingMan.cmd_text.less || "").slice(0, 60),
      kidMvText: (Kid.cmd_text.mv || "").slice(0, 50)
    }, null, 1)`);
    console.log("avant:", before);
    console.log("après:", after);
    console.log("console pendant le fire:");
    logs.forEach((l) => console.log("  " + l));
    const mesgShown = await evalExpr('vt.monitor.textContent.indexOf("a retrouvé ses parents") >= 0');
    console.log("message de réunion affiché (doit être vrai):", mesgShown);

    // Vérifier le rejeu au chargement (comme loadCookie le ferait)
    console.log("=== REJEU (chargement de sauvegarde) ===");
    logs.length = 0;
    await evalExpr('state.apply("kidn1freeKid", "1")');
    await sleep(400);
    const hasMesg = logs.some((l) => l.indexOf("système") >= 0 || l.indexOf("Système") >= 0 || l.indexOf("Message de") >= 0);
    console.log("mesg affiché lors du rejeu (doit être faux):", hasMesg);
    console.log("console rejeu:");
    logs.slice(0, 5).forEach((l) => console.log("  " + l));

    const ok = await evalExpr(`(function(){
      var a = Kid.room.varname === "$clearing";
      var b = lady.room.varname === "$clearing";
      var c = lady.cmd_event.less_done === "reunion";
      var d = !!state.params["kidfreed"];
      var e = (CryingMan.cmd_text.less || "").indexOf("Ma femme ! Mon enfant !") >= 0;
      var f = (Kid.cmd_text.mv || "").indexOf("déjà rentrée") >= 0;
      return a && b && c && d && e && f;
    })()`);
    console.log("\n" + (ok ? "✔ SUCCÈS : réunion famille complète (enfant + mère à la clairière, père au rendez-vous, textes à jour)." : "✘ ÉCHEC de la réunion."));
    process.exit(ok ? 0 : 1);

    try { chrome.kill(); } catch (e) {}
    process.exit(0);
  } catch (e) {
    console.error("ERREUR:", e.message);
    try { chrome.kill(); } catch (x) {}
    process.exit(2);
  }
})();
