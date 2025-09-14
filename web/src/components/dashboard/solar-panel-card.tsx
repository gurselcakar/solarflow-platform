'use client'

import { SolarPanelReading } from '@/types/panel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Sun, Zap, AlertCircle, Wrench, Power } from 'lucide-react'

interface SolarPanelCardProps {
  panel: SolarPanelReading
}

const statusConfig = {
  ACTIVE: { icon: Sun, color: 'bg-green-500', text: 'Active', variant: 'default' as const },
  INACTIVE: { icon: Power, color: 'bg-gray-500', text: 'Inactive', variant: 'secondary' as const },
  MAINTENANCE: { icon: Wrench, color: 'bg-orange-500', text: 'Maintenance', variant: 'outline' as const },
  BROKEN: { icon: AlertCircle, color: 'bg-red-500', text: 'Broken', variant: 'destructive' as const }
}

export function SolarPanelCard({ panel }: SolarPanelCardProps) {
  const statusInfo = statusConfig[panel.status]
  const efficiency = Math.round((panel.currentOutputW / panel.maxCapacityW) * 100)
  const StatusIcon = statusInfo.icon

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{panel.panelId}</CardTitle>
          <Badge variant={statusInfo.variant} className="flex items-center gap-1">
            <StatusIcon className="h-3 w-3" />
            {statusInfo.text}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {panel.manufacturer} {panel.model}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Current Output</div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-500" />
              <span className="text-2xl font-bold">{panel.currentOutputW}W</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Max Capacity</div>
            <div className="text-lg font-semibold text-muted-foreground">
              {panel.maxCapacityW}W
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Efficiency</span>
            <span className="font-medium">{efficiency}%</span>
          </div>
          <Progress
            value={efficiency}
            className="h-2"
          />
        </div>

        {panel.temperature && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Temperature</span>
            <span className="font-medium">{panel.temperature}°C</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Generated</span>
          <span className="font-medium">{(panel.totalEnergyGenerated / 1000).toFixed(1)} kWh</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Installed</span>
          <span className="font-medium">
            {new Date(panel.installDate).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}