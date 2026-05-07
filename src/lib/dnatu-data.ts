// ─── Types ─────────────────────────────────────────────────────────────────────

export type Region =
  | "Conakry" | "Boké" | "Kindia" | "Mamou"
  | "Labé" | "Faranah" | "Kankan" | "Nzérékoré"

export type ProjectType =
  | "Aménagement urbain"
  | "Schéma directeur"
  | "Plan local d'urbanisme"
  | "Habitat social"
  | "Voirie et réseaux divers"
  | "Lotissement"
  | "Restructuration urbaine"
  | "Zone économique"
  | "Infrastructure communautaire"
  | "Réforme foncière"
  | "Résilience climatique"
  | "SIG et cartographie"

export type ProjectStatus = "En cours" | "Planifié" | "En retard" | "Terminé" | "Suspendu"
export type Priority = "Haute" | "Moyenne" | "Faible"

export type FinancingSource =
  | "Budget national" | "Banque mondiale" | "BAD" | "PNUD"
  | "Union européenne" | "AFD" | "EXIM Bank Chine" | "BID" | "FADES" | "BOAD"

export interface Activity {
  id: string
  name: string
  startDate: string
  endDate: string
  progress: number
  status: ProjectStatus
  responsible: string
  budget: number
}

export interface Indicator {
  id: string
  name: string
  baseline: number
  target: number
  current: number
  unit: string
  lastUpdate: string
}

export interface Risk {
  id: string
  description: string
  probability: "Faible" | "Moyen" | "Élevé"
  impact: "Faible" | "Moyen" | "Élevé"
  mitigation: string
  status: "Actif" | "Atténué" | "Résolu"
}

export interface Project {
  id: string
  code: string
  name: string
  type: ProjectType
  status: ProjectStatus
  priority: Priority
  region: Region
  prefecture: string
  commune: string
  description: string
  startDate: string
  endDate: string
  physicalProgress: number
  financialProgress: number
  budgetTotal: number   // millions GNF
  disbursed: number
  financingSources: Array<{ source: FinancingSource; amount: number; percentage: number }>
  responsible: string
  contractor?: string
  coordinator: string
  coordinates: [number, number]  // [lat, lng]
  activities: Activity[]
  indicators: Indicator[]
  risks: Risk[]
  lastUpdate: string
}

// ─── Color Maps ─────────────────────────────────────────────────────────────────

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  "En cours":  "#3b82f6",
  "Planifié":  "#8b5cf6",
  "En retard": "#ef4444",
  "Terminé":   "#22c55e",
  "Suspendu":  "#6b7280",
}

export const REGION_COLORS: Record<Region, string> = {
  Conakry:   "#ef4444",
  Boké:      "#f97316",
  Kindia:    "#eab308",
  Mamou:     "#22c55e",
  Labé:      "#06b6d4",
  Faranah:   "#3b82f6",
  Kankan:    "#8b5cf6",
  Nzérékoré: "#ec4899",
}

export const PRIORITY_COLORS: Record<Priority, string> = {
  Haute:   "bg-red-100 text-red-700 border-red-200",
  Moyenne: "bg-amber-100 text-amber-700 border-amber-200",
  Faible:  "bg-green-100 text-green-700 border-green-200",
}

// ─── Projects ──────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "PROJ-001",
    code: "DNATU-2024-001",
    name: "Réhabilitation Centre-ville de Conakry",
    type: "Aménagement urbain",
    status: "En cours",
    priority: "Haute",
    region: "Conakry",
    prefecture: "Conakry",
    commune: "Kaloum",
    description:
      "Réhabilitation complète du centre-ville historique de Conakry : modernisation des infrastructures urbaines, aménagement des espaces publics et rénovation du patrimoine bâti.",
    startDate: "2024-01-15",
    endDate: "2026-06-30",
    physicalProgress: 75,
    financialProgress: 68,
    budgetTotal: 485000,
    disbursed: 329800,
    financingSources: [
      { source: "Budget national", amount: 145500, percentage: 30 },
      { source: "Banque mondiale", amount: 242500, percentage: 50 },
      { source: "AFD", amount: 97000, percentage: 20 },
    ],
    responsible: "Direction Aménagement Urbain",
    contractor: "GUICONST SARL",
    coordinator: "Mamadou Diallo",
    coordinates: [9.6412, -13.5784],
    activities: [
      { id: "A001-1", name: "Études préliminaires", startDate: "2024-01-15", endDate: "2024-04-30", progress: 100, status: "Terminé", responsible: "Bureau CEBAF", budget: 24250 },
      { id: "A001-2", name: "Travaux de voirie", startDate: "2024-05-01", endDate: "2025-12-31", progress: 80, status: "En cours", responsible: "GUICONST SARL", budget: 194000 },
      { id: "A001-3", name: "Aménagement espaces verts", startDate: "2025-01-01", endDate: "2026-03-31", progress: 40, status: "En cours", responsible: "Direction Env.", budget: 48500 },
      { id: "A001-4", name: "Éclairage public", startDate: "2025-06-01", endDate: "2026-06-30", progress: 15, status: "En cours", responsible: "EDG", budget: 97000 },
    ],
    indicators: [
      { id: "I001-1", name: "Km de voirie réhabilitée", baseline: 0, target: 45, current: 33.7, unit: "km", lastUpdate: "2026-04-30" },
      { id: "I001-2", name: "Espaces verts aménagés", baseline: 0, target: 12, current: 7, unit: "ha", lastUpdate: "2026-04-30" },
      { id: "I001-3", name: "Points d'éclairage installés", baseline: 120, target: 850, current: 520, unit: "pts", lastUpdate: "2026-04-30" },
    ],
    risks: [
      { id: "R001-1", description: "Retards liés à la saison des pluies", probability: "Élevé", impact: "Moyen", mitigation: "Planification hors saison des pluies", status: "Actif" },
      { id: "R001-2", description: "Surcoûts matériaux", probability: "Moyen", impact: "Élevé", mitigation: "Révision des prix semestrielle", status: "Atténué" },
    ],
    lastUpdate: "2026-05-05",
  },
  {
    id: "PROJ-002",
    code: "DNATU-2024-002",
    name: "Schéma Directeur de Labé 2025-2040",
    type: "Schéma directeur",
    status: "En cours",
    priority: "Haute",
    region: "Labé",
    prefecture: "Labé",
    commune: "Labé Centre",
    description: "Élaboration du schéma directeur d'aménagement et d'urbanisme de la préfecture de Labé pour la période 2025-2040.",
    startDate: "2024-03-01",
    endDate: "2025-12-31",
    physicalProgress: 62,
    financialProgress: 55,
    budgetTotal: 28500,
    disbursed: 15675,
    financingSources: [
      { source: "Budget national", amount: 17100, percentage: 60 },
      { source: "PNUD", amount: 11400, percentage: 40 },
    ],
    responsible: "Direction Urbanisme",
    coordinator: "Fatoumata Bah",
    coordinates: [11.3245, -12.2853],
    activities: [
      { id: "A002-1", name: "Diagnostic territorial", startDate: "2024-03-01", endDate: "2024-07-31", progress: 100, status: "Terminé", responsible: "Équipe SIG DNATU", budget: 5700 },
      { id: "A002-2", name: "Élaboration des scénarios", startDate: "2024-08-01", endDate: "2025-02-28", progress: 90, status: "En cours", responsible: "Consultants URBAPLAN", budget: 8550 },
      { id: "A002-3", name: "Consultation publique", startDate: "2025-03-01", endDate: "2025-06-30", progress: 30, status: "En cours", responsible: "Direction Communication", budget: 2850 },
      { id: "A002-4", name: "Finalisation et validation", startDate: "2025-07-01", endDate: "2025-12-31", progress: 0, status: "Planifié", responsible: "DNATU", budget: 5700 },
    ],
    indicators: [
      { id: "I002-1", name: "Zones planifiées couvertes", baseline: 0, target: 100, current: 62, unit: "%", lastUpdate: "2026-04-15" },
      { id: "I002-2", name: "Documents cartographiques produits", baseline: 0, target: 25, current: 17, unit: "cartes", lastUpdate: "2026-04-15" },
    ],
    risks: [
      { id: "R002-1", description: "Faible participation aux consultations", probability: "Moyen", impact: "Élevé", mitigation: "Campagne de sensibilisation préalable", status: "Actif" },
    ],
    lastUpdate: "2026-04-28",
  },
  {
    id: "PROJ-003",
    code: "DNATU-2023-003",
    name: "Lotissement Kaloum Nord Extension",
    type: "Lotissement",
    status: "En retard",
    priority: "Haute",
    region: "Conakry",
    prefecture: "Conakry",
    commune: "Kaloum",
    description: "Création de 1 200 parcelles résidentielles et commerciales dans la zone nord de Kaloum avec toutes les infrastructures primaires.",
    startDate: "2023-06-01",
    endDate: "2025-12-31",
    physicalProgress: 35,
    financialProgress: 42,
    budgetTotal: 162000,
    disbursed: 68040,
    financingSources: [
      { source: "Budget national", amount: 81000, percentage: 50 },
      { source: "BAD", amount: 81000, percentage: 50 },
    ],
    responsible: "Direction Aménagement",
    contractor: "SATEREC Guinée",
    coordinator: "Ibrahima Sory Diallo",
    coordinates: [9.675, -13.61],
    activities: [
      { id: "A003-1", name: "Levé topographique et bornage", startDate: "2023-06-01", endDate: "2023-10-31", progress: 100, status: "Terminé", responsible: "IGN Guinée", budget: 16200 },
      { id: "A003-2", name: "Travaux de viabilisation", startDate: "2023-11-01", endDate: "2025-09-30", progress: 30, status: "En retard", responsible: "SATEREC Guinée", budget: 113400 },
      { id: "A003-3", name: "Attribution des parcelles", startDate: "2025-10-01", endDate: "2025-12-31", progress: 0, status: "Planifié", responsible: "DNATU", budget: 8100 },
    ],
    indicators: [
      { id: "I003-1", name: "Parcelles délimitées", baseline: 0, target: 1200, current: 420, unit: "parcelles", lastUpdate: "2026-04-20" },
      { id: "I003-2", name: "Km de réseau viaire créé", baseline: 0, target: 28, current: 9.8, unit: "km", lastUpdate: "2026-04-20" },
    ],
    risks: [
      { id: "R003-1", description: "Conflits fonciers avec occupants informels", probability: "Élevé", impact: "Élevé", mitigation: "Médiation communautaire et indemnisation", status: "Actif" },
      { id: "R003-2", description: "Retards décaissements BAD", probability: "Élevé", impact: "Élevé", mitigation: "Renforcement gestion financière", status: "Actif" },
    ],
    lastUpdate: "2026-04-25",
  },
  {
    id: "PROJ-004",
    code: "DNATU-2023-004",
    name: "Zone Industrielle de Boké – Phase 2",
    type: "Zone économique",
    status: "En cours",
    priority: "Haute",
    region: "Boké",
    prefecture: "Boké",
    commune: "Boké Centre",
    description: "Développement de la phase 2 de la zone industrielle de Boké sur 450 ha, dédiée à la transformation de la bauxite.",
    startDate: "2023-03-15",
    endDate: "2026-03-31",
    physicalProgress: 89,
    financialProgress: 85,
    budgetTotal: 728000,
    disbursed: 618800,
    financingSources: [
      { source: "Budget national", amount: 145600, percentage: 20 },
      { source: "EXIM Bank Chine", amount: 436800, percentage: 60 },
      { source: "BAD", amount: 145600, percentage: 20 },
    ],
    responsible: "Direction Zones Économiques",
    contractor: "CCECC Guinée",
    coordinator: "Aissatou Barry",
    coordinates: [10.9348, -14.297],
    activities: [
      { id: "A004-1", name: "Infrastructure routière interne", startDate: "2023-03-15", endDate: "2024-12-31", progress: 100, status: "Terminé", responsible: "CCECC", budget: 218400 },
      { id: "A004-2", name: "Réseau électrique HTA/BTA", startDate: "2023-06-01", endDate: "2025-06-30", progress: 95, status: "En cours", responsible: "EDG + CCECC", budget: 218400 },
      { id: "A004-3", name: "Station de traitement des eaux", startDate: "2024-01-01", endDate: "2026-01-31", progress: 70, status: "En cours", responsible: "SEG", budget: 145600 },
    ],
    indicators: [
      { id: "I004-1", name: "Hectares viabilisés", baseline: 0, target: 450, current: 400, unit: "ha", lastUpdate: "2026-05-01" },
      { id: "I004-2", name: "Emplois directs créés", baseline: 0, target: 2500, current: 1850, unit: "emplois", lastUpdate: "2026-05-01" },
    ],
    risks: [
      { id: "R004-1", description: "Impact environnemental zones humides", probability: "Moyen", impact: "Élevé", mitigation: "Plan de gestion environnementale strict", status: "Atténué" },
    ],
    lastUpdate: "2026-05-02",
  },
  {
    id: "PROJ-005",
    code: "DNATU-2024-005",
    name: "Programme Habitat Social – Kindia",
    type: "Habitat social",
    status: "En cours",
    priority: "Moyenne",
    region: "Kindia",
    prefecture: "Kindia",
    commune: "Kindia Centre",
    description: "Construction de 500 logements sociaux à Kindia pour les ménages à revenus modestes, avec eau, électricité et assainissement.",
    startDate: "2024-04-01",
    endDate: "2026-09-30",
    physicalProgress: 52,
    financialProgress: 48,
    budgetTotal: 245000,
    disbursed: 117600,
    financingSources: [
      { source: "Budget national", amount: 73500, percentage: 30 },
      { source: "BID", amount: 122500, percentage: 50 },
      { source: "BOAD", amount: 49000, percentage: 20 },
    ],
    responsible: "Direction Habitat",
    contractor: "BATIGUINÉE SARL",
    coordinator: "Oumar Touré",
    coordinates: [10.0658, -12.8556],
    activities: [
      { id: "A005-1", name: "Fondations", startDate: "2024-04-01", endDate: "2024-09-30", progress: 100, status: "Terminé", responsible: "BATIGUINÉE", budget: 73500 },
      { id: "A005-2", name: "Gros œuvre", startDate: "2024-10-01", endDate: "2025-12-31", progress: 65, status: "En cours", responsible: "BATIGUINÉE", budget: 98000 },
      { id: "A005-3", name: "Second œuvre et finitions", startDate: "2026-01-01", endDate: "2026-09-30", progress: 5, status: "En cours", responsible: "BATIGUINÉE", budget: 49000 },
    ],
    indicators: [
      { id: "I005-1", name: "Logements construits", baseline: 0, target: 500, current: 178, unit: "logts", lastUpdate: "2026-04-25" },
      { id: "I005-2", name: "Ménages bénéficiaires identifiés", baseline: 0, target: 500, current: 487, unit: "ménages", lastUpdate: "2026-04-25" },
    ],
    risks: [
      { id: "R005-1", description: "Qualité insuffisante matériaux", probability: "Faible", impact: "Élevé", mitigation: "Contrôle qualité par laboratoire indépendant", status: "Atténué" },
    ],
    lastUpdate: "2026-04-28",
  },
  {
    id: "PROJ-006",
    code: "DNATU-2023-006",
    name: "Voirie et Drainage Conakry-Est (Matoto/Ratoma)",
    type: "Voirie et réseaux divers",
    status: "En retard",
    priority: "Haute",
    region: "Conakry",
    prefecture: "Conakry",
    commune: "Matoto",
    description: "Réhabilitation et extension du réseau de voirie et de drainage dans les communes de Matoto et Ratoma : 75 km de voies bitumées et 120 km de caniveaux.",
    startDate: "2023-09-01",
    endDate: "2026-03-31",
    physicalProgress: 38,
    financialProgress: 44,
    budgetTotal: 385000,
    disbursed: 169400,
    financingSources: [
      { source: "Banque mondiale", amount: 231000, percentage: 60 },
      { source: "Budget national", amount: 115500, percentage: 30 },
      { source: "AFD", amount: 38500, percentage: 10 },
    ],
    responsible: "Direction VRD",
    contractor: "AFRICA ROAD BUILDERS",
    coordinator: "Mariama Diallo",
    coordinates: [9.5667, -13.5],
    activities: [
      { id: "A006-1", name: "Études techniques et AO", startDate: "2023-09-01", endDate: "2024-02-28", progress: 100, status: "Terminé", responsible: "BCEOM Afrique", budget: 38500 },
      { id: "A006-2", name: "Travaux de voirie principale", startDate: "2024-03-01", endDate: "2025-12-31", progress: 35, status: "En retard", responsible: "AFRICA ROAD BUILDERS", budget: 231000 },
      { id: "A006-3", name: "Réseau de drainage", startDate: "2024-06-01", endDate: "2026-02-28", progress: 20, status: "En retard", responsible: "AFRICA ROAD BUILDERS", budget: 96250 },
    ],
    indicators: [
      { id: "I006-1", name: "Km de voirie réhabilitée", baseline: 12, target: 75, current: 28.5, unit: "km", lastUpdate: "2026-04-22" },
      { id: "I006-2", name: "Km de caniveaux construits", baseline: 8, target: 120, current: 23.6, unit: "km", lastUpdate: "2026-04-22" },
    ],
    risks: [
      { id: "R006-1", description: "Capacité insuffisante entreprise principale", probability: "Élevé", impact: "Élevé", mitigation: "Mise en demeure et sous-traitance renforcée", status: "Actif" },
    ],
    lastUpdate: "2026-04-20",
  },
  {
    id: "PROJ-007",
    code: "DNATU-2025-007",
    name: "Plan Local d'Urbanisme (PLU) de Kankan",
    type: "Plan local d'urbanisme",
    status: "Planifié",
    priority: "Moyenne",
    region: "Kankan",
    prefecture: "Kankan",
    commune: "Kankan Centre",
    description: "Élaboration du premier PLU de la ville de Kankan, réglementant l'usage des sols à l'horizon 2040.",
    startDate: "2025-07-01",
    endDate: "2027-06-30",
    physicalProgress: 8,
    financialProgress: 5,
    budgetTotal: 18500,
    disbursed: 925,
    financingSources: [
      { source: "Budget national", amount: 11100, percentage: 60 },
      { source: "Union européenne", amount: 7400, percentage: 40 },
    ],
    responsible: "Direction Urbanisme",
    coordinator: "Bakary Kouyaté",
    coordinates: [10.3833, -9.3061],
    activities: [
      { id: "A007-1", name: "Diagnostic urbain", startDate: "2025-07-01", endDate: "2025-12-31", progress: 15, status: "En cours", responsible: "Équipe DNATU", budget: 2775 },
      { id: "A007-2", name: "Élaboration du zonage", startDate: "2026-01-01", endDate: "2026-09-30", progress: 0, status: "Planifié", responsible: "Bureau d'études", budget: 7400 },
    ],
    indicators: [
      { id: "I007-1", name: "Secteurs d'étude couverts", baseline: 0, target: 12, current: 1, unit: "secteurs", lastUpdate: "2026-04-10" },
    ],
    risks: [
      { id: "R007-1", description: "Insuffisance de données cartographiques récentes", probability: "Moyen", impact: "Moyen", mitigation: "Mission collecte données + imagerie satellite", status: "Actif" },
    ],
    lastUpdate: "2026-04-10",
  },
  {
    id: "PROJ-008",
    code: "DNATU-2024-008",
    name: "Restructuration Urbaine Nzérékoré-Centre",
    type: "Restructuration urbaine",
    status: "En cours",
    priority: "Moyenne",
    region: "Nzérékoré",
    prefecture: "Nzérékoré",
    commune: "Nzérékoré Centre",
    description: "Restructuration des quartiers informels du centre de Nzérékoré : régularisation foncière, mise à niveau des infrastructures et amélioration du cadre de vie.",
    startDate: "2024-02-01",
    endDate: "2027-01-31",
    physicalProgress: 48,
    financialProgress: 42,
    budgetTotal: 195000,
    disbursed: 81900,
    financingSources: [
      { source: "Budget national", amount: 58500, percentage: 30 },
      { source: "Banque mondiale", amount: 97500, percentage: 50 },
      { source: "PNUD", amount: 39000, percentage: 20 },
    ],
    responsible: "Direction Urbanisme",
    coordinator: "Koïvogui Zézé",
    coordinates: [7.75, -8.8167],
    activities: [
      { id: "A008-1", name: "Recensement et cartographie", startDate: "2024-02-01", endDate: "2024-07-31", progress: 100, status: "Terminé", responsible: "Équipe SIG", budget: 19500 },
      { id: "A008-2", name: "Régularisation foncière", startDate: "2024-08-01", endDate: "2026-07-31", progress: 40, status: "En cours", responsible: "Direction Foncier", budget: 78000 },
    ],
    indicators: [
      { id: "I008-1", name: "Ménages régularisés", baseline: 0, target: 3500, current: 1260, unit: "ménages", lastUpdate: "2026-04-18" },
    ],
    risks: [
      { id: "R008-1", description: "Résistance aux déplacements", probability: "Élevé", impact: "Élevé", mitigation: "Plan de compensation et relogement", status: "Actif" },
    ],
    lastUpdate: "2026-04-18",
  },
  {
    id: "PROJ-009",
    code: "DNATU-2023-009",
    name: "Système d'Information Géographique National (SIG-NAT)",
    type: "SIG et cartographie",
    status: "En cours",
    priority: "Haute",
    region: "Conakry",
    prefecture: "Conakry",
    commune: "Dixinn",
    description: "Mise en place d'un SIG national intégré couvrant l'ensemble du territoire guinéen, avec base de données foncière et territoriale centralisée.",
    startDate: "2023-01-15",
    endDate: "2025-12-31",
    physicalProgress: 78,
    financialProgress: 72,
    budgetTotal: 45000,
    disbursed: 32400,
    financingSources: [
      { source: "Budget national", amount: 13500, percentage: 30 },
      { source: "Union européenne", amount: 22500, percentage: 50 },
      { source: "PNUD", amount: 9000, percentage: 20 },
    ],
    responsible: "Direction SIG",
    coordinator: "Dr. Mamadou Bah",
    coordinates: [9.537, -13.6773],
    activities: [
      { id: "A009-1", name: "Infrastructure informatique centrale", startDate: "2023-01-15", endDate: "2023-12-31", progress: 100, status: "Terminé", responsible: "DNATU-DSI", budget: 13500 },
      { id: "A009-2", name: "Collecte et intégration des données", startDate: "2024-01-01", endDate: "2025-09-30", progress: 75, status: "En cours", responsible: "Équipe SIG", budget: 22500 },
    ],
    indicators: [
      { id: "I009-1", name: "Couches SIG créées", baseline: 0, target: 120, current: 94, unit: "couches", lastUpdate: "2026-04-30" },
      { id: "I009-2", name: "Préfectures cartographiées", baseline: 0, target: 33, current: 28, unit: "préfectures", lastUpdate: "2026-04-30" },
    ],
    risks: [
      { id: "R009-1", description: "Obsolescence rapide des données", probability: "Moyen", impact: "Moyen", mitigation: "Protocole de mise à jour semestrielle", status: "Atténué" },
    ],
    lastUpdate: "2026-05-01",
  },
  {
    id: "PROJ-010",
    code: "DNATU-2025-010",
    name: "Programme Résilience Climatique Zones Côtières",
    type: "Résilience climatique",
    status: "Planifié",
    priority: "Haute",
    region: "Conakry",
    prefecture: "Conakry",
    commune: "Ratoma",
    description: "Adaptation climatique des zones côtières vulnérables de Conakry face à la montée des eaux et à l'érosion côtière.",
    startDate: "2025-10-01",
    endDate: "2028-09-30",
    physicalProgress: 5,
    financialProgress: 2,
    budgetTotal: 320000,
    disbursed: 6400,
    financingSources: [
      { source: "Budget national", amount: 64000, percentage: 20 },
      { source: "Banque mondiale", amount: 192000, percentage: 60 },
      { source: "PNUD", amount: 64000, percentage: 20 },
    ],
    responsible: "Direction Environnement",
    coordinator: "Nene Kourouma",
    coordinates: [9.66, -13.64],
    activities: [
      { id: "A010-1", name: "Étude de vulnérabilité côtière", startDate: "2025-10-01", endDate: "2026-06-30", progress: 10, status: "En cours", responsible: "BRGM + DNATU", budget: 32000 },
    ],
    indicators: [
      { id: "I010-1", name: "Km de côtes protégées", baseline: 0, target: 35, current: 0, unit: "km", lastUpdate: "2026-04-15" },
    ],
    risks: [
      { id: "R010-1", description: "Accélération effets changement climatique", probability: "Élevé", impact: "Élevé", mitigation: "Solutions d'adaptation modulaires", status: "Actif" },
    ],
    lastUpdate: "2026-04-15",
  },
  {
    id: "PROJ-011",
    code: "DNATU-2023-011",
    name: "Réforme Foncière Nationale – Phase 1",
    type: "Réforme foncière",
    status: "En cours",
    priority: "Haute",
    region: "Conakry",
    prefecture: "Conakry",
    commune: "Dixinn",
    description: "Modernisation du cadre juridique et institutionnel de la gestion foncière en Guinée.",
    startDate: "2023-04-01",
    endDate: "2026-03-31",
    physicalProgress: 55,
    financialProgress: 50,
    budgetTotal: 38500,
    disbursed: 19250,
    financingSources: [
      { source: "Budget national", amount: 11550, percentage: 30 },
      { source: "Banque mondiale", amount: 19250, percentage: 50 },
      { source: "Union européenne", amount: 7700, percentage: 20 },
    ],
    responsible: "Direction Foncier",
    coordinator: "Sory Condé",
    coordinates: [9.545, -13.662],
    activities: [
      { id: "A011-1", name: "Révision du code foncier", startDate: "2023-04-01", endDate: "2024-06-30", progress: 100, status: "Terminé", responsible: "Min. Justice + DNATU", budget: 7700 },
      { id: "A011-2", name: "Numérisation des titres fonciers", startDate: "2024-01-01", endDate: "2025-12-31", progress: 60, status: "En cours", responsible: "DNATU-DSI", budget: 15400 },
    ],
    indicators: [
      { id: "I011-1", name: "Titres fonciers numérisés", baseline: 0, target: 45000, current: 27000, unit: "titres", lastUpdate: "2026-04-28" },
    ],
    risks: [
      { id: "R011-1", description: "Résistance institutionnelle au changement", probability: "Moyen", impact: "Élevé", mitigation: "Accompagnement et formation des agents", status: "Actif" },
    ],
    lastUpdate: "2026-04-28",
  },
  {
    id: "PROJ-012",
    code: "DNATU-2022-012",
    name: "Infrastructures Communautaires Mamou-Pita",
    type: "Infrastructure communautaire",
    status: "Terminé",
    priority: "Moyenne",
    region: "Mamou",
    prefecture: "Mamou",
    commune: "Mamou Centre",
    description: "Construction de marchés, espaces sportifs et centres de santé communautaires dans 15 quartiers de Mamou et Pita.",
    startDate: "2022-09-01",
    endDate: "2025-08-31",
    physicalProgress: 100,
    financialProgress: 98,
    budgetTotal: 85000,
    disbursed: 83300,
    financingSources: [
      { source: "Budget national", amount: 25500, percentage: 30 },
      { source: "FADES", amount: 59500, percentage: 70 },
    ],
    responsible: "Direction Habitat",
    contractor: "MAMOU-CONSTRUC",
    coordinator: "Alpha Condé Barry",
    coordinates: [10.3667, -12.0834],
    activities: [
      { id: "A012-1", name: "Marchés (5 sites)", startDate: "2022-09-01", endDate: "2024-02-28", progress: 100, status: "Terminé", responsible: "MAMOU-CONSTRUC", budget: 25500 },
      { id: "A012-2", name: "Espaces sportifs (10 terrains)", startDate: "2023-01-01", endDate: "2024-08-31", progress: 100, status: "Terminé", responsible: "MAMOU-CONSTRUC", budget: 17000 },
      { id: "A012-3", name: "Centres de santé (3 sites)", startDate: "2023-06-01", endDate: "2025-08-31", progress: 100, status: "Terminé", responsible: "MAMOU-CONSTRUC", budget: 34000 },
    ],
    indicators: [
      { id: "I012-1", name: "Infrastructures construites", baseline: 0, target: 18, current: 18, unit: "sites", lastUpdate: "2025-08-30" },
      { id: "I012-2", name: "Bénéficiaires directs", baseline: 0, target: 85000, current: 92500, unit: "pers.", lastUpdate: "2025-08-30" },
    ],
    risks: [],
    lastUpdate: "2025-08-31",
  },
  {
    id: "PROJ-013",
    code: "DNATU-2024-013",
    name: "Schéma Directeur de Faranah 2025-2035",
    type: "Schéma directeur",
    status: "Planifié",
    priority: "Faible",
    region: "Faranah",
    prefecture: "Faranah",
    commune: "Faranah Centre",
    description: "Élaboration du schéma directeur d'aménagement de la préfecture de Faranah pour la période 2025-2035.",
    startDate: "2025-09-01",
    endDate: "2027-08-31",
    physicalProgress: 3,
    financialProgress: 1,
    budgetTotal: 22000,
    disbursed: 220,
    financingSources: [
      { source: "Budget national", amount: 13200, percentage: 60 },
      { source: "AFD", amount: 8800, percentage: 40 },
    ],
    responsible: "Direction Urbanisme",
    coordinator: "Lansana Camara",
    coordinates: [10.0333, -10.7333],
    activities: [
      { id: "A013-1", name: "Phase de préparation", startDate: "2025-09-01", endDate: "2025-12-31", progress: 5, status: "En cours", responsible: "DNATU", budget: 2200 },
    ],
    indicators: [
      { id: "I013-1", name: "Avancement global", baseline: 0, target: 100, current: 3, unit: "%", lastUpdate: "2026-04-01" },
    ],
    risks: [],
    lastUpdate: "2026-04-01",
  },
  {
    id: "PROJ-014",
    code: "DNATU-2022-014",
    name: "Réhabilitation Grand Marché Madina – Conakry",
    type: "Aménagement urbain",
    status: "Terminé",
    priority: "Moyenne",
    region: "Conakry",
    prefecture: "Conakry",
    commune: "Matoto",
    description: "Réhabilitation complète du grand marché de Madina avec modernisation des infrastructures commerciales, sanitaires et de sécurité.",
    startDate: "2022-03-01",
    endDate: "2024-12-31",
    physicalProgress: 100,
    financialProgress: 100,
    budgetTotal: 68000,
    disbursed: 68000,
    financingSources: [
      { source: "Budget national", amount: 27200, percentage: 40 },
      { source: "BAD", amount: 40800, percentage: 60 },
    ],
    responsible: "Direction Aménagement Urbain",
    contractor: "GUITER BTP",
    coordinator: "Kadiatou Sylla",
    coordinates: [9.55, -13.52],
    activities: [],
    indicators: [
      { id: "I014-1", name: "Boutiques réhabilitées", baseline: 450, target: 2800, current: 2800, unit: "boutiques", lastUpdate: "2024-12-30" },
    ],
    risks: [],
    lastUpdate: "2024-12-31",
  },
  {
    id: "PROJ-015",
    code: "DNATU-2024-015",
    name: "Lotissement Ratoma Extension Nord",
    type: "Lotissement",
    status: "En cours",
    priority: "Haute",
    region: "Conakry",
    prefecture: "Conakry",
    commune: "Ratoma",
    description: "Création de 850 parcelles résidentielles dans la zone nord de Ratoma avec toutes les infrastructures primaires.",
    startDate: "2024-06-01",
    endDate: "2026-12-31",
    physicalProgress: 42,
    financialProgress: 38,
    budgetTotal: 128000,
    disbursed: 48640,
    financingSources: [
      { source: "Budget national", amount: 64000, percentage: 50 },
      { source: "BAD", amount: 64000, percentage: 50 },
    ],
    responsible: "Direction Aménagement",
    contractor: "RATOMA CONSTRUC",
    coordinator: "Thierno Diallo",
    coordinates: [9.598, -13.618],
    activities: [
      { id: "A015-1", name: "Bornage et délimitation", startDate: "2024-06-01", endDate: "2024-10-31", progress: 100, status: "Terminé", responsible: "IGN Guinée", budget: 12800 },
      { id: "A015-2", name: "Travaux primaires", startDate: "2024-11-01", endDate: "2026-06-30", progress: 38, status: "En cours", responsible: "RATOMA CONSTRUC", budget: 89600 },
    ],
    indicators: [
      { id: "I015-1", name: "Parcelles délimitées", baseline: 0, target: 850, current: 357, unit: "parcelles", lastUpdate: "2026-04-25" },
    ],
    risks: [
      { id: "R015-1", description: "Litige foncier en périphérie", probability: "Moyen", impact: "Moyen", mitigation: "Médiation avec les chefferies locales", status: "Actif" },
    ],
    lastUpdate: "2026-04-25",
  },
]

// ─── Derived Data ───────────────────────────────────────────────────────────────

export function getProjectsByStatus() {
  const m: Record<string, number> = {}
  projects.forEach((p) => { m[p.status] = (m[p.status] || 0) + 1 })
  return Object.entries(m).map(([status, count]) => ({ status, count }))
}

export function getProjectsByRegion() {
  const m: Record<string, number> = {}
  projects.forEach((p) => { m[p.region] = (m[p.region] || 0) + 1 })
  return Object.entries(m).map(([region, count]) => ({ region, count }))
}

export function getRegionalProgress() {
  const m: Record<string, { ph: number; fi: number; n: number }> = {}
  projects.forEach((p) => {
    if (!m[p.region]) m[p.region] = { ph: 0, fi: 0, n: 0 }
    m[p.region].ph += p.physicalProgress
    m[p.region].fi += p.financialProgress
    m[p.region].n++
  })
  return Object.entries(m).map(([region, d]) => ({
    region,
    physique: Math.round(d.ph / d.n),
    financier: Math.round(d.fi / d.n),
    projets: d.n,
  }))
}

export const getAveragePhysicalProgress = () =>
  Math.round(projects.reduce((s, p) => s + p.physicalProgress, 0) / projects.length)

export const getAverageFinancialProgress = () =>
  Math.round(projects.reduce((s, p) => s + p.financialProgress, 0) / projects.length)

export const getTotalBudget = () => projects.reduce((s, p) => s + p.budgetTotal, 0)
export const getTotalDisbursed = () => projects.reduce((s, p) => s + p.disbursed, 0)
export const getProjectsInDelay = () => projects.filter((p) => p.status === "En retard").length

export const monthlyProgress = [
  { month: "Jan", physique: 48, financier: 42 },
  { month: "Fév", physique: 52, financier: 47 },
  { month: "Mar", physique: 55, financier: 50 },
  { month: "Avr", physique: 58, financier: 53 },
  { month: "Mai", physique: 61, financier: 56 },
]

// ─── Notifications ──────────────────────────────────────────────────────────────

export const notifications = [
  { id: 1, type: "alert",    level: "critical", title: "Retard critique – Lotissement Kaloum Nord",            message: "DNATU-2023-003 accuse un retard de 45 jours sur le calendrier.",           date: "2026-05-07T08:30:00", read: false, projectId: "PROJ-003" },
  { id: 2, type: "budget",   level: "warning",  title: "Dépassement budgétaire risqué – Voirie Conakry-Est",   message: "Décaissement (44%) > exécution physique (38%). Risque de déficit.",       date: "2026-05-06T14:15:00", read: false, projectId: "PROJ-006" },
  { id: 3, type: "mission",  level: "info",     title: "Mission terrain programmée – Nzérékoré",               message: "Mission de contrôle chantier prévue le 10/05/2026.",                     date: "2026-05-06T09:00:00", read: false, projectId: "PROJ-008" },
  { id: 4, type: "report",   level: "info",     title: "Rapport mensuel d'avril disponible",                   message: "Le rapport mensuel avril 2026 est prêt pour validation.",               date: "2026-05-05T16:30:00", read: true,  projectId: null },
  { id: 5, type: "alert",    level: "warning",  title: "Indicateur sous la cible – SIG National",              message: "Taux couverture préfectures en dessous de la cible mensuelle.",          date: "2026-05-05T11:00:00", read: true,  projectId: "PROJ-009" },
  { id: 6, type: "approval", level: "info",     title: "Document en attente de validation",                    message: "Rapport Q1 2026 du projet Labé attend votre signature.",                 date: "2026-05-04T15:45:00", read: true,  projectId: "PROJ-002" },
  { id: 7, type: "milestone",level: "success",  title: "Jalon atteint – Zone Industrielle Boké",               message: "Réseau routier interne Phase 1 achevé à 100%.",                         date: "2026-05-03T10:30:00", read: true,  projectId: "PROJ-004" },
  { id: 8, type: "alert",    level: "critical", title: "Conflit foncier signalé – Kaloum Nord",                message: "Signalement conflit foncier dans la zone B du lotissement.",            date: "2026-05-02T08:00:00", read: true,  projectId: "PROJ-003" },
]

// ─── Workflow ───────────────────────────────────────────────────────────────────

export const workflowItems = [
  { id: "WF-001", type: "Rapport",  title: "Rapport mensuel avril 2026 – PROJ-001",              submittedBy: "Mamadou Diallo",   submittedDate: "2026-05-05", status: "En attente",  priority: "Haute",   daysWaiting: 2 },
  { id: "WF-002", type: "Contrat",  title: "Avenant n°2 – AFRICA ROAD BUILDERS (PROJ-006)",      submittedBy: "Mariama Diallo",   submittedDate: "2026-05-03", status: "En révision", priority: "Haute",   daysWaiting: 4 },
  { id: "WF-003", type: "Mission",  title: "Ordre de mission terrain – Nzérékoré mai 2026",      submittedBy: "Koïvogui Zézé",   submittedDate: "2026-05-06", status: "En attente",  priority: "Moyenne", daysWaiting: 1 },
  { id: "WF-004", type: "Budget",   title: "Demande de réallocation budgétaire PROJ-005",         submittedBy: "Oumar Touré",     submittedDate: "2026-04-28", status: "En révision", priority: "Haute",   daysWaiting: 9 },
  { id: "WF-005", type: "Rapport",  title: "Rapport trimestriel Q1 2026 – PROJ-002",              submittedBy: "Fatoumata Bah",   submittedDate: "2026-04-30", status: "Approuvé",    priority: "Moyenne", daysWaiting: 0 },
]

// ─── Terrain missions ───────────────────────────────────────────────────────────

export const terrainMissions = [
  { id: "MISS-001", title: "Contrôle chantier Voirie Conakry-Est",       projectId: "PROJ-006", project: "Voirie et Drainage Conakry-Est",        date: "2026-05-10", status: "Planifiée",  responsible: "Ingénieur Control",   region: "Conakry",    checklist: ["Inspection qualité béton", "Vérification alignements", "Contrôle compactage", "Inspection drainage", "Sécurité chantier"] },
  { id: "MISS-002", title: "Suivi avancement Lotissement Kaloum",        projectId: "PROJ-003", project: "Lotissement Kaloum Nord Extension",      date: "2026-05-08", status: "En cours",   responsible: "Chef projet",          region: "Conakry",    checklist: ["Bornage périphérique", "Voirie interne", "Réseaux primaires", "Signalisation"] },
  { id: "MISS-003", title: "Évaluation mi-parcours Habitat Kindia",      projectId: "PROJ-005", project: "Programme Habitat Social Kindia",        date: "2026-05-15", status: "Planifiée",  responsible: "Évaluateur externe",   region: "Kindia",     checklist: ["Avancement gros œuvre", "Qualité matériaux", "Conformité plans", "Sécurité travaux"] },
  { id: "MISS-004", title: "Mission SIG – Collecte données Kankan",      projectId: "PROJ-009", project: "SIG National",                          date: "2026-05-20", status: "Planifiée",  responsible: "Expert SIG",           region: "Kankan",     checklist: ["Prise de points GPS", "Photos terrain", "Validation couches", "Entretiens administrations"] },
  { id: "MISS-005", title: "Inspection Zone Industrielle Boké",          projectId: "PROJ-004", project: "Zone Industrielle de Boké",             date: "2026-04-25", status: "Terminée",   responsible: "Superviseur BTP",      region: "Boké",       checklist: ["Réseau routier", "Alimentation électrique", "Station eau", "Clôture périmétrale"] },
]

// ─── KPI Indicators ─────────────────────────────────────────────────────────────

export const kpiIndicators = [
  { id: "KPI-001", name: "Taux d'exécution physique moyen",     category: "Performance",  baseline: 0,  target: 75,    current: 55,    unit: "%",          trend: "up",     periodicity: "Mensuel" },
  { id: "KPI-002", name: "Taux d'exécution financière moyen",   category: "Finance",      baseline: 0,  target: 70,    current: 51,    unit: "%",          trend: "up",     periodicity: "Mensuel" },
  { id: "KPI-003", name: "Projets respectant les délais",       category: "Performance",  baseline: 0,  target: 80,    current: 60,    unit: "%",          trend: "down",   periodicity: "Trimestriel" },
  { id: "KPI-004", name: "Taux de décaissement annuel",         category: "Finance",      baseline: 0,  target: 85,    current: 58,    unit: "%",          trend: "up",     periodicity: "Annuel" },
  { id: "KPI-005", name: "Superficie couverte par SDA",         category: "Territorial",  baseline: 15, target: 60,    current: 32,    unit: "%",          trend: "up",     periodicity: "Annuel" },
  { id: "KPI-006", name: "Logements sociaux livrés",            category: "Habitat",      baseline: 0,  target: 1000,  current: 178,   unit: "logements",  trend: "up",     periodicity: "Annuel" },
  { id: "KPI-007", name: "Emplois créés par les projets",       category: "Impact",       baseline: 0,  target: 5000,  current: 3420,  unit: "emplois",    trend: "up",     periodicity: "Annuel" },
  { id: "KPI-008", name: "Bailleurs partenaires mobilisés",     category: "Partenariat",  baseline: 0,  target: 12,    current: 9,     unit: "partenaires",trend: "stable", periodicity: "Annuel" },
]
