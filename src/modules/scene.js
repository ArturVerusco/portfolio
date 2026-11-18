// Vista explodida 3D das camadas de um produto: Interface, Regras e Dados.
// O Three.js é carregado sob demanda (import dinâmico) para não pesar a primeira pintura.
import { REDUCE } from "./env.js";

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

function placeFallbackTags(tags) {
  tags.forEach((t, i) => { t.style.left = "78%"; t.style.top = 30 + i * 22 + "%"; });
}

export async function initScene() {
  const viewer = document.querySelector("[data-viewer]");
  const tags = [...viewer.querySelectorAll("[data-tag]")];
  const scaleOut = viewer.querySelector("[data-explode]");
  if (!hasWebGL()) { placeFallbackTags(tags); return; }

  let THREE;
  try { THREE = await import("three"); } catch { placeFallbackTags(tags); return; }
  viewer.querySelector("[data-fallback]")?.remove();

  const css = getComputedStyle(document.documentElement);
  const color = (v) => new THREE.Color(css.getPropertyValue(v).trim());
  const COL = { cyan: color("--cyan"), line: color("--line"), bg: color("--bg"), amber: color("--amber") };

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.domElement.setAttribute("aria-hidden", "true");
  viewer.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 100);
  cam.position.set(10, 8.2, 10);
  cam.lookAt(0, 0, 0);
  const rig = new THREE.Group();
  scene.add(rig);

  const lineMat = new THREE.LineBasicMaterial({ color: COL.cyan });
  const fillMat = new THREE.MeshBasicMaterial({ color: COL.bg, transparent: true, opacity: 0.88, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
  const solid = (geo) => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(geo, fillMat));
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), lineMat));
    return g;
  };
  const box = (w, h, d) => solid(new THREE.BoxGeometry(w, h, d));

  // "Chão" quadriculado
  const floor = new THREE.GridHelper(9, 18, COL.line, COL.line);
  floor.material.transparent = true;
  floor.material.opacity = 0.45;
  floor.position.y = -2.6;
  rig.add(floor);

  // Camada 1 — Interface: placa com cards
  const ui = new THREE.Group();
  ui.add(box(4.2, 0.16, 3));
  [[-1.25, -0.7], [0, -0.7], [1.25, -0.7], [-0.62, 0.6], [0.95, 0.6]].forEach(([x, z], i) => {
    const card = box(i < 3 ? 1 : 1.9, 0.12, i < 3 ? 1 : 0.9);
    card.position.set(x, 0.16, z);
    ui.add(card);
  });

  // Camada 2 — Regras: trilha de circuito com nós
  const rules = new THREE.Group();
  rules.add(box(4.2, 0.16, 3));
  const pts = [[-1.8, -1.1], [-0.6, -1.1], [-0.6, 0.2], [0.8, 0.2], [0.8, 1.1], [1.8, 1.1]];
  rules.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(pts.map(([x, z]) => new THREE.Vector3(x, 0.1, z))),
    new THREE.LineBasicMaterial({ color: COL.amber })));
  pts.forEach(([x, z], i) => { if (i % 2) { const n = box(0.26, 0.14, 0.26); n.position.set(x, 0.12, z); rules.add(n); } });

  // Camada 3 — Dados: três cilindros (bancos)
  const data = new THREE.Group();
  data.add(box(4.2, 0.16, 3));
  [-1.2, 0, 1.2].forEach((x) => {
    const c = solid(new THREE.CylinderGeometry(0.42, 0.42, 0.7, 28));
    c.position.set(x, 0.45, 0);
    data.add(c);
  });

  const layers = [ui, rules, data];
  layers.forEach((l) => rig.add(l));

  // Guias tracejadas ligando as camadas
  const guideMat = new THREE.LineDashedMaterial({ color: COL.line, dashSize: 0.12, gapSize: 0.1 });
  const guides = [[-2.1, -1.5], [2.1, -1.5], [2.1, 1.5], [-2.1, 1.5]].map(([x, z]) => {
    const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, -1, z), new THREE.Vector3(x, 1, z)]), guideMat);
    l.computeLineDistances();
    rig.add(l);
    return l;
  });

  let explode = REDUCE ? 1 : 0;
  let scrollK = 0, px = 0, py = 0, rx = 0, ry = 0;

  const layout = () => {
    const gap = 0.55 + explode * 1.25 + scrollK * 0.9;
    ui.position.y = gap;
    rules.position.y = 0;
    data.position.y = -gap;
    guides.forEach((l) => { l.scale.y = gap; });
    scaleOut.textContent = "1 : " + (gap / 0.55).toFixed(2).replace(".", ",");
  };

  const resize = () => {
    const r = viewer.getBoundingClientRect();
    const w = r.width, h = Math.max(1, r.height - 34);
    renderer.setSize(w, h, false);
    const a = w / h, s = 4.6;
    Object.assign(cam, { left: -s * a, right: s * a, top: s, bottom: -s });
    cam.updateProjectionMatrix();
  };

  const tmp = new THREE.Vector3();
  const placeTags = () => {
    const r = renderer.domElement.getBoundingClientRect();
    const vr = viewer.getBoundingClientRect();
    layers.forEach((l, i) => {
      tmp.set(2.1, 0, -1.5);
      l.localToWorld(tmp);
      tmp.project(cam);
      const x = (tmp.x * 0.5 + 0.5) * r.width + (r.left - vr.left);
      const y = (-tmp.y * 0.5 + 0.5) * r.height + (r.top - vr.top);
      tags[i].style.left = Math.min(x, vr.width - 150) + "px";
      tags[i].style.top = y + "px";
    });
  };

  const frame = (t) => {
    explode += (1 - explode) * 0.045;
    rx += (py - rx) * 0.05;
    ry += (px - ry) * 0.05;
    rig.rotation.y = -0.15 + ry * 0.35 + (REDUCE ? 0 : Math.sin(t / 3200) * 0.12);
    rig.rotation.x = rx * 0.12;
    layout();
    renderer.render(scene, cam);
    placeTags();
  };

  new ResizeObserver(() => { resize(); frame(performance.now()); }).observe(viewer);
  resize();

  if (REDUCE) { frame(0); return; }

  viewer.addEventListener("pointermove", (e) => {
    const r = viewer.getBoundingClientRect();
    px = (e.clientX - r.left) / r.width - 0.5;
    py = (e.clientY - r.top) / r.height - 0.5;
  });
  viewer.addEventListener("pointerleave", () => { px = 0; py = 0; });
  addEventListener("scroll", () => {
    const r = viewer.getBoundingClientRect();
    scrollK = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height)));
  }, { passive: true });

  let visible = true;
  new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(viewer);
  const loop = (t) => { if (visible && !document.hidden) frame(t); requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
}
