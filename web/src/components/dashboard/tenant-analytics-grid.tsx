'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, Zap, TrendingDown, Sun, Home } from "lucide-react"
import { TenantData } from "@/types/energy"

interface TenantAnalyticsGridProps {
  tenantData: {
    we1: TenantData
    we2: TenantData
  }
  tenantNames: {
    we1: string
    we2: string
  }
}

interface TenantCardProps {
  name: string
  data: TenantData
  tenantId: 'we1' | 'we2'
}

function TenantCard({ name, data, tenantId }: TenantCardProps) {
  const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`
  const formatEnergy = (kwh: number) => `${kwh.toFixed(1)} kWh`

  const pvPercentage = data.consumption > 0 ? (data.pv_share / data.consumption) * 100 : 0
  const gridPercentage = 100 - pvPercentage

  const savingsPercentage = data.savings > 0 && data.total_cost > 0
    ? (data.savings / (data.total_cost + data.savings)) * 100
    : 0

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2">
          <User className="h-4 w-4" />
          {name}
        </CardTitle>
        <Badge variant={tenantId === 'we1' ? 'default' : 'secondary'} className="w-fit">
          {tenantId === 'we1' ? 'Apartment 1' : 'Apartment 2'}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Consumption</p>
            <p className="text-xl font-bold">{formatEnergy(data.consumption)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Monthly Cost</p>
            <p className="text-xl font-bold">{formatCurrency(data.total_cost)}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Sun className="h-3 w-3 text-yellow-600" />
                <span className="text-sm">Solar Energy</span>
              </div>
              <span className="text-sm font-medium">
                {formatEnergy(data.pv_share)} ({pvPercentage.toFixed(1)}%)
              </span>
            </div>
            <Progress value={pvPercentage} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-red-600" />
                <span className="text-sm">Grid Energy</span>
              </div>
              <span className="text-sm font-medium">
                {formatEnergy(data.grid_share)} ({gridPercentage.toFixed(1)}%)
              </span>
            </div>
            <Progress value={gridPercentage} className="h-2" />
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">PV Cost (€0.26/kWh)</span>
            <span>{formatCurrency(data.pv_cost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Grid Cost (€0.3351/kWh)</span>
            <span>{formatCurrency(data.grid_cost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Base Fee</span>
            <span>{formatCurrency(data.base_fee)}</span>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="h-4 w-4 text-green-600" />
            <span className="font-semibold text-green-800">Monthly Savings</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-green-600">
              {formatCurrency(data.savings)}
            </span>
            <Badge variant="outline" className="text-green-700 border-green-300">
              {savingsPercentage.toFixed(1)}% saved
            </Badge>
          </div>
          <p className="text-xs text-green-700 mt-1">
            vs. full grid pricing (€0.3351/kWh)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function TenantAnalyticsGrid({ tenantData, tenantNames }: TenantAnalyticsGridProps) {
  const totalConsumption = tenantData.we1.consumption + tenantData.we2.consumption
  const totalSavings = tenantData.we1.savings + tenantData.we2.savings

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Tenant Analytics</h2>
        <div className="flex gap-4">
          <Badge variant="outline" className="text-sm">
            Total: {(totalConsumption).toFixed(1)} kWh
          </Badge>
          <Badge variant="outline" className="text-sm text-green-600">
            Combined Savings: €{totalSavings.toFixed(2)}
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <TenantCard
          name={tenantNames.we1}
          data={tenantData.we1}
          tenantId="we1"
        />
        <TenantCard
          name={tenantNames.we2}
          data={tenantData.we2}
          tenantId="we2"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-blue-600" />
            Tenant Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Energy Usage</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">{tenantNames.we1}</span>
                  <span className="font-medium">{tenantData.we1.consumption.toFixed(1)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{tenantNames.we2}</span>
                  <span className="font-medium">{tenantData.we2.consumption.toFixed(1)} kWh</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Solar Share</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">{tenantNames.we1}</span>
                  <span className="font-medium text-yellow-600">
                    {((tenantData.we1.pv_share / tenantData.we1.consumption) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{tenantNames.we2}</span>
                  <span className="font-medium text-yellow-600">
                    {((tenantData.we2.pv_share / tenantData.we2.consumption) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Monthly Savings</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">{tenantNames.we1}</span>
                  <span className="font-medium text-green-600">
                    €{tenantData.we1.savings.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{tenantNames.we2}</span>
                  <span className="font-medium text-green-600">
                    €{tenantData.we2.savings.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}