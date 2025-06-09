import * as React from "react"

import { Toaster, toast } from "sonner"

export function useToast() {
  return {
    toast,
  }
}

export { Toaster }
