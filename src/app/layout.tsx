import type { Metadata } from "next"
import "./globals.css"
import { DnatuSidebar } from "@/components/dnatu-sidebar"

export const metadata: Metadata = {
  title: "DNATU – Observatoire National de l'Aménagement du Territoire",
  description:
    "Plateforme nationale de suivi-évaluation des projets d'aménagement du territoire et d'urbanisme de la République de Guinée.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <div className="flex h-screen overflow-hidden bg-slate-50">
          <DnatuSidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}
