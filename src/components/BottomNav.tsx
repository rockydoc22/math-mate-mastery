import { Home, Play, RotateCcw, User } from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/quiz?subject=both&count=10&difficulty=all&timer=true", icon: Play, label: "Practice" },
  { to: "/review", icon: RotateCcw, label: "Review" },
  { to: "/profile", icon: User, label: "Profile" },
];

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    // Always reset to the per-exam focus view when the Home tab is tapped —
    // never strand the user on the full dashboard.
    try {
      ['sat', 'psat', 'act'].forEach(ex =>
        localStorage.setItem(`ao_${ex}_show_full`, 'false')
      );
    } catch {}
    if (location.pathname === '/') {
      // Force a re-render by reloading state via navigate replace.
      window.location.reload();
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto h-14">
        {navItems.map((item) => {
          // Home tab: custom handler that resets focus view
          if (item.to === "/") {
            return (
              <button
                key={item.label}
                onClick={goHome}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1 transition-colors",
                  location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          }
          // Practice link is not a real route match, handle separately
          if (item.to.includes("?")) {
            return (
              <a
                key={item.label}
                href={item.to}
                className="flex flex-col items-center gap-0.5 px-3 py-1 text-muted-foreground hover:text-primary transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            );
          }
          return (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
