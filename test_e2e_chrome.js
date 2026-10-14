// Test end-to-end du vrai jeu dans Chrome headless (file://) :
// 1. Charge Terminus.html, choisit « oui (nouveau jeu) »
// 2. Répond aux prompts (nom, adresse)
// 3. Déplace le personnage (cd meadow) → déclenche saveCookie
// 4. Vérifie que localStorage contient la sauvegarde
// 5. RECHARGE la page → vérifie que « oui (reprendre…) » est proposé
// 6. Choisit « reprendre » → vérifie que la pièce est restaurée
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
const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "terminus-e2e-"));
const PORT = 9335;

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

async function connectToPage() {
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

const allLogs = [];
async function main() {
  const logs = allLogs;
  const page = await connectToPage();
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  const send = cdp(ws, (msg) => {
    if (msg.method === "Runtime.exceptionThrown") {
      const d = msg.params.exceptionDetails;
      logs.push("[EXCEPTION] " + (d.text || "") + " " + (d.exception && d.exception.description || ""));
    } else if (msg.method === "Runtime.consoleAPICalled") {
      logs.push("[" + msg.params.type + "] " + (msg.params.args || []).map((a) => a.value || a.description || "").join(" ").slice(0, 300));
    }
  });
  await send("Runtime.enable");
  await send("Page.enable");    const dumpLogs = () => { console.log("=== CONSOLE ==="); logs.slice(-40).forEach((l) => console.log(l)); };

  const evalExpr = async (expr) => {
    const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
    if (r.error) throw new Error("CDP error: " + JSON.stringify(r.error));
    const body = r.result;
    if (body.exceptionDetails) throw new Error("JS: " + (body.exceptionDetails.text || "") + " " + (body.exceptionDetails.exception && body.exceptionDetails.exception.description || ""));
    return body.result && body.result.value;
  };

  const waitFor = async (expr, timeoutMs, label) => {
    const t0 = Date.now();
    for (;;) {
      let v;
      try { v = await evalExpr(expr); } catch (e) { v = null; }
      if (v) return v;
      if (Date.now() - t0 > timeoutMs) throw new Error("TIMEOUT en attente de : " + (label || expr));
      await sleep(250);
    }
  };

  const nav = async () => {
    await send("Page.navigate", { url: fileUrl });
    await sleep(300);
  };

  const results = [];
  const check = (name, ok, detail) => {
    results.push({ name, ok, detail });
    console.log((ok ? "✔" : "✘") + " " + name + (detail ? " — " + detail : ""));
  };

  // --- 1. Chargement : le menu cookie apparaît ---
  await nav();
  var radioCount1;
  try {
    radioCount1 = await waitFor("document.querySelectorAll('.choice input').length", 20000, "menu cookie");
  } catch (e) {
    const diag = await evalExpr("JSON.stringify({readyState: document.readyState, hasVt: !!window.vt, termChildren: document.getElementById('term') ? document.getElementById('term').children.length : -1, title: document.title, url: location.href})");
    console.log("DIAG:", diag);
    dumpLogs();
    throw e;
  }
  const labels1 = await evalExpr("Array.from(document.querySelectorAll('.choice label')).map(function(l){return l.textContent.trim()})");
  console.log("Menu initial :", JSON.stringify(labels1));
  check("menu affiché au premier lancement", radioCount1 >= 2);
  check("pas d'option « reprendre » au premier lancement", labels1.join("|").indexOf("reprendre") === -1);

  // --- 2. Choisir « oui (nouveau jeu) » (premier radio) ---
  await evalExpr("document.querySelector('.choice input').click()");

  // --- 3. Trois prompts : prélude (histoire), nom, adresse ---
  await waitFor("window.vt && vt.answer_input", 25000, "prompt prélude");
  await evalExpr("vt.answer_input.value='Une longue histoire de test.'; vt.enterKey()");
  await waitFor("window.vt && vt.answer_input", 25000, "prompt nom");
  await evalExpr("vt.answer_input.value='TestPlayer'; vt.enterKey()");
  await waitFor("window.vt && vt.answer_input", 25000, "prompt adresse");
  await evalExpr("vt.answer_input.value='Prairie'; vt.enterKey()");

  // --- 4. Fin du prélude : entrée activée ---
  try {
    await waitFor("window.vt && vt.disabled && vt.disabled.input === false", 40000, "démarrage du jeu");
  } catch (e) {
    const st = await evalExpr("JSON.stringify({disabled: window.vt ? window.vt.disabled : null, hasAnswerInput: !!(window.vt && window.vt.answer_input), monitorText: window.vt && window.vt.monitor ? window.vt.monitor.textContent.slice(-200) : null})");
    console.log("ÉTAT JEU:", st);
    dumpLogs();
    throw e;
  }
  console.log("Jeu démarré.");

  // --- 5. Sauvegarde : changer de pièce (déclenche saveCookie) ---
  const runCmd = async (cmd) => {
    await evalExpr("vt.set_line(" + JSON.stringify(cmd) + "); vt.enter()");
    await sleep(1200);
    return await evalExpr("state.params['']");
  };
  let room1 = await runCmd("cd Prairie");
  if (room1 !== "$meadow") room1 = await runCmd("cd ~");
  console.log("Pièce courante :", room1);
  check("déplacement effectué", room1 === "$meadow" || room1 === "$home", "room=" + room1);
  const jar = await evalExpr("localStorage.getItem('__terminus_cookies')");
  console.log("jar localStorage :", JSON.stringify(jar));
  check("sauvegarde écrite dans localStorage", !!jar && jar.indexOf("terminus0.1beta") !== -1, String(jar).slice(0, 150));
  check("sauvegarde contient la pièce " + room1, !!jar && room1 && jar.indexOf(room1) !== -1);

  // --- 6. RECHARGEMENT ---
  await nav();
  const radioCount2 = await waitFor("document.querySelectorAll('.choice input').length", 20000, "menu après reload");
  const labels2 = await evalExpr("Array.from(document.querySelectorAll('.choice label')).map(function(l){return l.textContent.trim()})");
  console.log("Menu après rechargement :", JSON.stringify(labels2));
  check("menu propose 3 options après rechargement", radioCount2 === 3, "count=" + radioCount2);
  check("option « reprendre la partie en cours » présente", labels2.join("|").indexOf("reprendre") !== -1);

  // --- 7. Choisir « reprendre » ---
  await evalExpr("document.querySelector('.choice input').click()");
  await sleep(3000);
  const restored = await evalExpr("window.vt && vt.context ? vt.context.varname : '(pas de contexte)'");
  console.log("Pièce après reprise :", restored);
  check("partie restaurée dans " + room1, restored === room1, String(restored));

  const summary = results.filter((r) => !r.ok);
  console.log("\n" + (summary.length === 0 ? "✔ SUCCÈS : la sauvegarde fonctionne bout en bout dans Chrome." : "✘ " + summary.length + " vérifications ont échoué."));
  try { chrome.kill(); } catch (e) {}
  process.exit(summary.length === 0 ? 0 : 1);
}main().catch((e) => {
  console.error("ERREUR:", e.message);
  if (allLogs.length) { console.log("=== CONSOLE ==="); allLogs.slice(-40).forEach((l) => console.log(l)); }
  try { chrome.kill(); } catch (x) {}
  process.exit(2);
});
