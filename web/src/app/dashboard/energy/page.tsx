'use client'

import { useState, useEffect } from "react"
import { FinancialOverview } from "@/components/dashboard/financial-overview"
import { EnergyFlowChart } from "@/components/dashboard/energy-flow-chart"
import { TenantAnalyticsGrid } from "@/components/dashboard/tenant-analytics-grid"
import { TimeSeriesCharts } from "@/components/dashboard/time-series-charts"
import { generateRealisticEnergyData, SAMPLE_TENANT_CONTRACTS } from "@/lib/sample-data"
import { EnergyDataPoint } from "@/types/energy"

export default function EnergyDashboard() {
  const [energyData, setEnergyData] = useState<EnergyDataPoint[]>([])
  const [currentDataPoint, setCurrentDataPoint] = useState<EnergyDataPoint | null>(null)

  useEffect(() => {
    const sampleData = generateRealisticEnergyData(new Date('2025-08-04T14:00:00'), 15, 48)
    setEnergyData(sampleData)
    setCurrentDataPoint(sampleData[sampleData.length - 1] || null)

    const interval = setInterval(() => {
      const now = new Date()
      const newDataPoint = generateRealisticEnergyData(now, 15, 1)[0]
      setEnergyData(prev => [...prev.slice(-47), newDataPoint])
      setCurrentDataPoint(newDataPoint)
    }, 5000) // Update every 5 seconds for demo

    return () => clearInterval(interval)
  }, [])

  const aggregatedMetrics = energyData.length > 0 ? {
    period: 'monthly' as const,
    total_pv_generation: energyData.reduce((sum, point) => sum + point.building.pv_generation, 0),
    total_consumption: energyData.reduce((sum, point) => sum + point.building.total_consumption, 0),
    grid_independence_percentage: energyData.length > 0
      ? (energyData.reduce((sum, point) => sum + point.building.solar_coverage_percentage, 0) / energyData.length)
      : 0,
    combined_tenant_savings: energyData.reduce((sum, point) =>
      sum + point.tenants.we1.savings + point.tenants.we2.savings, 0),
    feed_in_revenue: energyData.reduce((sum, point) => sum + point.financial.landlord_feedin_revenue, 0),
    peak_consumption_time: '20:30',
    optimal_usage_hours: ['11:00', '12:30', '13:45']
  } : null

  const tenantNames = {
    we1: SAMPLE_TENANT_CONTRACTS[0].tenant_name,
    we2: SAMPLE_TENANT_CONTRACTS[1].tenant_name
  }

  if (!currentDataPoint || !aggregatedMetrics) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading energy data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
      <FinancialOverview
        financialData={currentDataPoint.financial}
        metrics={aggregatedMetrics}
      />

      <EnergyFlowChart
        buildingData={currentDataPoint.building}
        timestamp={currentDataPoint.timestamp}
      />

      <TenantAnalyticsGrid
        tenantData={currentDataPoint.tenants}
        tenantNames={tenantNames}
      />

      <TimeSeriesCharts
        data={energyData}
        onTimeRangeChange={(range) => console.log('Time range changed:', range)}
      />
    </div>
  )
}