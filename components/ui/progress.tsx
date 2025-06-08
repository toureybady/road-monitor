import * as React from "react"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: number
  }
>(({ className, value, ...props }, ref) => (
  <div
    className={cn(
      "relative w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    ref={ref}
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={100}
    {...props}
  >
    <div
      className={cn("h-2 w-full transition-all", {
        "bg-primary": value !== undefined && value >= 0 && value <= 100,
      })}
      style={{ width: `${value}%` }}
    />
  </div>
))
Progress.displayName = "Progress"

export { Progress }
