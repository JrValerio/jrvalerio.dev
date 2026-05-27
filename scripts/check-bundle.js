const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const BUILD_DIR = ".next";
const MANIFEST_FILE = "app-build-manifest.json";
const DEFAULT_ROUTE = "/v2/page";
// Baseline after Pages Router retirement (Phase 1): 100.14 kB measured 2026-05.
// Previous limit was 110 kB when next-i18next/jspdf/html2canvas were in the tree.
// Buffer: 5 kB above measured baseline.
const DEFAULT_LIMIT_KB = 105;

function readJsonFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}. Run "npm run build" first.`);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function gzipSizeInBytes(filePath) {
  const content = fs.readFileSync(filePath);
  return zlib.gzipSync(content, { level: 9 }).length;
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(2)} kB`;
}

function main() {
  const route = process.env.BUNDLE_ROUTE || DEFAULT_ROUTE;
  const limitKbRaw = process.env.BUNDLE_LIMIT_KB || String(DEFAULT_LIMIT_KB);
  const limitKb = Number(limitKbRaw);

  if (Number.isNaN(limitKb) || limitKb <= 0) {
    throw new Error(`Invalid BUNDLE_LIMIT_KB: ${limitKbRaw}`);
  }

  const manifestPath = path.join(process.cwd(), BUILD_DIR, MANIFEST_FILE);
  const manifest = readJsonFile(manifestPath);

  const routeFiles = manifest?.pages?.[route];
  if (!Array.isArray(routeFiles)) {
    const availableRoutes = Object.keys(manifest?.pages || {}).sort();
    throw new Error(
      `Route "${route}" not found in app-build-manifest. Available routes: ${availableRoutes.join(", ")}`
    );
  }

  const jsFiles = routeFiles.filter((file) => file.endsWith(".js"));
  if (!jsFiles.length) {
    throw new Error(`No JS files found for route "${route}"`);
  }

  let totalBytes = 0;
  const details = jsFiles.map((relativeFile) => {
    const absoluteFile = path.join(process.cwd(), BUILD_DIR, relativeFile);
    if (!fs.existsSync(absoluteFile)) {
      throw new Error(`Missing chunk file: ${absoluteFile}`);
    }

    const bytes = gzipSizeInBytes(absoluteFile);
    totalBytes += bytes;
    return { file: relativeFile, bytes };
  });

  const totalKb = totalBytes / 1024;

  console.log(`[bundle-budget] Route: ${route}`);
  console.log(`[bundle-budget] Limit: ${limitKb.toFixed(2)} kB (gzip)`);
  for (const detail of details) {
    console.log(`[bundle-budget] ${detail.file}: ${formatKb(detail.bytes)}`);
  }
  console.log(`[bundle-budget] Total: ${formatKb(totalBytes)}`);

  if (totalKb > limitKb) {
    console.error(
      `[bundle-budget] FAIL: ${totalKb.toFixed(2)} kB exceeds ${limitKb.toFixed(2)} kB limit`
    );
    process.exit(1);
  }

  console.log(
    `[bundle-budget] PASS: ${totalKb.toFixed(2)} kB is within ${limitKb.toFixed(2)} kB limit`
  );
}

try {
  main();
} catch (error) {
  console.error("[bundle-budget] ERROR:", error.message);
  process.exit(1);
}
