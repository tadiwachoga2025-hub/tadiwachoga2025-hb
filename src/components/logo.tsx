import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "dark";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  hideText?: boolean;
}

export function Logo({
  className,
  variant = "default",
  size = "md",
  hideText = false
}: LogoProps) {
  const sizeClasses = {
    xs: "h-8",
    sm: "h-14",
    md: "h-24",
    lg: "h-40",
    xl: "h-64",
  };

  // Official Colors from Reference
  const YELLOW = "#FFD700";

  // variant "light" -> forces navy (for light backgrounds)
  // variant "dark" -> forces white (for dark backgrounds)
  // variant "default" -> responsive to dark mode

  const mainColorClass = cn(
    variant === "light" ? "stroke-[#1E1E4D]" :
      variant === "dark" ? "stroke-white" :
        "stroke-[#1E1E4D] dark:stroke-white"
  );

  const bannerFillClass = cn(
    variant === "light" ? "fill-[#1E1E4D]" :
      variant === "dark" ? "fill-white" :
        "fill-[#1E1E4D] dark:fill-white"
  );

  const bannerTextFill = YELLOW;

  const textColorClass = cn(
    variant === "light" ? "text-[#1E1E4D]" :
      variant === "dark" ? "text-white" :
        "text-[#1E1E4D] dark:text-white"
  );

  return (
    <div className={cn("inline-flex flex-col items-center select-none", className)}>
      <div className={cn("relative flex items-center justify-center", sizeClasses[size])}>
        <svg
          viewBox="0 0 200 240"
          className="h-full w-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Shield Background (Always White as per reference) */}
          <path
            d="M100 20 L180 40 C180 40 180 120 100 200 C20 120 20 40 20 40 L100 20 Z"
            fill="white"
          />

          {/* External Shield Outline */}
          <path
            d="M100 20 L180 40 C180 40 180 120 100 200 C20 120 20 40 20 40 L100 20 Z"
            className={cn("transition-colors duration-300", mainColorClass)}
            strokeWidth="8"
            strokeLinejoin="round"
          />

          {/* Top 'Wings' crest */}
          <path
            d="M60 30 C40 25 20 40 20 40 M140 30 C160 25 180 40 180 40"
            className={cn("transition-colors duration-300", mainColorClass)}
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Inner Yellow Trace Accent */}
          <path
            d="M100 32 L168 49 C168 49 168 110 100 185 C32 110 32 49 32 49 L100 32 Z"
            stroke={YELLOW}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Lion Head Profile */}
          <g transform="translate(45, 52) scale(1.05)">
            <path
              d="M70 12 C55 10 40 20 35 45 C30 70 35 90 55 105 C75 120 105 115 120 95 C135 75 135 45 120 25 C105 10 90 12 70 12 Z"
              fill="white"
            />
            <path
              d="M65 20 C50 25 40 40 40 55 C40 80 55 100 75 110 C95 115 115 105 125 85 C135 65 130 40 115 25 C100 15 80 15 65 20 Z"
              stroke="#333333"
              strokeWidth="2.2"
              fill="none"
              strokeLinejoin="round"
            />
            <circle cx="68" cy="50" r="2.5" fill="black" />
            <path d="M62 46 L75 46" stroke="black" strokeWidth="1" />
            <path d="M38 75 L45 75" stroke="black" strokeWidth="2.5" />
            <path d="M40 82 C35 84 35 90 45 92" stroke="black" strokeWidth="2" fill="none" />
            <path d="M105 28 L120 15" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M120 45 L138 38" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M128 70 L145 75" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M118 95 L132 110" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M95 110 L105 125" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Ribbon Banner */}
          <g>
            <path
              d="M30 190 L170 190 L170 220 L30 220 Z"
              className={cn("transition-colors duration-300", bannerFillClass)}
            />
            <path d="M30 190 L15 205 L30 220 Z" className={cn("transition-colors duration-300", bannerFillClass)} />
            <path d="M170 190 L185 205 L170 220 Z" className={cn("transition-colors duration-300", bannerFillClass)} />

            <text
              x="100"
              y="213"
              textAnchor="middle"
              fill={bannerTextFill}
              style={{
                fontSize: '20px',
                fontWeight: '900',
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.08em'
              }}
            >
              SUBURBAN
            </text>
          </g>
        </svg>
      </div>

      {!hideText && (
        <span className={cn(
          "font-black uppercase tracking-[0.55em] leading-none pt-2 text-center transition-colors duration-300",
          textColorClass,
          size === "xs" ? "text-[10px]" : size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-xl"
        )}>
          SECURITY
        </span>
      )}
    </div>
  );
}
