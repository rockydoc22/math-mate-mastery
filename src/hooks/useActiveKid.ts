import { useAuth } from "@/hooks/useAuth";

export function getActiveKidId(userId: string): string | null {
  const val = sessionStorage.getItem(`kid_selected_${userId}`);
  if (!val || val === "parent") return null;
  return val;
}

export function useActiveKidId(): string | null {
  const { user } = useAuth();
  if (!user) return null;
  return getActiveKidId(user.id);
}
