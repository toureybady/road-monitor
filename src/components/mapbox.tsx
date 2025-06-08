import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"

// Ensure Mapbox GL JS is loaded
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

interface MapboxMapProps {
  zoom: number
  center: [number, number]
  onZoomChange: (zoom: number) => void
  onCenterChange: (center: [number, number]) => void
}

export function MapboxMap({
  zoom,
  center,
  onZoomChange,
  onCenterChange,
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current) return // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center,
      zoom,
    })

    // Add navigation control
    const nav = new mapboxgl.NavigationControl()
    map.current.addControl(nav, "top-right")

    // Add scale control
    const scale = new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: "metric",
    })
    map.current.addControl(scale, "bottom-left")

    // Add geolocate control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
    map.current.addControl(geolocate, "top-right")

    // Add fullscreen control
    const fullscreen = new mapboxgl.FullscreenControl()
    map.current.addControl(fullscreen, "top-right")

    // Add custom layers
    map.current.on("load", () => {
      // Add routes layer
      map.current.addLayer({
        id: "routes",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        },
        paint: {
          "line-color": "#3498db",
          "line-width": 2,
        },
      })

      // Add projects layer
      map.current.addLayer({
        id: "projects",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        },
        paint: {
          "circle-color": "#2ecc71",
          "circle-radius": 8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      })

      // Add alerts layer
      map.current.addLayer({
        id: "alerts",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        },
        paint: {
          "circle-color": "#e74c3c",
          "circle-radius": 6,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      })
    })

    // Handle map events
    map.current.on("zoom", () => {
      onZoomChange(map.current!.getZoom())
    })

    map.current.on("move", () => {
      onCenterChange(map.current!.getCenter().toArray())
    })

    return () => map.current?.remove()
  }, [])

  useEffect(() => {
    if (!map.current) return

    map.current.setZoom(zoom)
    map.current.setCenter(center)
  }, [zoom, center])

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
}
