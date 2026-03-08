import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface ConsentGateProps {
  consentType: string; // e.g. "health_screening", "pro_exam_ip"
  consentKey: string;  // e.g. "dementia", "mcat"
  title: string;
  disclaimerText: string;
  checkboxLabel: string;
  children: React.ReactNode;
}

export const ConsentGate = ({
  consentType,
  consentKey,
  title,
  disclaimerText,
  checkboxLabel,
  children,
}: ConsentGateProps) => {
  const { user } = useAuth();
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);
  const [checked, setChecked] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const check = async () => {
      const { data } = await supabase
        .from("user_consents")
        .select("id")
        .eq("user_id", user.id)
        .eq("consent_type", consentType)
        .eq("consent_key", consentKey)
        .maybeSingle();
      setHasConsented(!!data);
    };
    check();
  }, [user, consentType, consentKey]);

  const handleAgree = async () => {
    if (!user || !checked) return;
    setSaving(true);
    await supabase.from("user_consents").insert({
      user_id: user.id,
      consent_type: consentType,
      consent_key: consentKey,
    });
    setHasConsented(true);
    setSaving(false);
  };

  if (hasConsented === null) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (hasConsented) return <>{children}</>;

  return (
    <Card className="p-6 max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <ShieldAlert className="w-8 h-8 text-yellow-500 shrink-0" />
        <h2 className="text-lg font-bold">{title}</h2>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 max-h-60 overflow-y-auto">
        <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
          {disclaimerText}
        </p>
      </div>

      <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
        <Checkbox
          id="consent-checkbox"
          checked={checked}
          onCheckedChange={(v) => setChecked(v === true)}
          className="mt-0.5"
        />
        <label htmlFor="consent-checkbox" className="text-sm font-medium cursor-pointer leading-relaxed">
          {checkboxLabel}
        </label>
      </div>

      <Button
        className="w-full"
        disabled={!checked || saving}
        onClick={handleAgree}
      >
        {saving ? "Saving..." : "I Agree — Continue"}
      </Button>
    </Card>
  );
};
