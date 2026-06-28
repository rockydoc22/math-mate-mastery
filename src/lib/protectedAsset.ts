import { supabase } from "@/integrations/supabase/client";

const memCache = new Map<string, Promise<Response>>();
const FUNCTION_NAME = "protected-asset";

/**
 * Fetch a file from the private `protected-content` bucket through the
 * `protected-asset` edge function. The user's JWT is injected automatically.
 * Responses are memoized per path for the lifetime of the page.
 */
export function fetchProtectedAsset(path: string): Promise<Response> {
  const cached = memCache.get(path);
  if (cached) return cached.then((r) => r.clone());

  const promise = (async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;
    if (!token) throw new Error("not_authenticated");

    const projectRef = (import.meta as any).env?.VITE_SUPABASE_PROJECT_ID;
    const supabaseUrl =
      (import.meta as any).env?.VITE_SUPABASE_URL ??
      (projectRef ? `https://${projectRef}.supabase.co` : "");
    const url = `${supabaseUrl}/functions/v1/${FUNCTION_NAME}?path=${encodeURIComponent(path)}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      memCache.delete(path);
      throw new Error(`protected_asset_${res.status}`);
    }
    return res;
  })();

  memCache.set(path, promise);
  return promise.then((r) => r.clone());
}

export async function fetchProtectedJson<T = unknown>(path: string): Promise<T> {
  const res = await fetchProtectedAsset(path);
  return (await res.json()) as T;
}