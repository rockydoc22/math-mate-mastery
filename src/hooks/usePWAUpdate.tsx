import { useEffect, useCallback, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { toast } from "@/hooks/use-toast";

// App version - increment this when you want to force an update
export const APP_VERSION = "1.0.1";
const VERSION_KEY = "app_version";

export const usePWAUpdate = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const { updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      console.log("SW Registered:", r);
      // Check for updates every 30 seconds (more aggressive for iOS)
      if (r) {
        setInterval(() => {
          console.log("Checking for SW updates...");
          r.update();
          setLastChecked(new Date());
        }, 30 * 1000);
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
      // Unregister all service workers
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          console.log("Unregistering SW for manual update...");
          await registration.unregister();
        }
      }
      
      // Clear all caches
      if ("caches" in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        console.log("Cleared all caches");
      }

      // Update version in localStorage
      localStorage.setItem(VERSION_KEY, APP_VERSION + "-" + Date.now());
      
      toast({
        title: "Updating...",
        description: "The app will reload with the latest version.",
        duration: 2000,
      });

      // Small delay to show toast, then reload
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error("Update failed:", error);
      setIsUpdating(false);
      toast({
        title: "Update Failed",
        description: "Please try again or reinstall the app.",
        variant: "destructive",
      });
    }
  }, []);

  // iOS-specific: Force reload if version mismatch detected
  const checkVersionAndReload = useCallback(async () => {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    
    if (storedVersion !== APP_VERSION) {
      console.log(`Version mismatch: stored=${storedVersion}, current=${APP_VERSION}`);
      localStorage.setItem(VERSION_KEY, APP_VERSION);
      
      // Unregister all service workers and reload (iOS fix)
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          console.log("Unregistering old SW for update...");
          await registration.unregister();
        }
      }
      
      // Clear caches
      if ("caches" in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        console.log("Cleared all caches");
      }
      
      // Force reload with cache bypass
      window.location.reload();
    }
  }, []);

  // Check version on mount and on visibility change (when app comes to foreground on iOS)
  useEffect(() => {
    checkVersionAndReload();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("App became visible, checking for updates...");
        setLastChecked(new Date());
        // Trigger SW update check when app comes to foreground
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(r => r.update());
          });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [checkVersionAndReload]);

  return { updateServiceWorker, forceUpdate, isUpdating, lastChecked, appVersion: APP_VERSION };
};
