# Portfólio — Artur Veras

Site de portfólio em forma de **prancha técnica interativa**: vista explodida em 3D, pranchas de projeto que
abrem em janelas arrastáveis, dock e busca com `Ctrl K`.

## Como rodar

Requisitos: Node.js 20+ (testado com 22).

```bash
npm install      # instala Vite, GSAP e Three.js
npm run dev      # servidor de desenvolvimento em http://localhost:5173
npm run build    # gera a versão final em dist/
npm run preview  # abre a versão final localmente
```

## Onde mexer

| Quero… | Arquivo |
|---|---|
| Trocar textos, projetos, números ou links | `src/data.js` |
| Mudar cores e fontes | `src/styles/tokens.css` |
| Ajustar layout e componentes | `src/styles/main.css` |
| Estrutura da página (seções, dock) | `index.html` |
| Janelas | `src/modules/windows.js` |
| Busca Ctrl K | `src/modules/palette.js` |
| Relógio, coordenadas, barra de escala | `src/modules/hud.js` |
| Animações de abertura e rolagem | `src/modules/motion.js` |
| Cena 3D | `src/modules/scene.js` |

## Regras do projeto

- Só conteúdo **verdadeiro**: números e fatos vêm dos projetos reais. Nada inventado.
- Movimento sempre com alternativa: `prefers-reduced-motion` desliga as animações e a cena 3D fica parada;
  sem WebGL aparece um desenho estático.
- Testar no celular (390 px) e no computador antes de publicar.

## Antes de publicar

- [ ] Confirmar com o IPRC se o Inclusão360 e o site podem aparecer.
- [ ] Cuidados da Família: nenhum print com dados reais.
- [ ] Criar repositório no GitHub e importar na Vercel (Framework: Vite, build `npm run build`, saída `dist`).

Contexto completo do projeto no Second Brain: `C:\Users\artur\Memoria\01-PROJECTS\portfolio.md`.
