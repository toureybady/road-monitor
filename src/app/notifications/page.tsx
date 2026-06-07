"use client"

import { useState } from "react"
import {
  Bell, AlertTriangle, CheckCircle2, Info, TrendingUp,
  MapPin, FileText, GitBranch, Filter, CheckCheck,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { notifications } from "@/lib/dnatu-data"

const LEVEL_ICON: Record<string, React.ElementType> = {
  critical: AlertTriangle,
  warning:  AlertTriangle,
  info:     Info,
  success:  CheckCircle2,
}

const LEVEL_STYLE: Record<string, string> = {
  critical: "bg-red-50 border-red-200",
  warning:  "bg-amber-50 border-amber-200",
  info:     "bg-blue-50 border-blue-200",
  success:  "bg-green-50 border-green-200",
}

const LEVEL_ICON_COLOR: Record<string, string> = {
  critical: "text-red-500",
  warning:  "text-amber-500",
  info:     "text-blue-500",
  success:  "text-green-500",
}

const LEVEL_BADGE: Record<string, string> = {
  critical: "bg-red-100 text-red-700 border-red-200",
  warning:  "bg-amber-100 text-amber-700 border-amber-200",
  info:     "bg-blue-100 text-blue-700 border-blue-200",
  success:  "bg-green-100 text-green-700 border-green-200",
}

const TYPE_ICON: Record<string, React.ElementType> = {
  alert:     AlertTriangle,
  budget:    TrendingUp,
  mission:   MapPin,
  report:    FileText,
  approval:  GitBranch,
  milestone: CheckCircle2,
}

const LEVEL_LABELS: Record<string, string> = {
  critical: "Critique",
  warning:  "Avertissement",
  info:     "Information",
  success:  "Succès",
}

type LevelFilter = "Tous" | "critical" | "warning" | "info" | "success"

export default function NotificationsPage() {
  const [filter, setFilter] = useState<LevelFilter>("Tous")
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const filtered = notifications.filter((n) => {
    const matchLevel = filter === "Tous" || n.level === filter
    const matchRead  = !showUnreadOnly || !n.read
    return matchLevel && matchRead
  })

  const unreadCount  = notifications.filter((n) => !n.read).length
  const criticalCount = notifications.filter((n) => n.level === "critical").length
  const warningCount  = notifications.filter((n) => n.level === "warning").length

  function relativeTime(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const min  = Math.floor(diff / 60000)
    const hrs  = Math.floor(min / 60)
    const days = Math.floor(hrs / 24)
    if (days > 0) return `Il y a ${days} jour${days > 1 ? "s" : ""}`
    if (hrs  > 0) return `Il y a ${hrs} heure${hrs > 1 ? "s" : ""}`
    return `Il y a ${min} minute${min > 1 ? "s" : ""}`
  }

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#0f2c4a]" />
              Centre de Notifications
            </h1>
            <p className="text-sm text-slate-500">
              {unreadCount} non lue{unreadCount !== 1 ? "s" : ""} sur {notifications.length} notifications
            </p>
          </div>
          <Button variant="outline" className="gap-2 self-start sm:self-auto">
            <CheckCheck className="h-4 w-4" />
            Tout marquer comme lu
          </Button>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Non lues",   value: unreadCount,   color: "text-blue-600",   bg: "bg-blue-50"   },
            { label: "Critiques",  value: criticalCount, color: "text-red-600",    bg: "bg-red-50"    },
            { label: "Avertiss.",  value: warningCount,  color: "text-amber-600",  bg: "bg-amber-50"  },
            { label: "Total",      value: notifications.length, color: "text-slate-600", bg: "bg-slate-50" },
          ].map((k) => (
            <Card key={k.label} className="border-0 shadow-sm">
              <CardContent className="p-3">
                <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
                <p className="text-xs text-slate-500">{k.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="h-3.5 w-3.5" />
            Filtrer:
          </div>
          {(["Tous", "critical", "warning", "info", "success"] as LevelFilter[]).map((l) => (
            <button
              key={l}
              onClick={() => setFilter(l)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === l
                  ? "bg-[#0f2c4a] text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {l === "Tous" ? "Toutes" : LEVEL_LABELS[l]}
            </button>
          ))}
          <div className="ml-auto">
            <button
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                showUnreadOnly
                  ? "bg-[#0f2c4a] text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Non lues seulement
            </button>
          </div>
        </div>

        {/* Notifications list */}
        <div className="space-y-2">
          {filtered.map((n) => {
            const Icon      = LEVEL_ICON[n.level] ?? Info
            const TypeIcon  = TYPE_ICON[n.type] ?? Bell
            return (
              <div
                key={n.id}
                className={`border rounded-xl p-4 transition-all ${LEVEL_STYLE[n.level]} ${
                  !n.read ? "shadow-sm" : "opacity-75"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 p-2 rounded-lg bg-white/60`}>
                    <Icon className={`h-4 w-4 ${LEVEL_ICON_COLOR[n.level]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                      )}
                      <Badge variant="outline" className={`text-[10px] ml-auto flex-shrink-0 ${LEVEL_BADGE[n.level]}`}>
                        {LEVEL_LABELS[n.level]}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
                      <TypeIcon className="h-3 w-3" />
                      <span className="capitalize">{n.type}</span>
                      <span>•</span>
                      <span>{relativeTime(n.date)}</span>
                      {n.projectId && (
                        <>
                          <span>•</span>
                          <span className="font-mono">{n.projectId}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Bell className="h-12 w-12 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">Aucune notification</p>
              <p className="text-sm text-slate-400 mt-1">Modifiez vos filtres pour voir plus</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
