"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search, Plus, MapPin, Calendar, DollarSign,
  Filter, TrendingUp, AlertTriangle, CheckCircle2, Clock,
  ChevronDown, ChevronUp, Building2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { projects, ProjectStatus, ProjectType, Region, STATUS_COLORS, PRIORITY_COLORS } from "@/lib/dnatu-data"

const ALL_STATUSES: ProjectStatus[] = ["En cours", "En retard", "Planifié", "Terminé", "Suspendu"]
const ALL_REGIONS: Region[] = ["Conakry", "Boké", "Kindia", "Mamou", "Labé", "Faranah", "Kankan", "Nzérékoré"]

const STATUS_ICON: Record<ProjectStatus, React.ElementType> = {
  "En cours":  TrendingUp,
  "Planifié":  Clock,
  "En retard": AlertTriangle,
  "Terminé":   CheckCircle2,
  "Suspendu":  AlertTriangle,
}

const STATUS_BADGE: Record<ProjectStatus, string> = {
  "En cours":  "bg-blue-50 border-blue-200 text-blue-700",
  "Planifié":  "bg-purple-50 border-purple-200 text-purple-700",
  "En retard": "bg-red-50 border-red-200 text-red-700",
  "Terminé":   "bg-green-50 border-green-200 text-green-700",
  "Suspendu":  "bg-gray-50 border-gray-200 text-gray-700",
}

export default function ProjetsPage() {
  const [search, setSearch]         = useState("")
  const [statusFilter, setStatus]   = useState<ProjectStatus | "Tous">("Tous")
  const [regionFilter, setRegion]   = useState<Region | "Toutes">("Toutes")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy]         = useState<"name" | "progress" | "budget">("progress")

  const filtered = useMemo(() => {
    return projects
      .filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.code.toLowerCase().includes(search.toLowerCase()) ||
          p.region.toLowerCase().includes(search.toLowerCase())
        const matchStatus = statusFilter === "Tous" || p.status === statusFilter
        const matchRegion = regionFilter === "Toutes" || p.region === regionFilter
        return matchSearch && matchStatus && matchRegion
      })
      .sort((a, b) => {
        if (sortBy === "progress") return b.physicalProgress - a.physicalProgress
        if (sortBy === "budget")   return b.budgetTotal - a.budgetTotal
        return a.name.localeCompare(b.name)
      })
  }, [search, statusFilter, regionFilter, sortBy])

  const counts = {
    all:      projects.length,
    encours:  projects.filter((p) => p.status === "En cours").length,
    retard:   projects.filter((p) => p.status === "En retard").length,
    planifie: projects.filter((p) => p.status === "Planifié").length,
    termine:  projects.filter((p) => p.status === "Terminé").length,
  }

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Gestion des Projets</h1>
            <p className="text-sm text-slate-500">{projects.length} projets dans le portefeuille national</p>
          </div>
          <Button className="bg-[#0f2c4a] hover:bg-[#1a4a7a] text-white gap-2 self-start sm:self-auto">
            <Plus className="h-4 w-4" />
            Nouveau projet
          </Button>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            { label: "Tous", count: counts.all,      value: "Tous" as const },
            { label: "En cours", count: counts.encours,   value: "En cours" as ProjectStatus },
            { label: "En retard", count: counts.retard,    value: "En retard" as ProjectStatus },
            { label: "Planifiés", count: counts.planifie,  value: "Planifié" as ProjectStatus },
            { label: "Terminés", count: counts.termine,   value: "Terminé" as ProjectStatus },
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => setStatus(tab.value as ProjectStatus | "Tous")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                statusFilter === tab.value
                  ? "bg-[#0f2c4a] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 font-bold">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Rechercher par nom, code ou région..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white border-slate-200"
            />
          </div>
          <Button
            variant="outline"
            className="gap-2 bg-white"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filtres
            {showFilters ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
        </div>

        {showFilters && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-2">Région</p>
                  <div className="flex flex-wrap gap-1">
                    {(["Toutes", ...ALL_REGIONS] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setRegion(r as Region | "Toutes")}
                        className={`px-2 py-0.5 rounded text-xs transition-colors ${
                          regionFilter === r ? "bg-[#0f2c4a] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-2">Trier par</p>
                  <div className="flex flex-col gap-1">
                    {[
                      { v: "progress", l: "Avancement" },
                      { v: "budget",   l: "Budget" },
                      { v: "name",     l: "Nom" },
                    ].map((s) => (
                      <button
                        key={s.v}
                        onClick={() => setSortBy(s.v as typeof sortBy)}
                        className={`px-2 py-0.5 rounded text-xs text-left transition-colors ${
                          sortBy === s.v ? "bg-[#0f2c4a] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {s.l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results count */}
        <p className="text-xs text-slate-500">
          {filtered.length} projet{filtered.length !== 1 ? "s" : ""} affiché{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p) => {
            const StatusIcon = STATUS_ICON[p.status] ?? TrendingUp
            return (
              <Card
                key={p.id}
                className="border-0 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <CardHeader className="pb-3 pt-4 px-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-mono text-slate-400 mb-0.5">{p.code}</p>
                      <CardTitle className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2">
                        {p.name}
                      </CardTitle>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-[10px] flex-shrink-0 mt-4 ${STATUS_BADGE[p.status]}`}
                    >
                      <StatusIcon className="h-2.5 w-2.5 mr-0.5" />
                      {p.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="px-4 pb-4 space-y-3">
                  {/* Meta */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {p.region}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {p.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(p.endDate).getFullYear()}
                    </span>
                  </div>

                  {/* Budget */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-slate-500">
                      <DollarSign className="h-3 w-3" />
                      Budget
                    </span>
                    <span className="font-semibold text-slate-700">
                      {(p.budgetTotal / 1000).toFixed(0)} Mrd GNF
                    </span>
                  </div>

                  {/* Physical Progress */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">Exécution physique</span>
                      <span className="font-semibold text-slate-700">{p.physicalProgress}%</span>
                    </div>
                    <Progress value={p.physicalProgress} className="h-2" />
                  </div>

                  {/* Financial Progress */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">Exécution financière</span>
                      <span className="font-semibold text-slate-700">{p.financialProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-emerald-500"
                        style={{ width: `${p.financialProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-1">
                    <Badge variant="outline" className={`text-[10px] ${PRIORITY_COLORS[p.priority]}`}>
                      Priorité {p.priority}
                    </Badge>
                    <p className="text-[10px] text-slate-400">
                      Mis à jour {new Date(p.lastUpdate).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <FolderKanban className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">Aucun projet trouvé</p>
            <p className="text-sm text-slate-400 mt-1">Modifiez vos critères de recherche</p>
          </div>
        )}
      </div>
    </div>
  )
}

function FolderKanban({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
    </svg>
  )
}
