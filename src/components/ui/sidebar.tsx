import * as React from "react"
import { useSidebarStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useSidebarStore()

  return (
    <div className="flex h-screen">
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">Road Monitor</h1>
          <nav className="space-y-2">
            <a
              href="/dashboard"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </a>
            <a
              href="/projects"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </a>
            <a
              href="/map"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Map
            </a>
            <a
              href="/notifications"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Notifications
            </a>
            <a
              href="/settings"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </a>
          </nav>
        </div>
      </div>
      <div className="flex-1 ml-0 transition-transform duration-200" onClick={() => setIsOpen(false)}>
        {children}
      </div>
    </div>
  )
SidebarClose.displayName = "SidebarClose"

const SidebarContent = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex grow flex-col overflow-y-auto bg-background",
      className
    )}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 py-4", className)}
    {...props}
  />
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col py-4", className)}
    {...props}
  />
)
SidebarFooter.displayName = "SidebarFooter"

const SidebarNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <nav
    className={cn("flex flex-1 flex-col space-y-1", className)}
    {...props}
  />
)
SidebarNav.displayName = "SidebarNav"

const SidebarGroup = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1 text-sm", className)}
    {...props}
  />
)
SidebarGroup.displayName = "SidebarGroup"

const SidebarItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
))
SidebarMenu.displayName = SidebarPrimitive.Menu.displayName

const SidebarMenuItem = React.forwardRef<
  React.ElementRef<typeof SidebarPrimitive.MenuItem>,
  React.ComponentPropsWithoutRef<typeof SidebarPrimitive.MenuItem>
>(({ className, ...props }, ref) => (
  <SidebarPrimitive.MenuItem
    ref={ref}
    className={cn("flex flex-col space-y-1", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = SidebarPrimitive.MenuItem.displayName

const SidebarMenuButton = React.forwardRef<
  React.ElementRef<typeof SidebarPrimitive.MenuButton>,
  React.ComponentPropsWithoutRef<typeof SidebarPrimitive.MenuButton>
>(({ className, ...props }, ref) => (
  <SidebarPrimitive.MenuButton
    ref={ref}
    className={cn(
      "flex w-full items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
      className
    )}
    {...props}
  />
))
SidebarMenuButton.displayName = SidebarPrimitive.MenuButton.displayName

export {
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
}
