// Initial JS budget per route, measured from the prerendered HTML.
//
// Next 16 (Turbopack) no longer writes app-build-manifest.json nor prints
// First Load JS, so the budget reads the <script src> tags the browser
// actually loads for a prerendered route and sums their gzip size.
// noModule scripts (legacy polyfills) are skipped: modern browsers ignore them.
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const BUILD_DIR = ".next";
const DEFAULT_ROUTE = "/v2";
// Measured 2026-11 on Next 16.4 (Turbopack): /v2 228.1 kB, /v2/projetos
// 229.2 kB, /v2/projetos/ecovoz 234.7 kB. The same method on Next 15.5
// gave 197.2 / 200.1 / 205.4 kB: about +30 kB is the Next 16 runtime
// (webpack build measured the same). Limits keep roughly 5 kB of headroom.
// The redesigned home (no legacy shell, no three.js) measured 160.5 kB.
const DEFAULT_LIMIT_KB = 165;

function routeHtmlPath(route) {
  const clean = route.replace(/\/+$/, "") || "/index";
  return path.join(process.cwd(), BUILD_DIR, "server", "app", `${clean}.html`);
}

function initialScripts(html) {
  const scripts = [];
  const tag = /<script\b([^>]*)>/g;
  let match;
  while ((match = tag.exec(html))) {
    const attrs = match[1];
    if (/\bnoModule\b/i.test(attrs)) continue;
    const src = /\bsrc="([^"]+)"/.exec(attrs);
    if (src && src[1].startsWith("/_next/static/")) scripts.push(src[1]);
  }
  return [...new Set(scripts)];
}

function gzipSizeInBytes(filePath) {
  return zlib.gzipSync(fs.readFileSync(filePath), { level: 9 }).length;
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(2)} kB`;
}

function main() {
  const route = process.env.BUNDLE_ROUTE || DEFAULT_ROUTE;
  const limitKb = Number(process.env.BUNDLE_LIMIT_KB || DEFAULT_LIMIT_KB);
  if (Number.isNaN(limitKb) || limitKb <= 0) {
    throw new Error(`Invalid BUNDLE_LIMIT_KB: ${process.env.BUNDLE_LIMIT_KB}`);
  }

  const htmlPath = routeHtmlPath(route);
  if (!fs.existsSync(htmlPath)) {
    throw new Error(
      `No prerendered HTML for "${route}" at ${htmlPath}. Run "npm run build" first, and use a concrete path for dynamic routes (e.g. /v2/projetos/ecovoz).`
    );
  }

  const scripts = initialScripts(fs.readFileSync(htmlPath, "utf8"));
  if (!scripts.length) throw new Error(`No scripts found in ${htmlPath}`);

  let totalBytes = 0;
  console.log(`[bundle-budget] Route: ${route}`);
  console.log(`[bundle-budget] Limit: ${limitKb.toFixed(2)} kB (gzip)`);
  for (const src of scripts) {
    const file = path.join(process.cwd(), BUILD_DIR, decodeURIComponent(src.replace(/^\/_next\//, "")));
    if (!fs.existsSync(file)) throw new Error(`Missing chunk file: ${file}`);
    const bytes = gzipSizeInBytes(file);
    totalBytes += bytes;
    console.log(`[bundle-budget] ${src}: ${formatKb(bytes)}`);
  }
  console.log(`[bundle-budget] Total: ${formatKb(totalBytes)}`);

  const totalKb = totalBytes / 1024;
  if (totalKb > limitKb) {
    console.error(`[bundle-budget] FAIL: ${totalKb.toFixed(2)} kB exceeds ${limitKb.toFixed(2)} kB limit`);
    process.exit(1);
  }
  console.log(`[bundle-budget] PASS: ${totalKb.toFixed(2)} kB is within ${limitKb.toFixed(2)} kB limit`);
}

try {
  main();
} catch (error) {
  console.error("[bundle-budget] ERROR:", error.message);
  process.exit(1);
}
