interface SATMasteryLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  layout?: "row" | "stacked";
  titleText?: string;
  taglineText?: string;
  clickable?: boolean;
  onClick?: () => void;
}

// Swoosh arrow SVG - narrow taper to thick arrowhead
const SwooshArrow = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 80 32" 
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Curved swoosh that tapers from hairline thin to thick, ending in arrow */}
    <path 
      d="M0 28 
         Q 20 28, 35 22 
         Q 50 16, 60 8
         L 58 12
         L 72 4
         L 62 16
         L 60 12
         Q 48 20, 32 26
         Q 16 32, 0 30
         Z"
    />
  </svg>
);

export const SATMasteryLogo = ({ 
  size = "md", 
  showTagline = true,
  layout = "row",
  titleText = "1600",
  taglineText = "The Free SAT App",
  clickable = false,
  onClick
}: SATMasteryLogoProps) => {
  const sizeClasses = {
    sm: {
      container: "gap-1.5",
      swoosh: "w-8 h-4",
      title: "text-xl",
      tagline: "text-[10px]"
    },
    md: {
      container: "gap-2",
      swoosh: "w-10 h-5",
      title: "text-2xl",
      tagline: "text-xs"
    },
    lg: {
      container: "gap-2.5",
      swoosh: "w-14 h-7",
      title: "text-3xl",
      tagline: "text-sm"
    },
    xl: {
      container: "gap-3",
      swoosh: "w-20 h-10",
      title: "text-4xl",
      tagline: "text-sm",
    },
  };

  const classes = sizeClasses[size];

  const LogoContent = () => (
    <div
      className={
        layout === "stacked"
          ? "flex flex-col items-center text-center gap-1"
          : `flex items-center ${classes.container}`
      }
    >
      {/* Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className={`${classes.title} font-bold text-foreground tracking-tight`}>
            {titleText}
          </span>
          <SwooshArrow className={`${classes.swoosh} text-primary`} />
        </div>
        {showTagline && (
          <p className={`${classes.tagline} text-muted-foreground -mt-0.5`}>
            {taglineText}
          </p>
        )}
      </div>
    </div>
  );

  if (clickable && onClick) {
    return (
      <button onClick={onClick} className="focus:outline-none hover:opacity-80 transition-opacity">
        <LogoContent />
      </button>
    );
  }

  return <LogoContent />;
};
