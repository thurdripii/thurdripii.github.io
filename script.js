/* =====================================================
   KERNEL DO SITE - Sr.Speedss
   Windows-like • Blog • BFSI • Tech • Object Show
   ===================================================== */

/* ===============================
   CONFIG GERAL
================================ */
const SITE = {
  name: "Sr.Speedss",
  version: "1.0.0",
  theme: "dark",
  debug: true
};

function log(msg) {
  if (SITE.debug) console.log("[SYSTEM]", msg);
}

log("Sistema iniciando...");

/* ===============================
   CURSOR PERSONALIZADO
================================ */
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.cursor =
    "url('cursor/cursor.png'), auto";
});

/* ===============================
   ANIMAÇÃO DE ABERTURA DAS JANELAS
================================ */
window.addEventListener("load", () => {
  document.querySelectorAll(".window").forEach((win, i) => {
    win.style.opacity = "0";
    win.style.transform = "scale(0.95)";
    win.style.transition = "0.35s ease";

    setTimeout(() => {
      win.style.opacity = "1";
      win.style.transform = "scale(1)";
    }, 120 + i * 80);
  });
});

/* ===============================
   JANELAS ARRASTÁVEIS
================================ */
let activeWindow = null;
let offsetX = 0;
let offsetY = 0;

document.addEventListener("mousedown", e => {
  const bar = e.target.closest(".title-bar");
  if (!bar) return;

  activeWindow = bar.parentElement;
  offsetX = e.clientX - activeWindow.offsetLeft;
  offsetY = e.clientY - activeWindow.offsetTop;

  activeWindow.style.zIndex = Date.now();
});

document.addEventListener("mousemove", e => {
  if (!activeWindow) return;

  activeWindow.style.left = e.clientX - offsetX + "px";
  activeWindow.style.top = e.clientY - offsetY + "px";
  activeWindow.style.position = "absolute";
});

document.addEventListener("mouseup", () => {
  activeWindow = null;
});

/* ===============================
   BOTÃO FECHAR (SE EXISTIR)
================================ */
document.addEventListener("click", e => {
  if (e.target.classList.contains("close")) {
    e.target.closest(".window").style.display = "none";
  }
});

/* ===============================
   BOTÕES E LINKS (HOVER WINDOWS)
================================ */
document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("mouseenter", () => {
    el.style.background = "#e6e6e6";
    el.style.color = "#000";
  });
  el.addEventListener("mouseleave", () => {
    el.style.background = "";
    el.style.color = "";
  });
});

/* ===============================
   ALERTA ESTILO WINDOWS
================================ */
function winAlert(text) {
  const box = document.createElement("div");
  box.className = "window small";
  box.style.position = "fixed";
  box.style.top = "40%";
  box.style.left = "50%";
  box.style.transform = "translate(-50%, -50%)";
  box.style.zIndex = 9999;

  box.innerHTML = `
    <div class="title-bar">
      <span>Alerta.exe</span>
    </div>
    <div class="content">
      <p>${text}</p>
      <button onclick="this.closest('.window').remove()">OK</button>
    </div>
  `;

  document.body.appendChild(box);
}

/* ===============================
   TEMA CLARO / ESCURO
================================ */
function toggleTheme() {
  SITE.theme = SITE.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = SITE.theme;
  log("Tema alterado para " + SITE.theme);
}

/* ===============================
   DETECTAR MOBILE
================================ */
if (/Mobi|Android/i.test(navigator.userAgent)) {
  document.body.classList.add("mobile");
  log("Modo mobile detectado");
}

/* ===============================
   LEITOR DE MARKDOWN SIMPLES
================================ */
async function loadMarkdown(file) {
  const res = await fetch(file);
  let text = await res.text();

  text = text
    .replace(/^# (.*$)/gim, "<h2>$1</h2>")
    .replace(/^## (.*$)/gim, "<h3>$1</h3>")
    .replace(/\*\*(.*?)\*\*/gim, "<b>$1</b>")
    .replace(/\*(.*?)\*/gim, "<i>$1</i>")
    .replace(/^- (.*$)/gim, "• $1<br>")
    .replace(/\n/g, "<br>");

  document.getElementById("post").innerHTML = text;
  log("Markdown carregado: " + file);
}

/* ===============================
   TAGS (DETECTAR AUTOMATICAMENTE)
================================ */
function extractTags(text) {
  const match = text.match(/Tags:(.*)/i);
  if (!match) return [];

  return match[1]
    .split(",")
    .map(tag => tag.trim());
}

/* ===============================
   BFSI – SISTEMA DE LOG
================================ */
const BFSI = {
  status: "em desenvolvimento",
  logs: []
};

function bfsiLog(msg) {
  BFSI.logs.push(msg);
  console.log("[BFSI]", msg);
}

/* ===============================
   BOOT FAKE (OPCIONAL)
================================ */
function fakeBoot() {
  const boot = document.createElement("div");
  boot.style.position = "fixed";
  boot.style.top = 0;
  boot.style.left = 0;
  boot.style.width = "100%";
  boot.style.height = "100%";
  boot.style.background = "black";
  boot.style.color = "white";
  boot.style.fontFamily = "monospace";
  boot.style.padding = "20px";
  boot.style.zIndex = 10000;

  boot.innerHTML = `
    Booting Sr.Speedss OS...<br>
    Loading modules...<br>
    Initializing BFSI...<br>
    OK
  `;

  document.body.appendChild(boot);

  setTimeout(() => boot.remove(), 1800);
}

/* ===============================
   FAKE LOADING
================================ */
function fakeLoading(el, time = 1200) {
  const old = el.innerHTML;
  el.innerHTML = "Carregando...";
  setTimeout(() => {
    el.innerHTML = old;
  }, time);
}

/* ===============================
   ATALHOS DE TECLADO
================================ */
document.addEventListener("keydown", e => {
  if (e.key === "F2") {
    toggleTheme();
    winAlert("Tema alternado");
  }

  if (e.key === "F8") {
    fakeBoot();
  }
});

/* ===============================
   STARTUP
================================ */
log("Sistema carregado com sucesso 🚀");
