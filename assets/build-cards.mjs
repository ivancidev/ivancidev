// Generates the project cards in assets/cards/*.svg
// Usage: node assets/build-cards.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const out = join(dirname(fileURLToPath(import.meta.url)), "cards");
mkdirSync(out, { recursive: true });

const projects = [
  {
    file: "skillstudio",
    name: "SkillStudio",
    kind: "AI AGENT",
    accent: "#8b5cf6",
    live: true,
    lines: [
      "Open-source agent that generates production-ready",
      "skills for Claude, Cursor and Windsurf, with guided",
      "chat, live preview and install instructions.",
    ],
    stack: ["Python", "TypeScript", "LLM Agents"],
  },
  {
    file: "prepai",
    name: "PrepAI",
    kind: "AI · VOICE",
    accent: "#22d3ee",
    live: false,
    lines: [
      "Interview coach: paste a job description, answer by",
      "voice and get structured feedback. Whisper transcribes,",
      "LLaMA 3.3 evaluates.",
    ],
    stack: ["NestJS", "Prisma", "PostgreSQL", "Groq"],
  },
  {
    file: "doqify",
    name: "Doqify",
    kind: "RAG",
    accent: "#34d399",
    live: true,
    lines: [
      "Chat with your documents. Retrieval pipeline over",
      "PDFs and text with multilingual embeddings and",
      "vector search.",
    ],
    stack: ["Next.js", "Supabase", "pgvector", "Cohere"],
  },
  {
    file: "cvearly",
    name: "CVearly",
    kind: "AI · PRODUCT",
    accent: "#f472b6",
    live: true,
    lines: [
      "Resume builder that pulls your GitHub work and",
      "optimizes your CV for ATS filters. Exports PDF",
      "and DOCX.",
    ],
    stack: ["Next.js", "Gemini", "Python", "Tailwind"],
  },
  {
    file: "worldcup",
    name: "World Cup AI Predictor",
    kind: "AI · REALTIME",
    accent: "#fbbf24",
    live: true,
    lines: [
      "FIFA World Cup 2026 bracket with live match data,",
      "AI match insights and an animated interactive",
      "bracket.",
    ],
    stack: ["Next.js", "Groq", "Supabase", "GSAP"],
  },
  {
    file: "n8n",
    name: "n8n AI Automations",
    kind: "AUTOMATION",
    accent: "#fb7185",
    live: false,
    lines: [
      "Production workflows: RAG systems, multi-agent",
      "orchestration, WhatsApp bots, OCR pipelines and",
      "lead generation.",
    ],
    stack: ["n8n", "Claude", "GPT-4o", "PGVector"],
  },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const W = 600, H = 250, CH = 7.8; // CH: approx. width of one 13px mono glyph

function card(p) {
  let x = 32;
  const chips = p.stack.map((t) => {
    const w = Math.round(t.length * CH + 22);
    const g = `<g transform="translate(${x} 196)"><rect width="${w}" height="26" rx="6" fill="#ffffff" fill-opacity=".04" stroke="#ffffff" stroke-opacity=".1"/><text x="${w / 2}" y="17.5" text-anchor="middle" class="mono" font-size="13" fill="#b4b4c8">${esc(t)}</text></g>`;
    x += w + 8;
    return g;
  }).join("");

  const desc = p.lines.map((l, i) =>
    `<text x="32" y="${118 + i * 24}" class="sans" font-size="15.5" fill="#a9a9bd">${esc(l)}</text>`).join("");

  const tag = p.live
    ? `<text x="${W - 32}" y="52" text-anchor="end" class="mono" font-size="12" font-weight="600" letter-spacing="1.5" fill="${p.accent}">LIVE DEMO ↗</text>`
    : `<text x="${W - 32}" y="52" text-anchor="end" class="mono" font-size="12" font-weight="600" letter-spacing="1.5" fill="#6b6b85">SOURCE ↗</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(p.name)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b0b14"/><stop offset="1" stop-color="#0e0d1c"/></linearGradient>
    <radialGradient id="glow" cx="1" cy="0" r="1"><stop offset="0" stop-color="${p.accent}" stop-opacity=".22"/><stop offset=".6" stop-color="${p.accent}" stop-opacity="0"/></radialGradient>
    <linearGradient id="sweep" x1="0" x2="1"><stop offset="0" stop-color="${p.accent}" stop-opacity="0"/><stop offset=".5" stop-color="${p.accent}"/><stop offset="1" stop-color="${p.accent}" stop-opacity="0"/></linearGradient>
    <clipPath id="c"><rect width="${W}" height="${H}" rx="16"/></clipPath>
  </defs>
  <style>
    .sans { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; }
    .mono { font-family: ui-monospace, 'SFMono-Regular', 'Cascadia Code', Consolas, monospace; }
    .sweep { animation: sweep 5s cubic-bezier(.6,0,.4,1) infinite; }
    @keyframes sweep { from { transform: translateX(-260px); } to { transform: translateX(${W}px); } }
    .a { animation: fa 4s ease-in-out infinite; } .b { animation: fb 4s ease-in-out infinite; }
    @keyframes fa { 50% { transform: translateY(-4px); } } @keyframes fb { 50% { transform: translateY(2px); } }
  </style>
  <g clip-path="url(#c)">
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <rect class="sweep" y="0" width="260" height="2" fill="url(#sweep)"/>
    <g transform="translate(46 47)">
      <g class="b"><path d="M0 4 L14 12 L0 20 L-14 12 Z" fill="${p.accent}" fill-opacity=".25" stroke="${p.accent}" stroke-opacity=".6"/></g>
      <g class="a"><path d="M0 -8 L14 0 L0 8 L-14 0 Z" fill="${p.accent}" fill-opacity=".55" stroke="${p.accent}"/></g>
    </g>
    <text x="72" y="45" class="mono" font-size="11" font-weight="600" letter-spacing="2" fill="#6b6b85">${esc(p.kind)}</text>
    <text x="72" y="70" class="sans" font-size="24" font-weight="700" fill="#f4f4f8">${esc(p.name)}</text>
    ${tag}
    ${desc}
    ${chips}
  </g>
  <rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="16" fill="none" stroke="#ffffff" stroke-opacity=".08"/>
</svg>
`;
}

for (const p of projects) writeFileSync(join(out, `${p.file}.svg`), card(p));
console.log(`Generated ${projects.length} cards in ${out}`);
