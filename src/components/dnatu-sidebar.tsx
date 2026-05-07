"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, FolderKanban, Map, BarChart3,
  DollarSign, ClipboardCheck, FileText, GitBranch,
  Compass, Bell, Settings, ChevronRight, ChevronLeft,
  Building2, Globe, LogOut,
} from "lucide-react"

const navItems = [
  { href: "/",                  label: "Tableau de Bord",   icon: LayoutDashboard },
  { href: "/projets",           label: "Projets",           icon: FolderKanban },
  { href: "/carte",             label: "Carte SIG",         icon: Map },
  { href: "/indicateurs",       label: "Indicateurs KPI",   icon: BarChart3 },
  { href: "/finance",           label: "Finance",           icon: DollarSign },
  { href: "/suivi-evaluation",  label: "Suivi-Évaluation",  icon: ClipboardCheck },
  { href: "/rapports",          label: "Rapports",          icon: FileText },
  { href: "/workflow",          label: "Workflow",          icon: GitBranch },
  { href: "/terrain",           label: "Missions Terrain",  icon: Compass },
  { href: "/notifications",     label: "Notifications",     icon: Bell },
]

export function DnatuSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex flex-col h-screen flex-shrink-0 transition-all duration-300 z-20",
        "bg-[#0f2c4a] text-white shadow-xl",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#fcd116] flex items-center justify-center">
              <Building2 className="h-5 w-5 text-[#0f2c4a]" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm leading-none text-white">DNATU</p>
              <p className="text-[10px] text-white/50 leading-none mt-0.5 truncate">
                Observatoire National
              </p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-[#fcd116] flex items-center justify-center mx-auto">
            <Building2 className="h-5 w-5 text-[#0f2c4a]" />
          </div>
        )}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            title="Réduire"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* ── Navigation ────────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="w-full flex justify-center p-2 mb-2 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            title="Agrandir"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}

        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group",
                active
                  ? "bg-[#fcd116] text-[#0f2c4a] font-semibold shadow-md"
                  : "text-white/65 hover:text-white hover:bg-white/10",
                collapsed && "justify-center",
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  active ? "text-[#0f2c4a]" : "text-white/50 group-hover:text-white",
                )}
              />
              {!collapsed && <span className="text-sm truncate">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <div className="border-t border-white/10 p-2 space-y-1">
        <Link
          href="/parametres"
          title={collapsed ? "Paramètres" : undefined}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group",
            pathname === "/parametres"
              ? "bg-[#fcd116] text-[#0f2c4a] font-semibold"
              : "text-white/65 hover:text-white hover:bg-white/10",
            collapsed && "justify-center",
          )}
        >
          <Settings className={cn("h-5 w-5 flex-shrink-0", pathname === "/parametres" ? "text-[#0f2c4a]" : "text-white/50 group-hover:text-white")} />
          {!collapsed && <span className="text-sm">Paramètres</span>}
        </Link>

        {!collapsed && (
          <div className="mx-1 mt-2 p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Connecté en tant que</p>
            <p className="text-sm font-semibold text-white leading-none">Directeur National</p>
            <p className="text-xs text-[#fcd116] mt-0.5">Administrateur • DNATU</p>
            <div className="flex items-center gap-1 mt-2 text-white/40 hover:text-white/70 cursor-pointer transition-colors">
              <LogOut className="h-3 w-3" />
              <span className="text-xs">Déconnexion</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
