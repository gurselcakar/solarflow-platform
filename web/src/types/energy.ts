export interface TenantData {
  consumption: number
  pv_share: number
  grid_share: number
  pv_cost: number
  grid_cost: number
  base_fee: number
  total_cost: number
  savings: number
}

export interface BuildingData {
  total_consumption: number
  general_consumption: number
  pv_generation: number
  grid_import: number
  grid_export: number
  solar_coverage_percentage: number
}

export interface FinancialData {
  landlord_grid_cost: number
  landlord_feedin_revenue: number
  tenant_total_costs: number
  building_net_position: number
  total_monthly_savings: number
  cost_reduction_percentage: number
}

export interface EnergyDataPoint {
  timestamp: Date
  tenants: {
    we1: TenantData
    we2: TenantData
  }
  building: BuildingData
  financial: FinancialData
}

export interface AggregatedMetrics {
  period: 'daily' | 'weekly' | 'monthly' | 'yearly'
  total_pv_generation: number
  total_consumption: number
  grid_independence_percentage: number
  combined_tenant_savings: number
  feed_in_revenue: number
  peak_consumption_time: string
  optimal_usage_hours: string[]
}

export interface TenantContract {
  contract_id: string
  tenant_name: string
  meter_column: string
  contract_start: string
  contract_end?: string
  billing_cycle: 'yearly'
  base_fee_share: number
  notes: string
  tenant_tariff_id: string
}

export interface TenantTariff {
  tenant_tariff_id: string
  model: 'two_price'
  pv_price_eur_per_kWh: number
  grid_price_eur_per_kWh: number
  base_fee_eur_per_month: number
  currency: 'EUR'
  notes: string
}