import { useState, useEffect } from "react"
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertCircle,
  Info,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Dialog } from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { MapboxMap } from "@/components/mapbox"

export default function ProjectDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const projectId = params.id
  const [project, setProject] = useState({
    id: "1",
    name: "Route A12",
    type: "route",
    status: "en_cours",
    region: "Île-de-France",
    startDate: new Date("2025-01-15"),
    endDate: new Date("2025-12-31"),
    budget: 5000000,
    progress: 35,
    description: "Construction de la nouvelle route A12 reliant Paris à Lyon",
    documents: [
      {
        id: 1,
        name: "Plan initial",
        type: "pdf",
        date: new Date("2025-01-15"),
      },
      {
        id: 2,
        name: "Rapport mensuel",
        type: "docx",
        date: new Date("2025-02-15"),
      },
    ],
    activities: [
      {
        id: 1,
        title: "Début des travaux",
        date: new Date("2025-01-15"),
        status: "completed",
      },
      {
        id: 2,
        title: "Terrassement",
        date: new Date("2025-02-01"),
        status: "in_progress",
      },
    ],
    alerts: [
      {
        id: 1,
        title: "Retard sur le terrassement",
        date: new Date("2025-02-15"),
        status: "open",
        priority: "high",
      },
    ],
  })
  const [selectedTab, setSelectedTab] = useState("overview")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleUpdateProject = () => {
    // TODO: Implement project update
    console.log("Updating project:", project)
    setIsEditDialogOpen(false)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
            Modifier
          </Button>
          <Button variant="destructive">Supprimer</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{project.region}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {project.startDate.toLocaleDateString()} - {project.endDate.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{project.budget.toLocaleString()} €</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{project.progress}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Statut</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                variant={
                  project.status === "en_cours"
                    ? "default"
                    : project.status === "termine"
                    ? "destructive"
                    : "secondary"
                }
              >
                {project.status.replace(/_/g, " ")}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="lg:col-span-2">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <Tabs.List className="grid w-full grid-cols-4">
              <Tabs.Trigger value="overview">Vue d'ensemble</Tabs.Trigger>
              <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
              <Tabs.Trigger value="activities">Activités</Tabs.Trigger>
              <Tabs.Trigger value="alerts">Alertes</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="overview">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{project.description}</p>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Localisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <MapboxMap
                      zoom={12}
                      center={[2.3522, 48.8566]}
                      onZoomChange={() => {}}
                      onCenterChange={() => {}}
                    />
                  </div>
                </CardContent>
              </Card>
            </Tabs.Content>

            <Tabs.Content value="documents">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 bg-muted rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">{doc.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {doc.date.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Télécharger</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Tabs.Content>

            <Tabs.Content value="activities">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Activités</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-4 bg-muted rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div>
                            <h3 className="font-medium">{activity.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {activity.date.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            activity.status === "completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {activity.status.replace(/_/g, " ")}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Tabs.Content>

            <Tabs.Content value="alerts">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Alertes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-center justify-between p-4 bg-muted rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                          <div>
                            <h3 className="font-medium">{alert.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {alert.date.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            alert.priority === "high"
                              ? "destructive"
                              : "default"
                          }
                        >
                          {alert.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Tabs.Content>
          </Tabs>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <form className="space-y-4">
            <div>
              <Label>Nom du projet</Label>
              <Input
                value={project.name}
                onChange={(e) =>
                  setProject((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Type de projet</Label>
              <Select
                value={project.type}
                onValueChange={(value) =>
                  setProject((prev) => ({ ...prev, type: value }))
                }
              >
                <Select.Trigger>
                  <Select.Value />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="route">Route</Select.Item>
                  <Select.Item value="bridge">Pont</Select.Item>
                  <Select.Item value="tunnel">Tunnel</Select.Item>
                </Select.Content>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date de début</Label>
                <input
                  type="date"
                  value={project.startDate.toISOString().split("T")[0]}
                  onChange={(e) =>
                    setProject((prev) => ({
                      ...prev,
                      startDate: new Date(e.target.value),
                    }))
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div>
                <Label>Date de fin</Label>
                <input
                  type="date"
                  value={project.endDate.toISOString().split("T")[0]}
                  onChange={(e) =>
                    setProject((prev) => ({
                      ...prev,
                      endDate: new Date(e.target.value),
                    }))
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="button" onClick={handleUpdateProject}>
                Mettre à jour
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
