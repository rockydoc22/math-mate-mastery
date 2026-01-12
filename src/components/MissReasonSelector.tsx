import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MISS_REASONS, MissReason } from "@/utils/topicMastery";

interface MissReasonSelectorProps {
  onSelect: (reason: MissReason) => void;
  isLoading?: boolean;
}

export const MissReasonSelector = ({ onSelect, isLoading }: MissReasonSelectorProps) => {
  return (
    <Card className="p-4 border-2 border-orange-500/30 bg-orange-500/5">
      <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
        <span>🎯</span>
        Why did you miss this? <span className="text-xs text-muted-foreground">(helps track patterns)</span>
      </h4>
      <div className="grid grid-cols-1 gap-2">
        {MISS_REASONS.map((reason) => (
          <Button
            key={reason.value}
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={() => onSelect(reason.value)}
            className="justify-start h-auto py-2 px-3 text-left hover:bg-orange-500/10 hover:border-orange-500/50"
          >
            <span className="text-lg mr-2">{reason.icon}</span>
            <div className="flex flex-col items-start">
              <span className="font-medium text-sm">{reason.label}</span>
              <span className="text-xs text-muted-foreground">{reason.description}</span>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};
