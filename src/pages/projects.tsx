import { useState } from "react"
import {
  Plus,
  Search,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Check,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

export default function ProjectsPage() {
  const [selectedProjects, setSelectedProjects] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const projects = [
    {
      id: 1,
      name: "Route A12",
      type: "route",
      status: "en_cours",
      region: "Île-de-France",
      startDate: new Date("2025-01-15"),
      endDate: new Date("2025-12-31"),
      budget: 5000000,
      progress: 35,
    },
    {
      id: 2,
      name: "Pont du Rhône",
      type: "pont",
      status: "planifie",
      region: "Sud",
      startDate: new Date("2026-03-01"),
      endDate: new Date("2028-02-28"),
      budget: 8500000,
      progress: 0,
    },
    {
      id: 3,
      name: "Tunnel A34",
      type: "tunnel",
      status: "termine",
      region: "Nord",
      startDate: new Date("2023-04-15"),
      endDate: new Date("2024-11-30"),
      budget: 12000000,
      progress: 100,
    },
  ]

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log("Searching with:", {
      searchTerm,
      selectedStatus,
      selectedType,
      selectedRegion,
    })
  }

  const handleCreateProject = () => {
    // TODO: Implement project creation
    console.log("Creating new project")
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projets</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau projet
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              placeholder="Rechercher un projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            type="button"
            onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
            variant="outline"
          >
            {isAdvancedSearch ? "Filtres simples" : "Filtres avancés"}
            {isAdvancedSearch ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
          </Button>
        </div>

        {isAdvancedSearch && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Type de projet</Label>
                <Select
                  value={selectedType}
                  onValueChange={setSelectedType}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Tous" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="">Tous</Select.Item>
                    <Select.Item value="route">Route</Select.Item>
                    <Select.Item value="pont">Pont</Select.Item>
                    <Select.Item value="tunnel">Tunnel</Select.Item>
                  </Select.Content>
                </Select>
              </div>
              <div>
                <Label>Statut</Label>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Tous" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="">Tous</Select.Item>
                    <Select.Item value="en_cours">En cours</Select.Item>
                    <Select.Item value="termine">Terminé</Select.Item>
                    <Select.Item value="planifie">Planifié</Select.Item>
                  </Select.Content>
                </Select>
              </div>
              <div>
                <Label>Région</Label>
                <Select
                  value={selectedRegion}
                  onValueChange={setSelectedRegion}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Toutes" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="">Toutes</Select.Item>
                    <Select.Item value="paris">Île-de-France</Select.Item>
                    <Select.Item value="nord">Nord</Select.Item>
                    <Select.Item value="sud">Sud</Select.Item>
                  </Select.Content>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <Tabs.List className="grid w-full grid-cols-4">
          <Tabs.Trigger value="all">Tous</Tabs.Trigger>
          <Tabs.Trigger value="active">En cours</Tabs.Trigger>
          <Tabs.Trigger value="completed">Terminés</Tabs.Trigger>
          <Tabs.Trigger value="planned">Planifiés</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="all">
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`project-${project.id}`}
                      checked={selectedProjects.includes(project.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedProjects([...selectedProjects, project.id])
                        } else {
                          setSelectedProjects(
                            selectedProjects.filter((id) => id !== project.id)
                          )
                        }
                      }}
                    />
                    <div>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{project.region}</span>
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{project.type}</Badge>
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
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date de début</Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {project.startDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Date de fin</Label>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {project.endDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Budget</Label>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{project.budget.toLocaleString()} €</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Progression</Label>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Tabs.Content>

        {/* Other tabs content similar to above */}
      </Tabs>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouveau projet</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <Label>Nom du projet</Label>
              <Input placeholder="Nom du projet" />
            </div>
            <div>
              <Label>Type de projet</Label>
              <Select>
                <Select.Trigger>
                  <Select.Value placeholder="Sélectionner" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="route">Route</Select.Item>
                  <Select.Item value="pont">Pont</Select.Item>
                  <Select.Item value="tunnel">Tunnel</Select.Item>
                </Select.Content>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date de début</Label>
                <input
                  type="date"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div>
                <Label>Date de fin</Label>
                <input
                  type="date"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="button" onClick={handleCreateProject}>
                Créer
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
