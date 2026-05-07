"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { projects, STATUS_COLORS } from "@/lib/dnatu-data"

export default function GuineaMap() {
  // Fix Leaflet icon issue in Next.js
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const L = require("leaflet")
    delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    })
  }, [])

  return (
    <MapContainer
      center={[10.5, -11.5]}
      zoom={7}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      />

      {projects.map((p) => (
        <CircleMarker
          key={p.id}
          center={[p.coordinates[0], p.coordinates[1]]}
          radius={10}
          pathOptions={{
            color: "#fff",
            weight: 2,
            fillColor: STATUS_COLORS[p.status],
            fillOpacity: 0.85,
          }}
        >
          <Popup>
            <div className="p-1 min-w-[200px]">
              <p className="font-bold text-[#0f2c4a] text-sm leading-snug">{p.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{p.code}</p>
              <hr className="my-2" />
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Statut</span>
                  <span
                    className="font-semibold"
                    style={{ color: STATUS_COLORS[p.status] }}
                  >
                    {p.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Région</span>
                  <span className="font-medium">{p.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Avancement</span>
                  <span className="font-medium">{p.physicalProgress}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Budget</span>
                  <span className="font-medium">{(p.budgetTotal / 1000).toFixed(0)} Mrd GNF</span>
                </div>
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
