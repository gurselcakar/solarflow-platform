'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  PiggyBank,
  Zap,
  Sun,
  TrendingDown,
  TrendingUp,
  Home,
  Eye,
  Download,
  Leaf,
  Clock,
  Euro
} from 'lucide-react';

interface TenantData {
  apartment: {
    id: string;
    apartmentNumber: string;
    meterColumn: string;
    building: {
      name: string;
      address: string;
    };
  };
}

export default function TenantPortal() {
  const { data: session } = useSession();
  const [tenantData, setTenantData] = useState<TenantData | null>(null);
  const [loading, setLoading] = useState(true);

  // Sample energy data based on hackathon dataset
  const energyData = {
    monthlyConsumption: 245, // kWh
    solarConsumption: 142, // kWh (58%)
    gridConsumption: 103, // kWh (42%)
    monthlySavings: 18.50, // EUR
    costReduction: 22, // %
    solarPercentage: 58,
    gridPercentage: 42,
    currentBill: {
      baseFee: 10.00,
      solarCost: 36.92, // 142 kWh × €0.26
      gridCost: 34.52,  // 103 kWh × €0.3351
      total: 81.44
    },
    environmental: {
      co2Saved: 0.071, // tons
      treesEquivalent: 3.2
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchTenantData();
    }
  }, [session]);

  const fetchTenantData = async () => {
    try {
      const response = await fetch('/api/tenant/apartment');
      const data = await response.json();
      setTenantData(data);
    } catch (error) {
      console.error('Failed to fetch tenant data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {session?.user?.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here&apos;s your solar energy savings and consumption overview
        </p>
      </div>

      {/* Hero Savings Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              €{energyData.monthlySavings.toFixed(2)}
            </div>
            <p className="text-xs text-green-600/80 dark:text-green-400/80 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              with rooftop solar
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Reduction</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
              {energyData.costReduction}%
            </div>
            <p className="text-xs text-orange-600/80 dark:text-orange-400/80">
              vs. grid electricity only
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energy Usage</CardTitle>
            <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {energyData.monthlyConsumption} kWh
            </div>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/80">
              this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solar Share</CardTitle>
            <Sun className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
              {energyData.solarPercentage}%
            </div>
            <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80">
              from rooftop solar
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Mix */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              This Month&apos;s Energy Mix
            </CardTitle>
            <CardDescription>Your electricity sources breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                  <span>Solar (Rooftop)</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    Savings: €0.07/kWh
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{energyData.solarConsumption} kWh</div>
                  <div className="text-sm text-gray-500">{energyData.solarPercentage}%</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  <span>Grid (Mixed)</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{energyData.gridConsumption} kWh</div>
                  <div className="text-sm text-gray-500">{energyData.gridPercentage}%</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${energyData.solarPercentage}%` }}
                ></div>
              </div>
              <div className="text-center text-sm text-green-600 dark:text-green-400 font-medium">
                You&apos;re getting {energyData.solarPercentage}% of your energy from clean solar power! 🌞
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Bill Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Euro className="h-5 w-5 mr-2" />
              This Month&apos;s Bill Preview
            </CardTitle>
            <CardDescription>Estimated costs with solar savings highlighted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Base Fee</span>
                <span className="font-medium">€{energyData.currentBill.baseFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm">Solar Energy</span>
                  <div className="text-xs text-green-600">({energyData.solarConsumption} kWh × €0.26)</div>
                </div>
                <span className="font-medium text-green-600">€{energyData.currentBill.solarCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm">Grid Energy</span>
                  <div className="text-xs text-gray-500">({energyData.gridConsumption} kWh × €0.3351)</div>
                </div>
                <span className="font-medium">€{energyData.currentBill.gridCost.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Bill</span>
                <span>€{energyData.currentBill.total.toFixed(2)}</span>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  You saved €{energyData.monthlySavings.toFixed(2)} this month!
                </div>
                <div className="text-xs text-green-600/80 dark:text-green-400/80">
                  Thanks to rooftop solar energy
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button className="flex-1" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Full Bill
              </Button>
              <Button className="flex-1" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats & Environmental Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Leaf className="h-5 w-5 mr-2" />
              Environmental Impact
            </CardTitle>
            <CardDescription>Your contribution to sustainability this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {energyData.environmental.co2Saved}
                </div>
                <div className="text-xs text-green-600/80">tons CO₂ avoided</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {energyData.environmental.treesEquivalent}
                </div>
                <div className="text-xs text-green-600/80">trees equivalent</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Quick Actions
            </CardTitle>
            <CardDescription>Manage your energy account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="ghost">
                <Eye className="h-4 w-4 mr-2" />
                View All Bills
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <TrendingUp className="h-4 w-4 mr-2" />
                Energy Usage History
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <PiggyBank className="h-4 w-4 mr-2" />
                Savings Analysis
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Home className="h-4 w-4 mr-2" />
                Apartment Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {tenantData?.apartment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              My Apartment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">{tenantData.apartment.building.name}</h3>
                <p className="text-sm text-gray-600">{tenantData.apartment.building.address}</p>
              </div>
              <div>
                <h3 className="font-semibold">Apartment</h3>
                <p className="text-sm text-gray-600">{tenantData.apartment.apartmentNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!tenantData?.apartment && !loading && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No apartment data found for your account.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}