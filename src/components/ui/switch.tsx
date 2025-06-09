import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof React.input>,
  React.ComponentPropsWithoutRef<typeof React.input>
>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "peer relative h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-primary/50 bg-background shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Switch.displayName = "Switch"

export { Switch }
