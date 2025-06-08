import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressVariants = cva(
  "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-success",
        destructive: "bg-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof progressVariants>
>(({ className, value, variant, ...props }, ref) => (
  <div className={cn("relative w-full", className)} {...props} ref={ref}>
    <div className="h-4 w-full overflow-hidden rounded-full bg-secondary" />
    <div
      className={cn(progressVariants({ variant }), "h-4 rounded-full transition-all duration-200")}
      style={{ width: `${value}%` }}
    />
  </div>
))
Progress.displayName = "Progress"

export { Progress }
