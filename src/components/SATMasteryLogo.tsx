import { EXAM_CONFIGS, type ExamType } from "@/utils/examConfig";

interface SATMasteryLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  layout?: "row" | "stacked";
  titleText?: string;
  taglineText?: string;
  clickable?: boolean;
  onClick?: () => void;
  examType?: ExamType;
}

export const SATMasteryLogo = ({ 
  size = "md", 
  showTagline = false,
  layout = "row",
  titleText,
  taglineText,
  clickable = false,
  onClick,
  examType = 'sat'
}: SATMasteryLogoProps) => {
  const branding = EXAM_CONFIGS[examType].branding;
  const resolvedTitle = titleText ?? branding.appTitle;
  const resolvedTagline = taglineText ?? branding.heroTagline;

  const sizeClasses = {
    sm: {
      container: "gap-2",
      icon: "w-10 h-10 text-xs",
      title: "text-lg",
      tagline: "text-[10px]"
    },
    md: {
      container: "gap-3",
      icon: "w-14 h-14 text-sm",
      title: "text-xl",
      tagline: "text-xs"
    },
    lg: {
      container: "gap-4",
      icon: "w-20 h-20 text-base",
      title: "text-2xl",
      tagline: "text-sm"
    },
    xl: {
      container: "gap-4",
      icon: "w-28 h-28 text-xl",
      title: "text-2xl",
      tagline: "text-sm",
    },
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
      {/* Logo Icon */}
      <div 
        className={`${classes.icon} rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg ${clickable ? 'hover:shadow-xl hover:scale-105 transition-all cursor-pointer group' : ''}`}
      >
        <span className={`font-bold text-primary-foreground font-mono ${clickable ? 'group-hover:animate-pulse' : ''}`}>
          {branding.logoText}
        </span>
      </div>
      
      {/* Text */}
      <div className={layout === "stacked" ? "flex flex-col items-center" : "flex flex-col min-w-0"}>
        <div className={`${classes.title} font-bold text-foreground leading-tight whitespace-nowrap`}>
          {resolvedTitle}
        </div>
        {showTagline && (
          <p className={`${classes.tagline} text-muted-foreground`}>
            {resolvedTagline}
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
