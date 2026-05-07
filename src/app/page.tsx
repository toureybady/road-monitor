"use client"

import Link from "next/link"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Legend,
} from "recharts"
import {
  FolderKanban, TrendingUp, AlertTriangle, DollarSign,
  Clock, MapPin, Bell, Globe, ArrowUp, ArrowDown,
  Activity, CheckCircle2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  projects, notifications,
  getProjectsByStatus, getRegionalProgress,
  getTotalBudget, getTotalDisbursed,
  getAveragePhysicalProgress, getAverageFinancialProgress,
  getProjectsInDelay, monthlyProgress,
  STATUS_COLORS,
} from "@/lib/dnatu-data"

const STATUS_BADGE: Record<string, string> = {
  "En cours":  "border-blue-200 text-blue-700 bg-blue-50",
  "En retard": "border-red-200 text-red-700 bg-red-50",
  "Terminé":   "border-green-200 text-green-700 bg-green-50",
  "Planifié":  "border-purple-200 text-purple-700 bg-purple-50",
  "Suspendu":  "border-gray-200 text-gray-700 bg-gray-50",
}

export default function DashboardPage() {
  const totalBudget    = getTotalBudget()
  const totalDisbursed = getTotalDisbursed()
  const avgPhysical    = getAveragePhysicalProgress()
  const avgFinancial   = getAverageFinancialProgress()
  const delayCount     = getProjectsInDelay()
  const statusData     = getProjectsByStatus()
  const regionalData   = getRegionalProgress()
  const activeCount    = projects.filter((p) => p.status === "En cours").length

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())
    .slice(0, 6)

  const criticalAlerts = notifications
    .filter((n) => n.level === "critical" || n.level === "warning")
    .slice(0, 3)

  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  })

  const kpis1 = [
    { label: "Projets Actifs",          value: String(activeCount),                          sub: `${projects.length} projets total`,     icon: FolderKanban,  color: "text-blue-600",    bg: "bg-blue-50",    change: "+2",   up: true  },
    { label: "Budget Total Engagé",      value: `${(totalBudget / 1e6).toFixed(1)} Mrd GNF`, sub: "Toutes sources confondues",            icon: DollarSign,    color: "text-emerald-600", bg: "bg-emerald-50", change: "+12%", up: true  },
    { label: "Exécution Physique",       value: `${avgPhysical}%`,                            sub: "Taux moyen toutes phases",             icon: TrendingUp,    color: "text-violet-600",  bg: "bg-violet-50",  change: "+3%",  up: true  },
    { label: "Exécution Financière",     value: `${avgFinancial}%`,                           sub: "Décaissements / Budget engagé",        icon: Activity,      color: "text-amber-600",   bg: "bg-amber-50",   change: "+2%",  up: true  },
  ]

  const kpis2 = [
    { label: "Projets en Retard",        value: String(delayCount),                           sub: "Nécessitent action immédiate",         icon: AlertTriangle, color: "text-red-600",     bg: "bg-red-50",     change: "+1",   up: false },
    { label: "Missions Terrain",          value: "4",                                          sub: "Planifiées ce mois",                   icon: MapPin,        color: "text-cyan-600",    bg: "bg-cyan-50",    change: "0",    up: true  },
    { label: "Alertes Critiques",        value: "3",                                          sub: "Requièrent attention",                 icon: Bell,          color: "text-orange-600",  bg: "bg-orange-50",  change: "+2",   up: false },
    { label: "Bailleurs Partenaires",    value: "9",                                          sub: "Sources de financement actives",       icon: Globe,         color: "text-teal-600",    bg: "bg-teal-50",    change: "0",    up: true  },
  ]

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* ── Banner ──────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#0f2c4a] via-[#1a4a7a] to-[#1a6b3c] px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-xl font-bold text-white">Tableau de Bord National</h1>
            <p className="text-white/60 text-sm capitalize mt-0.5">{today}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[11px] text-white/50">Dernière synchronisation</p>
              <p className="text-sm text-white font-medium">Il y a 15 minutes</p>
            </div>
            <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse ring-2 ring-green-400/30" />
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* ── KPI Row 1 ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis1.map((k) => (
            <Card key={k.label} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${k.bg}`}>
                    <k.icon className={`h-4 w-4 ${k.color}`} />
                  </div>
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${k.up ? "text-green-600" : "text-red-600"}`}>
                    {k.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    {k.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900">{k.value}</p>
                <p className="text-xs font-medium text-slate-600 mt-0.5">{k.label}</p>
                <p className="text-xs text-slate-400">{k.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── KPI Row 2 ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis2.map((k) => (
            <Card key={k.label} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${k.bg}`}>
                    <k.icon className={`h-4 w-4 ${k.color}`} />
                  </div>
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${k.up ? "text-green-600" : "text-red-600"}`}>
                    {k.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    {k.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900">{k.value}</p>
                <p className="text-xs font-medium text-slate-600 mt-0.5">{k.label}</p>
                <p className="text-xs text-slate-400">{k.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Budget Progress Bar ──────────────────────────────────────── */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-700">Budget Total Décaissé</p>
                <p className="text-xs text-slate-500">
                  {(totalDisbursed / 1e6).toFixed(1)} Mrd GNF sur {(totalBudget / 1e6).toFixed(1)} Mrd GNF engagés
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-slate-900">
                  {Math.round((totalDisbursed / totalBudget) * 100)}%
                </span>
                <span className="text-xs text-slate-500">décaissé</span>
              </div>
            </div>
            <Progress value={Math.round((totalDisbursed / totalBudget) * 100)} className="h-3 mt-3" />
          </CardContent>
        </Card>

        {/* ── Charts ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Regional Bar Chart */}
          <Card className="border-0 shadow-sm lg:col-span-2">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold">Avancement par Région</CardTitle>
              <CardDescription className="text-xs">Taux d'exécution physique vs financière (%)</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pb-3">
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={regionalData} margin={{ top: 0, right: 8, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="region" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="physique"  name="Physique %"  fill="#3b82f6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="financier" name="Financier %" fill="#10b981" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Status Donut */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold">Répartition par Statut</CardTitle>
              <CardDescription className="text-xs">{projects.length} projets au total</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-3">
              <ResponsiveContainer width="100%" height={130}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={55}
                    innerRadius={32}
                  >
                    {statusData.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS] ?? "#94a3b8"}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-1">
                {statusData.map((entry, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS] ?? "#94a3b8" }}
                      />
                      <span className="text-slate-600">{entry.status}</span>
                    </div>
                    <span className="font-semibold text-slate-800">{entry.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Monthly Trend + Recent Projects ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Area Chart */}
          <Card className="border-0 shadow-sm lg:col-span-2">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold">Évolution Mensuelle 2026</CardTitle>
              <CardDescription className="text-xs">Progression physique et financière</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pb-3">
              <ResponsiveContainer width="100%" height={175}>
                <AreaChart data={monthlyProgress} margin={{ top: 5, right: 8, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Area type="monotone" dataKey="physique"  name="Physique %"  stroke="#3b82f6" fill="#3b82f615" strokeWidth={2} />
                  <Area type="monotone" dataKey="financier" name="Financier %" stroke="#10b981" fill="#10b98115" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card className="border-0 shadow-sm lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4">
              <div>
                <CardTitle className="text-sm font-semibold">Projets Récents</CardTitle>
                <CardDescription className="text-xs">Dernières mises à jour</CardDescription>
              </div>
              <Link href="/projets">
                <Button variant="outline" size="sm" className="text-xs h-7">Voir tous</Button>
              </Link>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-2.5">
              {recentProjects.map((p) => (
                <div key={p.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-slate-800 truncate">{p.name}</span>
                      <Badge variant="outline" className={`text-[10px] flex-shrink-0 ${STATUS_BADGE[p.status] ?? ""}`}>
                        {p.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 flex-shrink-0">
                        <MapPin className="h-2.5 w-2.5" />
                        {p.region}
                      </div>
                      <Progress value={p.physicalProgress} className="h-1.5 flex-1" />
                      <span className="text-[10px] text-slate-500 font-medium flex-shrink-0">{p.physicalProgress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ── Alerts ──────────────────────────────────────────────────── */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4">
            <div>
              <CardTitle className="text-sm font-semibold">Alertes Critiques &amp; Avertissements</CardTitle>
              <CardDescription className="text-xs">Éléments nécessitant une attention immédiate</CardDescription>
            </div>
            <Link href="/notifications">
              <Button variant="outline" size="sm" className="text-xs h-7">Toutes les alertes</Button>
            </Link>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {criticalAlerts.map((a) => (
                <div
                  key={a.id}
                  className={`p-3 rounded-lg border ${
                    a.level === "critical"
                      ? "bg-red-50 border-red-200"
                      : "bg-amber-50 border-amber-200"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle
                      className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                        a.level === "critical" ? "text-red-500" : "text-amber-500"
                      }`}
                    />
                    <div className="min-w-0">
                      <p className={`text-xs font-semibold leading-tight ${a.level === "critical" ? "text-red-900" : "text-amber-900"}`}>
                        {a.title}
                      </p>
                      <p className={`text-xs mt-0.5 leading-snug ${a.level === "critical" ? "text-red-700" : "text-amber-700"}`}>
                        {a.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Quick Links ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: "/projets",          label: "Gérer les projets",      icon: FolderKanban,  color: "text-blue-600",   bg: "bg-blue-50"   },
            { href: "/carte",            label: "Voir la carte SIG",      icon: MapPin,        color: "text-emerald-600",bg: "bg-emerald-50"},
            { href: "/rapports",         label: "Générer un rapport",     icon: Activity,      color: "text-violet-600", bg: "bg-violet-50" },
            { href: "/workflow",         label: "Workflow & Validations", icon: CheckCircle2,  color: "text-amber-600",  bg: "bg-amber-50"  },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className={`p-2 rounded-lg ${item.bg}`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <span className="text-xs font-medium text-slate-700">{item.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
