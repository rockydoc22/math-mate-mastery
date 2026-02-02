import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// iOS Safari + PWA service workers can occasionally serve stale HTML that points
// to removed build chunks, resulting in a blank screen. This "self-heal" clears
// caches + unregisters service workers once, then reloads.
async function pwaSelfHealIfChunkError(reason?: unknown) {
  const attemptedKey = "pwaSelfHealAttempted";
  if (sessionStorage.getItem(attemptedKey) === "true") return;

  const message =
    typeof reason === "string"
      ? reason
      : (reason as any)?.message || (reason as any)?.reason?.message || "";

  const looksLikeChunkError =
    /Loading chunk [\d]+ failed/i.test(message) ||
    /ChunkLoadError/i.test(message) ||
    /import\(\) failed/i.test(message) ||
    /Failed to fetch dynamically imported module/i.test(message);

  if (!looksLikeChunkError) return;

  try {
    sessionStorage.setItem(attemptedKey, "true");

    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
    }
    if ("caches" in window) {
      const names = await caches.keys();
      await Promise.all(names.map((n) => caches.delete(n)));
    }
  } finally {
    window.location.reload();
  }
}

window.addEventListener("error", (e) => {
  const evt = e as ErrorEvent;
  pwaSelfHealIfChunkError(evt.error || evt.message);
});
window.addEventListener("unhandledrejection", (e) => {
  const evt = e as PromiseRejectionEvent;
  pwaSelfHealIfChunkError(evt.reason);
});

// Signal to the inline loader that React has mounted successfully
declare global {
  interface Window {
    __pwaLoadSuccess?: () => void;
  }
}

const root = document.getElementById("root")!;
createRoot(root).render(<App />);

// Tell the bootstrap script we loaded successfully
requestAnimationFrame(() => {
  window.__pwaLoadSuccess?.();
});
