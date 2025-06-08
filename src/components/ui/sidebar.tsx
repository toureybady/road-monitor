import * as React from "react"
import { cn } from "@/lib/utils"

const Sidebar = React.forwardRef<
  React.ElementRef<"aside">,
  React.ComponentPropsWithoutRef<"aside">
>(({ className, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn(
      "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-background",
      className
    )}
    {...props}
  />
))
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button">
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-muted",
      className
    )}
    {...props}
  >
    {children}
  </button>
))
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarClose = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
      className
    )}
    {...props}
  />
))
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
