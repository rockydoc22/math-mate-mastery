import { useEffect, useCallback, useRef, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { toast } from "@/hooks/use-toast";

export const APP_VERSION = "1.0.3";

// When enabled, the app will silently apply updates and reload as soon as a new
// service worker is ready. This is the simplest way to ensure students always
// get the latest version.
const AUTO_APPLY_UPDATES = true;

export const usePWAUpdate = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const autoUpdateAttemptedRef = useRef(false);

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
      setHasUpdate(true);
      // If we are auto-applying updates, keep the UX silent and just refresh.
      // Otherwise, show a prompt so the user can tap to update.
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
      // This tells the waiting service worker to activate immediately.
      await updateServiceWorker(true);

      toast({
        title: "App Updated",
        description: "Reloading to the latest version…",
        duration: 1200,
      });

      // Give iOS Safari a beat to swap controllers.
      setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch (error) {
      console.error("Update failed:", error);
      setIsUpdating(false);
      toast({
        title: "Update Failed",
        description: "Please close and reopen the app, then try again.",
        variant: "destructive",
      });
    }
  }, [updateServiceWorker]);

  // Automatic updates: when a new SW is ready, apply it and reload.
  useEffect(() => {
    if (!AUTO_APPLY_UPDATES) return;
    if (!hasUpdate) return;
    if (isUpdating) return;
    if (autoUpdateAttemptedRef.current) return;

    autoUpdateAttemptedRef.current = true;
    applyUpdateAndReload();
  }, [applyUpdateAndReload, hasUpdate, isUpdating]);

  // Manual force update function - only called when user clicks button
  const forceUpdate = useCallback(async () => {
    // Even when auto-updates are enabled, keep this around as a manual escape hatch.
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
