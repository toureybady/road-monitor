import * as React from "react"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof React.input>,
  React.ComponentPropsWithoutRef<typeof React.input>
>(({ className, ...props }, ref) => {
  return (
    <input
      type="range"
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Slider.displayName = "Slider"

export { Slider }
