import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: "blue" | "red" | "green" | "dark";
  headline: string;
  subheadline?: string;
  align?: "center" | "left";
  light?: boolean;
}

export function SectionHeader({
  badge,
  badgeVariant = "blue",
  headline,
  subheadline,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left"
      )}
    >
      {badge && <Badge text={badge} variant={badgeVariant} />}
      <h2
        className={cn(
          "text-section font-normal tracking-tight",
          light ? "text-white" : "text-dark"
        )}
      >
        {headline}
      </h2>
      {subheadline && (
        <p
          className={cn(
            "max-w-2xl text-lg leading-7",
            light ? "text-white/80" : "text-text"
          )}
        >
          {subheadline}
        </p>
      )}
    </div>
  );
}

