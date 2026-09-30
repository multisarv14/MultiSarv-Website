// Post-build step: writes one HTML file per route with the right <title>,
// description, canonical and Open Graph tags, plus sitemap.xml and 404.html.
// Firebase Hosting (cleanUrls) serves dist/products/realtyconnect.html at
// /products/realtyconnect, and 404.html (with a real 404 status) for anything else.
import { build } from "esbuild";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

// Bundle the route data (seo.ts + master-data.ts) so Node can import it.
const result = await build({
  stdin: {
    contents: `
      export * from "./src/seo";
      export { ALL_PRODUCTS, SERVICES } from "./src/data/master-data";
    `,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  loader: { ".webp": "empty", ".png": "empty", ".jpg": "empty", ".jpeg": "empty" },
  logLevel: "silent",
});
const tmpFile = path.join(dist, ".route-data.mjs");
await writeFile(tmpFile, result.outputFiles[0].text);
const data = await import(pathToFileURL(tmpFile).href);
await rm(tmpFile);

const { SITE_URL, PAGE_META, NOT_FOUND_META, formatTitle, productMeta, serviceMeta, privacyMeta, ALL_PRODUCTS, SERVICES } = data;

const routes = [
  ...Object.entries(PAGE_META).map(([route, meta]) => ({ route, meta })),
  ...ALL_PRODUCTS.map((p) => ({ route: `/products/${p.id}`, meta: productMeta(p) })),
  ...SERVICES.map((s) => ({ route: `/services/${s.id}`, meta: serviceMeta(s) })),
  ...ALL_PRODUCTS.map((p) => ({ route: `/privacy/${p.id}`, meta: privacyMeta(p) })),
];

const template = await readFile(path.join(dist, "index.html"), "utf8");

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function replaceOnce(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`prerender: pattern not found in index.html: ${pattern}`);
  return html.replace(pattern, replacement);
}

function render({ title, description, noindex }, url) {
  const t = escape(formatTitle(title));
  const d = escape(description);
  let html = template;
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${t}</title>`);
  html = replaceOnce(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${d}" />`);
  html = replaceOnce(html, /<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="${noindex ? "noindex, nofollow" : "index, follow"}" />`);
  html = replaceOnce(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${t}" />`);
  html = replaceOnce(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${d}" />`);
  html = replaceOnce(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${t}" />`);
  html = replaceOnce(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${d}" />`);
  if (url) {
    html = replaceOnce(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
    html = replaceOnce(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  } else {
    html = replaceOnce(html, /\s*<link rel="canonical" href="[^"]*" \/>/, "");
  }
  return html;
}

for (const { route, meta } of routes) {
  const url = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
  const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  const out = path.join(dist, file);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, render(meta, url));
}

await writeFile(path.join(dist, "404.html"), render(NOT_FOUND_META, null));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter(({ meta }) => !meta.noindex)
  .map(({ route }) => `  <url><loc>${SITE_URL}${route === "/" ? "/" : route}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n")}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);

console.log(`prerender: wrote ${routes.length} pages, 404.html and sitemap.xml`);
