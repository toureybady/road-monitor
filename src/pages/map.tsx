import { useState } from "react"
import mapboxgl from "mapbox-gl"
import { MapboxMap } from "@/components/mapbox"
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
import { Separator } from "@/components/ui/separator"
import { Tabs } from "@/components/ui/tabs"

// Ensure Mapbox GL JS is loaded
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""

export default function MapPage() {
  const [selectedLayer, setSelectedLayer] = useState("roads")
  const [zoom, setZoom] = useState(10)
  const [center, setCenter] = useState([2.3522, 48.8566]) // Paris coordinates
  const [layers, setLayers] = useState([
    { id: "roads", name: "Routes", visible: true },
    { id: "projects", name: "Projets", visible: true },
    { id: "traffic", name: "Trafic", visible: true },
    { id: "alerts", name: "Alertes", visible: true },
  ])

  const handleLayerToggle = (layerId: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === layerId
          ? { ...layer, visible: !layer.visible }
          : layer
      )
    )
  }

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom)
  }

  const handleCenterChange = (newCenter: [number, number]) => {
    setCenter(newCenter)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex h-[calc(100vh-100px)] flex-col">
        <div className="flex h-full flex-col md:flex-row">
          {/* Left sidebar */}
          <div className="w-full md:w-1/4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Carte</CardTitle>
                <CardDescription>
                  Contrôlez la vue et les couches de la carte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Layers control */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Couches</h3>
                    <div className="space-y-2">
                      {layers.map((layer) => (
                        <div key={layer.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`layer-${layer.id}`}
                            checked={layer.visible}
                            onCheckedChange={() => handleLayerToggle(layer.id)}
                          />
                          <Label htmlFor={`layer-${layer.id}`}>
                            {layer.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Search */
                  <div>
                    <h3 className="text-sm font-medium mb-2">Recherche</h3>
                    <Input placeholder="Rechercher une adresse ou un projet..." />
                  </div>

                  {/* Filters */
                  <div>
                    <h3 className="text-sm font-medium mb-2">Filtres</h3>
                    <div className="space-y-2">
                      <div>
                        <Label>Type de projet</Label>
                        <Select
                          value={selectedLayer}
                          onValueChange={setSelectedLayer}
                        >
                          <Select.Trigger>
                            <Select.Value placeholder="Tous" />
                          </Select.Trigger>
                          <Select.Content>
                            <Select.Item value="">Tous</Select.Item>
                            <Select.Item value="road">Route</Select.Item>
                            <Select.Item value="bridge">Pont</Select.Item>
                            <Select.Item value="tunnel">Tunnel</Select.Item>
                          </Select.Content>
                        </Select>
                      </div>
                      <div>
                        <Label>Statut</Label>
                        <Select
                          value={selectedLayer}
                          onValueChange={setSelectedLayer}
                        >
                          <Select.Trigger>
                            <Select.Value placeholder="Tous" />
                          </Select.Trigger>
                          <Select.Content>
                            <Select.Item value="">Tous</Select.Item>
                            <Select.Item value="active">En cours</Select.Item>
                            <Select.Item value="completed">Terminé</Select.Item>
                            <Select.Item value="planned">Planifié</Select.Item>
                          </Select.Content>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Legend */
                  <div>
                    <h3 className="text-sm font-medium mb-2">Légende</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <span>Routes principales</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span>Projets en cours</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                        <span>Alertes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map container */
          <div className="flex-1">
            <MapboxMap
              zoom={zoom}
              center={center}
              onZoomChange={handleZoomChange}
              onCenterChange={handleCenterChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
