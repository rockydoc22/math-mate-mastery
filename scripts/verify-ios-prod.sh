#!/usr/bin/env bash
# Pre-archive guard: fails the iOS build if staging/dev settings leaked into
# the production Capacitor config. Run before `npx cap sync ios` and before
# archiving in Xcode.
set -euo pipefail

CFG="capacitor.config.json"
if [ ! -f "$CFG" ]; then
  echo "❌ $CFG not found"; exit 1
fi

node -e "
  const c = require('./$CFG');
  const fail = (m) => { console.error('❌ ' + m); process.exit(1); };
  if (c.server) fail('server block present in $CFG — remove for production builds.');
  if (c.server && c.server.url) fail('server.url present — staging hot-reload leaked into production.');
  if (c.server && c.server.cleartext) fail('cleartext enabled — never ship to App Store.');
  if (!c.appId || !c.appName || !c.webDir) fail('missing appId/appName/webDir.');
  console.log('✅ Production Capacitor config clean: ' + c.appId + ' (' + c.appName + ')');
"

if [ ! -d "dist" ]; then
  echo "⚠️  dist/ not found — run \`npm run build\` before \`npx cap sync ios\`."
  exit 1
fi

echo "✅ dist/ present. Safe to run: npx cap sync ios && npx cap open ios"