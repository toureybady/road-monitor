import { useState } from "react"
import {
  Search,
  MapPin,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [advancedSearch, setAdvancedSearch] = useState(false)

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log("Searching with:", {
      searchTerm,
      selectedType,
      selectedStatus,
      selectedRegion,
      selectedDate,
    })
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Recherche de Projets</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                type="button"
                onClick={() => setAdvancedSearch(!advancedSearch)}
                variant="outline"
              >
                {advancedSearch ? "Filtres simples" : "Filtres avancés"}
                {advancedSearch ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </Button>
              <Button type="submit" onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Rechercher
              </Button>
            </div>

            {advancedSearch && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Type de projet</Label>
                    <Select
                      value={selectedType}
                      onValueChange={setSelectedType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous</SelectItem>
                        <SelectItem value="route">Route</SelectItem>
                        <SelectItem value="pont">Pont</SelectItem>
                        <SelectItem value="tunnel">Tunnel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Statut</Label>
                    <Select
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous</SelectItem>
                        <SelectItem value="en_cours">En cours</SelectItem>
                        <SelectItem value="termine">Terminé</SelectItem>
                        <SelectItem value="planifie">Planifié</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Région</Label>
                    <Select
                      value={selectedRegion}
                      onValueChange={setSelectedRegion}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Toutes</SelectItem>
                        <SelectItem value="paris">Île-de-France</SelectItem>
                        <SelectItem value="nord">Nord</SelectItem>
                        <SelectItem value="sud">Sud</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Date de début</Label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Options</Label>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-all" />
                      <Label htmlFor="show-all">Afficher tous les détails</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-map" />
                      <Label htmlFor="show-map">Afficher sur la carte</Label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">Projets</TabsTrigger>
          <TabsTrigger value="activities">Activités</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Résultats (0)</h2>
              <Button variant="outline">Exporter</Button>
            </div>
            <div className="space-y-4">
              {/* TODO: Add project cards */}
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Aucun projet trouvé</h3>
                      <p className="text-sm text-muted-foreground">
                        Essayez d'ajuster vos filtres de recherche.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activities">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Activités</h2>
              <Button variant="outline">Exporter</Button>
            </div>
            <div className="space-y-4">
              {/* TODO: Add activity timeline */}
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Aucune activité trouvée</h3>
                      <p className="text-sm text-muted-foreground">
                        Essayez d'ajuster vos filtres de recherche.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Documents</h2>
              <Button variant="outline">Exporter</Button>
            </div>
            <div className="space-y-4">
              {/* TODO: Add document list */}
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Aucun document trouvé</h3>
                      <p className="text-sm text-muted-foreground">
                        Essayez d'ajuster vos filtres de recherche.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
