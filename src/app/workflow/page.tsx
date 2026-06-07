"use client"

import { useState } from "react"
import {
  GitBranch, Clock, CheckCircle2, XCircle, AlertTriangle,
  FileText, DollarSign, MapPin, ClipboardCheck, User, ChevronDown, ChevronUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { workflowItems } from "@/lib/dnatu-data"

const TYPE_ICON: Record<string, React.ElementType> = {
  Rapport:  FileText,
  Contrat:  ClipboardCheck,
  Mission:  MapPin,
  Budget:   DollarSign,
}

const STATUS_STYLE: Record<string, string> = {
  "En attente":  "bg-amber-50 border-amber-200 text-amber-700",
  "En révision": "bg-blue-50 border-blue-200 text-blue-700",
  "Approuvé":    "bg-green-50 border-green-200 text-green-700",
  "Rejeté":      "bg-red-50 border-red-200 text-red-700",
}

const PRIORITY_STYLE: Record<string, string> = {
  Haute:   "bg-red-100 text-red-700 border-red-200",
  Moyenne: "bg-amber-100 text-amber-700 border-amber-200",
  Faible:  "bg-green-100 text-green-700 border-green-200",
}

// Simulated workflow history
const workflowHistory = [
  { id: "WF-H-001", action: "Approuvé",   doc: "Rapport mensuel mars 2026 – PROJ-006", by: "Dir. National",    date: "2026-04-30T10:20:00", comment: "Approuvé sous réserve de correction des indicateurs financiers." },
  { id: "WF-H-002", action: "Rejeté",     doc: "Avenant n°1 – BATIGUINÉE SARL",       by: "Dir. Juridique",   date: "2026-04-25T14:00:00", comment: "Clauses de pénalité non conformes au code des marchés." },
  { id: "WF-H-003", action: "Approuvé",   doc: "Ordre de mission – Nzérékoré avr.",   by: "Dir. Technique",   date: "2026-04-20T09:15:00", comment: "" },
  { id: "WF-H-004", action: "Approuvé",   doc: "Rapport Q1 2026 – PROJ-002",          by: "Dir. National",    date: "2026-04-15T16:45:00", comment: "Excellent rapport, félicitations à l'équipe." },
  { id: "WF-H-005", action: "Approuvé",   doc: "Budget révisionnel PROJ-001",         by: "Min. Finances",    date: "2026-04-10T11:30:00", comment: "" },
]

const steps = [
  { step: 1, label: "Soumission",         role: "Agent / Chef de projet" },
  { step: 2, label: "Vérification",       role: "Cellule Suivi-Évaluation" },
  { step: 3, label: "Validation tech.",   role: "Direction Technique" },
  { step: 4, label: "Approbation finale", role: "Directeur National" },
  { step: 5, label: "Archivage",          role: "Système DNATU" },
]

export default function WorkflowPage() {
  const [showHistory, setShowHistory] = useState(false)

  const pending  = workflowItems.filter((w) => w.status === "En attente").length
  const revision = workflowItems.filter((w) => w.status === "En révision").length
  const approved = workflowItems.filter((w) => w.status === "Approuvé").length

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-[#0f2c4a]" />
          Workflow Administratif &amp; Validation
        </h1>
        <p className="text-sm text-slate-500">Circuit d'approbation des documents et signatures électroniques</p>
      </div>

      <div className="p-5 space-y-5">
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "En attente",   value: pending,   icon: Clock,        color: "text-amber-600",  bg: "bg-amber-50"  },
            { label: "En révision",  value: revision,  icon: AlertTriangle, color: "text-blue-600",   bg: "bg-blue-50"   },
            { label: "Approuvés",    value: approved,  icon: CheckCircle2, color: "text-green-600",  bg: "bg-green-50"  },
          ].map((k) => (
            <Card key={k.label} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className={`w-9 h-9 rounded-lg ${k.bg} flex items-center justify-center mb-2`}>
                  <k.icon className={`h-5 w-5 ${k.color}`} />
                </div>
                <p className="text-2xl font-bold text-slate-900">{k.value}</p>
                <p className="text-xs text-slate-500">{k.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Circuit de validation */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3 px-4 pt-4">
            <CardTitle className="text-sm font-semibold">Circuit de Validation Standard</CardTitle>
            <CardDescription className="text-xs">Processus en 5 étapes pour les documents officiels</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex flex-wrap gap-0">
              {steps.map((s, i) => (
                <div key={s.step} className="flex items-center">
                  <div className="flex flex-col items-center text-center w-28">
                    <div className="w-8 h-8 rounded-full bg-[#0f2c4a] text-white flex items-center justify-center text-xs font-bold">
                      {s.step}
                    </div>
                    <p className="text-xs font-medium text-slate-800 mt-1">{s.label}</p>
                    <p className="text-[10px] text-slate-500">{s.role}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="h-0.5 w-6 bg-slate-200 mx-1 flex-shrink-0 mb-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending items */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3 px-4 pt-4">
            <CardTitle className="text-sm font-semibold">Documents en Attente de Traitement</CardTitle>
            <CardDescription className="text-xs">
              {workflowItems.filter((w) => w.status !== "Approuvé").length} document(s) à traiter
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="divide-y divide-slate-50">
              {workflowItems.map((item) => {
                const Icon = TYPE_ICON[item.type] ?? FileText
                const urgent = item.daysWaiting >= 7
                return (
                  <div key={item.id} className="flex items-center gap-4 px-4 py-3.5 hover:bg-slate-50">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <p className="text-xs font-semibold text-slate-900">{item.title}</p>
                        <Badge variant="outline" className={`text-[10px] flex-shrink-0 ${STATUS_STYLE[item.status]}`}>
                          {item.status}
                        </Badge>
                        <Badge variant="outline" className={`text-[10px] flex-shrink-0 ${PRIORITY_STYLE[item.priority]}`}>
                          P. {item.priority}
                        </Badge>
                        {urgent && (
                          <Badge variant="outline" className="text-[10px] flex-shrink-0 bg-red-50 border-red-200 text-red-700">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500">
                        <span className="flex items-center gap-1"><User className="h-3 w-3" />{item.submittedBy}</span>
                        <span>Soumis le {new Date(item.submittedDate).toLocaleDateString("fr-FR")}</span>
                        {item.daysWaiting > 0 && (
                          <span className={urgent ? "text-red-600 font-semibold" : ""}>
                            {item.daysWaiting} jour{item.daysWaiting > 1 ? "s" : ""} d'attente
                          </span>
                        )}
                      </div>
                    </div>

                    {item.status !== "Approuvé" && (
                      <div className="flex gap-2 flex-shrink-0">
                        <Button size="sm" className="h-7 text-xs bg-[#0f2c4a] hover:bg-[#1a4a7a] text-white gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Approuver
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50 gap-1">
                          <XCircle className="h-3 w-3" />
                          Rejeter
                        </Button>
                      </div>
                    )}
                    {item.status === "Approuvé" && (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* History */}
        <Card className="border-0 shadow-sm">
          <CardHeader
            className="pb-3 px-4 pt-4 cursor-pointer flex flex-row items-center justify-between"
            onClick={() => setShowHistory(!showHistory)}
          >
            <div>
              <CardTitle className="text-sm font-semibold">Historique des Validations</CardTitle>
              <CardDescription className="text-xs">Dernières décisions prises</CardDescription>
            </div>
            {showHistory ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </CardHeader>

          {showHistory && (
            <CardContent className="px-4 pb-4 space-y-2">
              {workflowHistory.map((h) => (
                <div key={h.id} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50">
                  {h.action === "Approuvé" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-800 line-clamp-1">{h.doc}</p>
                    <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 mt-0.5">
                      <span className={h.action === "Approuvé" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {h.action}
                      </span>
                      <span>par {h.by}</span>
                      <span>{new Date(h.date).toLocaleDateString("fr-FR")}</span>
                    </div>
                    {h.comment && (
                      <p className="text-[10px] text-slate-500 italic mt-0.5">&ldquo;{h.comment}&rdquo;</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
