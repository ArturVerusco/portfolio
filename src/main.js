import "./styles/tokens.css";
import "./styles/main.css";
import { renderSheets, renderLegend } from "./modules/content.js";
import { openWin, initWindowButtons } from "./modules/windows.js";
import { initPalette } from "./modules/palette.js";
import { initClock, initCoords, initScaleBar } from "./modules/hud.js";
import { initMotion } from "./modules/motion.js";
import { initScene } from "./modules/scene.js";

renderSheets(openWin);
renderLegend();
initWindowButtons();
initPalette();
initClock();
initCoords();
initScaleBar();
initMotion();
initScene();
