import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { PartyPopper, RotateCcw, Grid3x3 } from "lucide-react";

interface Props {
  title?: string;
  pointsEarned: number;
  totalPoints: number;
  detail?: string;
  onPlayAgain: () => void;
}

export function GameResults({ title = "Round Complete!", pointsEarned, totalPoints, detail, onPlayAgain }: Props) {
  return (
    <Card className="p-6 text-center max-w-md mx-auto space-y-4">
      <div className="flex justify-center">
        <PartyPopper className="w-12 h-12 text-amber-500" />
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="text-4xl font-bold text-primary tabular-nums">+{pointsEarned}</div>
      <p className="text-sm text-muted-foreground">
        Total points: <span className="font-semibold text-foreground">{totalPoints}</span>
      </p>
      {detail && <p className="text-sm text-muted-foreground">{detail}</p>}
      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <Button onClick={onPlayAgain} className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" /> Play Again
        </Button>
        <Link to="/games" className="flex-1">
          <Button variant="outline" className="w-full">
            <Grid3x3 className="w-4 h-4 mr-2" /> Try Another
          </Button>
        </Link>
      </div>
    </Card>
  );
}