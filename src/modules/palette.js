// Busca estilo "command palette" (Ctrl K / Cmd K), navegável pelo teclado.
import { gsap } from "gsap";
import { PROJECTS, LINKS } from "../data.js";
import { REDUCE, esc } from "./env.js";
import { openWin, closeTopWin } from "./windows.js";

const ITEMS = [
  ...PROJECTS.map((p) => ({ k: "p:" + p.id, t: p.nome, s: p.tipo, hay: [p.nome, p.tipo, ...p.stack].join(" ") })),
  { k: "sobre", t: "Sobre o Artur", s: "janela", hay: "sobre artur ifrn intesoftware" },
  { k: "stack", t: "Stack", s: "janela", hay: "stack tecnologias legenda" },
  { k: "#contato", t: "Contato", s: "seção", hay: "contato vaga linkedin github" },
  { k: "link:linkedin", t: "LinkedIn", s: "linkedin.com/in/artur-veras", href: LINKS.linkedin, hay: "linkedin contato" },
  { k: "link:github", t: "GitHub", s: "github.com/ArturVerusco", href: LINKS.github, hay: "github código repositórios" },
];

export function initPalette() {
  const pal = document.querySelector("[data-palette]");
  const q = document.getElementById("palette-q");
  const list = document.querySelector("[data-palette-list]");
  let hits = [], sel = 0, lastFocus = null;

  const render = () => {
    const t = q.value.trim().toLowerCase();
    hits = ITEMS.filter((i) => !t || i.hay.toLowerCase().includes(t) || i.t.toLowerCase().includes(t));
    sel = Math.min(sel, Math.max(0, hits.length - 1));
    list.innerHTML = hits.length
      ? hits.map((h, i) => h.href
          ? `<li><a class="pal-item" href="${h.href}" target="_blank" rel="noopener" role="option" aria-selected="${i === sel}" data-i="${i}"><span>${esc(h.t)} ↗</span><small>${esc(h.s)}</small></a></li>`
          : `<li><button class="pal-item" type="button" role="option" aria-selected="${i === sel}" data-i="${i}"><span>${esc(h.t)}</span><small>${esc(h.s)}</small></button></li>`).join("")
      : `<li><span class="pal-empty">Nada encontrado para “${esc(q.value)}”</span></li>`;
  };

  const close = () => {
    pal.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  };
  const show = () => {
    lastFocus = document.activeElement;
    pal.hidden = false; q.value = ""; sel = 0; render(); q.focus();
    if (!REDUCE) gsap.fromTo(".palette__box", { y: -16, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" });
  };
  const pick = (h) => {
    if (!h) return close();
    if (h.href) { list.querySelector(`[data-i="${hits.indexOf(h)}"]`)?.click(); return close(); }
    close();
    if (h.k.startsWith("#")) document.querySelector(h.k).scrollIntoView({ behavior: REDUCE ? "auto" : "smooth" });
    else openWin(h.k, null);
  };

  document.querySelectorAll("[data-open-palette]").forEach((b) => b.addEventListener("click", show));
  q.addEventListener("input", () => { sel = 0; render(); });
  q.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(hits.length - 1, sel + 1); render(); }
    if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(0, sel - 1); render(); }
    if (e.key === "Enter") { e.preventDefault(); pick(hits[sel]); }
  });
  list.addEventListener("click", (e) => {
    const el = e.target.closest("[data-i]");
    if (!el) return;
    const h = hits[+el.dataset.i];
    if (h.href) { setTimeout(close, 0); return; } // o próprio link abre a nova aba
    pick(h);
  });
  pal.addEventListener("click", (e) => { if (e.target === pal) close(); });

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.hidden ? show() : close(); return; }
    if (e.key === "Escape") { if (!pal.hidden) close(); else closeTopWin(); }
  });
}
