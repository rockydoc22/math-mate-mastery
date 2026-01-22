import { Link } from "react-router-dom";

interface SATMasteryLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  layout?: "row" | "stacked";
  clickable?: boolean;
  onClick?: () => void;
}

export const SATMasteryLogo = ({ 
  size = "md", 
  showTagline = true,
  layout = "row",
  clickable = false,
  onClick
}: SATMasteryLogoProps) => {
  const sizeClasses = {
    sm: {
      container: "gap-2",
      icon: "w-10 h-10 text-lg",
      title: "text-lg",
      tagline: "text-[10px]"
    },
    md: {
      container: "gap-3",
      icon: "w-14 h-14 text-xl",
      title: "text-xl",
      tagline: "text-xs"
    },
    lg: {
      container: "gap-4",
      icon: "w-20 h-20 text-2xl",
      title: "text-2xl",
      tagline: "text-sm"
    }
  };

  const classes = sizeClasses[size];

  const LogoContent = () => (
    <div
      className={
        layout === "stacked"
          ? "flex flex-col items-center text-center gap-3"
          : `flex items-center ${classes.container}`
      }
    >
      {/* 40² Icon */}
      <div 
        className={`${classes.icon} rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg ${clickable ? 'hover:shadow-xl hover:scale-105 transition-all cursor-pointer group' : ''}`}
      >
        <span className={`font-bold text-primary-foreground font-mono ${clickable ? 'group-hover:animate-pulse' : ''}`}>
          40²
        </span>
      </div>
      
      {/* Text */}
      <div className={layout === "stacked" ? "flex flex-col items-center" : "flex flex-col"}>
        <div className={`${classes.title} font-bold text-foreground leading-tight`}>
          SAT Mastery
        </div>
        {showTagline && (
          <p className={`${classes.tagline} text-muted-foreground`}>
            The path to 1600
          </p>
        )}
      </div>
    </div>
  );

  if (clickable && onClick) {
    return (
      <button onClick={onClick} className="focus:outline-none">
        <LogoContent />
      </button>
    );
  }

  return <LogoContent />;
};
