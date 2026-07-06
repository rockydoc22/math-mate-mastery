# Plan: Exam Identity Fix + Game Zone

## Part 1 — Exam Identity Fix

**Current state (verified):**
- `useExamType` only supports `sat | psat | act`. Non-SAT tests (ACT, GED, AP, IB, Pro exams, K12) are handled by **separate routes and separate question pools** (e.g. `/ap-study`, `/pro-exam`, `/k12-exam`, `/international/:examId`) — they don't silently fall back to SAT content in those flows.
- The legacy `src/pages/Index.tsx` **does** hardcode "SAT Math Practice" and pulls from `src/data/questions.ts`, but it is **not routed** (route `/` renders `Home`). If any user is landing there, it's stale.
- The place where fallback *does* happen is the generic `/quiz`, `/math`, `/english` flows: they use `useExamType()` which returns `'sat'` as default when the profile has no exam set, so a user whose real target is ACT/GED can hit SAT questions.

**Fixes:**
1. **Registry of pools per exam.** Add `src/utils/examPools.ts` mapping every `ExamType` (and every non-registry exam id used in routes) → `{ displayName, hasDedicatedBank: boolean, loader?: () => Promise<Question[]> }`.
2. **Dynamic titles.** Replace hardcoded "SAT Math Practice" strings in `Quiz`, `MathQuiz`, `EnglishQuiz`, and legacy `Index.tsx` with `${EXAM_CONFIGS[examType].shortName} ${section} Practice`.
3. **No silent SAT fallback.** In the generic quiz pages, when `useExamType` resolves to a non-SAT exam with no dedicated bank, show a "Bank coming soon — try SAT sample?" panel instead of quietly loading SAT questions.
4. **Admin visibility.** Add a small "Question Bank Status" table in `src/pages/Admin.tsx` that lists each exam and whether it has a bank + item count, so missing pools are obvious.
5. Delete / redirect the unrouted `src/pages/Index.tsx` (or make it render `Home`) so it can't reappear.

## Part 2 — Game Zone

**New route:** `/games` (component `src/pages/GameZone.tsx`), plus 4 sub-games. Also wire landing logic in `AppRoutes` / `Home`.

### Landing logic
- Unauthenticated **or** first-visit users → redirect `/` to `/games` (detect via `localStorage.aoSeenGames` flag + `useAuth` user null).
- Authenticated returning users → keep landing on `Home` (study dashboard), Game Zone available via a **new persistent nav tab** ("🎮 Games").
- Game Zone screen always shows a **"Skip to Study Dashboard →"** link in the top-right.
- After **3 completed rounds** (tracked in localStorage), show a dismissible "Create a free account to save your streak" banner for anon users.

### Four games (all under `src/pages/games/`)
Reuse existing data — no new content files.

| Game | Data source | Mechanic |
|------|-------------|----------|
| Word Hangman | `satVocab.ts` / `satVocabulary.ts` | Definition = only hint; wrong letters draw hangman; reveal on solve |
| Wordle Vocab | filter `satVocab` to 5–6 letter words | Standard green/yellow/gray, 6 guesses |
| Emoji Decode | small curated map in-component pulling from vocab + `satKeyConcepts.ts` | Type answer, 3 lives |
| Rapid Fire Swipe | `satFactsRapidFire.ts` + fallback to `questions.ts` T/F reframing | 60-sec swipe left/right |

### Persistent scoring
- New hook `src/hooks/useGameZoneStats.ts`:
  - **Anon:** localStorage key `aoGameStats` — `{ totalPoints, streak, bestStreak, perGame: { hangman: {high, played}, ... } }`.
  - **Auth:** new Supabase table `game_zone_stats` (migration in build mode) — same shape, upserted on round end. RLS: user reads/writes own row only, with GRANTs to `authenticated` and `service_role`.
- Header component `GameZoneHeader` always visible in `/games/*` showing total points + current streak.
- Badges (visual only): Rookie 100 / Vocab Shark 500 / SAT Sensei 1000, rendered as `Badge` variants from thresholds.

### Results screen
Shared `GameResults` component: shows points earned, new total, `Play Again` + `Try Another Game` buttons.

### Randomization
Each game shuffles its pool with a per-session seed so words/questions don't repeat in the same order.

### Nav
Add a "Games" tab to the primary nav (wherever `Home`'s top nav lives — will locate during build) with a 🎮 icon.

## Technical details

**Files created**
- `src/utils/examPools.ts`
- `src/pages/GameZone.tsx`
- `src/pages/games/Hangman.tsx`
- `src/pages/games/WordleVocab.tsx`
- `src/pages/games/EmojiDecode.tsx`
- `src/pages/games/RapidFireSwipe.tsx`
- `src/components/games/GameZoneHeader.tsx`
- `src/components/games/GameResults.tsx`
- `src/hooks/useGameZoneStats.ts`
- `supabase/migrations/<ts>_game_zone_stats.sql` (table + RLS + GRANTs)

**Files edited**
- `src/routes/AppRoutes.tsx` — add routes, first-visit redirect logic
- `src/pages/Home.tsx` — add Games nav tab
- `src/pages/Quiz.tsx`, `MathQuiz.tsx`, `EnglishQuiz.tsx` — dynamic titles + no-fallback guard
- `src/pages/Index.tsx` — remove or redirect to `Home`
- `src/pages/Admin.tsx` — add Bank Status panel

**Out of scope** (say so, don't do): building new AP/GED/IB banks, changing the existing `/arcade` games, and adding leaderboards for Game Zone.

## Open question
The plan assumes Part 1's exam-identity bug refers to the generic `/quiz`, `/math`, `/english` flows plus the stale `Index.tsx`. If you actually saw "SAT Math Practice" on a specific route like `/ap-study/...` or `/k12-exam/...`, tell me which one so I add its title/fallback fix instead of assuming.
