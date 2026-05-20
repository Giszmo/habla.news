#!/usr/bin/env node
// Pre-build step: write public/.well-known/nostr.json from the
// featured.local.ts override if present, else featured.default.ts.
// Replaces the runtime /api/nostr endpoint so the site can be served
// as pure static files.

import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const localPath = join(root, "src", "featured.local.ts");
const defaultPath = join(root, "src", "featured.default.ts");
const source = existsSync(localPath) ? localPath : defaultPath;

// The files are pure TypeScript with `export const names = { ... }`.
// We need only the names map for nostr.json; parse it without ts-node
// by extracting the names object literal as a JSON-shaped substring.

const src = readFileSync(source, "utf8");
const match = src.match(/export\s+const\s+names\s*(?::[^=]+)?=\s*({[\s\S]*?})\s*;/);
if (!match) {
  console.error(`gen-nostr-json: could not parse 'names' from ${source}`);
  process.exit(1);
}

// Convert the JS-object literal (quoted string values, unquoted keys, trailing
// commas allowed) into JSON by:
//   - quoting bare identifier keys
//   - stripping trailing commas
//   - dropping `// ...` line comments
const raw = match[1]
  .replace(/\/\/[^\n]*/g, "")
  .replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g, '$1"$2":')
  .replace(/,(\s*[}\]])/g, "$1");

let names;
try {
  names = JSON.parse(raw);
} catch (err) {
  console.error(`gen-nostr-json: JSON parse failed:\n${raw}\n\n${err.message}`);
  process.exit(1);
}

const outDir = join(root, "public", ".well-known");
const outFile = join(outDir, "nostr.json");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, JSON.stringify({ names }, null, 2) + "\n");

const handleCount = Object.keys(names).length;
console.log(`gen-nostr-json: wrote ${outFile} (${handleCount} names) from ${source.endsWith("featured.local.ts") ? "featured.local.ts" : "featured.default.ts"}`);
