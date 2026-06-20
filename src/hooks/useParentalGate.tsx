import { useCallback, useState } from "react";
import { ParentalGate } from "@/components/ParentalGate";

/**
 * COPPA-compliant gate for any action that leaves the app, opens an external
 * URL, triggers a share sheet, opens mailto:/tel:, or starts an IAP / App Store
 * purchase flow. Apple Kids Category requires a parental gate in front of all
 * of these.
 *
 * Usage:
 *   const { guard, gate } = useParentalGate();
 *   <button onClick={() => guard(() => window.open(url, "_blank"))}>Open</button>
 *   {gate}
 */
export function useParentalGate() {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string | undefined>();
  const [pending, setPending] = useState<(() => void) | null>(null);

  const guard = useCallback((action: () => void, opts?: { reason?: string }) => {
    setReason(opts?.reason);
    setPending(() => action);
    setOpen(true);
  }, []);

  const gate = (
    <ParentalGate
      open={open}
      onOpenChange={setOpen}
      reason={reason}
      onPass={() => {
        try { pending?.(); } finally { setPending(null); }
      }}
    />
  );

  return { guard, gate };
}

export default useParentalGate;