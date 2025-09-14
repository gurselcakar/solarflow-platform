'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  PiggyBank,
  TrendingUp,
  Euro,
  Calculator,
  Leaf,
  Sun,
  Zap,
  BarChart3,
  Target,
  Calendar
} from 'lucide-react';

export default function SavingsPage() {
  // Sample savings data based on hackathon dataset
  const savingsData = {
    monthly: {
      solarSavings: 18.50,
      totalBill: 81.44,
      gridOnlyBill: 99.94, // if all energy was from grid
      savingsPercentage: 18.5
    },
    annual: {
      projectedSavings: 222.00, // monthly * 12
      totalSaved: 185.50, // year to date
      projectedBill: 977.28,
      gridOnlyBill: 1199.28
    },
    comparison: {
      solarRate: 0.26,
      gridRate: 0.3351,
      savingsPerKwh: 0.0751,
      monthlyConsumption: 245,
      solarConsumption: 142,
      gridConsumption: 103
    },
    environmental: {
      monthlyCo2Saved: 0.071, // tons
      annualCo2Projected: 0.852,
      treesEquivalent: 38.4,
      carbonFootprintReduction: 22
    },
    trends: [
      { month: 'Aug 2025', savings: 18.50, solarPercentage: 58 },
      { month: 'Sep 2025', savings: 22.30, solarPercentage: 62 },
      { month: 'Oct 2025', savings: 19.80, solarPercentage: 55 },
      { month: 'Nov 2025', savings: 16.20, solarPercentage: 48 },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Savings & Benefits Analysis
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Detailed breakdown of your solar energy cost savings
        </p>
      </div>

      {/* Savings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <PiggyBank className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              €{savingsData.monthly.solarSavings.toFixed(2)}
            </div>
            <p className="text-xs text-green-600/80 dark:text-green-400/80 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {savingsData.monthly.savingsPercentage}% reduction
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Projection</CardTitle>
            <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              €{savingsData.annual.projectedSavings.toFixed(0)}
            </div>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/80">
              estimated yearly savings
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Per kWh Savings</CardTitle>
            <Calculator className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
              €{savingsData.comparison.savingsPerKwh.toFixed(3)}
            </div>
            <p className="text-xs text-orange-600/80 dark:text-orange-400/80">
              solar vs grid rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Year to Date</CardTitle>
            <Euro className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
              €{savingsData.annual.totalSaved.toFixed(0)}
            </div>
            <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80">
              total saved so far
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              Cost Comparison Breakdown
            </CardTitle>
            <CardDescription>Monthly bill analysis: Solar vs Grid-only scenario</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Current Bill with Solar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold flex items-center">
                    <Sun className="h-4 w-4 mr-1 text-yellow-500" />
                    Your Current Bill (with Solar)
                  </h3>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    Savings Plan
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Fee</span>
                    <span>€10.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Solar Energy ({savingsData.comparison.solarConsumption} kWh × €{savingsData.comparison.solarRate})</span>
                    <span className="text-green-600">€{(savingsData.comparison.solarConsumption * savingsData.comparison.solarRate).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grid Energy ({savingsData.comparison.gridConsumption} kWh × €{savingsData.comparison.gridRate})</span>
                    <span>€{(savingsData.comparison.gridConsumption * savingsData.comparison.gridRate).toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>€{savingsData.monthly.totalBill.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Grid-Only Scenario */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold flex items-center">
                    <Zap className="h-4 w-4 mr-1 text-gray-500" />
                    Grid-Only Scenario
                  </h3>
                  <Badge variant="secondary">
                    No Solar
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Fee</span>
                    <span>€10.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>All Grid Energy ({savingsData.comparison.monthlyConsumption} kWh × €{savingsData.comparison.gridRate})</span>
                    <span>€{(savingsData.comparison.monthlyConsumption * savingsData.comparison.gridRate).toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>€{savingsData.monthly.gridOnlyBill.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Savings Summary */}
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-green-800 dark:text-green-400">Monthly Savings</span>
                  <span className="text-xl font-bold text-green-600">
                    €{savingsData.monthly.solarSavings.toFixed(2)}
                  </span>
                </div>
                <div className="text-xs text-green-600 mt-1">
                  That&apos;s {savingsData.monthly.savingsPercentage}% off your electricity bill!
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Savings Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Savings Trends
            </CardTitle>
            <CardDescription>Your monthly savings and solar usage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savingsData.trends.map((trend) => (
                <div key={trend.month} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="font-medium">{trend.month}</div>
                      <div className="text-sm text-gray-500">
                        {trend.solarPercentage}% solar usage
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">
                      €{trend.savings.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">saved</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-sm text-blue-800 dark:text-blue-400">
                <strong>Tip:</strong> Your savings vary with solar production and consumption patterns.
                Higher summer production means more savings!
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Leaf className="h-5 w-5 mr-2" />
            Environmental Impact & Benefits
          </CardTitle>
          <CardDescription>Your contribution to sustainability through solar energy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {savingsData.environmental.monthlyCo2Saved}
              </div>
              <div className="text-sm text-green-600/80">tons CO₂ saved</div>
              <div className="text-xs text-gray-500 mt-1">this month</div>
            </div>

            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {savingsData.environmental.annualCo2Projected}
              </div>
              <div className="text-sm text-green-600/80">tons CO₂ annually</div>
              <div className="text-xs text-gray-500 mt-1">projected</div>
            </div>

            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {savingsData.environmental.treesEquivalent}
              </div>
              <div className="text-sm text-green-600/80">trees planted</div>
              <div className="text-xs text-gray-500 mt-1">equivalent impact</div>
            </div>

            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {savingsData.environmental.carbonFootprintReduction}%
              </div>
              <div className="text-sm text-green-600/80">footprint reduction</div>
              <div className="text-xs text-gray-500 mt-1">vs. grid electricity</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
            <h3 className="font-semibold mb-2 text-green-800 dark:text-green-400">🌍 Your Environmental Achievement</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              By using solar energy, you&apos;re not just saving money – you&apos;re helping fight climate change!
              Your {savingsData.environmental.monthlyCo2Saved} tons of CO₂ savings this month is equivalent to
              taking a car off the road for 180 miles or planting {savingsData.environmental.treesEquivalent} tree seedlings.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Annual Projection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Annual Savings Projection
          </CardTitle>
          <CardDescription>Based on your current consumption patterns and solar availability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                €{savingsData.annual.projectedBill.toFixed(0)}
              </div>
              <div className="text-sm text-gray-600">Annual bill with solar</div>
              <div className="text-xs text-green-600 mt-1">✓ Your current plan</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600 mb-2 line-through decoration-red-500">
                €{savingsData.annual.gridOnlyBill.toFixed(0)}
              </div>
              <div className="text-sm text-gray-600">Would cost with grid only</div>
              <div className="text-xs text-red-600 mt-1">⚠ Without solar</div>
            </div>

            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                €{savingsData.annual.projectedSavings.toFixed(0)}
              </div>
              <div className="text-sm text-green-600">Total annual savings</div>
              <div className="text-xs text-green-600 mt-1">🎉 Money in your pocket!</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-400">💡 Maximizing Your Savings</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Use energy-intensive appliances during sunny daytime hours (10 AM - 4 PM)</li>
              <li>• Your solar panels produce the most energy between 11 AM - 2 PM</li>
              <li>• Running dishwashers and washing machines during peak sun hours maximizes savings</li>
              <li>• Consider time-shifting activities like EV charging to daylight hours</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}