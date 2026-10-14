// Vérifie si Chrome partage localStorage entre deux pages file:// de
// DOSSIERS DIFFÉRENTS (cas : le joueur déplace ou duplique le jeu).
"use strict";
const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawn } = require("child_process");
const http = require("http");

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "terminus-cross-"));
const dirA = path.join(tmp, "dossierA");
const dirB = path.join(tmp, "dossierB");
fs.mkdirSync(dirA);
fs.mkdirSync(dirB);
const pageA = path.join(dirA, "a.html");
const pageB = path.join(dirB, "b.html");
fs.writeFileSync(pageA, '<!DOCTYPE html><title>A</title><script>localStorage.setItem("__cross","OK-A");document.title="DONE";</script>');
fs.writeFileSync(pageB, '<!DOCTYPE html><title>B</title><script>document.title = "VAL:" + String(localStorage.getItem("__cross"));</script>');

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "terminus-profile-"));
const PORT = 9337;
const chrome = spawn(CHROME, [
  "--headless=new", "--remote-debugging-port=" + PORT,
  "--user-data-dir=" + userDataDir, "--no-first-run",
  "--no-default-browser-check", "--disable-gpu", "about:blank",
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
function cdp(ws) {
  let id = 0;
  const pending = {};
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(typeof ev.data === "string" ? ev.data : ev.data.toString());
    if (msg.id && pending[msg.id]) { pending[msg.id](msg); delete pending[msg.id]; }
  });
  return (method, params) =>
    new Promise((resolve) => {
      const mid = ++id;
      pending[mid] = resolve;
      ws.send(JSON.stringify({ id: mid, method, params: params || {} }));
    });
}

(async () => {
  try {
    let page = null;
    for (let i = 0; i < 60 && !page; i++) {
      try {
        const list = await getJson("/json/list");
        page = list.find((t) => t.type === "page");
      } catch (e) {}
      if (!page) await sleep(250);
    }
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    const send = cdp(ws);
    await send("Runtime.enable");
    await send("Page.enable");
    const evalTitle = async () => {
      const r = await send("Runtime.evaluate", { expression: "document.title", returnByValue: true });
      return r.result && r.result.result && r.result.result.value;
    };
    const nav = async (f) => { await send("Page.navigate", { url: "file:///" + f.replace(/\\/g, "/") }); };
    await nav(pageA);
    for (let i = 0; i < 40; i++) { await sleep(300); if ((await evalTitle()) === "DONE") break; }
    await nav(pageB);
    let v = null;
    for (let i = 0; i < 40; i++) { await sleep(300); v = await evalTitle(); if (v && v.indexOf("VAL:") === 0) break; }
    const shared = v === "VAL:OK-A";
    console.log("Lecture depuis l'autre dossier :", v);
    console.log(shared
      ? "✔ PARTAGÉ : localStorage file:// est commun à tous les dossiers (déplacer le jeu ne perd pas la sauvegarde)."
      : "✘ SÉPARÉ : chaque dossier file:// a son propre localStorage (déplacer/dupliquer le jeu perd la sauvegarde).");
    try { chrome.kill(); } catch (e) {}
    fs.rmSync(tmp, { recursive: true, force: true });
    process.exit(0);
  } catch (e) {
    console.error("ERREUR:", e.message);
    try { chrome.kill(); } catch (x) {}
    process.exit(2);
  }
})();
