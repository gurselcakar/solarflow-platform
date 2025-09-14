'use client'

import { useState, useEffect } from 'react'
import { BuildingSolarData } from '@/types/panel'
import { SolarPanelCard } from './solar-panel-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Building2, Sun, Zap, Activity } from 'lucide-react'

interface SolarPanelMonitorProps {
  buildingData: BuildingSolarData[]
  selectedBuildingId?: string
  onBuildingChange?: (buildingId: string) => void
}

export function SolarPanelMonitor({
  buildingData,
  selectedBuildingId,
  onBuildingChange
}: SolarPanelMonitorProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingSolarData | null>(null)

  useEffect(() => {
    if (selectedBuildingId && buildingData.length > 0) {
      const building = buildingData.find(b => b.buildingId === selectedBuildingId)
      setSelectedBuilding(building || buildingData[0])
    } else if (buildingData.length > 0) {
      setSelectedBuilding(buildingData[0])
    }
  }, [selectedBuildingId, buildingData])

  if (!selectedBuilding) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Sun className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No solar panel data available</p>
        </div>
      </div>
    )
  }

  const handleBuildingChange = (buildingId: string) => {
    const building = buildingData.find(b => b.buildingId === buildingId)
    if (building) {
      setSelectedBuilding(building)
      onBuildingChange?.(buildingId)
    }
  }

  const inactivePanels = selectedBuilding.totalPanels - selectedBuilding.activePanels
  const totalEfficiency = Math.round(
    (selectedBuilding.currentOutputW / selectedBuilding.totalCapacityW) * 100
  )

  return (
    <div className="space-y-6">
      {/* Building Selector and Overview */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Building Overview
              </CardTitle>
              {buildingData.length > 1 && (
                <Select value={selectedBuilding.buildingId} onValueChange={handleBuildingChange}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {buildingData.map((building) => (
                      <SelectItem key={building.buildingId} value={building.buildingId}>
                        {building.buildingName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold">{selectedBuilding.buildingName}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedBuilding.totalPanels} Solar Panels Installed
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Activity className="h-4 w-4" />
                    Active Panels
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {selectedBuilding.activePanels}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Inactive</div>
                  <div className="text-2xl font-bold text-gray-500">{inactivePanels}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4" />
                    Current Output
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {(selectedBuilding.currentOutputW / 1000).toFixed(1)}kW
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Efficiency</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{totalEfficiency}%</span>
                    <Badge variant={totalEfficiency > 80 ? 'default' : totalEfficiency > 60 ? 'outline' : 'secondary'}>
                      {totalEfficiency > 80 ? 'Excellent' : totalEfficiency > 60 ? 'Good' : 'Low'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Panel Grid */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Individual Panel Status</h2>
          <p className="text-sm text-muted-foreground">
            Real-time monitoring of each solar panel&apos;s performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {selectedBuilding.panels.map((panel) => (
            <SolarPanelCard key={panel.id} panel={panel} />
          ))}
        </div>
      </div>
    </div>
  )
}