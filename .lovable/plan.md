## Goal

Stop serving the 3 highest-value asset groups as anonymous static files from `public/`, and route them through an authenticated edge function so only signed-in users (with rate limiting) can fetch them.

**Targets (~120 MB total):**
1. **K-12 question packs** — `public/data/k12/*.json` and related grade-level banks (~36 MB)
2. **AI prompt / coaching library** — `public/data/*coach*.json`, `*prompts*.json`, `ai_*` configs, `mistake_coach_config.json`, `runtime_core_config.json`, etc. (~10 MB of proprietary prompt engineering)
3. **SAT question images** — `public/questions/**/*.png|jpg` (~77 MB of imported SAT problem screenshots)

Out of scope: small public marketing assets, `robots.txt`, `sitemap.xml`, `placeholder.svg`, llm/SEO files.

---

## Architecture

```text
Browser (authed user)
   │  fetch('/functions/v1/protected-asset?path=data/k12/grade5.json',
   │         { headers: { Authorization: Bearer <jwt> } })
   ▼
Edge function: protected-asset
   ├─ requireUser()        → 401 if no JWT
   ├─ rate-limit per user  → 429 if abusive
   ├─ allowlist path       → 400 if not in registry
   └─ stream from private Storage bucket
         └─ Storage bucket: protected-content (private, service-role read)
```

Files are uploaded once to a private Storage bucket (`protected-content`). The edge function is the only public read path. RLS on the bucket denies anon entirely.

---

## Phases

### Phase 1 — Backend foundation
1. Create private Storage bucket `protected-content` (no public access).
2. Create `asset_access_log` table (user_id, asset_path, ts) for rate limiting + abuse forensics. Add GRANTs, RLS (`service_role` only).
3. Deploy `protected-asset` edge function:
   - Verify JWT via `requireUser()`.
   - Check sliding-window rate limit (e.g. 200 fetches / user / hour).
   - Validate `path` against an allowlist constant.
   - Stream the object from Storage with correct `Content-Type`, `Cache-Control: private, max-age=3600`.
4. Build a tiny client helper `fetchProtectedAsset(path)` that injects the user's JWT and caches responses in memory + IndexedDB.

### Phase 2 — Migrate K-12 packs (lowest risk, smallest blast radius)
1. Upload `public/data/k12/*.json` to `protected-content/k12/`.
2. Replace every `fetch('/data/k12/...')` call site with `fetchProtectedAsset('k12/...')`.
3. Delete originals from `public/data/k12/`.
4. Smoke-test K-12 quiz flow end-to-end.

### Phase 3 — Migrate AI prompt / coaching library
1. Audit `public/data/*.json` and tag each as **public config** (manifests, UI copy) vs **proprietary** (prompts, coaching rules, scoring formulas).
2. Upload proprietary files to `protected-content/ai/`.
3. Update loaders (`mistakeCoach`, `runtimeCore`, `momentumMeter`, etc.) to use `fetchProtectedAsset`.
4. Move prompt files that are **only** consumed by edge functions to a `_shared/` Deno import or env-loaded JSON instead — they should never reach the browser at all.
5. Delete migrated originals.

### Phase 4 — Migrate SAT question images (largest, trickiest)
1. Upload `public/questions/**` to `protected-content/questions/` preserving directory structure.
2. Replace `<img src="/questions/...">` with a small `<ProtectedImage path="questions/..." />` React component that fetches via the edge function, converts the response to a blob URL, and revokes on unmount.
3. Add a 24-hour IndexedDB cache layer keyed by path so repeat quiz sessions don't re-fetch.
4. Delete originals from `public/questions/`.

### Phase 5 — Hardening
1. Add anomaly detection: alert if a single user pulls > N distinct assets in M minutes (scraping signal).
2. Add `Content-Disposition: inline` and `X-Robots-Tag: noindex` on every response.
3. Update Terms of Service to reference the protected delivery endpoint and reinforce no-scraping clause.

---

## Risks / Trade-offs

- **Performance:** every protected fetch costs a function invocation + auth check. Mitigated by aggressive client-side cache and `Cache-Control: private, max-age=3600`.
- **Offline mode:** PWA offline practice breaks for protected assets unless we pre-warm IndexedDB on login. Phase 4 needs an explicit "download for offline" step.
- **Edge function cold starts:** first image of a quiz session may be ~300 ms slower. Acceptable for the protection gain.
- **Rollback:** each phase is independent. If Phase 4 misbehaves we can revert that phase only and leave the K-12 + AI migrations in place.

---

## Technical details

**Edge function path allowlist** (concept):
```ts
const ALLOWED_PREFIXES = ['k12/', 'ai/', 'questions/'];
const MAX_PATH_LEN = 256;
```

**Rate limit table** (concept):
```sql
CREATE TABLE public.asset_access_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  asset_path text not null,
  ts timestamptz not null default now()
);
GRANT ALL ON public.asset_access_log TO service_role;
ALTER TABLE public.asset_access_log ENABLE ROW LEVEL SECURITY;
-- no policies → only service_role (used by edge function) can read/write
CREATE INDEX ON public.asset_access_log (user_id, ts DESC);
```

**Client helper signature:**
```ts
async function fetchProtectedAsset(path: string): Promise<Response>
```

**Estimated effort:** Phase 1 + 2 = ~1 implementation pass. Phase 3 = 1 pass. Phase 4 = 1–2 passes (image component + cache). Phase 5 = 1 pass.

Approve and I'll start with Phase 1 + Phase 2 in the next turn.