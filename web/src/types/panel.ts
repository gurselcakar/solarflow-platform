export interface SolarPanelReading {
  id: string
  panelId: string
  buildingId: string
  manufacturer: string
  model: string
  maxCapacityW: number
  currentOutputW: number
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'BROKEN'
  installDate: string
  lastMaintenance?: string
  temperature?: number
  efficiency?: number
  totalEnergyGenerated: number
  timestamp: string
}

export interface BuildingSolarData {
  buildingId: string
  buildingName: string
  totalPanels: number
  activePanels: number
  totalCapacityW: number
  currentOutputW: number
  panels: SolarPanelReading[]
}