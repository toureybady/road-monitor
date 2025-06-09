import { useEffect } from "react"
import mapboxgl from "mapbox-gl"

interface MapboxInterfaceProps {
  selectedProject: string
  selectedDate: string
  mapType: string
  layers: Array<{ id: string; name: string; icon: any; enabled: boolean }>
  opacity: number[]
  onMapLoad: () => void
  onMapError: (error: string) => void
}

export function MapboxInterface({
  selectedProject,
  selectedDate,
  mapType,
  layers,
  opacity,
  onMapLoad,
  onMapError,
}: MapboxInterfaceProps) {
  useEffect(() => {
    if (!mapboxgl.accessToken) {
      onMapError("Mapbox access token not set")
      return
    }

    try {
      const map = new mapboxgl.Map({
        container: "map",
        style: `mapbox://styles/mapbox/${mapType}-v12`,
        center: [-122.4194, 37.7749],
        zoom: 10,
      })

      map.on("load", () => {
        onMapLoad()
      })

      return () => map.remove()
    } catch (error) {
      onMapError("Failed to initialize map")
    }
  }, [selectedProject, selectedDate, mapType, layers, opacity, onMapLoad, onMapError])

  return <div id="map" className="h-full w-full rounded-lg" />
}
