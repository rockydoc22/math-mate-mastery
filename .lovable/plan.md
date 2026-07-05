# Seven AP subjects load zero questions

## Confirmed
`src/data/{apCSP,apCalculusAB,apEnglishLang,apEnvironmentalScience,apEuropeanHistory,apHumanGeo,apStatistics}Questions.ts` all have `loadBank()` stubbed to `Promise.resolve({ default: { courses: [] } })`. The referenced `ap_mega_bank_v2.json` / `ap_mega_bank_lovable.json` are no longer in `src/data/`, so every unit resolves to `[]` and `startQuiz()` in `src/pages/APStudy.tsx` short-circuits — unit tiles render but do nothing.

## Options (pick one)

**A. Restore the mega bank JSON** — re-add `src/data/ap_mega_bank_v2.json` (or `_lovable.json`) with the 7 courses/units and revert the seven `loadBank()` stubs to `import('./ap_mega_bank_v2.json')`. Also re-add the manualChunks entry in `vite.config.ts`. Requires the source JSON — do you have it, or should we regenerate via the bulk-generate edge functions (300+ items per course)?

**B. Generate fresh banks per subject** — run `bulk-generate-orchestrator` for each of the 7 AP courses (target ≥300 items each, matching Core memory). Store per-subject JSON files (e.g. `ap_csp_full_question_bank.json`) and update each loader to import its own file. Slower, but no dependency on the missing mega file.

**C. Hide the 7 subjects until data exists** — remove the seven entries from `APStudy.tsx` subject map and from the AP subject picker so students don't see broken tiles. Fastest, but removes the courses from the product until data returns.

Please pick A, B, or C (and for A, confirm whether the JSON can be provided).
