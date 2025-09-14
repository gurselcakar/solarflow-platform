'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sun, Home, Zap, ArrowRight, ArrowLeft } from "lucide-react"
import { BuildingData } from "@/types/energy"

interface EnergyFlowChartProps {
  buildingData: BuildingData
  timestamp: Date
}

export function EnergyFlowChart({ buildingData, timestamp }: EnergyFlowChartProps) {
  const formatEnergy = (kwh: number) => `${kwh.toFixed(2)} kWh`
  const formatTime = (date: Date) => date.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  })

  const solarUtilizationRate = buildingData.pv_generation > 0
    ? ((buildingData.pv_generation - buildingData.grid_export) / buildingData.pv_generation) * 100
    : 0

  const isExporting = buildingData.grid_export > 0
  const isImporting = buildingData.grid_import > 0

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-600" />
          Live Energy Flow
          <Badge variant="outline" className="ml-auto">
            {formatTime(timestamp)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                  <Sun className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold">Solar Production</h3>
                <p className="text-2xl font-bold text-yellow-600">
                  {formatEnergy(buildingData.pv_generation)}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Solar Coverage</span>
                  <span>{buildingData.solar_coverage_percentage.toFixed(1)}%</span>
                </div>
                <Progress
                  value={buildingData.solar_coverage_percentage}
                  className="h-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Utilization Rate</span>
                  <span>{solarUtilizationRate.toFixed(1)}%</span>
                </div>
                <Progress
                  value={solarUtilizationRate}
                  className="h-2"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Home className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold">Building Consumption</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {formatEnergy(buildingData.total_consumption)}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tenants</span>
                  <span className="font-medium">
                    {formatEnergy(buildingData.total_consumption - buildingData.general_consumption)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Common Areas</span>
                  <span className="font-medium">
                    {formatEnergy(buildingData.general_consumption)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <Zap className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="font-semibold">Grid Interaction</h3>
                <div className="space-y-1">
                  {isImporting && (
                    <p className="text-lg font-bold text-red-600">
                      <ArrowLeft className="inline h-4 w-4 mr-1" />
                      Import: {formatEnergy(buildingData.grid_import)}
                    </p>
                  )}
                  {isExporting && (
                    <p className="text-lg font-bold text-green-600">
                      <ArrowRight className="inline h-4 w-4 mr-1" />
                      Export: {formatEnergy(buildingData.grid_export)}
                    </p>
                  )}
                  {!isImporting && !isExporting && (
                    <p className="text-lg font-bold text-gray-500">
                      Balanced
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-center">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Solar Energy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Grid Import</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Grid Export</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Consumption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}