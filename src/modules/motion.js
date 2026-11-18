// Abertura da página e efeitos ligados à rolagem (GSAP + ScrollTrigger).
// Tudo parte de um estado visível: sem prefers-reduced-motion, nada é escondido esperando animação.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REDUCE } from "./env.js";

export function initMotion() {
  if (REDUCE) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.timeline({ defaults: { ease: "expo.out" } })
    .from("[data-split]", { yPercent: 70, opacity: 0.2, duration: 1.1, stagger: 0.12 })
    .from("[data-cota]", { scaleX: 0, duration: 0.9, ease: "power3.inOut" }, "-=.7")
    .from(".hero__meta .label", { y: 8, opacity: 0.3, duration: 0.6, stagger: 0.06 }, "-=.8");

  // Paralaxe do desenho dentro de cada prancha
  gsap.utils.toArray(".sheet").forEach((el, i) => {
    gsap.fromTo(el.querySelector(".sheet__draw svg"),
      { yPercent: 14 + (i % 2) * 6 },
      { yPercent: -14, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } });
  });

  // Sobrenome desliza ao sair do topo
  gsap.to(".hero__name .accent", { xPercent: 6, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.5 } });

  // Títulos de seção "fecham" o espaçamento ao entrar
  gsap.utils.toArray(".section__head h2").forEach((h) => {
    gsap.fromTo(h, { letterSpacing: "0.06em" }, { letterSpacing: "-0.01em", ease: "none", scrollTrigger: { trigger: h, start: "top 90%", end: "top 50%", scrub: 0.5 } });
  });
}
