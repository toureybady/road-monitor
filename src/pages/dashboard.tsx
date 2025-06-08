import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { BarChart3, TrendingUp, Clock, AlertTriangle, MapPin, Calendar, Users, Activity } from "lucide-react"

const kpis = [
  {
    title: "Projets Actifs",
    value: "12",
    change: "+2",
    trend: "up",
    icon: BarChart3,
    color: "text-blue-600",
  },
  {
    title: "Progression Moyenne",
    value: "68%",
    change: "+5%",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Projets en Retard",
    value: "3",
    change: "-1",
    trend: "down",
    icon: Clock,
    color: "text-orange-600",
  },
  {
    title: "Alertes Actives",
    value: "7",
    change: "+2",
    trend: "up",
    icon: AlertTriangle,
    color: "text-red-600",
  },
]

const recentProjects = [
  {
    id: "BG-001",
    name: "Boke - Gaoual",
    status: "En Cours",
    progress: 75,
    lastUpdate: "Il y a 2 heures",
    contractor: "GUITER BTP",
    location: "BOKE, GUINEE",
  },
  {
    id: "FD104-002",
    name: "Faranah-Dabola Contournement",
    status: "En Retard",
    progress: 45,
    lastUpdate: "Il y a 1 jour",
    contractor: "GUICOPRESS TP",
    location: "FARANAH, GUINEE",
  },
  {
    id: "RN1-003",
    name: "Coyah-Faramarioah- RN1",
    status: "Terminé",
    progress: 100,
    lastUpdate: "Il y a 3 jours",
    contractor: "DIALLO BTP",
    location: "FORECARIAH, GUINEE",
  },
]

const recentActivities = [
  {
    type: "upload",
    message: "Nouvelles images drone uploadées pour BG-001",
    time: "Il y a 30 minutes",
    icon: Activity,
  },
  {
    type: "alert",
    message: "Retard détecté sur le projet FD104-002",
    time: "Il y a 2 heures",
    icon: AlertTriangle,
  },
  {
    type: "report",
    message: "Rapport mensuel généré pour RN1-003",
    time: "Il y a 4 heures",
    icon: BarChart3,
  },
]

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Tableau de Bord</h2>
            <p className="text-muted-foreground">Vue d'ensemble de vos projets de construction routière</p>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={kpi.trend === "up" ? "text-green-600" : "text-red-600"}>{kpi.change}</span> depuis le
                mois dernier
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Projets Récents */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Projets Récents</CardTitle>
            <CardDescription>Aperçu de l'état de vos projets en cours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center space-x-4 rounded-lg border p-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">{project.name}</p>
                    <Badge
                      variant={
                        project.status === "En Cours"
                          ? "default"
                          : project.status === "En Retard"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{project.contractor}</span>
                    <MapPin className="h-3 w-3 ml-2" />
                    <span>{project.location}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progression</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Dernière mise à jour: {project.lastUpdate}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Activités Récentes */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Activités Récentes</CardTitle>
            <CardDescription>Dernières actions sur la plateforme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <activity.icon className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Graphiques et Statistiques */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Progression des Projets</CardTitle>
            <CardDescription>Évolution mensuelle de la progression</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end justify-between h-32 border-b border-l pl-2 pb-2">
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-8 bg-blue-500 rounded-t" style={{ height: "60%" }}></div>
                  <span className="text-xs text-muted-foreground">Jan</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-8 bg-blue-500 rounded-t" style={{ height: "75%" }}></div>
                  <span className="text-xs text-muted-foreground">Fév</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-8 bg-blue-500 rounded-t" style={{ height: "45%" }}></div>
                  <span className="text-xs text-muted-foreground">Mar</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-8 bg-blue-500 rounded-t" style={{ height: "85%" }}></div>
                  <span className="text-xs text-muted-foreground">Avr</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-8 bg-blue-500 rounded-t" style={{ height: "68%" }}></div>
                  <span className="text-xs text-muted-foreground">Mai</span>
                </div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition par Statut</CardTitle>
            <CardDescription>Distribution des projets par statut</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(
                        #3b82f6 0deg 180deg,
                        #ef4444 180deg 240deg,
                        #22c55e 240deg 360deg
                      )`,
                    }}
                  ></div>
                  <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">12 Projets</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">En Cours</span>
                  </div>
                  <span className="text-sm font-medium">6 (50%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">En Retard</span>
                  </div>
                  <span className="text-sm font-medium">3 (25%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Terminé</span>
                  </div>
                  <span className="text-sm font-medium">3 (25%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertes et Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Alertes Importantes</CardTitle>
          <CardDescription>Notifications nécessitant votre attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">Retard critique détecté</p>
                <p className="text-sm text-red-600">Le projet FD104-002 accuse un retard de 15 jours</p>
                <p className="text-xs text-red-500 mt-1">Il y a 2 heures</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <Clock className="h-5 w-5 text-orange-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-orange-800">Inspection programmée</p>
                <p className="text-sm text-orange-600">Inspection qualité prévue demain pour BG-001</p>
                <p className="text-xs text-orange-500 mt-1">Il y a 4 heures</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Activity className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800">Nouvelles données disponibles</p>
                <p className="text-sm text-blue-600">Orthomosaïque mise à jour pour RN1-003</p>
                <p className="text-xs text-blue-500 mt-1">Il y a 6 heures</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
