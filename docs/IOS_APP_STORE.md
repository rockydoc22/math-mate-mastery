# Shipping AlphaOmega to the App Store

This is the runbook for taking the Capacitor iOS shell from this repo to a TestFlight beta and then a public App Store release.

## 0. One-time setup on your Mac

1. Install **Xcode 15+** and **CocoaPods** (`sudo gem install cocoapods`).
2. Enroll in the **Apple Developer Program** ($99/yr).
3. In App Store Connect, create a new app with bundle ID `app.lovable.3a00522276624928b3c7d329b9f11de7` (or change it in `capacitor.config.json` to your own reverse-domain ID, e.g. `club.fortysquared.alphaomega`).

## 1. Pull the project locally

```bash
git clone <your-github-export-url> alphaomega
cd alphaomega
npm install
npx cap add ios
npm run build
npx cap sync ios
npx cap open ios          # opens Xcode
```

After any code change in Lovable, re-run:

```bash
git pull
npm install
npm run build
npx cap sync ios
```

Production `capacitor.config.json` ships **without** a `server.url` block, so App Store builds load the bundled `dist/` web assets. For live-reload during local dev, copy `capacitor.config.dev.json` over `capacitor.config.json` before running `npx cap sync ios`, then revert before archiving:

```bash
# Dev (hot reload from Lovable preview)
cp capacitor.config.dev.json capacitor.config.json && npx cap sync ios

# Back to production (bundled assets) before TestFlight / App Store
git checkout capacitor.config.json && npm run build && npx cap sync ios
```

### Pre-archive guard

Always run the verification script before opening Xcode to archive. It fails fast if `server.url`, `cleartext`, or any other staging-only setting leaked into `capacitor.config.json`, and confirms `dist/` exists.

```bash
npm run build
./scripts/verify-ios-prod.sh
npx cap sync ios
npx cap open ios
# In Xcode: Product → Archive → Distribute App → App Store Connect → Upload
```

If the script exits non-zero, do **not** archive — fix the config first.

### Final preflight (run on Mac before every archive)

`./scripts/ios-preflight.sh` runs the full submission checklist and exits non-zero on any blocker:

1. Capacitor config clean (delegates to `verify-ios-prod.sh`)
2. `dist/` bundle present
3. `ios/App/` synced
4. `CFBundleShortVersionString`, `CFBundleVersion`, `CFBundleIdentifier` set; no `NSAllowsArbitraryLoads`
5. `com.apple.developer.applesignin` entitlement present in `App.entitlements`
6. 1024×1024 marketing icon exists, correct dimensions, no alpha channel
7. Screenshots staged (or warn to upload directly in App Store Connect)
8. `https://40squared.club/privacy` and `/support` return 200
9. No tracking/ad SDKs in `package.json` (Kids Category requirement)
10. No raw `window.open(...https...)` or `location.href = "https..."` outside `useParentalGate` / `openExternal`

Run order on your Mac:

```bash
npm install
npm run build
./scripts/ios-preflight.sh        # must exit 0
npx cap sync ios
npx cap open ios                  # Xcode → bump build number → Product → Archive
```

## Parental gate coverage

Every link that leaves the app is wrapped with `useParentalGate()` (`src/hooks/useParentalGate.tsx`), which renders `<ParentalGate />` and only fires the underlying action after a correct multiplication answer. Gated surfaces:

- `Support` and `Privacy` — `mailto:` links to support@40squared.club
- `ShareAppButton` — native share, X, WhatsApp, Reddit
- `ShareResults` — Tweet button after a quiz
- `ChallengeAFriend` — native share of a challenge link
- `TestCatalog` — external PDFs and any `http(s)` catalog entries

When wiring future IAP / App Store flows (`@capacitor-community/in-app-purchases`), wrap the purchase trigger the same way: `guard(() => store.order(product), { reason: "This is a paid upgrade. A parent must approve." })`.

## Required public URLs (App Store Connect)

- **Privacy Policy URL:** https://40squared.club/privacy
- **Support URL:** https://40squared.club/support

Both routes are live in the app and must remain reachable for the lifetime of the listing.

## Sign in with Apple

Apple requires Sign in with Apple whenever any other third-party social login is offered. The Auth page already renders the Apple button and the `apple` provider is enabled in Lovable Cloud auth. In Xcode, open the App target → **Signing & Capabilities** → **+ Capability** → **Sign in with Apple** so the entitlement is included in the build.

## COPPA / Kids Category

- Age rating: **4+** (no objectionable content per our guardrails).
- No third-party ad SDKs are bundled — verify with `npm ls` before each release.
- Use `<ParentalGate />` (`src/components/ParentalGate.tsx`) + `openExternal()` (`src/lib/openExternal.ts`) for any link that leaves the app, mailto link, or future in-app purchase. The gate uses a 2-digit multiplication challenge that satisfies Apple's "parental gate" guideline 1.3.

## 2. App Store assets checklist

| Asset | Spec | Where it goes |
|---|---|---|
| App icon | 1024×1024 PNG, no alpha, no rounded corners | `ios/App/App/Assets.xcassets/AppIcon.appiconset/` (drag the 1024 into Xcode, it generates the rest) |
| iPhone 6.7" screenshots | 1290×2796, 3–10 images | App Store Connect → App → Previews and Screenshots |
| iPhone 6.5" screenshots | 1242×2688 (legacy, recommended) | Same |
| iPad 12.9" screenshots | 2048×2732 (only if you ship iPad) | Same |
| App preview video | optional, 15–30s | Same |
| Privacy Policy URL | required public URL | App Store Connect → App Information |
| Support URL | required public URL | App Store Connect → App Information |
| Marketing URL | optional | Same |
| Promotional text | ≤170 chars | App Store Connect → Version |
| Description | ≤4000 chars | Same |
| Keywords | ≤100 chars, comma-separated | Same |

Suggested URLs for AlphaOmega:
- Privacy Policy: `https://40squared.club/privacy`
- Support: `https://40squared.club/support`
- Marketing: `https://40squared.club`

You need to create those three pages on the site before submission. App Review will reject if the URLs 404 or look empty.

## 3. Age rating + COPPA

AlphaOmega has **kid profiles** and is used by under-13 students, so COPPA applies.

In App Store Connect → App Information → **Age Rating**, answer:
- Unrestricted Web Access: **No** (we restrict to study content)
- User Generated Content: **No** (no public posts) — or **Infrequent/Mild** if battle chat exists
- Gambling: **No**
- Contests: **No**
- Mature themes: all **None** (matches our content guardrails)

Set the **age rating to 4+**.

Then in **App Privacy**:
- Declare data collected: Email address, User ID, Product Interaction, Performance Data, Diagnostics.
- Mark each as **linked to user** and **not used for tracking**.
- For the **"Made for Kids" / Kids Category** designation:
  - Choose the **5 and under**, **6–8**, or **9–11** Kids Category band that matches your audience.
  - Apple then enforces COPPA-style rules: no third-party analytics SDKs that track kids, no behavioral ads, parental gate required for any external link or purchase.
- Confirm we comply: we have no third-party ad SDKs, no tracking pixels in the iOS shell, and parental controls live behind a password-less parent profile (see Parent Dashboard).

If you do **not** want to enter the Kids Category (it locks you out of certain features and SDKs), set the rating to 4+ and skip the Kids Category — but you still need to honor COPPA for any user who signs up as a minor. Our existing parental consent flow + no-ads policy already meets that bar.

## 4. In-app purchases (only if/when you monetize)

The app is currently 100% free, so no IAP is required for the first submission. When you add paid features:

1. In App Store Connect → **Features → In-App Purchases**, create products (consumable, non-consumable, auto-renewable subscription, etc.).
2. Install the plugin:
   ```bash
   npm install @capacitor-community/in-app-purchases
   npx cap sync ios
   ```
3. Apple takes 15–30% of revenue and **requires** IAP for any digital goods consumed inside the app. Physical goods or services consumed outside the app can use Stripe/Paddle.
4. Add a **Restore Purchases** button — App Review rejects subscription apps without it.
5. Add links to Terms of Use (EULA) and Privacy Policy on the paywall screen.

## 5. TestFlight beta

1. In Xcode: select **Any iOS Device (arm64)** → Product → **Archive**.
2. When the Organizer opens, click **Distribute App → App Store Connect → Upload**.
3. Wait ~15 min for processing in App Store Connect → TestFlight.
4. Add **Internal Testers** (up to 100, no review needed) — they get the build instantly.
5. For **External Testers** (up to 10,000), submit the build for a quick **Beta App Review** (usually <24h). Provide:
   - What to test
   - A test account login (create a demo user with sample data)
   - Contact email
6. Testers install the **TestFlight** app from the App Store and accept your invite link.

## 6. Production submission

1. Increment `CFBundleShortVersionString` (marketing version) and `CFBundleVersion` (build number) in Xcode.
2. **Remove the `server.url` block** from `capacitor.config.json`, rebuild, re-sync, re-archive.
3. Upload via Xcode → Organizer.
4. In App Store Connect → App → Version, attach the build, fill out:
   - Description, keywords, screenshots (from step 2)
   - Age rating answers
   - Privacy Policy / Support URLs
   - Demo account credentials for the reviewer
   - "Sign in with Apple" — required if you offer any other third-party login (Google). We need to either add Apple sign-in or remove Google.
5. Submit for Review. Typical turnaround: 24–48h. Common rejection reasons for our app type:
   - Missing Sign in with Apple alongside Google
   - Privacy Policy URL 404
   - Demo account doesn't work
   - "Spam / minimum functionality" if the app feels like a thin web wrapper — make sure native splash + icon + offline-friendly first screen are polished

## 7. Post-launch

- Watch crash logs in Xcode Organizer → Crashes.
- Respond to App Store reviews within 7 days from App Store Connect.
- For each Lovable update: `git pull && npm run build && npx cap sync ios`, then archive + upload a new build to keep TestFlight fresh.

---

**Open blocker before first submission**: add **Sign in with Apple** (Apple requires it whenever any other social login is offered) and publish public `/privacy` and `/support` pages on 40squared.club.