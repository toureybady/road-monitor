import * as React from "react"

import { Sidebar } from "@/components/ui/sidebar"

interface SidebarProviderProps {
  children: React.ReactNode
}

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  return <Sidebar>{children}</Sidebar>
}

export { SidebarProvider }
