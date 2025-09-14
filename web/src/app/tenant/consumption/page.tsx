'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Clock,
  Calendar,
  Target,
  Lightbulb,
  Activity,
  BarChart3,
  PieChart,
  Download
} from 'lucide-react';

export default function ConsumptionPage() {
  // Sample consumption data based on hackathon dataset
  const consumptionData = {
    current: {
      daily: 8.1, // kWh average
      weekly: 56.7, // kWh
      monthly: 245, // kWh
      solarShare: 58, // %
      gridShare: 42 // %
    },
    trends: {
      vs_lastMonth: 2.3, // % change
      vs_lastYear: -8.5, // % change (negative = improvement)
      efficiency: 'Good' // Good/Average/Poor
    },
    patterns: {
      peakHours: '18:00 - 21:00',
      lowestHours: '02:00 - 06:00',
      avgDailyPeak: 1.2, // kWh
      avgDailyMin: 0.3 // kWh
    },
    hourlyBreakdown: [
      { hour: '00:00', consumption: 0.3, solar: 0, grid: 0.3 },
      { hour: '01:00', consumption: 0.2, solar: 0, grid: 0.2 },
      { hour: '02:00', consumption: 0.2, solar: 0, grid: 0.2 },
      { hour: '03:00', consumption: 0.2, solar: 0, grid: 0.2 },
      { hour: '04:00', consumption: 0.3, solar: 0, grid: 0.3 },
      { hour: '05:00', consumption: 0.4, solar: 0, grid: 0.4 },
      { hour: '06:00', consumption: 0.6, solar: 0.1, grid: 0.5 },
      { hour: '07:00', consumption: 0.8, solar: 0.3, grid: 0.5 },
      { hour: '08:00', consumption: 0.9, solar: 0.6, grid: 0.3 },
      { hour: '09:00', consumption: 0.8, solar: 0.7, grid: 0.1 },
      { hour: '10:00', consumption: 0.7, solar: 0.7, grid: 0 },
      { hour: '11:00', consumption: 0.6, solar: 0.6, grid: 0 },
      { hour: '12:00', consumption: 0.8, solar: 0.8, grid: 0 },
      { hour: '13:00', consumption: 0.9, solar: 0.9, grid: 0 },
      { hour: '14:00', consumption: 0.7, solar: 0.7, grid: 0 },
      { hour: '15:00', consumption: 0.6, solar: 0.6, grid: 0 },
      { hour: '16:00', consumption: 0.8, solar: 0.7, grid: 0.1 },
      { hour: '17:00', consumption: 1.0, solar: 0.5, grid: 0.5 },
      { hour: '18:00', consumption: 1.2, solar: 0.2, grid: 1.0 },
      { hour: '19:00', consumption: 1.1, solar: 0, grid: 1.1 },
      { hour: '20:00', consumption: 1.0, solar: 0, grid: 1.0 },
      { hour: '21:00', consumption: 0.9, solar: 0, grid: 0.9 },
      { hour: '22:00', consumption: 0.7, solar: 0, grid: 0.7 },
      { hour: '23:00', consumption: 0.5, solar: 0, grid: 0.5 },
    ],
    weeklyComparison: [
      { day: 'Mon', consumption: 8.2, solar: 4.8, grid: 3.4, efficiency: 'Good' },
      { day: 'Tue', consumption: 7.9, solar: 4.6, grid: 3.3, efficiency: 'Good' },
      { day: 'Wed', consumption: 8.5, solar: 5.1, grid: 3.4, efficiency: 'Excellent' },
      { day: 'Thu', consumption: 8.1, solar: 4.7, grid: 3.4, efficiency: 'Good' },
      { day: 'Fri', consumption: 8.8, solar: 5.0, grid: 3.8, efficiency: 'Good' },
      { day: 'Sat', consumption: 9.2, solar: 5.3, grid: 3.9, efficiency: 'Average' },
      { day: 'Sun', consumption: 8.0, solar: 4.6, grid: 3.4, efficiency: 'Good' },
    ]
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-red-500" />;
    return <TrendingDown className="h-4 w-4 text-green-500" />;
  };

  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case 'Excellent': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Average': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Energy Consumption
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your energy usage patterns and optimize consumption
          </p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Current Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
            <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {consumptionData.current.daily} kWh
            </div>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/80 flex items-center">
              {getTrendIcon(consumptionData.trends.vs_lastMonth)}
              {Math.abs(consumptionData.trends.vs_lastMonth)}% vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {consumptionData.current.monthly} kWh
            </div>
            <p className="text-xs text-green-600/80 dark:text-green-400/80">
              {consumptionData.current.solarShare}% from solar
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Usage</CardTitle>
            <Activity className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
              {consumptionData.patterns.avgDailyPeak} kWh
            </div>
            <p className="text-xs text-orange-600/80 dark:text-orange-400/80">
              {consumptionData.patterns.peakHours}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              {consumptionData.trends.efficiency}
            </div>
            <p className="text-xs text-purple-600/80 dark:text-purple-400/80 flex items-center">
              {getTrendIcon(consumptionData.trends.vs_lastYear)}
              {Math.abs(consumptionData.trends.vs_lastYear)}% vs last year
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Usage Pattern */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              24-Hour Usage Pattern
            </CardTitle>
            <CardDescription>Your typical daily consumption and solar coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Peak hours highlight */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="font-semibold text-red-800 dark:text-red-400">Peak Hours</div>
                  <div className="text-sm text-red-600">{consumptionData.patterns.peakHours}</div>
                  <div className="text-xs text-red-600/80">Highest consumption period</div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="font-semibold text-green-800 dark:text-green-400">Solar Peak</div>
                  <div className="text-sm text-green-600">11:00 - 15:00</div>
                  <div className="text-xs text-green-600/80">Best solar production</div>
                </div>
              </div>

              {/* Hourly breakdown - simplified visualization */}
              <div className="space-y-2">
                {consumptionData.hourlyBreakdown.filter((_, index) => index % 3 === 0).map((hour) => (
                  <div key={hour.hour} className="flex items-center space-x-3">
                    <div className="w-12 text-xs font-mono">{hour.hour}</div>
                    <div className="flex-1 flex">
                      <div
                        className="bg-yellow-400 h-4 rounded-l"
                        style={{ width: `${(hour.solar / 1.2) * 100}%` }}
                        title={`Solar: ${hour.solar} kWh`}
                      ></div>
                      <div
                        className="bg-gray-400 h-4 rounded-r"
                        style={{ width: `${(hour.grid / 1.2) * 100}%` }}
                        title={`Grid: ${hour.grid} kWh`}
                      ></div>
                    </div>
                    <div className="text-xs w-16 text-right">{hour.consumption} kWh</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded mr-1"></div>
                  Solar Energy
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded mr-1"></div>
                  Grid Energy
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Weekly Consumption Pattern
            </CardTitle>
            <CardDescription>Daily consumption and solar utilization this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consumptionData.weeklyComparison.map((day) => (
                <div key={day.day} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="font-medium w-12">{day.day}</div>
                    <div className="flex space-x-1">
                      <div
                        className="bg-yellow-400 h-3 rounded"
                        style={{ width: `${(day.solar / 10) * 40}px` }}
                        title={`Solar: ${day.solar} kWh`}
                      ></div>
                      <div
                        className="bg-gray-400 h-3 rounded"
                        style={{ width: `${(day.grid / 10) * 40}px` }}
                        title={`Grid: ${day.grid} kWh`}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="font-semibold">{day.consumption} kWh</div>
                      <div className="text-xs text-gray-500">
                        {Math.round((day.solar / day.consumption) * 100)}% solar
                      </div>
                    </div>
                    <Badge className={getEfficiencyColor(day.efficiency)}>
                      {day.efficiency}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Insights & Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Consumption Breakdown
            </CardTitle>
            <CardDescription>Where your energy goes this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {Math.round((consumptionData.current.solarShare / 100) * consumptionData.current.monthly)}
                  </div>
                  <div className="text-sm text-yellow-600">kWh from Solar</div>
                  <div className="text-xs text-yellow-600/80">{consumptionData.current.solarShare}% of total</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">
                    {Math.round((consumptionData.current.gridShare / 100) * consumptionData.current.monthly)}
                  </div>
                  <div className="text-sm text-gray-600">kWh from Grid</div>
                  <div className="text-xs text-gray-600/80">{consumptionData.current.gridShare}% of total</div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-4 rounded-full"
                  style={{ width: `${consumptionData.current.solarShare}%` }}
                ></div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Peak Period (6-10 PM)</span>
                  <span>35% of daily usage</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Daytime (8 AM-6 PM)</span>
                  <span>45% of daily usage</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Night (10 PM-8 AM)</span>
                  <span>20% of daily usage</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Smart Energy Tips
            </CardTitle>
            <CardDescription>Personalized recommendations to optimize your consumption</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-400">
                <div className="font-semibold text-blue-800 dark:text-blue-400">💡 Peak Solar Hours</div>
                <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Use energy-intensive appliances between 11 AM - 3 PM when solar production is highest.
                  You could save an additional €5-8 per month!
                </div>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-400">
                <div className="font-semibold text-green-800 dark:text-green-400">🌞 Solar Optimization</div>
                <div className="text-sm text-green-700 dark:text-green-300 mt-1">
                  Your solar utilization is {consumptionData.current.solarShare}% - excellent!
                  Try running your dishwasher or laundry during lunch time for even better results.
                </div>
              </div>

              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-400">
                <div className="font-semibold text-orange-800 dark:text-orange-400">⚡ Evening Usage</div>
                <div className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                  Your peak usage is {consumptionData.patterns.peakHours}. Consider pre-cooling/heating
                  during solar hours and using timers for non-essential devices.
                </div>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-400">
                <div className="font-semibold text-purple-800 dark:text-purple-400">📊 Efficiency Trend</div>
                <div className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                  You&apos;re {Math.abs(consumptionData.trends.vs_lastYear)}% more efficient than last year!
                  Keep up the great work with energy-conscious habits.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison with Similar Households */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Benchmark Comparison
          </CardTitle>
          <CardDescription>How your energy usage compares to similar households</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-gray-600 mb-2">278 kWh</div>
              <div className="text-sm text-gray-600">Similar households</div>
              <div className="text-xs text-gray-500 mt-1">Average monthly usage</div>
            </div>

            <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-900/20 border-green-200">
              <div className="text-2xl font-bold text-green-600 mb-2">{consumptionData.current.monthly} kWh</div>
              <div className="text-sm text-green-600">Your usage</div>
              <div className="text-xs text-green-500 mt-1">12% below average! 🎉</div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">18%</div>
              <div className="text-sm text-blue-600">Average solar usage</div>
              <div className="text-xs text-blue-500 mt-1">You&apos;re using {consumptionData.current.solarShare}% solar!</div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
            <h3 className="font-semibold mb-2 text-green-800 dark:text-green-400">🏆 Congratulations!</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              You&apos;re using 12% less energy than similar households while getting 58% of your power from solar!
              This combination puts you in the top 15% of environmentally conscious energy users in your area.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}