import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const legacyVariants = {
  blue: "bg-primary/15 text-black border border-primary/30",
  red: "bg-red-50 text-red-600",
  green: "bg-green-50 text-green-600",
  dark: "bg-white/10 text-primary",
} as const

type LegacyVariant = keyof typeof legacyVariants
type ShadcnVariant = VariantProps<typeof badgeVariants>["variant"]

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  text?: string
  variant?: LegacyVariant | ShadcnVariant
}

function Badge({ className, variant, text, children, ...props }: BadgeProps) {
  const resolvedVariant = (variant ?? "blue") as LegacyVariant | ShadcnVariant
  const isLegacy = resolvedVariant in legacyVariants
  const shadcnVariant = (isLegacy ? "default" : resolvedVariant) as ShadcnVariant
  const content = text ?? children

  return (
    <div
      className={cn(
        badgeVariants({ variant: shadcnVariant }),
        isLegacy ? legacyVariants[resolvedVariant as LegacyVariant] : "",
        className
      )}
      {...props}
    >
      {content}
    </div>
  )
}

export { Badge, badgeVariants }
