import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { InstallAppButton } from "@/components/InstallAppButton";
import { ShareAppButton } from "@/components/ShareAppButton";

const InstallApp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-6">
      <div className="w-full max-w-md">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <h1 className="text-2xl font-bold text-foreground mb-2 text-center">Install the App</h1>
        <p className="text-muted-foreground text-center mb-8">
          Add to your home screen for quick access and offline practice
        </p>

        <div className="flex flex-col items-center gap-4">
          <InstallAppButton />
          <ShareAppButton />
        </div>
      </div>
    </div>
  );
};

export default InstallApp;
