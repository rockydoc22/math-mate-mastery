import { useCallback, useEffect, useState } from "react";

/**
 * Global "AI Assistant" (formerly "AI Adaptive Tutor") preference.
 *
 * The user can turn the assistant off permanently in Settings, or turn it
 * off temporarily for a single test via `disableForSession`. Real practice-
 * test flows should also call `disableForSession` so the assistant stays
 * out of the way during exam simulations.
 *
 * Stored in localStorage/sessionStorage so no backend round-trip is needed;
 * kept in a hook so components subscribe to changes across tabs.
 */
const LS_KEY = "ao_ai_assistant_disabled";
const SS_KEY = "ao_ai_assistant_disabled_session";
const EVT = "ao:ai-assistant-changed";

function readState(): { off: boolean; sessionOff: boolean } {
  try {
    return {
      off: localStorage.getItem(LS_KEY) === "1",
      sessionOff: sessionStorage.getItem(SS_KEY) === "1",
    };
  } catch {
    return { off: false, sessionOff: false };
  }
}

export function useAIAssistant() {
  const [state, setState] = useState(readState);

  useEffect(() => {
    const refresh = () => setState(readState());
    window.addEventListener("storage", refresh);
    window.addEventListener(EVT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(EVT, refresh);
    };
  }, []);

  const setDisabled = useCallback((disabled: boolean) => {
    try {
      if (disabled) localStorage.setItem(LS_KEY, "1");
      else localStorage.removeItem(LS_KEY);
    } catch {}
    window.dispatchEvent(new Event(EVT));
  }, []);

  const disableForSession = useCallback(() => {
    try { sessionStorage.setItem(SS_KEY, "1"); } catch {}
    window.dispatchEvent(new Event(EVT));
  }, []);

  const clearSessionDisable = useCallback(() => {
    try { sessionStorage.removeItem(SS_KEY); } catch {}
    window.dispatchEvent(new Event(EVT));
  }, []);

  const enabled = !state.off && !state.sessionOff;
  return {
    /** Global setting from Settings page. */
    disabled: state.off,
    /** Off for this browser session only (e.g. a real practice test). */
    sessionDisabled: state.sessionOff,
    /** True when the assistant should render. */
    enabled,
    setDisabled,
    disableForSession,
    clearSessionDisable,
  };
}

/** Convenience helper for non-hook callers (e.g. quiz startup effects). */
export function isAIAssistantEnabled(): boolean {
  const s = readState();
  return !s.off && !s.sessionOff;
}

export function disableAIAssistantForSession() {
  try { sessionStorage.setItem(SS_KEY, "1"); } catch {}
  window.dispatchEvent(new Event(EVT));
}