import { useRegisterSW } from "virtual:pwa-register/react";
import { toast } from "@/hooks/use-toast";

export const usePWAUpdate = () => {
  const { updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      console.log("SW Registered:", r);
      // Check for updates every 60 seconds
      if (r) {
        setInterval(() => {
          r.update();
        }, 60 * 1000);
      }
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
    onNeedRefresh() {
      // Auto-update immediately when new version is available
      updateServiceWorker(true);
      toast({
        title: "App Updated",
        description: "The app has been updated to the latest version.",
        duration: 3000,
      });
    },
  });

  return { updateServiceWorker };
};
