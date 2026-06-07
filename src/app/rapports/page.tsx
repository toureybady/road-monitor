"use client"

import { useState } from "react"
import { FileText, Download, Plus, Calendar, Filter, Search, BarChart3, Map, FileBarChart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type ReportType = "Mensuel" | "Trimestriel" | "Annuel" | "Ad hoc" | "Bailleur"
type ReportStatus = "Disponible" | "En cours" | "Planifié" | "Archivé"

interface Report {
  id: string
  title: string
  type: ReportType
  status: ReportStatus
  period: string
  generatedDate: string
  pages: number
  author: string
  projects: number
}

const reports: Report[] = [
  { id: "RPT-001", title: "Rapport mensuel d'avancement – Avril 2026",        type: "Mensuel",      status: "Disponible", period: "Avril 2026",       generatedDate: "2026-05-05", pages: 48,  author: "Cellule S&E",     projects: 15 },
  { id: "RPT-002", title: "Rapport trimestriel Q1 2026",                      type: "Trimestriel",  status: "Disponible", period: "Jan-Mar 2026",     generatedDate: "2026-04-15", pages: 92,  author: "Direction DNATU", projects: 15 },
  { id: "RPT-003", title: "Rapport mensuel d'avancement – Mars 2026",         type: "Mensuel",      status: "Archivé",    period: "Mars 2026",        generatedDate: "2026-04-05", pages: 45,  author: "Cellule S&E",     projects: 15 },
  { id: "RPT-004", title: "Rapport annuel d'exécution 2025",                  type: "Annuel",       status: "Disponible", period: "Année 2025",       generatedDate: "2026-02-28", pages: 185, author: "Direction DNATU", projects: 14 },
  { id: "RPT-005", title: "Rapport Banque mondiale – Zone Boké Q1 2026",      type: "Bailleur",     status: "Disponible", period: "Jan-Mar 2026",     generatedDate: "2026-04-30", pages: 35,  author: "UGP Boké",        projects: 1  },
  { id: "RPT-006", title: "Rapport d'évaluation mi-parcours – Voirie Conakry", type: "Ad hoc",      status: "Disponible", period: "2024-2025",        generatedDate: "2026-03-15", pages: 67,  author: "Évaluateur ext.", projects: 1  },
  { id: "RPT-007", title: "Rapport mensuel d'avancement – Mai 2026",          type: "Mensuel",      status: "En cours",   period: "Mai 2026",         generatedDate: "—",          pages: 0,   author: "Cellule S&E",     projects: 15 },
  { id: "RPT-008", title: "Rapport trimestriel Q2 2026",                      type: "Trimestriel",  status: "Planifié",   period: "Avr-Jun 2026",     generatedDate: "—",          pages: 0,   author: "Direction DNATU", projects: 15 },
  { id: "RPT-009", title: "Rapport BAD – Programme Habitat Kindia",           type: "Bailleur",     status: "Disponible", period: "2025-2026",        generatedDate: "2026-04-01", pages: 28,  author: "UGP Habitat",     projects: 1  },
  { id: "RPT-010", title: "Rapport annuel d'exécution 2026",                  type: "Annuel",       status: "Planifié",   period: "Année 2026",       generatedDate: "—",          pages: 0,   author: "Direction DNATU", projects: 15 },
]

const STATUS_BADGE: Record<ReportStatus, string> = {
  Disponible: "bg-green-50 border-green-200 text-green-700",
  "En cours": "bg-blue-50 border-blue-200 text-blue-700",
  Planifié:   "bg-purple-50 border-purple-200 text-purple-700",
  Archivé:    "bg-gray-50 border-gray-200 text-gray-600",
}

const TYPE_ICON: Record<ReportType, React.ElementType> = {
  Mensuel:      Calendar,
  Trimestriel:  BarChart3,
  Annuel:       FileBarChart,
  "Ad hoc":     FileText,
  Bailleur:     Map,
}

const TYPE_COLORS: Record<ReportType, string> = {
  Mensuel:      "bg-blue-50 text-blue-700 border-blue-200",
  Trimestriel:  "bg-violet-50 text-violet-700 border-violet-200",
  Annuel:       "bg-amber-50 text-amber-700 border-amber-200",
  "Ad hoc":     "bg-teal-50 text-teal-700 border-teal-200",
  Bailleur:     "bg-rose-50 text-rose-700 border-rose-200",
}

export default function RapportsPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<ReportType | "Tous">("Tous")

  const filtered = reports.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase())
    const matchType   = typeFilter === "Tous" || r.type === typeFilter
    return matchSearch && matchType
  })

  const available = reports.filter((r) => r.status === "Disponible").length
  const inProgress = reports.filter((r) => r.status === "En cours").length
  const planned    = reports.filter((r) => r.status === "Planifié").length

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#0f2c4a]" />
              Rapports &amp; Tableaux de Bord
            </h1>
            <p className="text-sm text-slate-500">{reports.length} rapports dans le système</p>
          </div>
          <Button className="bg-[#0f2c4a] hover:bg-[#1a4a7a] text-white gap-2 self-start sm:self-auto">
            <Plus className="h-4 w-4" />
            Générer un rapport
          </Button>
        </div>

        {/* Summary badges */}
        <div className="flex gap-3 mt-4">
          <div className="flex items-center gap-1.5 text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            {available} disponibles
          </div>
          <div className="flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            {inProgress} en cours
          </div>
          <div className="flex items-center gap-1.5 text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
            {planned} planifiés
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Rechercher un rapport..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white border-slate-200"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["Tous", "Mensuel", "Trimestriel", "Annuel", "Bailleur", "Ad hoc"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  typeFilter === t
                    ? "bg-[#0f2c4a] text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Report export templates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: FileText,     title: "Export PDF",     desc: "Rapport complet avec cartes",   color: "text-red-500",    bg: "bg-red-50"    },
            { icon: BarChart3,    title: "Export Excel",   desc: "Données tabulaires brutes",     color: "text-green-600",  bg: "bg-green-50"  },
            { icon: Map,          title: "Rapport SIG",    desc: "Cartographies et analyses",     color: "text-blue-600",   bg: "bg-blue-50"   },
          ].map((item) => (
            <Card key={item.title} className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`p-2.5 rounded-lg ${item.bg}`}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <Download className="h-4 w-4 text-slate-400 ml-auto" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reports list */}
        <div className="space-y-3">
          {filtered.map((r) => {
            const Icon = TYPE_ICON[r.type] ?? FileText
            return (
              <Card key={r.id} className="border-0 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-lg flex-shrink-0 ${TYPE_COLORS[r.type].split(" ").find((c) => c.startsWith("bg")) ?? "bg-slate-50"}`}>
                      <Icon className={`h-5 w-5 ${TYPE_COLORS[r.type].split(" ").find((c) => c.startsWith("text")) ?? "text-slate-600"}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-slate-900">{r.title}</p>
                        <Badge variant="outline" className={`text-[10px] flex-shrink-0 ${STATUS_BADGE[r.status]}`}>
                          {r.status}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {r.period}
                        </span>
                        <span>Auteur: {r.author}</span>
                        {r.pages > 0 && <span>{r.pages} pages</span>}
                        <span>{r.projects} projet{r.projects !== 1 ? "s" : ""}</span>
                        {r.generatedDate !== "—" && (
                          <span>Généré le {new Date(r.generatedDate).toLocaleDateString("fr-FR")}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant="outline" className={`text-[10px] ${TYPE_COLORS[r.type]}`}>
                        {r.type}
                      </Badge>
                      {r.status === "Disponible" && (
                        <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                          <Download className="h-3 w-3" />
                          PDF
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
