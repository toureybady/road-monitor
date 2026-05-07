"use client"

import { useState } from "react"
import {
  Compass, MapPin, Calendar, User, CheckSquare, Square,
  Clock, CheckCircle2, AlertTriangle, Plus,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { terrainMissions } from "@/lib/dnatu-data"

const STATUS_STYLE: Record<string, string> = {
  Planifiée: "bg-blue-50 border-blue-200 text-blue-700",
  "En cours": "bg-amber-50 border-amber-200 text-amber-700",
  Terminée:  "bg-green-50 border-green-200 text-green-700",
}

const STATUS_ICON: Record<string, React.ElementType> = {
  Planifiée: Clock,
  "En cours": AlertTriangle,
  Terminée:  CheckCircle2,
}

export default function TerrainPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, Set<string>>>({})

  const toggleItem = (missionId: string, item: string) => {
    setCheckedItems((prev) => {
      const current = new Set(prev[missionId] ?? [])
      current.has(item) ? current.delete(item) : current.add(item)
      return { ...prev, [missionId]: current }
    })
  }

  const isChecked = (missionId: string, item: string) =>
    (checkedItems[missionId] ?? new Set()).has(item)

  const getProgress = (missionId: string, checklist: string[]) => {
    const checked = (checkedItems[missionId] ?? new Set()).size
    return Math.round((checked / checklist.length) * 100)
  }

  const planned  = terrainMissions.filter((m) => m.status === "Planifiée").length
  const inProgress = terrainMissions.filter((m) => m.status === "En cours").length
  const done     = terrainMissions.filter((m) => m.status === "Terminée").length

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Compass className="h-5 w-5 text-[#0f2c4a]" />
              Missions de Contrôle Terrain
            </h1>
            <p className="text-sm text-slate-500">Suivi digitalisé des visites de chantier et missions d'inspection</p>
          </div>
          <Button className="bg-[#0f2c4a] hover:bg-[#1a4a7a] text-white gap-2 self-start sm:self-auto">
            <Plus className="h-4 w-4" />
            Nouvelle mission
          </Button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Planifiées",   value: planned,    color: "text-blue-600",   bg: "bg-blue-50",   icon: Clock        },
            { label: "En cours",     value: inProgress, color: "text-amber-600",  bg: "bg-amber-50",  icon: AlertTriangle },
            { label: "Terminées",    value: done,       color: "text-green-600",  bg: "bg-green-50",  icon: CheckCircle2 },
          ].map((k) => (
            <Card key={k.label} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className={`w-9 h-9 rounded-lg ${k.bg} flex items-center justify-center mb-2`}>
                  <k.icon className={`h-5 w-5 ${k.color}`} />
                </div>
                <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
                <p className="text-xs text-slate-500">{k.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile-first info */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-[#0f2c4a] to-[#1a6b3c] text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 rounded-lg">
                <Compass className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">Application Mobile Terrain</p>
                <p className="text-xs text-white/70">Disponible sur Android &amp; iOS – Collecte offline avec synchronisation automatique</p>
              </div>
              <Button variant="outline" className="ml-auto flex-shrink-0 bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs h-8">
                Télécharger
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Missions list */}
        <div className="space-y-4">
          {terrainMissions.map((mission) => {
            const StatusIcon = STATUS_ICON[mission.status] ?? Clock
            const progress   = getProgress(mission.id, mission.checklist)
            const checked    = (checkedItems[mission.id] ?? new Set()).size

            return (
              <Card key={mission.id} className="border-0 shadow-sm">
                <CardHeader className="pb-3 px-4 pt-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-slate-900">{mission.title}</p>
                        <Badge
                          variant="outline"
                          className={`text-[10px] flex-shrink-0 ${STATUS_STYLE[mission.status]}`}
                        >
                          <StatusIcon className="h-2.5 w-2.5 mr-0.5" />
                          {mission.status}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {mission.region}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(mission.date).toLocaleDateString("fr-FR")}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {mission.responsible}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mt-0.5">
                        Projet : <span className="font-medium text-slate-600">{mission.project}</span>
                      </p>
                    </div>

                    {mission.status === "Terminée" ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-semibold text-slate-700">{checked}/{mission.checklist.length}</p>
                        <p className="text-[10px] text-slate-400">points vérifiés</p>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="px-4 pb-4 space-y-3">
                  {/* Checklist progress */}
                  {mission.status !== "Terminée" && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">Avancement checklist</span>
                        <span className="font-semibold text-slate-700">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  {/* Checklist items */}
                  <div>
                    <p className="text-xs font-semibold text-slate-600 mb-2">Points de contrôle</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {mission.checklist.map((item) => {
                        const checked = isChecked(mission.id, item)
                        const done    = mission.status === "Terminée"
                        return (
                          <button
                            key={item}
                            disabled={done}
                            onClick={() => toggleItem(mission.id, item)}
                            className={`flex items-center gap-2 text-xs text-left p-2 rounded-lg transition-colors ${
                              checked || done
                                ? "bg-green-50 text-green-700"
                                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            {(checked || done) ? (
                              <CheckSquare className="h-3.5 w-3.5 flex-shrink-0 text-green-500" />
                            ) : (
                              <Square className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
                            )}
                            {item}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Action buttons */}
                  {mission.status !== "Terminée" && (
                    <div className="flex gap-2 pt-1">
                      <Button size="sm" className="h-7 text-xs bg-[#0f2c4a] hover:bg-[#1a4a7a] text-white gap-1">
                        <Compass className="h-3 w-3" />
                        Rapport terrain
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                        <MapPin className="h-3 w-3" />
                        Géolocaliser
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
