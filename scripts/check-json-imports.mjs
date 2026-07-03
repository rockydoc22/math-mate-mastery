#!/usr/bin/env node
// Prebuild guard: verify every JSON file referenced from src/** actually exists.
// Prints a clear list of missing files and exits non-zero so Vite never starts a
// doomed build (avoids cryptic Rollup "Could not resolve entry module" errors).
import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { resolve, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const VITE_CONFIG = join(ROOT, "vite.config.ts");

const CODE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// Matches: import x from "./foo.json"; import("./foo.json"); require("./foo.json")
const IMPORT_RE =
  /(?:from\s*|import\s*\(\s*|require\s*\(\s*)["']([^"']+\.json)["']/g;

const missing = []; // { file, ref, resolved }

function scanFile(file) {
  const src = readFileSync(file, "utf8");
  let m;
  while ((m = IMPORT_RE.exec(src))) {
    const ref = m[1];
    if (ref.startsWith("@/")) {
      const resolved = join(SRC, ref.slice(2));
      if (!existsSync(resolved)) missing.push({ file, ref, resolved });
    } else if (ref.startsWith(".") || ref.startsWith("/")) {
      const resolved = ref.startsWith("/")
        ? join(ROOT, ref)
        : resolve(dirname(file), ref);
      if (!existsSync(resolved)) missing.push({ file, ref, resolved });
    }
    // bare specifiers (node_modules) are ignored
  }
}

// 1. Scan every source file
for (const f of walk(SRC)) {
  if (CODE_EXT.has(f.slice(f.lastIndexOf(".")))) scanFile(f);
}

// 2. Scan vite.config.ts for manualChunks references
if (existsSync(VITE_CONFIG)) scanFile(VITE_CONFIG);

if (missing.length) {
  console.error("\n\u001b[31m\u2717 Missing JSON files referenced by imports:\u001b[0m\n");
  for (const { file, ref, resolved } of missing) {
    console.error(`  \u2022 ${relative(ROOT, file)}`);
    console.error(`      imports: ${ref}`);
    console.error(`      expected: ${relative(ROOT, resolved)}`);
  }
  console.error(
    `\n${missing.length} missing JSON reference(s). Either restore the file(s) or update/remove the import.\n`
  );
  process.exit(1);
}

console.log(`\u2713 JSON import check passed (all referenced .json files exist).`);