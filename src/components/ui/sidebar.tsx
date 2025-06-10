import * as React from "react"
import { useSidebarStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export const SidebarMenuButton = () => {
  const { isOpen, setIsOpen } = useSidebarStore()

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="fixed top-4 left-4 z-50 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {isOpen ? (
          <path d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  )
}

export const SidebarMenu = () => {
  const { isOpen, setIsOpen } = useSidebarStore()

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-4">
        <SidebarHeader />
        <nav className="space-y-4">
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenuItem>
                <a href="/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </a>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <a href="/projects" onClick={() => setIsOpen(false)}>
                  Projects
                </a>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <a href="/map" onClick={() => setIsOpen(false)}>
                  Map
                </a>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <a href="/notifications" onClick={() => setIsOpen(false)}>
                  Notifications
                </a>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <a href="/settings" onClick={() => setIsOpen(false)}>
                  Settings
                </a>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        </nav>
        <SidebarFooter />
      </div>
    </div>
  )
}

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarMenuButton />
      <SidebarMenu />
      {children}
    </div>
  )
}

export const SidebarMenuItem = React.forwardRef<HTMLAnchorElement, { href: string; children: React.ReactNode }>(({ href, children }, ref) => {
  const { setIsOpen } = useSidebarStore()
  return (
    <a
      href={href}
      ref={ref}
      onClick={() => setIsOpen(false)}
      className="block px-4 py-2 hover:bg-gray-100"
    >
      {children}
    </a>
  )
})

export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => (
  <div ref={ref} className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
    {children}
  </div>
))

export const SidebarGroupContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => (
  <div ref={ref} className="space-y-1">
    {children}
  </div>
))

export const SidebarHeader = React.forwardRef<HTMLDivElement, { children?: React.ReactNode }>(({ children }, ref) => (
  <div ref={ref} className="flex items-center px-4 py-3">
    <h1 className="text-2xl font-bold">Road Monitor</h1>
    {children}
  </div>
))

export const SidebarFooter = React.forwardRef<HTMLDivElement, { children?: React.ReactNode }>(({ children }, ref) => (
  <div ref={ref} className="border-t border-gray-200 px-4 py-3">
    <p className="text-sm text-muted-foreground">© 2025 Road Monitor. All rights reserved.</p>
    {children}
  </div>
))

export const SidebarContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => (
  <div ref={ref} className="h-full flex-1 overflow-y-auto">
    {children}
  </div>
))

export const SidebarGroup = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => (
  <div ref={ref}>{children}</div>
))

// Export type definitions for external use
export type SidebarMenuItemProps = React.ComponentPropsWithoutRef<typeof SidebarMenuItem>
export type SidebarGroupLabelProps = React.ComponentPropsWithoutRef<typeof SidebarGroupLabel>
export type SidebarGroupContentProps = React.ComponentPropsWithoutRef<typeof SidebarGroupContent>
export type SidebarHeaderProps = React.ComponentPropsWithoutRef<typeof SidebarHeader>
export type SidebarFooterProps = React.ComponentPropsWithoutRef<typeof SidebarFooter>
export type SidebarContentProps = React.ComponentPropsWithoutRef<typeof SidebarContent>
export type SidebarGroupProps = React.ComponentPropsWithoutRef<typeof SidebarGroup>
