import { useState, useEffect } from "react"
import mapboxgl from "mapbox-gl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarMenuButton, SidebarMenu, SidebarProvider, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenuItem } from "@/components/ui/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Download, Navigation, Share2, X, AlertTriangle } from "lucide-react"
import { MapboxInterface } from "@/components/mapbox-interface"
import { cn } from "@/lib/utils"
import { SidebarMenuItemProps } from "@/components/ui/sidebar"
import { Checkbox } from "@/components/ui/checkbox"
import React from "react"
import { Map, Layers, Calendar, Satellite, Mountain, ExternalLink, MapPin } from "lucide-react"

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
    <SidebarProvider>
      <div className="flex h-screen">
        <SidebarMenuButton />
        <SidebarMenu />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-4 pt-6">
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
                      toast(error, {
                        title: "Erreur de Carte",
                        variant: "destructive"
                      })
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
