#!/usr/bin/env bash
# Final iOS App Store preflight. Run from project root on your Mac before
# archiving in Xcode. Validates Capacitor config, web bundle, version/build
# numbers, required assets (1024 icon + screenshots), and entitlements
# (Sign in with Apple, no ATS cleartext, correct privacy URLs).
#
# Usage:   ./scripts/ios-preflight.sh
# Exit 0  = safe to archive
# Exit !0 = fix the reported issues first

set -uo pipefail

RED=$'\033[0;31m'; GREEN=$'\033[0;32m'; YELLOW=$'\033[0;33m'; NC=$'\033[0m'
FAIL=0; WARN=0
fail() { echo "${RED}❌ $1${NC}"; FAIL=$((FAIL+1)); }
warn() { echo "${YELLOW}⚠️  $1${NC}"; WARN=$((WARN+1)); }
ok()   { echo "${GREEN}✅ $1${NC}"; }
section() { echo; echo "── $1 ──"; }

PRIVACY_URL="https://40squared.club/privacy"
SUPPORT_URL="https://40squared.club/support"
IOS_DIR="ios/App"
PLIST="$IOS_DIR/App/Info.plist"
PROJECT="$IOS_DIR/App.xcodeproj/project.pbxproj"
ENTITLEMENTS="$IOS_DIR/App/App.entitlements"
ICON_DIR="$IOS_DIR/App/Assets.xcassets/AppIcon.appiconset"

section "1. Capacitor production config"
./scripts/verify-ios-prod.sh || fail "verify-ios-prod.sh reported issues"

section "2. Web bundle"
if [ -d dist ] && [ -f dist/index.html ]; then ok "dist/index.html present"; else fail "dist/ missing — run: npm run build"; fi

section "3. iOS project synced"
if [ ! -d "$IOS_DIR" ]; then
  fail "$IOS_DIR not found — run: npx cap add ios && npx cap sync ios"
  echo "Skipping native checks."; echo; [ $FAIL -gt 0 ] && exit 1 || exit 0
fi
ok "ios/ project exists"

section "4. Version & build numbers (Info.plist)"
if [ -f "$PLIST" ]; then
  VERSION=$(/usr/libexec/PlistBuddy -c "Print :CFBundleShortVersionString" "$PLIST" 2>/dev/null || echo "")
  BUILD=$(/usr/libexec/PlistBuddy -c "Print :CFBundleVersion" "$PLIST" 2>/dev/null || echo "")
  BUNDLE_ID=$(/usr/libexec/PlistBuddy -c "Print :CFBundleIdentifier" "$PLIST" 2>/dev/null || echo "")
  [ -n "$VERSION" ] && ok "CFBundleShortVersionString = $VERSION" || fail "Missing CFBundleShortVersionString"
  [ -n "$BUILD" ] && ok "CFBundleVersion = $BUILD" || fail "Missing CFBundleVersion"
  [ -n "$BUNDLE_ID" ] && ok "Bundle ID = $BUNDLE_ID" || fail "Missing CFBundleIdentifier"
  if [[ ! "$VERSION" =~ ^[0-9]+\.[0-9]+(\.[0-9]+)?$ ]]; then warn "Version '$VERSION' is not in N.N or N.N.N form"; fi
  if [[ ! "$BUILD" =~ ^[0-9]+$ ]]; then warn "Build '$BUILD' should be an integer that increases each upload"; fi
  # ATS check
  if /usr/libexec/PlistBuddy -c "Print :NSAppTransportSecurity:NSAllowsArbitraryLoads" "$PLIST" 2>/dev/null | grep -qi true; then
    fail "NSAllowsArbitraryLoads = true in Info.plist — Apple will reject. Remove for production."
  else
    ok "ATS clean (no NSAllowsArbitraryLoads)"
  fi
else
  fail "Info.plist not found at $PLIST"
fi

section "5. Entitlements (Sign in with Apple)"
if [ -f "$ENTITLEMENTS" ] && grep -q "com.apple.developer.applesignin" "$ENTITLEMENTS"; then
  ok "Sign in with Apple entitlement present"
else
  fail "Sign in with Apple entitlement missing. In Xcode: App target → Signing & Capabilities → + Capability → Sign in with Apple."
fi

section "6. 1024×1024 marketing icon"
ICON=""
for f in "$ICON_DIR"/*1024*.png "$ICON_DIR"/AppIcon-512@2x.png; do [ -f "$f" ] && ICON="$f" && break; done
if [ -z "$ICON" ]; then
  fail "No 1024 icon found in $ICON_DIR — drag a 1024×1024 PNG (no alpha, no rounded corners) into Xcode's AppIcon set."
else
  if command -v sips >/dev/null 2>&1; then
    DIM=$(sips -g pixelWidth -g pixelHeight "$ICON" | awk '/pixel(Width|Height)/ {print $2}' | xargs)
    if [ "$DIM" = "1024 1024" ]; then ok "Icon $ICON is 1024×1024"; else fail "Icon $ICON is $DIM, expected 1024×1024"; fi
    HAS_ALPHA=$(sips -g hasAlpha "$ICON" | awk '/hasAlpha/ {print $2}')
    [ "$HAS_ALPHA" = "no" ] && ok "Icon has no alpha channel" || fail "Icon has alpha — App Store rejects transparent marketing icons. Flatten on white."
  else
    warn "sips not available — cannot verify icon dimensions/alpha. Run this script on macOS."
  fi
fi

section "7. Screenshots (App Store Connect uploads)"
SHOT_DIR="fastlane/screenshots"
[ -d "appstore/screenshots" ] && SHOT_DIR="appstore/screenshots"
if [ -d "$SHOT_DIR" ]; then
  COUNT=$(find "$SHOT_DIR" -type f \( -name "*.png" -o -name "*.jpg" \) | wc -l | xargs)
  [ "$COUNT" -ge 3 ] && ok "$COUNT screenshots staged in $SHOT_DIR" || warn "Only $COUNT screenshots — need 3–10 per device (1290×2796 iPhone 6.7\")"
else
  warn "No local screenshot folder. Upload directly in App Store Connect: 1290×2796 (6.7\"), 1242×2688 (6.5\"), 2048×2732 (iPad 12.9\" if shipping iPad)."
fi

section "8. Required public URLs"
for U in "$PRIVACY_URL" "$SUPPORT_URL"; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$U" || echo "000")
  if [ "$CODE" = "200" ]; then ok "$U → 200"; else fail "$U → $CODE (App Review will reject)"; fi
done

section "9. No tracking/ad SDKs (Kids Category)"
BANNED="firebase-analytics @react-native-firebase/analytics @segment/ react-ga react-gtm-module mixpanel amplitude-js @amplitude/ posthog-js facebook-sdk react-facebook-pixel"
HITS=""
for pkg in $BANNED; do
  if grep -q "\"$pkg" package.json 2>/dev/null; then HITS="$HITS $pkg"; fi
done
if [ -n "$HITS" ]; then fail "Tracking/ad SDKs detected:$HITS — remove before submitting under Kids Category."; else ok "No tracking/ad SDKs in package.json"; fi

section "10. Parental gate coverage"
UNGATED=$(grep -rnE "window\.open\(|location\.href\s*=\s*['\"]https?:" src --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "useParentalGate\|openExternal\|node_modules" || true)
if [ -n "$UNGATED" ]; then
  warn "Potentially ungated external navigations — review:"
  echo "$UNGATED" | head -10
else
  ok "No raw external navigations outside parental gate helper"
fi

echo
echo "──────────────────────────────────────────"
if [ $FAIL -gt 0 ]; then
  echo "${RED}❌ Preflight FAILED: $FAIL blocker(s), $WARN warning(s). Do not archive.${NC}"
  exit 1
elif [ $WARN -gt 0 ]; then
  echo "${YELLOW}⚠️  Preflight passed with $WARN warning(s). Review before archiving.${NC}"
  exit 0
else
  echo "${GREEN}✅ Preflight clean. Safe to archive in Xcode → Product → Archive.${NC}"
fi