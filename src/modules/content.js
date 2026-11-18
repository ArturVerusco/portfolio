// Renderiza as pranchas de projeto e a legenda de tecnologias.
import { PROJECTS, LEGEND, DRAW } from "../data.js";
import { esc } from "./env.js";

export function renderSheets(onOpen) {
  const root = document.querySelector("[data-sheets]");
  root.innerHTML = PROJECTS.map((p, i) => `
    <button class="sheet" type="button" data-project="${p.id}" aria-label="Abrir estudo do projeto ${esc(p.nome)}">
      <span class="sheet__open" aria-hidden="true">Abrir janela</span>
      <span class="sheet__draw"><svg viewBox="0 0 400 200" aria-hidden="true">${DRAW[p.draw]}</svg></span>
      <span class="sheet__body"><span class="sheet__title">${esc(p.nome)}</span><span class="sheet__text">${esc(p.resumo)}</span></span>
      <span class="stamp">
        <span><b>Folha</b>0${i + 1}/0${PROJECTS.length}</span>
        <span><b>Tipo</b>${esc(p.tipo)}</span>
        <span><b>Data</b>${p.data}</span>
        <span class="${p.live ? "live" : ""}"><b>Status</b>${esc(p.status)}</span>
      </span>
    </button>`).join("");
  root.addEventListener("click", (e) => {
    const b = e.target.closest("[data-project]");
    if (b) onOpen("p:" + b.dataset.project, b);
  });
}

export function renderLegend() {
  document.querySelector("[data-legend]").innerHTML = LEGEND.map((l) => `
    <tr><td><svg viewBox="0 0 34 20" aria-hidden="true">${l.sym}</svg></td><td><b>${esc(l.t)}</b></td><td class="use">${esc(l.use)}</td></tr>`).join("");
}
