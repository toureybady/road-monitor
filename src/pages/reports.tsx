import { useState } from "react"
import {
  FileText,
  Calendar,
  ChartBar,
  MapPin,
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
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("")
  const [selectedProjects, setSelectedProjects] = useState<number[]>([])
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)

  const reports = [
    {
      id: 1,
      name: "Rapport mensuel",
      type: "mensuel",
      date: new Date("2025-03-01"),
      status: "completed",
      projects: 3,
      alerts: 2,
      budget: 1500000,
    },
    {
      id: 2,
      name: "Rapport trimestriel",
      type: "trimestriel",
      date: new Date("2025-01-01"),
      status: "in_progress",
      projects: 5,
      alerts: 0,
      budget: 2500000,
    },
    {
      id: 3,
      name: "Rapport annuel",
      type: "annuel",
      date: new Date("2024-01-01"),
      status: "completed",
      projects: 12,
      alerts: 4,
      budget: 12000000,
    },
  ]

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting report:", {
      selectedReport,
      selectedPeriod,
      selectedProjects,
    })
    setIsExportDialogOpen(false)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Rapports</h1>
        <Button onClick={() => setIsExportDialogOpen(true)}>
          Exporter
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input placeholder="Rechercher un rapport..." />
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
                <Label>Type de rapport</Label>
                <Select
                  value={selectedReport}
                  onValueChange={setSelectedReport}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Tous" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="">Tous</Select.Item>
                    <Select.Item value="mensuel">Mensuel</Select.Item>
                    <Select.Item value="trimestriel">Trimestriel</Select.Item>
                    <Select.Item value="annuel">Annuel</Select.Item>
                  </Select.Content>
                </Select>
              </div>
              <div>
                <Label>Période</Label>
                <Select
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Toutes" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="">Toutes</Select.Item>
                    <Select.Item value="month">Ce mois</Select.Item>
                    <Select.Item value="quarter">Ce trimestre</Select.Item>
                    <Select.Item value="year">Cette année</Select.Item>
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
          <Tabs.Trigger value="monthly">Mensuels</Tabs.Trigger>
          <Tabs.Trigger value="quarterly">Trimestriels</Tabs.Trigger>
          <Tabs.Trigger value="annual">Annuels</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="all">
          <div className="space-y-4">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`report-${report.id}`}
                      checked={selectedProjects.includes(report.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedProjects([...selectedProjects, report.id])
                        } else {
                          setSelectedProjects(
                            selectedProjects.filter((id) => id !== report.id)
                          )
                        }
                      }}
                    />
                    <div>
                      <CardTitle>{report.name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {report.date.toLocaleDateString()}
                          </span>
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        report.status === "completed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {report.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Projets</Label>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{report.projects}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Alertes</Label>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span>{report.alerts}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Budget</Label>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{report.budget.toLocaleString()} €</span>
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

      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent>
          <form className="space-y-4">
            <div>
              <Label>Type d'export</Label>
              <Select
                value={selectedReport}
                onValueChange={setSelectedReport}
              >
                <Select.Trigger>
                  <Select.Value />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="pdf">PDF</Select.Item>
                  <Select.Item value="excel">Excel</Select.Item>
                  <Select.Item value="csv">CSV</Select.Item>
                </Select.Content>
              </Select>
            </div>
            <div>
              <Label>Période</Label>
              <Select
                value={selectedPeriod}
                onValueChange={setSelectedPeriod}
              >
                <Select.Trigger>
                  <Select.Value />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="month">Ce mois</Select.Item>
                  <Select.Item value="quarter">Ce trimestre</Select.Item>
                  <Select.Item value="year">Cette année</Select.Item>
                  <Select.Item value="custom">Personnalisé</Select.Item>
                </Select.Content>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="button" onClick={handleExport}>
                Exporter
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
