import { cn } from "@/lib/utils";

interface BadgeProps {
  text: string;
  variant?: "blue" | "red" | "green" | "dark";
  className?: string;
}

const variants = {
  blue: "bg-primary/15 text-black border border-primary/30",
  red: "bg-red-50 text-red-600",
  green: "bg-green-50 text-green-600",
  dark: "bg-white/10 text-primary",
};

export function Badge({ text, variant = "blue", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-4 py-2 font-mono text-xs font-semibold tracking-wide",
        variants[variant],
        className
      )}
    >
      {text}
    </span>
  );
}
