// Conteúdo do portfólio. Só fatos verificados — ver nota "portfolio" no Second Brain.

export const LINKS = {
  github: "https://github.com/ArturVerusco",
  linkedin: "https://www.linkedin.com/in/artur-veras",
};

export const PROJECTS = [
  {
    id: "ibuy", nome: "IBuy", tipo: "Marketplace imobiliário reverso", data: "08/2026", status: "No ar", live: true,
    resumo: "O comprador publica o que procura e o corretor paga para desbloquear o contato. Um motor de compatibilidade cruza demandas e imóveis de 0 a 100%.",
    fatos: ["20 telas, todas com dados reais", "11 migrações SQL com Row Level Security", "Login com Google e chat em tempo real", "Feed do comprador no estilo Instagram"],
    stack: ["HTML/CSS/JS", "Supabase", "RLS", "Realtime", "Vercel", "Leaflet"],
    link: "https://site-ten-rho-49.vercel.app", draw: "map",
  },
  {
    id: "inclusao360", nome: "Inclusão360", tipo: "SaaS de educação inclusiva", data: "11/2026", status: "Em desenvolvimento", live: false,
    resumo: "Gestão da educação inclusiva para institutos e secretarias municipais. Cada município só enxerga os próprios dados, com a regra garantida no banco.",
    fatos: ["132 testes automatizados, 60 deles de isolamento", "17 testes de ponta a ponta", "Multi-tenant com auditoria por trigger", "Convites, vínculos e papéis por município"],
    stack: ["Next.js 16", "TypeScript", "Supabase", "Vitest", "Playwright"],
    link: null, draw: "tree",
  },
  {
    id: "iprc", nome: "Site do IPRC", tipo: "Site institucional", data: "08/2026", status: "No ar", live: true,
    resumo: "Redesign do site do Instituto Professora Rosário Cabral: acessível, rápido e sem nenhum dado institucional inventado.",
    fatos: ["Feed real do Instagram", "Página de parceiros", "Migração de domínio e e-mail corporativo", "Navegação por teclado e movimento reduzido"],
    stack: ["HTML/CSS/JS", "Vercel", "Hostinger", "Behold"],
    link: "https://www.iprc.org.br", draw: "page",
  },
  {
    id: "cuidados", nome: "Cuidados da Família", tipo: "App de saúde familiar (PWA)", data: "10/2026", status: "Em uso", live: true,
    resumo: "Remédios, refeições, glicemia e exames de pessoas idosas, com lembretes no celular e acesso separado por família.",
    fatos: ["Lembrete 5 minutos antes do remédio", "Várias pessoas cuidadas no mesmo app", "Convites e dados separados por família", "Instalável no celular"],
    stack: ["PWA", "Supabase", "RLS", "Vercel"],
    link: null, draw: "pulse",
  },
];

export const LEGEND = [
  { sym: '<rect x="2" y="3" width="30" height="14"/><path d="M2 8h30"/>', t: "HTML, CSS e JavaScript", use: "IBuy, site do IPRC, Cuidados" },
  { sym: '<path d="M4 17 17 3 30 17Z"/>', t: "Next.js e TypeScript", use: "Inclusão360" },
  { sym: '<ellipse cx="17" cy="5" rx="12" ry="3"/><path d="M5 5v10c0 4 24 4 24 0V5"/>', t: "Supabase (Postgres, RLS, Auth)", use: "IBuy, Cuidados, Inclusão360" },
  { sym: '<path d="M3 10h8l3-6 6 12 3-6h8"/>', t: "Python e Django", use: "Sistema de tarefas" },
  { sym: '<rect x="3" y="7" width="8" height="8"/><rect x="13" y="7" width="8" height="8"/><rect x="23" y="7" width="8" height="8"/>', t: "Docker", use: "Supabase local, Django + Postgres" },
  { sym: '<path d="M3 17 17 3 31 17Z"/><path d="M17 3v14"/>', t: "Vercel e GitHub", use: "Deploy de todos os sites" },
  { sym: '<circle cx="17" cy="10" r="7"/><path d="m13 10 3 3 5-6"/>', t: "Vitest e Playwright", use: "Testes do Inclusão360" },
];

// Esquemas técnicos de cada projeto (viewBox 0 0 400 200). Traços com classe "ink" se redesenham na animação.
export const DRAW = {
  map: '<rect class="soft" x="20" y="20" width="360" height="160"/><path class="ink" d="M40 150 L120 90 L190 120 L260 60 L360 80"/><circle class="ink" cx="120" cy="90" r="6"/><circle class="ink" cx="260" cy="60" r="6"/><path class="soft" d="M120 90 V170 M260 60 V170"/><line x1="40" y1="170" x2="360" y2="170"/>',
  tree: '<rect class="ink" x="170" y="24" width="60" height="28"/><rect x="60" y="100" width="70" height="28"/><rect x="165" y="100" width="70" height="28"/><rect x="270" y="100" width="70" height="28"/><path class="ink" d="M200 52 V76 M95 76 H305 M95 76 V100 M200 76 V100 M305 76 V100"/><path class="soft" d="M60 150 H340"/>',
  page: '<rect class="ink" x="90" y="20" width="220" height="160"/><line x1="90" y1="46" x2="310" y2="46"/><rect class="soft" x="110" y="62" width="180" height="50"/><path class="soft" d="M110 128 H260 M110 142 H230 M110 156 H250"/><circle cx="104" cy="33" r="3"/>',
  pulse: '<path class="soft" d="M20 100 H380"/><path class="ink" d="M20 100 H130 L150 60 L175 145 L200 40 L222 120 L240 100 H380"/><circle cx="200" cy="40" r="5"/>',
};

export const ABOUT = {
  curto: "Estudante de Análise e Desenvolvimento de Sistemas no IFRN (campus Natal Central) e analista de suporte e implantação na Intesoftware, empresa de sistemas para clínicas.",
  longo: "Antes da programação vieram estágio em suporte de TI, rotinas financeiras e AutoCAD. Hoje construo produtos de ponta a ponta e uso IA como parte da equipe de desenvolvimento.",
  principios: ["Interfaces cuidadosas, testadas no celular", "Regras de acesso garantidas no banco de dados", "Nenhum dado de exemplo apresentado como real"],
};
