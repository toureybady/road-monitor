import * as React from "react"
import { BadgeProps, BadgeVariantProps, badgeVariants } from "@/components/ui/badge"

import { cn } from "@/lib/utils"

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & BadgeVariantProps
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="status"
    className={cn(badgeVariants({ variant }), className)}
    {...props}
  />
))
Badge.displayName = "Badge"

export { Badge, BadgeProps }
