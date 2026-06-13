import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, BellOff, Check, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { enableReminder, clearReminder, getReminderTime } from "@/lib/dailyReminder";

const LAST_SEEN_KEY = "ao_last_seen_date";
function checkMissedDay() {
  if (typeof window === "undefined") return null;
  const today = new Date().toISOString().slice(0,10);
  const last = localStorage.getItem(LAST_SEEN_KEY);
  localStorage.setItem(LAST_SEEN_KEY, today);
  if (!last || last === today) return null;
  const days = Math.floor((Date.parse(today) - Date.parse(last)) / 86400000);
  return days >= 1 ? days : null;
}

export default function DailyReminderSetup() {
  const [time, setTime] = useState("17:00");
  const [active, setActive] = useState<string | null>(null);
  const [missed, setMissed] = useState<number | null>(null);

  useEffect(() => {
    const t = getReminderTime();
    if (t) { setActive(t); setTime(t); }
    setMissed(checkMissedDay());
  }, []);

  const enable = async () => {
    const ok = await enableReminder(time);
    if (ok) {
      setActive(time);
      toast({ title: "Daily reminder set", description: `We'll nudge you at ${time}.` });
    } else {
      toast({ title: "Notifications blocked", description: "Allow notifications in your browser to enable reminders.", variant: "destructive" });
    }
  };

  const disable = () => {
    clearReminder();
    setActive(null);
    toast({ title: "Reminder turned off" });
  };

  return (
    <Card className="p-4 space-y-3">
      {missed && missed >= 1 && (
        <div className="px-3 py-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 text-sm flex items-center justify-between gap-2 flex-wrap">
          <span>
            ⏰ Welcome back! It's been {missed} {missed === 1 ? "day" : "days"}. Quick warmup to reignite your streak?
          </span>
          <Link to="/daily">
            <Button size="sm" variant="secondary" className="gap-1">
              <Zap className="w-3 h-3" /> Start warmup
            </Button>
          </Link>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Bell className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Daily practice reminder</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        A gentle nudge to keep your streak alive. Works while AlphaOmega is open in your browser.
      </p>
      <div className="flex items-center gap-2">
        <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-32" />
        {active === time ? (
          <Button variant="outline" onClick={disable} className="gap-1">
            <BellOff className="w-4 h-4" /> Turn off
          </Button>
        ) : (
          <Button onClick={enable} className="gap-1">
            <Check className="w-4 h-4" /> {active ? "Update" : "Enable"}
          </Button>
        )}
      </div>
      {active && <p className="text-xs text-muted-foreground">Active: {active} daily</p>}
    </Card>
  );
}