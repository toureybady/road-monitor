import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

const VARIANTS: Record<string, string> = {
  default:     "bg-[#0f2c4a] text-white border-transparent",
  secondary:   "bg-slate-100 text-slate-700 border-transparent",
  destructive: "bg-red-500 text-white border-transparent",
  outline:     "bg-transparent border-current",
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors",
        VARIANTS[variant] ?? VARIANTS.default,
        className,
      )}
      {...props}
    />
  )
)
Badge.displayName = "Badge"

export { Badge }
