import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Download, Smartphone, Monitor, Apple, Share, PlusSquare, MoreVertical } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

export const InstallAppButton = () => {
  const { canInstall, isInstalled, platform, promptInstall, hasNativePrompt } = usePWAInstall();
  const [showInstructions, setShowInstructions] = useState(false);

  if (isInstalled) {
    return null; // Don't show if already installed
  }

  const handleClick = async () => {
    if (hasNativePrompt) {
      await promptInstall();
    } else {
      setShowInstructions(true);
    }
  };

  const getButtonText = () => {
    switch (platform) {
      case "ios":
        return "Add to Home Screen";
      case "android":
        return "Install App";
      case "desktop":
        return "Install on Desktop";
      default:
        return "Install App";
    }
  };

  const getIcon = () => {
    switch (platform) {
      case "ios":
        return <Apple className="w-4 h-4" />;
      case "android":
        return <Smartphone className="w-4 h-4" />;
      case "desktop":
        return <Monitor className="w-4 h-4" />;
      default:
        return <Download className="w-4 h-4" />;
    }
  };

  // Only show on platforms where we can provide value
  if (!canInstall && platform !== "desktop") {
    return null;
  }

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outline"
        size="sm"
        className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/10"
      >
        {getIcon()}
        {getButtonText()}
      </Button>

      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {getIcon()}
              {getButtonText()}
            </DialogTitle>
            <DialogDescription>
              Install 40² SAT Prep for quick access and offline practice
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            {platform === "ios" && <IOSInstructions />}
            {platform === "android" && <AndroidInstructions />}
            {platform === "desktop" && <DesktopInstructions />}
            {platform === "unknown" && <GenericInstructions />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const IOSInstructions = () => (
  <div className="space-y-4">
    <p className="text-sm text-muted-foreground">
      Follow these steps in <strong>Safari</strong>:
    </p>
    <ol className="space-y-3 text-sm">
      <li className="flex items-start gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">1</span>
        <div className="flex items-center gap-2">
          <span>Tap the</span>
          <Share className="w-5 h-5 text-primary" />
          <span><strong>Share</strong> button</span>
        </div>
      </li>
      <li className="flex items-start gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">2</span>
        <span>Scroll down and tap <strong>"Add to Home Screen"</strong></span>
      </li>
      <li className="flex items-start gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">3</span>
        <div className="flex items-center gap-2">
          <span>Tap</span>
          <PlusSquare className="w-5 h-5 text-primary" />
          <span><strong>Add</strong></span>
        </div>
      </li>
    </ol>
    <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-xs text-destructive">
      <strong>Note:</strong> This must be done in Safari. Other browsers on iPhone don't support this feature.
    </div>
  </div>
);

const AndroidInstructions = () => (
  <div className="space-y-4">
    <p className="text-sm text-muted-foreground">
      Follow these steps in <strong>Chrome</strong>:
    </p>
    <ol className="space-y-3 text-sm">
      <li className="flex items-start gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">1</span>
        <div className="flex items-center gap-2">
          <span>Tap the</span>
          <MoreVertical className="w-5 h-5 text-primary" />
          <span><strong>Menu</strong> (3 dots)</span>
        </div>
      </li>
      <li className="flex items-start gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">2</span>
        <span>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong></span>
      </li>
      <li className="flex items-start gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">3</span>
        <span>Tap <strong>"Install"</strong> to confirm</span>
      </li>
    </ol>
  </div>
);

const DesktopInstructions = () => (
  <div className="space-y-4">
    <p className="text-sm text-muted-foreground">
      Install for quick access from your desktop:
    </p>
    
    <div className="space-y-3">
      <div className="p-3 bg-muted/50 rounded-lg">
        <p className="font-medium text-sm mb-2">Chrome / Edge</p>
        <p className="text-xs text-muted-foreground">
          Look for the <strong>install icon</strong> (⊕) in the address bar, or go to Menu → "Install 40² SAT Prep"
        </p>
      </div>
      
      <div className="p-3 bg-muted/50 rounded-lg">
        <p className="font-medium text-sm mb-2">Safari (Mac)</p>
        <p className="text-xs text-muted-foreground">
          Go to File → "Add to Dock" to create a desktop app
        </p>
      </div>
      
      <div className="p-3 bg-muted/50 rounded-lg">
        <p className="font-medium text-sm mb-2">Firefox</p>
        <p className="text-xs text-muted-foreground">
          Firefox doesn't support installing web apps. Try Chrome or Edge instead.
        </p>
      </div>
    </div>
  </div>
);

const GenericInstructions = () => (
  <div className="space-y-4">
    <p className="text-sm text-muted-foreground">
      To install this app:
    </p>
    <ul className="space-y-2 text-sm">
      <li>• <strong>Chrome/Edge:</strong> Look for the install icon in the address bar</li>
      <li>• <strong>Safari (iOS):</strong> Tap Share → Add to Home Screen</li>
      <li>• <strong>Android:</strong> Tap Menu → Install app</li>
    </ul>
  </div>
);
