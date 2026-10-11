import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname);
const stylesheet = path.join(root, "site.css");
let css = await readFile(stylesheet, "utf8");
css = css.replace(/^@import[^\n]*\n/gm, "");
css = css.replace(/@theme inline\{[^}]*\}/, "");
css = css.split("/* Static Pages dialog */")[0];
css = css.replaceAll("url('/fonts/", "url('fonts/");
css += `\n/* Static Pages dialog */\n#search-dialog{width:min(580px,calc(100% - 32px));max-width:none;margin:auto;border:1px solid #555d60;border-radius:0;background:#0b1115;color:#efefea;padding:32px;font-family:var(--serif);box-shadow:0 20px 60px #0009}\n#search-dialog::backdrop{background:#0008}\n#search-dialog[open]{animation:dialog-in .16s ease-out}\n@keyframes dialog-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}\n@media(max-width:620px){#search-dialog{padding:26px}}\n`;
await writeFile(stylesheet, css);

const sections = {
  ensayos: {
    title: "Ensayos",
    description: "Ensayos para pensar el tiempo, la existencia y lo que nos hace humanos.",
    image: "tierra.webp",
    alt: "El horizonte de la Tierra iluminado desde el espacio",
    empty: "Todavía no hay ensayos publicados.",
  },
  investigacion: {
    title: "Investigación",
    description: "Meditaciones sobre la naturaleza del tiempo",
    image: "luna.webp",
    alt: "La superficie de la Luna entre la luz y la sombra",
    empty: "Todavía no hay meditaciones publicadas.",
  },
  marte: {
    title: "Marte",
    description: "Una novela de historia alternativa ambientada en Marte, en 1978.",
    image: "marte.webp",
    alt: "Marte iluminado sobre la oscuridad del espacio",
    empty: "La novela todavía no está disponible para lectura.",
  },
  autor: {
    title: "Juani",
    description: "Un cruce entre filosofía, ciencia y ficción para explorar eso que sigue, incluso cuando todo parece terminar.",
  },
};

const nav = [
  ["Ensayos", "ensayos/"],
  ["Investigación", "investigacion/"],
  ["Marte", "marte/"],
  ["Autor", "autor/"],
];

function searchDialog(prefix) {
  return `<dialog id="search-dialog" class="search-dialog" aria-labelledby="search-title">
    <h2 id="search-title" class="search-title">Buscar en Ulterior</h2>
    <p class="search-description">Ensayos, investigación y ficción.</p>
    <button class="dialog-close" type="button" aria-label="Cerrar búsqueda" data-close-search><svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    <label for="site-search" class="sr-only">Buscar por tema o sección</label>
    <input id="site-search" type="search" placeholder="Tiempo, existencia, Marte…" autocomplete="off">
    <div class="search-results" id="search-results" aria-live="polite"></div>
  </dialog>`;
}

function header(prefix) {
  return `<a class="skip-link" href="#contenido">Ir al contenido</a>
    <header class="site-header page-width">
      <a class="wordmark" href="${prefix}" aria-label="Ulterior, inicio">ULTERIOR</a>
      <nav aria-label="Navegación principal">${nav.map(([label, href]) => `<a href="${prefix}${href}">${label}</a>`).join("")}</nav>
      <button class="search-button" type="button" aria-label="Buscar en Ulterior" aria-haspopup="dialog" data-open-search><svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="11" cy="11" r="7.5"/><path d="m16.5 16.5 4 4"/></svg></button>
    </header>${searchDialog(prefix)}`;
}

function footer(prefix) {
  return `<footer class="site-footer page-width"><a href="${prefix}autor/">JUANI</a></footer>`;
}

function documentHtml({ title, description, prefix = "", body, home = false }) {
  const pageClass = home ? "home-page" : "section-page";
  return `<!doctype html>
<html lang="es-AR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#050909">
  <meta name="description" content="${description}">
  <title>${title}</title>
  <link rel="icon" href="${prefix}favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${prefix}site.css">
  <script src="${prefix}site.js" defer></script>
</head>
<body class="${pageClass}" data-base="${prefix}">
${body}
</body>
</html>`;
}

const homeCards = [
  { title: "Leer", text: "Ensayos para pensar el tiempo, la existencia y lo que nos hace humanos.", label: "Ensayos", href: "ensayos/", image: "tierra.webp", alt: "El horizonte de la Tierra iluminado desde el espacio" },
  { title: "Investigar", text: "Meditaciones sobre la naturaleza del tiempo", label: "Investigación", href: "investigacion/", image: "luna.webp", alt: "La superficie de la Luna entre la luz y la sombra" },
  { title: "Imaginar", text: "Una novela de historia alternativa ambientada en Marte, en 1978.", label: "Marte", href: "marte/", image: "marte.webp", alt: "Marte iluminado sobre la oscuridad del espacio" },
];

const homeBody = `<div class="landscape" aria-hidden="true"><img src="images/landscape.webp" alt="" width="2560" height="2398" fetchpriority="high"></div>
${header("./")}
<main id="contenido" class="page-width">
  <section class="hero" aria-labelledby="hero-title"><div class="hero-copy">
    <h1 id="hero-title">Sofos</h1>
    <p class="hero-subtitle">Ser, existencia y ulterioridad</p>
    <span class="gold-rule" aria-hidden="true"></span>
    <p class="hero-description">Un cruce entre filosofía, ciencia y ficción<br class="desktop-break"> para explorar eso que sigue, incluso<br class="desktop-break"> cuando todo parece terminar.</p>
  </div></section>
  <section class="editorial-grid" aria-label="Explorar Ulterior">${homeCards.map(card => `<article class="editorial-card"><a class="card-link" href="${card.href}">
    <div class="card-image"><img src="images/${card.image}" alt="${card.alt}" width="360" height="300"></div>
    <div class="card-copy"><h2>${card.title}</h2><p>${card.text}</p><span class="card-cta">${card.label}<span class="reference-arrow" aria-hidden="true">→</span></span></div>
  </a></article>`).join("")}</section>
</main>${footer("./")}`;

await writeFile(path.join(root, "index.html"), documentHtml({
  title: "Ulterior — Sofos",
  description: "Ser, existencia y ulterioridad. Un cruce entre filosofía, ciencia y ficción para explorar eso que sigue, incluso cuando todo parece terminar.",
  prefix: "./",
  body: homeBody,
  home: true,
}));

for (const [slug, entry] of Object.entries(sections)) {
  const prefix = "../";
  const image = entry.image ? `<img class="section-image" src="${prefix}images/${entry.image}" alt="${entry.alt}" width="420" height="350">` : "";
  const sectionBody = `${header(prefix)}
    <main id="contenido" class="section-main page-width">
      <a class="back-link" href="${prefix}">Ulterior</a>
      <div class="section-content"><div>
        <h1>${entry.title}</h1><span class="gold-rule" aria-hidden="true"></span>
        <p class="section-description">${entry.description}</p>
        ${entry.empty ? `<p class="section-empty">${entry.empty}</p>` : ""}
      </div>${image}</div>
    </main>${footer(prefix)}`;
  const dir = path.join(root, slug);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), documentHtml({
    title: `${entry.title} · Ulterior`,
    description: entry.description,
    prefix,
    body: sectionBody,
  }));
}

await writeFile(path.join(root, "404.html"), documentHtml({
  title: "Ulterior — Sofos",
  description: "Ser, existencia y ulterioridad.",
  body: `<main class="section-main page-width"><a class="wordmark" href="/">ULTERIOR</a><h1>Página no encontrada</h1><a class="back-link" href="/">Volver a Ulterior</a></main>`,
}));

await writeFile(path.join(root, "CNAME"), "ulterior.dev.ar\n");
