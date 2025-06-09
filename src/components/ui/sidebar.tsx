import * as React from "react"
import { useSidebarStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu"

const Sidebar = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  const { isOpen, setIsOpen } = useSidebarStore()

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}
      {...props}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Road Monitor</h1>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Navigation</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </NavigationMenuLink>
                <NavigationMenuLink href="/projects" onClick={() => setIsOpen(false)}>
                  Projects
                </NavigationMenuLink>
                <NavigationMenuLink href="/map" onClick={() => setIsOpen(false)}>
                  Map
                </NavigationMenuLink>
                <NavigationMenuLink href="/notifications" onClick={() => setIsOpen(false)}>
                  Notifications
                </NavigationMenuLink>
                <NavigationMenuLink href="/settings" onClick={() => setIsOpen(false)}>
                  Settings
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
})

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
  const { isOpen } = useSidebarStore()
  const { setIsOpen } = useSidebarStore()

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Road Monitor</h1>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Navigation</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </NavigationMenuLink>
                <NavigationMenuLink href="/projects" onClick={() => setIsOpen(false)}>
                  Projects
                </NavigationMenuLink>
                <NavigationMenuLink href="/map" onClick={() => setIsOpen(false)}>
                  Map
                </NavigationMenuLink>
                <NavigationMenuLink href="/notifications" onClick={() => setIsOpen(false)}>
                  Notifications
                </NavigationMenuLink>
                <NavigationMenuLink href="/settings" onClick={() => setIsOpen(false)}>
                  Settings
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}

export const SidebarMenuItem = ({ children }: { children: React.ReactNode }) => {
  const { setIsOpen } = useSidebarStore()
  return (
    <div onClick={() => setIsOpen(false)}>{children}</div>
  )
}

const SidebarTrigger = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => {
  const { isOpen, setIsOpen } = useSidebarStore()

  return (
    <button
      ref={ref}
      className={cn(
        "flex items-center justify-center rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      <span className="sr-only">Toggle sidebar</span>
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
})

const SidebarContent = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-1 flex-col overflow-y-auto bg-background",
      className
    )}
    {...props}
  />
))

const SidebarHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 py-4", className)}
    {...props}
  />
)

const SidebarFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col py-4", className)}
    {...props}
  />
)

const SidebarGroup = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1 text-sm", className)}
    {...props}
  />
)

const SidebarItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "block px-4 py-2 hover:bg-gray-100",
      className
    )}
    {...props}
  />
))

Object.assign(Sidebar, {
  Trigger: SidebarTrigger,
  Content: SidebarContent,
  Header: SidebarHeader,
  Footer: SidebarFooter,
  Group: SidebarGroup,
  Item: SidebarItem,
})

export { Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarItem }
