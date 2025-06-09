import * as React from "react"
import { badgeVariants } from "@/components/ui/badge-variants"

import { cn } from "@/lib/utils"

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "destructive" | "outline" }
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="status"
    className={cn(badgeVariants({ variant }), className)}
    {...props}
  />
))
Badge.displayName = "Badge"

export { Badge }
