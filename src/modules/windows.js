// Janelas arrastáveis no estilo sistema operacional (estudos de projeto, Sobre, Stack).
import { gsap } from "gsap";
import { PROJECTS, LEGEND, DRAW, ABOUT } from "../data.js";
import { REDUCE, esc, host } from "./env.js";

const open = new Map();
let z = 70;
let cascade = 0;

function content(key) {
  if (key === "sobre") {
    return { title: "~/sobre", html: `
      <h3>Artur Veras</h3>
      <p>${esc(ABOUT.curto)}</p>
      <p class="muted">${esc(ABOUT.longo)}</p>
      <ul>${ABOUT.principios.map((t) => `<li><span>${esc(t)}</span></li>`).join("")}</ul>` };
  }
  if (key === "stack") {
    return { title: "~/stack", html: `
      <h3>Stack</h3>
      <ul>${LEGEND.map((l) => `<li><span><b>${esc(l.t)}</b><br><span class="muted">${esc(l.use)}</span></span></li>`).join("")}</ul>` };
  }
  const p = PROJECTS.find((x) => "p:" + x.id === key);
  return { title: `~/projetos/${p.id}`, html: `
    <div class="win__draw"><svg viewBox="0 0 400 175" aria-hidden="true">${DRAW[p.draw]}</svg></div>
    <span class="label">${esc(p.tipo)} · ${p.data} · ${esc(p.status)}</span>
    <h3>${esc(p.nome)}</h3>
    <p>${esc(p.resumo)}</p>
    <ul>${p.fatos.map((f) => `<li><span>${esc(f)}</span></li>`).join("")}</ul>
    <div class="chips">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div>
    ${p.link ? `<a class="btn btn--solid" href="${p.link}" target="_blank" rel="noopener">Abrir ${esc(host(p.link))} ↗</a>` : `<p class="muted">Sem link público.</p>`}` };
}

function draggable(w) {
  const bar = w.querySelector(".win__bar");
  let sx = 0, sy = 0, ox = 0, oy = 0, drag = false;
  bar.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button") || innerWidth <= 640) return;
    drag = true; sx = e.clientX; sy = e.clientY; ox = w.offsetLeft; oy = w.offsetTop;
    bar.setPointerCapture(e.pointerId);
  });
  bar.addEventListener("pointermove", (e) => {
    if (!drag) return;
    w.style.left = Math.max(-w.offsetWidth + 80, Math.min(innerWidth - 80, ox + e.clientX - sx)) + "px";
    w.style.top = Math.max(48, Math.min(innerHeight - 48, oy + e.clientY - sy)) + "px";
  });
  bar.addEventListener("pointerup", () => { drag = false; });
}

export function openWin(key, origin) {
  if (open.has(key)) {
    const w = open.get(key);
    w.style.zIndex = ++z;
    w.querySelector(".win__close").focus();
    return;
  }
  const c = content(key);
  const w = document.createElement("section");
  w.className = "win";
  w.setAttribute("role", "dialog");
  w.setAttribute("aria-label", c.title);
  w.innerHTML = `<div class="win__bar"><span>${esc(c.title)}</span><button class="win__close" type="button" aria-label="Fechar janela">✕</button></div><div class="win__body">${c.html}</div>`;
  document.body.appendChild(w);

  const W = w.offsetWidth, H = w.offsetHeight;
  const left = Math.max(16, Math.min(innerWidth - W - 16, innerWidth / 2 - W / 2 + cascade * 28));
  const top = Math.max(64, Math.min(innerHeight - H - 96, innerHeight / 2 - H / 2 + cascade * 24));
  cascade = (cascade + 1) % 4;
  w.style.left = left + "px";
  w.style.top = top + "px";
  w.style.zIndex = ++z;
  open.set(key, w);

  w.addEventListener("pointerdown", () => { w.style.zIndex = ++z; });
  w.querySelector(".win__close").addEventListener("click", () => closeWin(key));
  draggable(w);

  if (!REDUCE) {
    const r = origin ? origin.getBoundingClientRect() : null;
    const ox = r ? r.left + r.width / 2 - (left + W / 2) : 0;
    const oy = r ? r.top + r.height / 2 - (top + H / 2) : 40;
    gsap.fromTo(w, { x: ox * 0.6, y: oy * 0.6, scale: 0.6, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.55, ease: "expo.out", clearProps: "transform" });
    gsap.fromTo(w.querySelectorAll(".win__draw .ink"), { strokeDasharray: 600, strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 1.1, delay: 0.2, ease: "power2.inOut" });
  }
  w.querySelector(".win__close").focus({ preventScroll: true });
}

export function closeWin(key) {
  const w = open.get(key);
  if (!w) return;
  open.delete(key);
  if (REDUCE) { w.remove(); return; }
  gsap.to(w, { scale: 0.92, opacity: 0, duration: 0.22, ease: "power2.in", onComplete: () => w.remove() });
}

/** Fecha a janela que está na frente. Retorna true se fechou alguma. */
export function closeTopWin() {
  let top = null, tz = -1;
  open.forEach((w, k) => { if (+w.style.zIndex > tz) { tz = +w.style.zIndex; top = k; } });
  if (top) { closeWin(top); return true; }
  return false;
}

export function initWindowButtons() {
  document.querySelectorAll("[data-win]").forEach((b) => b.addEventListener("click", () => openWin(b.dataset.win, b)));
}
