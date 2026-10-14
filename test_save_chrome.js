// Diagnostic Chrome headless (file://) : capacités de stockage + shim du jeu,
// avec capture des erreurs JS et de la console.
"use strict";
const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawn } = require("child_process");
const http = require("http");

const HERE = __dirname;
const htmlFile = process.argv[2] || path.join(HERE, "Terminus.html");
const html = fs.readFileSync(htmlFile, "utf8");
const start = html.indexOf("// Patch sauvegarde");
const iifeStart = html.indexOf("(function () {", start);
const iifeEnd = html.indexOf("})();", iifeStart);
const shimSrc = html.slice(iifeStart, iifeEnd + 5);

const pageHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>diag</title></head>
<body>
<pre id="out">BOOT</pre>
<script>
function log(s) {
  var out = document.getElementById("out");
  if (out) out.textContent += "\\n" + s;
  console.log("DIAG: " + s);
}
log("UA = " + navigator.userAgent);
log("origin = " + (window.location.origin || "null"));
try {
  localStorage.setItem("__t1", "a");
  log("localStorage OK : " + localStorage.getItem("__t1"));
} catch (e) { log("localStorage FAIL : " + e.message); }
try {
  sessionStorage.setItem("__t1", "a");
  log("sessionStorage OK : " + sessionStorage.getItem("__t1"));
} catch (e) { log("sessionStorage FAIL : " + e.message); }
try {
  document.cookie = "__probe=1; path=/";
  log("native cookie write, read back = " + JSON.stringify(document.cookie));
} catch (e) { log("native cookie THROW : " + e.message); }
log("cookieEnabled = " + navigator.cookieEnabled);
<\/script>
<script>
${shimSrc}
<\/script>
<script>
try {
  document.cookie = "terminus0.1beta=:clearing=usr:Diag=" + "; expires=" + new Date(Date.now() + 604800000).toGMTString() + "; path=/";
  log("après shim, document.cookie = " + JSON.stringify(document.cookie));
  log("jar = " + JSON.stringify(localStorage.getItem("__terminus_cookies")));
} catch (e) { log("SHIM SET THROW : " + e.message); }
document.title = "DONE";
<\/script>
</body></html>`;

const pagePath = path.join(HERE, "_diag_page.html");
fs.writeFileSync(pagePath, pageHtml);

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "terminus-chrome-"));
const fileUrl = "file:///" + pagePath.replace(/\\/g, "/");

const chrome = spawn(CHROME, [
  "--headless=new", "--remote-debugging-port=9334",
  "--user-data-dir=" + userDataDir, "--no-first-run",
  "--no-default-browser-check", "--disable-gpu", fileUrl,
], { stdio: "ignore" });

function getJson(p) {
  return new Promise((resolve, reject) => {
    http.get({ host: "127.0.0.1", port: 9334, path: p }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => { try { resolve(JSON.parse(d)); } catch (e) { reject(e); } });
    }).on("error", reject);
  });
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForPage() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await getJson("/json/list");
      const page = list.find((t) => t.type === "page" && t.url.indexOf("_diag_page.html") !== -1);
      if (page && page.webSocketDebuggerUrl) return page;
    } catch (e) {}
    await sleep(250);
  }
  throw new Error("page target introuvable");
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

(async () => {
  try {
    const page = await waitForPage();
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    const logs = [];
    const send = cdp(ws, (msg) => {
      if (msg.method === "Runtime.exceptionThrown") {
        const d = msg.params.exceptionDetails;
        logs.push("[EXCEPTION] " + (d.text || "") + " " + (d.exception && d.exception.description || ""));
      } else if (msg.method === "Runtime.consoleAPICalled") {
        logs.push("[console." + msg.params.type + "] " + (msg.params.args || []).map((a) => a.value || a.description || "").join(" "));
      }
    });
    await send("Runtime.enable");
    await send("Log.enable");
    let out = "";
    for (let i = 0; i < 30; i++) {
      await sleep(400);
      const r = await send("Runtime.evaluate", {
        expression: "document.title + '|||' + document.getElementById('out').textContent",
        returnByValue: true,
      });
      const val = r.result && r.result.value;
      if (typeof val === "string" && val.indexOf("DONE") === 0) { out = val; break; }
      if (typeof val === "string") out = val;
    }
    console.log("=== PAGE OUTPUT ===");
    console.log(out ? out.split("|||")[1] : "(aucun)");
    console.log("=== CONSOLE / EXCEPTIONS ===");
    logs.forEach((l) => console.log(l));
    try { chrome.kill(); } catch (e) {}
    fs.unlinkSync(pagePath);
    process.exit(0);
  } catch (e) {
    console.error("ERREUR:", e.message);
    try { chrome.kill(); } catch (x) {}
    try { fs.unlinkSync(pagePath); } catch (x) {}
    process.exit(2);
  }
})();
