import { useEffect, useCallback, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { toast } from "@/hooks/use-toast";

export const APP_VERSION = "1.0.3";

export const usePWAUpdate = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);

  const clearAllCachesAndSW = useCallback(async () => {
    // Unregister all service workers
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        registrations.map(async (registration) => {
          await registration.unregister();
        })
      );
    }

    // Clear all caches
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
    }
  }, []);

  const { updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      console.log("SW Registered");
      // Check for updates periodically but don't auto-reload
      if (r) {
        setInterval(() => {
          r.update();
        }, 60 * 1000); // Check every minute
      }
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
    onNeedRefresh() {
      // Just notify that update is available, don't auto-reload
      setHasUpdate(true);
      toast({
        title: "Update Available",
        description: "Tap 'Update App' to get the latest version.",
        duration: 5000,
      });
    },
  });

  // Manual force update function - only called when user clicks button
  const forceUpdate = useCallback(async () => {
    setIsUpdating(true);

    try {
      await clearAllCachesAndSW();

      toast({
        title: "Updating...",
        description: "The app will reload now.",
        duration: 1000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Update failed:", error);
      setIsUpdating(false);
      toast({
        title: "Update Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }, [clearAllCachesAndSW]);

  return {
    updateServiceWorker,
    forceUpdate,
    isUpdating,
    hasUpdate,
    appVersion: APP_VERSION,
  };
};
