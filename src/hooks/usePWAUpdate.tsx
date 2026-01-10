import { useEffect, useCallback, useState, useRef } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { toast } from "@/hooks/use-toast";

// App version - increment this when you want to force an update
// Using timestamp ensures every build is unique
export const APP_VERSION = "1.0.2";
const BUILD_TIME = Date.now().toString();
const VERSION_KEY = "app_version";
const BUILD_KEY = "app_build_time";

export const usePWAUpdate = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const hasCheckedOnMount = useRef(false);

  const clearAllCachesAndSW = useCallback(async () => {
    // Unregister all service workers
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        registrations.map(async (registration) => {
          console.log("Unregistering SW...");
          await registration.unregister();
        })
      );
    }

    // Clear all caches
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      console.log("Cleared all caches:", cacheNames);
    }

    // Clear sessionStorage PWA data
    sessionStorage.clear();
  }, []);

  const { updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      console.log("SW Registered:", r);
      // Check for updates every 15 seconds (more aggressive)
      if (r) {
        setInterval(() => {
          console.log("Checking for SW updates...");
          r.update();
          setLastChecked(new Date());
        }, 15 * 1000);
      }
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
    onNeedRefresh() {
      console.log("New content available, updating...");
      // Auto-update immediately when new version is available
      updateServiceWorker(true);
      toast({
        title: "App Updated",
        description: "The app has been updated to the latest version.",
        duration: 3000,
      });
    },
  });

  // Manual force update function
  const forceUpdate = useCallback(async () => {
    setIsUpdating(true);

    try {
      await clearAllCachesAndSW();

      // Update version in localStorage with unique timestamp
      const newVersion = APP_VERSION + "-" + Date.now();
      localStorage.setItem(VERSION_KEY, newVersion);
      localStorage.setItem(BUILD_KEY, BUILD_TIME);

      toast({
        title: "Updating...",
        description: "The app will reload with the latest version.",
        duration: 2000,
      });

      // Force hard reload bypassing all caches
      setTimeout(() => {
        // Use location.href with cache-busting query param for iOS
        const url = new URL(window.location.href);
        url.searchParams.set("_refresh", Date.now().toString());
        window.location.href = url.toString();
      }, 500);
    } catch (error) {
      console.error("Update failed:", error);
      setIsUpdating(false);
      toast({
        title: "Update Failed",
        description: "Please try again or reinstall the app.",
        variant: "destructive",
      });
    }
  }, [clearAllCachesAndSW]);

  // iOS-specific: Force reload if version or build mismatch detected
  const checkVersionAndReload = useCallback(async () => {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    const storedBuild = localStorage.getItem(BUILD_KEY);

    const versionMismatch = storedVersion !== APP_VERSION;
    const buildMismatch = storedBuild !== BUILD_TIME;

    if (versionMismatch || buildMismatch) {
      console.log(
        `Update needed: version=${storedVersion}->${APP_VERSION}, build=${storedBuild}->${BUILD_TIME}`
      );

      // Store new version/build BEFORE clearing to prevent loops
      localStorage.setItem(VERSION_KEY, APP_VERSION);
      localStorage.setItem(BUILD_KEY, BUILD_TIME);

      await clearAllCachesAndSW();

      // Force reload - use replace to avoid back button issues
      const url = new URL(window.location.href);
      url.searchParams.delete("_refresh"); // Clean up any old refresh params
      window.location.replace(url.toString());
      return true;
    }
    return false;
  }, [clearAllCachesAndSW]);

  // Check version on mount and on visibility change
  useEffect(() => {
    if (!hasCheckedOnMount.current) {
      hasCheckedOnMount.current = true;
      checkVersionAndReload();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("App became visible, checking for updates...");
        setLastChecked(new Date());
        
        // Trigger SW update check when app comes to foreground
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.getRegistrations().then((registrations) => {
            registrations.forEach((r) => r.update());
          });
        }
      }
    };

    // Also check on focus (backup for iOS)
    const handleFocus = () => {
      console.log("Window focused, checking for updates...");
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((r) => r.update());
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [checkVersionAndReload]);

  return {
    updateServiceWorker,
    forceUpdate,
    isUpdating,
    lastChecked,
    appVersion: APP_VERSION,
  };
};
