"use client"

import { useState } from "react"
import {
  Settings, User, Bell, Shield, Database, Globe,
  Mail, Phone, Building2, Save, Eye, EyeOff,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const TABS = [
  { id: "profil",        label: "Profil",            icon: User       },
  { id: "notifications", label: "Notifications",     icon: Bell       },
  { id: "securite",     label: "Sécurité",           icon: Shield     },
  { id: "systeme",      label: "Système",            icon: Database   },
  { id: "utilisateurs", label: "Utilisateurs",       icon: Globe      },
]

const USERS = [
  { id: 1, name: "Mamadou Diallo",     role: "Chef de projet",       region: "Conakry",    status: "Actif",    email: "m.diallo@dnatu.gov.gn",    lastLogin: "2026-05-07" },
  { id: 2, name: "Fatoumata Bah",      role: "Chargée d'urbanisme",  region: "Labé",       status: "Actif",    email: "f.bah@dnatu.gov.gn",       lastLogin: "2026-05-06" },
  { id: 3, name: "Ibrahima Sory",      role: "Ingénieur SIG",        region: "Conakry",    status: "Actif",    email: "i.sory@dnatu.gov.gn",      lastLogin: "2026-05-05" },
  { id: 4, name: "Aissatou Barry",     role: "Gestionnaire financier",region: "Boké",       status: "Actif",    email: "a.barry@dnatu.gov.gn",     lastLogin: "2026-05-04" },
  { id: 5, name: "Oumar Touré",        role: "Chef de projet",       region: "Kindia",     status: "Actif",    email: "o.toure@dnatu.gov.gn",     lastLogin: "2026-05-03" },
  { id: 6, name: "Mariama Diallo",     role: "Cellule S&E",          region: "Conakry",    status: "Actif",    email: "ma.diallo@dnatu.gov.gn",   lastLogin: "2026-05-02" },
  { id: 7, name: "Bakary Kouyaté",     role: "Urbaniste",            region: "Kankan",     status: "Inactif",  email: "b.kouyate@dnatu.gov.gn",   lastLogin: "2026-04-20" },
  { id: 8, name: "Nene Kourouma",      role: "Env. & Résilience",    region: "Conakry",    status: "Actif",    email: "n.kourouma@dnatu.gov.gn",  lastLogin: "2026-05-01" },
]

const ROLES = [
  { name: "Administrateur",       perms: "Accès total",                    color: "bg-red-50 text-red-700 border-red-200"      },
  { name: "Directeur national",   perms: "Approbation + lecture totale",   color: "bg-violet-50 text-violet-700 border-violet-200" },
  { name: "Direction technique",  perms: "Saisie + validation",            color: "bg-blue-50 text-blue-700 border-blue-200"   },
  { name: "Chef de projet",       perms: "Saisie données projet",          color: "bg-amber-50 text-amber-700 border-amber-200" },
  { name: "Cellule S&E",          perms: "Indicateurs + rapports",         color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { name: "Expert SIG",           perms: "Modules cartographie",           color: "bg-cyan-50 text-cyan-700 border-cyan-200"   },
  { name: "Préfecture/Commune",   perms: "Lecture régionale",              color: "bg-slate-50 text-slate-700 border-slate-200" },
  { name: "Bailleur",             perms: "Lecture projets financés",       color: "bg-green-50 text-green-700 border-green-200" },
]

export default function ParametresPage() {
  const [activeTab, setActiveTab] = useState("profil")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Settings className="h-5 w-5 text-[#0f2c4a]" />
          Paramètres Système
        </h1>
        <p className="text-sm text-slate-500">Configuration de la plateforme DNATU</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Tab sidebar */}
        <div className="w-52 bg-white border-r border-slate-200 flex-shrink-0 p-3 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-[#0f2c4a] text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? "text-white" : "text-slate-400"}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === "profil" && (
            <div className="max-w-2xl space-y-5">
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-5 pt-5 pb-3">
                  <CardTitle className="text-sm font-semibold">Informations du Profil</CardTitle>
                  <CardDescription className="text-xs">Directeur National • DNATU Guinée</CardDescription>
                </CardHeader>
                <CardContent className="px-5 pb-5 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#0f2c4a] flex items-center justify-center text-white text-xl font-bold">
                      DN
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Directeur National</p>
                      <Badge variant="outline" className="text-[10px] bg-red-50 text-red-700 border-red-200 mt-1">
                        Administrateur
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Prénom</Label>
                      <Input className="h-9 text-sm" defaultValue="Alpha" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Nom</Label>
                      <Input className="h-9 text-sm" defaultValue="Diallo" />
                    </div>
                    <div className="space-y-1.5 col-span-2">
                      <Label className="text-xs flex items-center gap-1"><Mail className="h-3 w-3" />Email</Label>
                      <Input className="h-9 text-sm" defaultValue="directeur@dnatu.gov.gn" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs flex items-center gap-1"><Phone className="h-3 w-3" />Téléphone</Label>
                      <Input className="h-9 text-sm" defaultValue="+224 622 000 000" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs flex items-center gap-1"><Building2 className="h-3 w-3" />Direction</Label>
                      <Input className="h-9 text-sm" defaultValue="DNATU – Direction Nationale" disabled />
                    </div>
                  </div>

                  <Button className="bg-[#0f2c4a] hover:bg-[#1a4a7a] text-white gap-2">
                    <Save className="h-4 w-4" />
                    Enregistrer les modifications
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="max-w-2xl space-y-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-5 pt-5 pb-3">
                  <CardTitle className="text-sm font-semibold">Préférences de Notifications</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5 space-y-3">
                  {[
                    { label: "Alertes critiques projets",       checked: true  },
                    { label: "Rapports mensuels disponibles",   checked: true  },
                    { label: "Documents en attente de validation", checked: true  },
                    { label: "Mises à jour d'indicateurs",     checked: false },
                    { label: "Résumé hebdomadaire par email",   checked: true  },
                    { label: "Alertes budgétaires",            checked: true  },
                    { label: "Nouvelles missions terrain",      checked: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                      <span className="text-sm text-slate-700">{item.label}</span>
                      <div className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${item.checked ? "bg-[#0f2c4a]" : "bg-slate-200"}`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow mt-0.5 transition-transform ${item.checked ? "translate-x-5" : "translate-x-0.5"}`} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "securite" && (
            <div className="max-w-2xl space-y-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-5 pt-5 pb-3">
                  <CardTitle className="text-sm font-semibold">Sécurité du Compte</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5 space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Mot de passe actuel</Label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} className="h-9 text-sm pr-10" />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                        {showPassword ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-slate-400" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Nouveau mot de passe</Label>
                    <Input type="password" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Confirmer le nouveau mot de passe</Label>
                    <Input type="password" className="h-9 text-sm" />
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs font-semibold text-blue-800 mb-1">Authentification Multifacteur (MFA)</p>
                    <p className="text-xs text-blue-700">La MFA est activée sur votre compte via SMS. Chaque connexion requiert un code OTP.</p>
                    <Badge variant="outline" className="text-[10px] bg-green-50 text-green-700 border-green-200 mt-2">MFA Activée</Badge>
                  </div>
                  <Button className="bg-[#0f2c4a] hover:bg-[#1a4a7a] text-white gap-2">
                    <Shield className="h-4 w-4" />
                    Mettre à jour la sécurité
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "systeme" && (
            <div className="max-w-2xl space-y-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-5 pt-5 pb-3">
                  <CardTitle className="text-sm font-semibold">Configuration Système</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    {[
                      { label: "Version plateforme",   value: "v2.1.0"                    },
                      { label: "Dernière MàJ",         value: "07/05/2026"                },
                      { label: "Base de données",      value: "PostgreSQL 15 + PostGIS"   },
                      { label: "Serveur",              value: "Cloud Gov. Guinée"          },
                      { label: "Sauvegarde",           value: "Quotidienne (03h00)"        },
                      { label: "Disponibilité",        value: "99.8% (30 derniers jours)"  },
                      { label: "Utilisateurs actifs",  value: "47 / 200 licences"          },
                      { label: "Stockage utilisé",     value: "128 GB / 500 GB"            },
                    ].map((item) => (
                      <div key={item.label} className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-slate-500">{item.label}</p>
                        <p className="font-semibold text-slate-900 mt-0.5">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs font-semibold text-green-800">Système opérationnel</p>
                    <p className="text-xs text-green-700 mt-0.5">Tous les services fonctionnent normalement. Prochaine maintenance planifiée: 15/06/2026.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "utilisateurs" && (
            <div className="space-y-5">
              {/* Roles */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-4 pt-4 pb-3">
                  <CardTitle className="text-sm font-semibold">Profils et Permissions</CardTitle>
                  <CardDescription className="text-xs">Niveaux d'accès selon le rôle utilisateur</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {ROLES.map((r) => (
                      <div key={r.name} className={`p-2.5 rounded-lg border text-xs ${r.color}`}>
                        <p className="font-semibold">{r.name}</p>
                        <p className="opacity-75 mt-0.5">{r.perms}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Users table */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="px-4 pt-4 pb-3 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-semibold">Gestion des Utilisateurs</CardTitle>
                    <CardDescription className="text-xs">{USERS.length} comptes enregistrés</CardDescription>
                  </div>
                  <Button size="sm" className="h-8 text-xs bg-[#0f2c4a] hover:bg-[#1a4a7a] text-white">
                    + Ajouter
                  </Button>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Utilisateur</th>
                          <th className="text-left px-3 py-2.5 text-slate-500 font-medium">Rôle</th>
                          <th className="text-left px-3 py-2.5 text-slate-500 font-medium">Région</th>
                          <th className="text-left px-3 py-2.5 text-slate-500 font-medium">Dernière connexion</th>
                          <th className="text-center px-3 py-2.5 text-slate-500 font-medium">Statut</th>
                          <th className="px-3 py-2.5" />
                        </tr>
                      </thead>
                      <tbody>
                        {USERS.map((u) => (
                          <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50">
                            <td className="px-4 py-2.5">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-[#0f2c4a] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                  {u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                                </div>
                                <div>
                                  <p className="font-medium text-slate-800">{u.name}</p>
                                  <p className="text-slate-400 text-[10px]">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-2.5 text-slate-600">{u.role}</td>
                            <td className="px-3 py-2.5 text-slate-600">{u.region}</td>
                            <td className="px-3 py-2.5 text-slate-500">
                              {new Date(u.lastLogin).toLocaleDateString("fr-FR")}
                            </td>
                            <td className="px-3 py-2.5 text-center">
                              <Badge
                                variant="outline"
                                className={`text-[10px] ${
                                  u.status === "Actif"
                                    ? "bg-green-50 border-green-200 text-green-700"
                                    : "bg-gray-50 border-gray-200 text-gray-600"
                                }`}
                              >
                                {u.status}
                              </Badge>
                            </td>
                            <td className="px-3 py-2.5">
                              <Button variant="outline" size="sm" className="h-6 text-[10px]">
                                Modifier
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
