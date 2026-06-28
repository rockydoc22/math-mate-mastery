import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type PromptOpts = {
  /** Path (with search/hash) to send the user back to after signing in. */
  returnTo?: string;
  /** Short reason shown in the dialog body. */
  message?: string;
  /** Friendly label for what they're trying to open. */
  title?: string;
};

type Ctx = {
  /** Returns true if already signed in (caller can proceed). Otherwise opens the modal and returns false. */
  requireAuth: (opts?: PromptOpts) => boolean;
  /** Force-open the prompt. */
  promptSignIn: (opts?: PromptOpts) => void;
};

const SignInPromptContext = createContext<Ctx | undefined>(undefined);

export function SignInPromptProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [opts, setOpts] = useState<PromptOpts>({});
  const [pending, setPending] = useState<null | "signIn" | "signUp">(null);

  const promptSignIn = useCallback((o?: PromptOpts) => {
    setOpts(o ?? {});
    setOpen(true);
  }, []);

  const requireAuth = useCallback(
    (o?: PromptOpts) => {
      if (user) return true;
      promptSignIn(o);
      return false;
    },
    [user, promptSignIn]
  );

  const goToAuth = (mode: "signIn" | "signUp") => {
    if (pending) return;
    setPending(mode);
    const dest = opts.returnTo ?? window.location.pathname + window.location.search;
    const safe = dest.startsWith("/") && !dest.startsWith("//") ? dest : "/";
    const qs = new URLSearchParams({ returnTo: safe });
    if (mode === "signUp") qs.set("mode", "signup");
    // Navigate first, then close — keeps focus inside the dialog while React routes.
    navigate(`/auth?${qs.toString()}`);
    setOpen(false);
    // Reset pending on the next tick so the dialog reopens clean if the user cancels auth.
    setTimeout(() => setPending(null), 0);
  };

  return (
    <SignInPromptContext.Provider value={{ requireAuth, promptSignIn }}>
      {children}
      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (pending) return; // block close while a transition is in flight
          setOpen(next);
        }}
      >
        <DialogContent
          className="sm:max-w-md"
          aria-busy={pending !== null}
          onEscapeKeyDown={(e) => {
            if (pending) e.preventDefault();
          }}
        >
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-center">
              {opts.title ?? "Sign in to continue"}
            </DialogTitle>
            <DialogDescription className="text-center">
              {opts.message ??
                "This practice is for signed-in students. Sign in and we'll bring you right back here."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2 sm:flex-col">
            <Button
              className="w-full"
              onClick={() => goToAuth("signIn")}
              disabled={pending !== null}
              aria-label="Sign in to continue"
            >
              {pending === "signIn" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Opening sign in…
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => goToAuth("signUp")}
              disabled={pending !== null}
            >
              {pending === "signUp" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Opening sign up…
                </>
              ) : (
                "Create free account"
              )}
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setOpen(false)}
              disabled={pending !== null}
            >
              Not now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SignInPromptContext.Provider>
  );
}

export function useSignInPrompt(): Ctx {
  const ctx = useContext(SignInPromptContext);
  if (!ctx) throw new Error("useSignInPrompt must be used within SignInPromptProvider");
  return ctx;
}