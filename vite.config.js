import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // O Three.js (~190 KB gzip) é carregado sob demanda em src/modules/scene.js, depois da primeira pintura.
    // O aviso padrão de 500 KB não se aplica a esse pedaço separado.
    chunkSizeWarningLimit: 800,
  },
});
