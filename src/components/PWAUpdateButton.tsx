import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePWAUpdate, APP_VERSION } from "@/hooks/usePWAUpdate";

export const PWAUpdateButton = () => {
  const { forceUpdate, isUpdating, hasUpdate } = usePWAUpdate();

  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
      <p className="text-xs text-muted-foreground">Version {APP_VERSION}</p>
      <Button
        onClick={forceUpdate}
        disabled={isUpdating}
        variant={hasUpdate ? "default" : "outline"}
        size="sm"
        className="gap-2"
      >
        <RefreshCw className={`w-4 h-4 ${isUpdating ? "animate-spin" : ""}`} />
        {isUpdating ? "Updating..." : hasUpdate ? "Update Now" : "Check for Updates"}
      </Button>
      {hasUpdate && (
        <p className="text-xs text-primary font-medium">
          New version available!
        </p>
      )}
    </div>
  );
};
