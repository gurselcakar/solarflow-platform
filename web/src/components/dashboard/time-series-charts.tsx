'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, BarChart3, Clock } from "lucide-react"
import { EnergyDataPoint } from "@/types/energy"
import { useState } from "react"

interface TimeSeriesChartsProps {
  data: EnergyDataPoint[]
  onTimeRangeChange?: (range: string) => void
}

export function TimeSeriesCharts({ data, onTimeRangeChange }: TimeSeriesChartsProps) {
  const [selectedRange, setSelectedRange] = useState<string>('daily')

  const handleRangeChange = (value: string) => {
    setSelectedRange(value)
    onTimeRangeChange?.(value)
  }

  const formatTime = (date: Date, range: string) => {
    switch (range) {
      case 'daily':
        return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
      case 'weekly':
        return date.toLocaleDateString('de-DE', { weekday: 'short' })
      case 'monthly':
        return date.toLocaleDateString('de-DE', { day: '2-digit' })
      default:
        return date.toLocaleDateString('de-DE')
    }
  }

  const getAggregatedData = () => {
    if (!data.length) return []

    return data.slice(-24).map((point, index) => ({
      time: formatTime(point.timestamp, selectedRange),
      pv_generation: point.building.pv_generation,
      total_consumption: point.building.total_consumption,
      grid_import: point.building.grid_import,
      grid_export: point.building.grid_export,
      we1_consumption: point.tenants.we1.consumption,
      we2_consumption: point.tenants.we2.consumption,
      index
    }))
  }

  const chartData = getAggregatedData()

  const getPeakConsumptionTime = () => {
    if (!chartData.length) return 'N/A'
    const peak = chartData.reduce((prev, current) =>
      current.total_consumption > prev.total_consumption ? current : prev
    )
    return peak.time
  }

  const getOptimalSolarHours = () => {
    if (!chartData.length) return []
    return chartData
      .filter(d => d.pv_generation > d.total_consumption)
      .map(d => d.time)
      .slice(0, 3)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Energy Analytics</h2>
        <Select value={selectedRange} onValueChange={handleRangeChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Consumption</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getPeakConsumptionTime()}</div>
            <p className="text-xs text-muted-foreground">Highest usage period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solar Surplus</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getOptimalSolarHours().length}</div>
            <p className="text-xs text-muted-foreground">Hours with excess solar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Points</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{chartData.length}</div>
            <p className="text-xs text-muted-foreground">15-minute intervals</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Energy Flow Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2 text-xs text-center">
              <div>Time</div>
              <div>Solar (kWh)</div>
              <div>Consumption (kWh)</div>
              <div>Grid (kWh)</div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {chartData.map((point, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 text-sm p-2 hover:bg-muted/50 rounded">
                  <div className="font-mono">{point.time}</div>
                  <div className="text-yellow-600">
                    {point.pv_generation.toFixed(2)}
                  </div>
                  <div className="text-blue-600">
                    {point.total_consumption.toFixed(2)}
                  </div>
                  <div>
                    {point.grid_import > 0 && (
                      <span className="text-red-600">↓{point.grid_import.toFixed(2)}</span>
                    )}
                    {point.grid_export > 0 && (
                      <span className="text-green-600">↑{point.grid_export.toFixed(2)}</span>
                    )}
                    {point.grid_import === 0 && point.grid_export === 0 && (
                      <span className="text-gray-400">-</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tenant Consumption Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartData.slice(-8).map((point, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-mono">{point.time}</span>
                    <span>{(point.we1_consumption + point.we2_consumption).toFixed(2)} kWh total</span>
                  </div>
                  <div className="flex gap-1 h-4">
                    <div
                      className="bg-blue-500 rounded-sm"
                      style={{
                        width: `${(point.we1_consumption / (point.we1_consumption + point.we2_consumption)) * 100}%`
                      }}
                    />
                    <div
                      className="bg-purple-500 rounded-sm"
                      style={{
                        width: `${(point.we2_consumption / (point.we1_consumption + point.we2_consumption)) * 100}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Apt 1: {point.we1_consumption.toFixed(2)} kWh</span>
                    <span>Apt 2: {point.we2_consumption.toFixed(2)} kWh</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Optimization Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-1">Peak Solar Hours</h4>
                <p className="text-sm text-yellow-700">
                  {getOptimalSolarHours().length > 0
                    ? `Best times for high energy usage: ${getOptimalSolarHours().join(', ')}`
                    : 'No solar surplus periods identified'
                  }
                </p>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-1">Usage Pattern</h4>
                <p className="text-sm text-blue-700">
                  Peak consumption at {getPeakConsumptionTime()} - consider load balancing during high solar periods.
                </p>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-1">Grid Export</h4>
                <p className="text-sm text-green-700">
                  {chartData.some(d => d.grid_export > 0)
                    ? 'Building is producing surplus energy - excellent solar performance!'
                    : 'No excess energy export detected in current period.'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}