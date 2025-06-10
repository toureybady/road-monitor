import * as React from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"

export function useToast() {
  const showToast = React.useCallback((
    content: string,
    options: { title?: string; variant?: string } = {}
  ) => {
    ToastPrimitive.toast({
      title: options.title,
      description: content,
      variant: options.variant || "default"
    })
  }, [])

  return {
    toast: showToast
  }
}
