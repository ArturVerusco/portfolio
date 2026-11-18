// Elementos de "painel": relógio de Natal, coordenadas do cursor em mm e barra de escala (progresso da rolagem).
import { FINE_POINTER } from "./env.js";

export function initClock() {
  const el = document.querySelector("[data-clock]");
  const fmt = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Fortaleza" });
  const tick = () => { el.textContent = "NATAL " + fmt.format(new Date()); };
  tick();
  setInterval(tick, 20000);
}

export function initCoords() {
  if (!FINE_POINTER) return;
  const el = document.querySelector("[data-coords]");
  const mm = (v) => String(Math.round(v * 0.2646)).padStart(3, "0"); // 1 px CSS ≈ 0,2646 mm
  let raf = 0, x = 0, y = 0;
  el.hidden = false;
  addEventListener("pointermove", (e) => {
    x = e.clientX; y = e.clientY;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      el.textContent = `X ${mm(x + scrollX)} · Y ${mm(y + scrollY)} MM`;
      el.style.left = x + "px";
      el.style.top = y + "px";
    });
  }, { passive: true });
  document.addEventListener("pointerleave", () => { el.hidden = true; });
  document.addEventListener("pointerenter", () => { el.hidden = false; });
}

export function initScaleBar() {
  const bar = document.querySelector("[data-scale]");
  const update = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  };
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();
}
