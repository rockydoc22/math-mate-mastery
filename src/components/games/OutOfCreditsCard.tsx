import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useDailyCredits, DAILY_CREDIT_MAX } from "@/hooks/useDailyCredits";

/** Blocking view shown when a player has used all daily game plays. */
export function OutOfCreditsCard() {
  const { resetsInLabel } = useDailyCredits();
  return (
    <Card className="p-6 text-center space-y-4 border-destructive/30 bg-destructive/5">
      <div className="text-4xl">⏳</div>
      <h2 className="text-xl font-bold">You're out of plays for today</h2>
      <p className="text-sm text-muted-foreground">
        You've used all {DAILY_CREDIT_MAX} free daily game plays. Your credits refill in{" "}
        <span className="inline-flex items-center gap-1 font-semibold text-foreground">
          <Clock className="w-3 h-3" />
          {resetsInLabel()}
        </span>
        .
      </p>
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <Link to="/games">
          <Button variant="outline" className="w-full sm:w-auto">Back to Game Zone</Button>
        </Link>
        <Link to="/home">
          <Button className="w-full sm:w-auto">Keep studying instead</Button>
        </Link>
      </div>
    </Card>
  );
}