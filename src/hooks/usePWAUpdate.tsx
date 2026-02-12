import { useEffect, useCallback, useRef, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export const APP_VERSION = "1.0.6";

const VERSION_KEY = "sat_mastery_app_version";
const AUTO_APPLY_UPDATES = true;

/**
 * Force-clear all caches and unregister service workers when a new version is detected.
 * This runs synchronously on import so stale PWA caches are purged before React mounts.
 */
async function clearAllCachesIfVersionChanged(): Promise<boolean> {
  try {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    if (storedVersion === APP_VERSION) return false;

    console.log(`[PWA] Version change detected: ${storedVersion} → ${APP_VERSION}. Clearing caches.`);

    // Clear all Cache Storage entries
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      console.log(`[PWA] Cleared ${cacheNames.length} cache(s).`);
    }

    // Unregister all service workers so the next load fetches fresh assets
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((r) => r.unregister()));
      console.log(`[PWA] Unregistered ${registrations.length} service worker(s).`);
    }

    localStorage.setItem(VERSION_KEY, APP_VERSION);
    return true; // caches were cleared
  } catch (e) {
    console.error("[PWA] Cache clear failed:", e);
    // Still stamp the version so we don't loop
    try { localStorage.setItem(VERSION_KEY, APP_VERSION); } catch {}
    return false;
  }
}

// Fire immediately — if caches were cleared, reload to get fresh assets
clearAllCachesIfVersionChanged().then((cleared) => {
  if (cleared) {
    // Small delay to let any in-flight renders settle
    setTimeout(() => window.location.reload(), 300);
  }
});

export const usePWAUpdate = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const autoUpdateAttemptedRef = useRef(false);

  const { updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      console.log("SW Registered");
      if (r) {
        setInterval(() => { r.update(); }, 60 * 1000);
      }
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
    onNeedRefresh() {
      setHasUpdate(true);
      if (!AUTO_APPLY_UPDATES) {
        toast({
          title: "Update Available",
          description: "Tap 'Update App' to get the latest version.",
          duration: 5000,
        });
      }
    },
  });

  const applyUpdateAndReload = useCallback(async () => {
    setIsUpdating(true);
    try {
      await updateServiceWorker(true);
      toast({
        title: "App Updated",
        description: "Reloading to the latest version…",
        duration: 1200,
      });
      setTimeout(() => { window.location.reload(); }, 600);
    } catch (error) {
      console.error("Update failed:", error);
      setIsUpdating(false);
      toast({
        title: "Update Failed",
        description: "If you're on iPhone and the app is blank, use Quick Fix to refresh to the newest version.",
        variant: "destructive",
        action: (
          <ToastAction altText="Open Quick Fix" onClick={() => (window.location.href = "/quick-fix.html")}>
            Quick Fix
          </ToastAction>
        ),
      });
    }
  }, [updateServiceWorker]);

  useEffect(() => {
    if (!AUTO_APPLY_UPDATES || !hasUpdate || isUpdating || autoUpdateAttemptedRef.current) return;
    autoUpdateAttemptedRef.current = true;
    applyUpdateAndReload();
  }, [applyUpdateAndReload, hasUpdate, isUpdating]);

  const forceUpdate = useCallback(async () => {
    await applyUpdateAndReload();
  }, [applyUpdateAndReload]);

  return {
    updateServiceWorker,
    forceUpdate,
    isUpdating,
    hasUpdate,
    appVersion: APP_VERSION,
  };
};
