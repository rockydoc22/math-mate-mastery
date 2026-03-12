import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type SupportedOtpType = "signup" | "invite" | "magiclink" | "recovery" | "email_change" | "email";

const supportedOtpTypes = new Set<SupportedOtpType>([
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
]);

const isSupportedOtpType = (value: string | null): value is SupportedOtpType =>
  value !== null && supportedOtpTypes.has(value as SupportedOtpType);

const AuthCallback = () => {
  const navigate = useNavigate();
  const [statusText, setStatusText] = useState("Verifying your email…");

  useEffect(() => {
    let isMounted = true;

    const updateStatus = (message: string) => {
      if (isMounted) {
        setStatusText(message);
      }
    };

    const handleCallback = async () => {
      try {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));

        const error = params.get("error") ?? hashParams.get("error");
        const errorDescription =
          params.get("error_description") ?? hashParams.get("error_description");

        if (error) {
          throw new Error(errorDescription ?? error);
        }

        const code = params.get("code");
        const tokenHash = params.get("token_hash") ?? hashParams.get("token_hash");
        const otpType = params.get("type") ?? hashParams.get("type");
        const accessToken = hashParams.get("access_token") ?? params.get("access_token");
        const refreshToken = hashParams.get("refresh_token") ?? params.get("refresh_token");

        if (code) {
          updateStatus("Signing you in…");
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
        } else if (tokenHash && isSupportedOtpType(otpType)) {
          updateStatus("Confirming your email…");
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: otpType,
          });
          if (verifyError) throw verifyError;
        } else if (accessToken && refreshToken) {
          updateStatus("Finalizing your session…");
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (sessionError) throw sessionError;
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        navigate(session ? "/" : "/auth", { replace: true });
      } catch (error) {
        console.error("Auth callback error:", error);
        navigate("/auth", { replace: true });
      }
    };

    void handleCallback();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">{statusText}</p>
      </div>
    </div>
  );
};

export default AuthCallback;
