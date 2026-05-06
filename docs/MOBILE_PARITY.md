# Mobile Parity Decision Doc
*Owner: AlphaΩ Product · Last updated: 2026-05-06*

## Context
Current rule (per Core memory): heavy/complex features are desktop-only and mobile users see a "desktop available" notice. The Home grid uses `mobileVisible: false` to hide ~30 tiles on mobile. Reviews from ChatGPT + Claude both flagged this as a major UX hole — mobile users see dead-ends.

## Decision Framework
Each feature falls into one of three buckets:

| Bucket | Criteria | Mobile Strategy |
|---|---|---|
| **PORT** | Linear flow, ≤3 columns, no heavy charts/tables, primary loop value | Build mobile UI now |
| **DEFER** | Useful but acceptable to gate; show clear "Open on desktop" CTA + email-me link | Keep notice, add deep-link email |
| **DROP from mobile** | Admin/instructor only or rarely used | Remove from grid entirely on mobile |

## Per-tile decision
| Tile | Current | Decision | Notes |
|---|---|---|---|
| Math Tricks | hidden | **PORT** | Pure content cards — trivial port |
| Concepts | hidden | **PORT** | Same |
| Test Day Tips | hidden | **PORT** | Same |
| Endurance Run | hidden | **PORT** | Single-question flow already mobile-shaped |
| Speed Drill | hidden | **PORT** | Same |
| Elite Practice | hidden | **PORT** | Quiz wrapper |
| Friend Compare | hidden | **DEFER** | Side-by-side charts hard on mobile |
| Study Groups | hidden | **PORT** | List + chat are mobile-native |
| Conversations | hidden | **PORT** | Chat UI |
| Score Predictor | hidden | **DEFER** | Multi-axis viz; show summary card only |
| **Personality / IQ / Brain Games / Logic Games / Health Checks** | hidden | **DEFER → moved into Explore tile** | Done in this pass |
| Skill Map | hidden | **DEFER** | Graph viz needs hover |
| Study Planner | hidden | **PORT** | Calendar list view |
| Calendar | hidden | **PORT** | Already mobile-friendly |
| Weekly Goals | hidden | **PORT** | Cards |
| Achievements | hidden | **PORT** | Grid of badges |
| Mistake Journal | hidden | **PORT** | Vertical list |
| Report Card | hidden | **DEFER** | Wide tables — show condensed score |
| Practice Log | hidden | **PORT** | Timeline |
| Portfolio | hidden | **DEFER** | Doc viewer |
| Strategy | hidden | **PORT** | Reading content |
| Exam Simulator | hidden | **DEFER** | Long timed flow — discourage on phone |
| What's Next | hidden | **PORT** | Card stack |
| Pro Exams | hidden | **DEFER** | Niche |
| Teacher Hub / Parent / School Admin | hidden | **DROP** | Not student-facing |
| Join Class | hidden | **PORT** | 6-char code input |
| Assignments | hidden | **PORT** | List |
| Coin Shop | hidden | **PORT** | Grid |
| Study Timer | hidden | **PORT** | Single button |
| Inbox | hidden | **PORT** | List |

## Summary
- **Port (do work)**: 18 tiles
- **Defer (keep notice + better empty state)**: 8 tiles  
- **Drop from mobile entirely**: 3 tiles (instructor/admin)

## Next steps
1. Flip `mobileVisible: true` for the 18 "PORT" tiles in `src/pages/Home.tsx`.
2. Audit each ported page for layout breakage at 360–414px widths.
3. For DEFER tiles, replace generic notice with a **summary card + "View full version on desktop"** CTA + "email me a link" button.
4. Remove DROP tiles from mobile grid via filter.
5. Track `mobile_tile_clicked` event to measure which ports actually get used.

## Open questions
- Should we add a "Send myself a desktop link" email? (Requires SES/Resend hookup — already have `email_send_log`.)
- For Score Predictor / Skill Map: ship a simplified mobile viz (sparkline + top-3 list) instead of pure defer?
