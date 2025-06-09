import { useState, useEffect } from "react"
import mapboxgl from "mapbox-gl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar, SidebarHeader, SidebarContent } from "@/components/ui/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Map, Layers, Calendar, MapPin, Satellite, Mountain, Download, Share2, Navigation, AlertTriangle, ExternalLink } from "lucide-react"
import { MapboxInterface } from "@/components/mapbox-interface"
import { Checkbox } from "@/components/ui/checkbox"
import React from "react"

// Ensure Mapbox GL JS is loaded
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

interface Layer {
  id: string
  name: string
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>
  visible: boolean
}

const mapLayers: Layer[] = [
  { id: "satellite", name: "Vue Satellite", icon: Satellite, visible: true },
  { id: "terrain", name: "Terrain", icon: Mountain, visible: false },
  { id: "orthomosaic", name: "Orthomosaïques", icon: Map, visible: true },
  { id: "annotations", name: "Annotations", icon: MapPin, visible: true },
]

export default function MapPage() {
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [selectedLayer, setSelectedLayer] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [mapType, setMapType] = useState<string>("satellite")
  const [opacity, setOpacity] = useState<number>(1)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const [showFallback, setShowFallback] = useState(false)
  const [layers, setLayers] = useState<Layer[]>(mapLayers)
  const { toast } = useToast()

  useEffect(() => {
    if (!isMapLoaded) return

    // Update map layers based on state
    const updateLayers = () => {
      const updatedLayers = layers.map((layer) => ({
        ...layer,
        visible: layer.id === mapType || layer.id === "annotations"
      }))
      setLayers(updatedLayers)
    }

    // Update layers when mapType changes
    updateLayers()
  }, [isMapLoaded, mapType])

  const handleLayerToggle = (layerId: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
      )
    )
  }

  const handleOpacityChange = (value: number) => {
    setOpacity(value)
  }

  return (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarHeader>
          <h2 className="text-lg font-semibold">Contrôle de la Carte</h2>
        </SidebarHeader>
        <SidebarContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Filtres</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="project">Projet</Label>
                  <Select
                    id="project"
                    value={selectedProject}
                    onValueChange={setSelectedProject}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tous" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tous</SelectItem>
                      <SelectItem value="road">Route</SelectItem>
                      <SelectItem value="bridge">Pont</SelectItem>
                      <SelectItem value="tunnel">Tunnel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="layer">Couche</Label>
                  <Select
                    value={selectedLayer}
                    onValueChange={setSelectedLayer}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tous" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tous</SelectItem>
                      <SelectItem value="active">En cours</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                      <SelectItem value="planned">Planifié</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Type de Carte</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="satellite">Vue Satellite</Label>
                  <Checkbox
                    id="satellite"
                    checked={mapType === "satellite"}
                    onCheckedChange={() => setMapType("satellite")}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="terrain">Terrain</Label>
                  <Checkbox
                    id="terrain"
                    checked={mapType === "terrain"}
                    onCheckedChange={() => setMapType("terrain")}
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Transparence</h3>
              <div className="flex items-center gap-2">
                <Slider
                  value={[opacity]}
                  onValueChange={([value]) => handleOpacityChange(value)}
                  min={0}
                  max={1}
                  step={0.1}
                />
                <span className="text-sm">{Math.round(opacity * 100)}%</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Légende</h3>
              <div className="space-y-2">
                {layers.map((layer) => (
                  <div key={layer.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {layer.icon && React.createElement(layer.icon, { className: "h-4 w-4" })}
                      <span className="text-sm">{layer.name}</span>
                    </div>
                    <Checkbox
                      checked={layer.visible}
                      onCheckedChange={() => handleLayerToggle(layer.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
      
      <main className="flex-1">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Visualisation de la Carte</CardTitle>
                <CardDescription>
                  {selectedProject || "Tous les projets"} - {selectedDate.toLocaleDateString()}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Partager
                </Button>
                <Button variant="outline" size="sm">
                  <Navigation className="mr-2 h-4 w-4" />
                  Navigation
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {showFallback ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Erreur de Chargement</AlertTitle>
                <AlertDescription>
                  {mapError || "Impossible de charger la carte. Veuillez réessayer plus tard."}
                </AlertDescription>
              </Alert>
            ) : (
              <MapboxInterface
                selectedProject={selectedProject}
                selectedDate={selectedDate.toISOString()}
                mapType={mapType}
                layers={layers.map(layer => ({
                  id: layer.id,
                  name: layer.name,
                  icon: layer.icon,
                  enabled: layer.visible
                }))}
                opacity={[opacity]}
                onMapLoad={() => setIsMapLoaded(true)}
                onMapError={(error) => {
                  setMapError(error)
                  setShowFallback(true)
                  toast({
                    title: "Erreur de Carte",
                    description: error,
                    variant: "destructive",
                  })
                }}
              />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
