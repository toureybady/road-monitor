import * as React from "react"
import { Toaster as ReactHotToaster } from "react-hot-toast"

import { cn } from "@/lib/utils"

export type ToasterProps = React.ComponentPropsWithoutRef<typeof ReactHotToaster>

export function Toaster({ className, ...props }: ToasterProps) {
  return (
    <ReactHotToaster
      className={cn("z-[100]", className)}
      toastOptions={{
        className: "bg-background text-foreground",
        style: {
          border: "1px solid #71717A",
          padding: "16px",
          color: "#333",
        },
      }}
      {...props}
    />
  )
}
