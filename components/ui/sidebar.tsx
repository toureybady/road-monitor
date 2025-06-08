import * as React from "react"
import * as RadixSidebar from "@radix-ui/react-sidebar"
import { cn } from "@/lib/utils"

const Sidebar = React.forwardRef<
  React.ElementRef<typeof RadixSidebar.Root>,
  React.ComponentPropsWithoutRef<typeof RadixSidebar.Root>
>(({ className, ...props }, ref) => (
  <RadixSidebar.Root
    ref={ref}
    className={cn(
      "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-background shadow-xl",
      className
    )}
    {...props}
  />
))
Sidebar.displayName = RadixSidebar.Root.displayName

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof RadixSidebar.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixSidebar.Trigger>
>(({ className, ...props }, ref) => (
  <RadixSidebar.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-10 items-center justify-center rounded-md bg-background p-2 text-foreground",
      className
    )}
    {...props}
  />
))
SidebarTrigger.displayName = RadixSidebar.Trigger.displayName

const SidebarContent = React.forwardRef<
  React.ElementRef<typeof RadixSidebar.Content>,
  React.ComponentPropsWithoutRef<typeof RadixSidebar.Content>
>(({ className, ...props }, ref) => (
  <RadixSidebar.Content
    ref={ref}
    className={cn(
      "flex flex-col overflow-y-auto border-r border-border",
      className
    )}
    {...props}
  />
))
SidebarContent.displayName = RadixSidebar.Content.displayName

const SidebarHeader = React.forwardRef<
  React.ElementRef<typeof RadixSidebar.Header>,
  React.ComponentPropsWithoutRef<typeof RadixSidebar.Header>
>(({ className, ...props }, ref) => (
  <RadixSidebar.Header
    ref={ref}
    className={cn("px-4 py-3", className)}
    {...props}
  />
))
SidebarHeader.displayName = RadixSidebar.Header.displayName

const SidebarFooter = React.forwardRef<
  React.ElementRef<typeof RadixSidebar.Footer>,
  React.ComponentPropsWithoutRef<typeof RadixSidebar.Footer>
>(({ className, ...props }, ref) => (
  <RadixSidebar.Footer
    ref={ref}
    className={cn("px-4 py-3", className)}
    {...props}
  />
))
SidebarFooter.displayName = RadixSidebar.Footer.displayName

const SidebarGroup = React.forwardRef<
  React.ElementRef<typeof RadixSidebar.Group>,
  React.ComponentPropsWithoutRef<typeof RadixSidebar.Group>
>(({ className, ...props }, ref) => (
  <RadixSidebar.Group
    ref={ref}
    className={cn("flex flex-col space-y-2", className)}
    {...props}
  />
))
SidebarGroup.displayName = RadixSidebar.Group.displayName

const SidebarGroupLabel = React.forwardRef<
  React.ElementRef<typeof RadixSidebar.GroupLabel>,
  React.ComponentPropsWithoutRef<typeof RadixSidebar.GroupLabel>
>(({ className, ...props }, ref) => (
  <RadixSidebar.GroupLabel
    ref={ref}
    className={cn("px-4 text-sm font-semibold", className)}
    {...props}
  />
))
SidebarGroupLabel.displayName = RadixSidebar.GroupLabel.displayName

const SidebarGroupContent = React.forwardRef<
  React.ElementRef<typeof RadixSidebar.GroupContent>,
  React.ComponentPropsWithoutRef<typeof RadixSidebar.GroupContent>
>(({ className, ...props }, ref) => (
  <RadixSidebar.GroupContent
    ref={ref}
    className={cn("flex flex-col space-y-2", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = RadixSidebar.GroupContent.displayName

const SidebarMenu = React.forwardRef<
  React.ElementRef<typeof RadixSidebar.Menu>,
  React.ComponentPropsWithoutRef<typeof RadixSidebar.Menu>
>(({ className, ...props }, ref) => (
  <RadixSidebar.Menu
    ref={ref}
    className={cn("flex flex-col space-y-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = RadixSidebar.Menu.displayName

const SidebarMenuItem = React.forwardRef<
  React.ElementRef<typeof RadixSidebar.MenuItem>,
  React.ComponentPropsWithoutRef<typeof RadixSidebar.MenuItem>
>(({ className, ...props }, ref) => (
  <RadixSidebar.MenuItem
    ref={ref}
    className={cn("flex flex-col space-y-1", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = RadixSidebar.MenuItem.displayName

const SidebarMenuButton = React.forwardRef<
  React.ElementRef<typeof RadixSidebar.MenuButton>,
  React.ComponentPropsWithoutRef<typeof RadixSidebar.MenuButton>
>(({ className, ...props }, ref) => (
  <RadixSidebar.MenuButton
    ref={ref}
    className={cn(
      "flex w-full items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
      className
    )}
    {...props}
  />
))
SidebarMenuButton.displayName = RadixSidebar.MenuButton.displayName

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
