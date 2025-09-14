'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, Euro, Users, ArrowUpCircle, ArrowDownCircle } from "lucide-react"
import { FinancialData, AggregatedMetrics } from "@/types/energy"

interface FinancialOverviewProps {
  financialData: FinancialData
  metrics: AggregatedMetrics
}

export function FinancialOverview({ financialData, metrics }: FinancialOverviewProps) {
  const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`
  const formatEnergy = (kwh: number) => `${kwh.toFixed(1)} kWh`

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Energy Dashboard</h1>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            {formatCurrency(financialData.total_monthly_savings)} saved this month
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {financialData.cost_reduction_percentage.toFixed(1)}% cost reduction
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solar Generation</CardTitle>
            <Zap className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatEnergy(metrics.total_pv_generation)}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.grid_independence_percentage.toFixed(1)}% building independence
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feed-in Revenue</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(metrics.feed_in_revenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Excess solar exported to grid
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grid Costs</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(financialData.landlord_grid_cost)}
            </div>
            <p className="text-xs text-muted-foreground">
              Electricity purchased from grid
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tenant Savings</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(metrics.combined_tenant_savings)}
            </div>
            <p className="text-xs text-muted-foreground">
              Combined tenant cost reduction
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Euro className="h-5 w-5 text-green-600" />
            Building Financial Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Feed-in Revenue</span>
              <span className="font-medium text-green-600">
                +{formatCurrency(financialData.landlord_feedin_revenue)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Grid Purchase Costs</span>
              <span className="font-medium text-red-600">
                -{formatCurrency(financialData.landlord_grid_cost)}
              </span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Net Position</span>
                <span className={`font-bold text-lg ${
                  financialData.building_net_position >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {financialData.building_net_position >= 0 ? '+' : ''}
                  {formatCurrency(financialData.building_net_position)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}