import { BarChart3, Map, Box, Upload, FileText, Search, Bell, Settings, Home, FolderOpen } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import Link from "next/link"

const menuItems = [
  {
    title: "Tableau de Bord",
    url: "/",
    icon: Home,
  },
  {
    title: "Gestion de Projets",
    url: "/projets",
    icon: FolderOpen,
  },
  {
    title: "Carte & Imagerie",
    url: "/carte",
    icon: Map,
  },
  {
    title: "Modèles 3D",
    url: "/modeles-3d",
    icon: Box,
  },
  {
    title: "Têléversement de Données",
    url: "/upload",
    icon: Upload,
  },
  {
    title: "Rapports",
    url: "/rapports",
    icon: FileText,
  },
  {
    title: "Recherche",
    url: "/recherche",
    icon: Search,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <div>
            <h2 className="font-semibold text-lg">RoadMonitor</h2>
            <p className="text-xs text-muted-foreground">Construction Routière</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/parametres">
                <Settings />
                <span>Paramètres</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
