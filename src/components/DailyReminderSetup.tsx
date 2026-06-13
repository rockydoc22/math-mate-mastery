import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, BellOff, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { enableReminder, clearReminder, getReminderTime } from "@/lib/dailyReminder";

export default function DailyReminderSetup() {
  const [time, setTime] = useState("17:00");
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const t = getReminderTime();
    if (t) { setActive(t); setTime(t); }
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