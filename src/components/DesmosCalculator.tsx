import { useState } from "react";
import { Calculator, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DesmosCalculator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="icon"
        className="fixed bottom-24 sm:bottom-6 right-4 sm:right-6 z-50 h-12 w-12 rounded-full shadow-lg border-2 border-primary bg-background hover:bg-primary/10"
        title="Open Calculator"
      >
        <Calculator className="h-5 w-5 text-primary" />
      </Button>
    );
  }

  return (
    <div
      className={`fixed z-50 shadow-2xl rounded-lg border-2 border-border bg-background overflow-hidden transition-all ${
        isMinimized
          ? "bottom-24 sm:bottom-6 right-4 sm:right-6 w-48 h-10"
          : "bottom-24 sm:bottom-6 right-4 sm:right-6 w-[90vw] max-w-[400px] h-[60vh] sm:w-[400px] sm:h-[500px]"
      }`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-muted border-b border-border">
        <div className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">Graphing Calculator</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            title={isMinimized ? "Expand" : "Minimize"}
          >
            {isMinimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={() => { setIsOpen(false); setIsMinimized(false); }}
            className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
            title="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Desmos iframe */}
      {!isMinimized && (
        <iframe
          src="https://www.desmos.com/calculator"
          title="Desmos Graphing Calculator"
          className="w-full h-[calc(100%-32px)] border-0"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      )}
    </div>
  );
};
