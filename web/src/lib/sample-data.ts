import { EnergyDataPoint, TenantContract, TenantTariff } from "@/types/energy"
import { BuildingSolarData, SolarPanelReading } from "@/types/panel"

export const SAMPLE_TENANT_CONTRACTS: TenantContract[] = [
  {
    contract_id: 'CUST_WE1_2025',
    tenant_name: 'Mieter EG rechts',
    meter_column: 'we1_consumption_kWh',
    contract_start: '2025-08-01',
    billing_cycle: 'yearly',
    base_fee_share: 1,
    notes: 'Wohnung 1',
    tenant_tariff_id: 'TENANT_T1'
  },
  {
    contract_id: 'CUST_WE2_2025',
    tenant_name: 'Mieter EG links',
    meter_column: 'we2_consumption_kWh',
    contract_start: '2025-08-01',
    billing_cycle: 'yearly',
    base_fee_share: 1,
    notes: 'Wohnung 2',
    tenant_tariff_id: 'TENANT_T1'
  }
]

export const SAMPLE_TENANT_TARIFF: TenantTariff = {
  tenant_tariff_id: 'TENANT_T1',
  model: 'two_price',
  pv_price_eur_per_kWh: 0.26,
  grid_price_eur_per_kWh: 0.3351,
  base_fee_eur_per_month: 10.0,
  currency: 'EUR',
  notes: 'Mietertarif (PV 26 ct, Netz 33,51 ct, GG 10 €)'
}

export const LANDLORD_RATES = {
  grid_cost_eur_per_kWh: 0.3351,
  feedin_price_eur_per_kWh: 0.08
}

export function generateRealisticEnergyData(startDate: Date = new Date('2025-08-04T14:00:00'), intervalMinutes: number = 15, dataPoints: number = 96): EnergyDataPoint[] {
  const data: EnergyDataPoint[] = []

  for (let i = 0; i < dataPoints; i++) {
    const timestamp = new Date(startDate.getTime() + i * intervalMinutes * 60 * 1000)
    const hour = timestamp.getHours()
    const dayOfYear = Math.floor((timestamp.getTime() - new Date(timestamp.getFullYear(), 0, 0).getTime()) / 86400000)

    const solarIrradiance = calculateSolarIrradiance(hour, dayOfYear)
    const pvGeneration = solarIrradiance * (3.5 + Math.random() * 0.5) // 3.5-4kW system with variance

    const consumptionPattern = getConsumptionPattern(hour, timestamp.getDay())

    const we1BaseConsumption = consumptionPattern.residential * (0.6 + Math.random() * 0.2) // 60-80% of pattern
    const we2BaseConsumption = consumptionPattern.residential * (0.4 + Math.random() * 0.3) // 40-70% of pattern
    const generalConsumption = consumptionPattern.common * (0.8 + Math.random() * 0.4) // Common area usage

    const we1Consumption = Math.max(0.001, we1BaseConsumption)
    const we2Consumption = Math.max(0.001, we2BaseConsumption)
    const totalConsumption = we1Consumption + we2Consumption + generalConsumption

    const gridImport = Math.max(0, totalConsumption - pvGeneration)
    const gridExport = Math.max(0, pvGeneration - totalConsumption)

    const totalPvUsed = Math.min(pvGeneration, totalConsumption)
    const pvShareWe1 = totalPvUsed * (we1Consumption / totalConsumption)
    const pvShareWe2 = totalPvUsed * (we2Consumption / totalConsumption)

    const gridShareWe1 = Math.max(0, we1Consumption - pvShareWe1)
    const gridShareWe2 = Math.max(0, we2Consumption - pvShareWe2)

    const pvCostWe1 = pvShareWe1 * SAMPLE_TENANT_TARIFF.pv_price_eur_per_kWh
    const gridCostWe1 = gridShareWe1 * SAMPLE_TENANT_TARIFF.grid_price_eur_per_kWh
    const pvCostWe2 = pvShareWe2 * SAMPLE_TENANT_TARIFF.pv_price_eur_per_kWh
    const gridCostWe2 = gridShareWe2 * SAMPLE_TENANT_TARIFF.grid_price_eur_per_kWh

    const baseFeeWe1 = SAMPLE_TENANT_TARIFF.base_fee_eur_per_month / 30 / 96 // Daily proportion of monthly fee
    const baseFeeWe2 = SAMPLE_TENANT_TARIFF.base_fee_eur_per_month / 30 / 96

    const totalCostWe1 = pvCostWe1 + gridCostWe1 + baseFeeWe1
    const totalCostWe2 = pvCostWe2 + gridCostWe2 + baseFeeWe2

    const fullGridCostWe1 = we1Consumption * SAMPLE_TENANT_TARIFF.grid_price_eur_per_kWh + baseFeeWe1
    const fullGridCostWe2 = we2Consumption * SAMPLE_TENANT_TARIFF.grid_price_eur_per_kWh + baseFeeWe2

    const savingsWe1 = Math.max(0, fullGridCostWe1 - totalCostWe1)
    const savingsWe2 = Math.max(0, fullGridCostWe2 - totalCostWe2)

    const solarCoveragePercentage = totalConsumption > 0 ? Math.min(100, (totalPvUsed / totalConsumption) * 100) : 0

    const landlordGridCost = gridImport * LANDLORD_RATES.grid_cost_eur_per_kWh
    const landlordFeedinRevenue = gridExport * LANDLORD_RATES.feedin_price_eur_per_kWh
    const buildingNetPosition = landlordFeedinRevenue - landlordGridCost

    data.push({
      timestamp,
      tenants: {
        we1: {
          consumption: we1Consumption,
          pv_share: pvShareWe1,
          grid_share: gridShareWe1,
          pv_cost: pvCostWe1,
          grid_cost: gridCostWe1,
          base_fee: baseFeeWe1,
          total_cost: totalCostWe1,
          savings: savingsWe1
        },
        we2: {
          consumption: we2Consumption,
          pv_share: pvShareWe2,
          grid_share: gridShareWe2,
          pv_cost: pvCostWe2,
          grid_cost: gridCostWe2,
          base_fee: baseFeeWe2,
          total_cost: totalCostWe2,
          savings: savingsWe2
        }
      },
      building: {
        total_consumption: totalConsumption,
        general_consumption: generalConsumption,
        pv_generation: pvGeneration,
        grid_import: gridImport,
        grid_export: gridExport,
        solar_coverage_percentage: solarCoveragePercentage
      },
      financial: {
        landlord_grid_cost: landlordGridCost,
        landlord_feedin_revenue: landlordFeedinRevenue,
        tenant_total_costs: totalCostWe1 + totalCostWe2,
        building_net_position: buildingNetPosition,
        total_monthly_savings: savingsWe1 + savingsWe2,
        cost_reduction_percentage: (fullGridCostWe1 + fullGridCostWe2) > 0
          ? ((savingsWe1 + savingsWe2) / (fullGridCostWe1 + fullGridCostWe2)) * 100
          : 0
      }
    })
  }

  return data
}

function calculateSolarIrradiance(hour: number, dayOfYear: number): number {
  if (hour < 6 || hour > 20) return 0

  const solarNoon = 12
  const hourFromNoon = Math.abs(hour - solarNoon)
  const seasonalFactor = 0.8 + 0.2 * Math.cos((dayOfYear - 172) * 2 * Math.PI / 365) // Peak around summer solstice

  const baseIrradiance = Math.max(0, Math.cos(hourFromNoon * Math.PI / 12)) * seasonalFactor

  const cloudiness = Math.random() * 0.3 // Random cloud cover 0-30%
  const weatherFactor = 1 - cloudiness

  return baseIrradiance * weatherFactor * (0.9 + Math.random() * 0.2)
}

function getConsumptionPattern(hour: number, dayOfWeek: number) {
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

  let residentialBase = 0.3
  let commonBase = 0.05

  if (hour >= 6 && hour <= 9) {
    residentialBase = 0.8 + (isWeekend ? 0.2 : 0.4)
  } else if (hour >= 12 && hour <= 14) {
    residentialBase = 0.5 + (isWeekend ? 0.4 : 0.1)
  } else if (hour >= 17 && hour <= 22) {
    residentialBase = 1.0 + (isWeekend ? 0.3 : 0.2)
  } else if (hour >= 23 || hour <= 5) {
    residentialBase = 0.2
  }

  if (hour >= 18 && hour <= 23) {
    commonBase = 0.15
  } else if (hour >= 6 && hour <= 18) {
    commonBase = 0.08
  }

  const variance = 0.8 + Math.random() * 0.4

  return {
    residential: residentialBase * variance,
    common: commonBase * variance
  }
}

export function generateSolarPanelData(buildingId: string, buildingName: string, numPanels: number = 12): BuildingSolarData {
  const panels: SolarPanelReading[] = []
  let totalCurrentOutput = 0
  let totalMaxCapacity = 0
  let activePanels = 0

  const manufacturers = ['SunPower', 'LG Solar', 'REC Solar', 'Q CELLS', 'Canadian Solar']
  const models = ['Maxeon 3', 'NeON H', 'Alpha Pure', 'Q.PEAK DUO', 'HiKu7']

  for (let i = 1; i <= numPanels; i++) {
    const manufacturerIndex = Math.floor(Math.random() * manufacturers.length)
    const manufacturer = manufacturers[manufacturerIndex]
    const model = models[manufacturerIndex]

    const maxCapacityW = 350 + Math.floor(Math.random() * 100) // 350-450W panels

    const statusRandom = Math.random()
    let status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'BROKEN'
    let currentOutputW = 0

    if (statusRandom > 0.95) {
      status = 'BROKEN'
    } else if (statusRandom > 0.92) {
      status = 'MAINTENANCE'
    } else if (statusRandom > 0.88) {
      status = 'INACTIVE'
    } else {
      status = 'ACTIVE'
      activePanels++

      // Calculate current output based on time of day and weather
      const now = new Date()
      const hour = now.getHours()
      const solarIrradiance = calculateSolarIrradiance(hour, Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000))

      // Add panel-specific variance (efficiency, shading, etc.)
      const panelEfficiency = 0.85 + Math.random() * 0.15 // 85-100% efficiency
      currentOutputW = Math.round(maxCapacityW * solarIrradiance * panelEfficiency)
    }

    const installDate = new Date(2022, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1)
    const temperature = status === 'ACTIVE' ? Math.round(25 + Math.random() * 25) : undefined // 25-50°C when active

    panels.push({
      id: `panel_${buildingId}_${i.toString().padStart(2, '0')}`,
      panelId: `Panel-${i.toString().padStart(2, '0')}`,
      buildingId,
      manufacturer,
      model,
      maxCapacityW,
      currentOutputW,
      status,
      installDate: installDate.toISOString(),
      lastMaintenance: status === 'MAINTENANCE' ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
      temperature,
      efficiency: status === 'ACTIVE' ? Math.round((currentOutputW / maxCapacityW) * 100) : undefined,
      totalEnergyGenerated: Math.round((maxCapacityW * 0.7 * (Date.now() - installDate.getTime()) / (365 * 24 * 60 * 60 * 1000)) * 1000), // Rough annual generation estimate
      timestamp: new Date().toISOString()
    })

    totalCurrentOutput += currentOutputW
    totalMaxCapacity += maxCapacityW
  }

  return {
    buildingId,
    buildingName,
    totalPanels: numPanels,
    activePanels,
    totalCapacityW: totalMaxCapacity,
    currentOutputW: totalCurrentOutput,
    panels
  }
}

export function generateMultipleBuildingSolarData(): BuildingSolarData[] {
  return [
    generateSolarPanelData('building_1', 'Sonnenhof Apartments', 12),
    generateSolarPanelData('building_2', 'Green Energy Complex', 16),
    generateSolarPanelData('building_3', 'Solar View Residences', 8)
  ]
}