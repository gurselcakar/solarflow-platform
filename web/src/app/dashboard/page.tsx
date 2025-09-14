'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, Sun, Euro, TrendingUp, AlertCircle } from 'lucide-react';

interface BuildingData {
  id: string;
  name: string;
  address: string;
  apartments: {
    id: string;
    apartmentNumber: string;
    tenant?: {
      name: string;
      email: string;
    };
  }[];
}

export default function LandlordDashboard() {
  const { data: session } = useSession();
  const [buildings, setBuildings] = useState<BuildingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchBuildings();
    }
  }, [session]);

  const fetchBuildings = async () => {
    try {
      const response = await fetch('/api/landlord/buildings');
      const data = await response.json();
      setBuildings(data);
    } catch (error) {
      console.error('Failed to fetch buildings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalTenants = buildings.reduce((total, building) =>
    total + building.apartments.filter(apt => apt.tenant).length, 0
  );

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {session?.user?.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here&apos;s an overview of your solar-powered properties
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Buildings</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{buildings.length}</div>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/80">Active properties</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">{totalTenants}</div>
            <p className="text-xs text-green-600/80 dark:text-green-400/80">Active contracts</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solar Savings</CardTitle>
            <Sun className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">22%</div>
            <p className="text-xs text-orange-600/80 dark:text-orange-400/80 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              vs. grid electricity
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <Euro className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">€240</div>
            <p className="text-xs text-purple-600/80 dark:text-purple-400/80">Estimated monthly</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Buildings Overview
            </CardTitle>
            <CardDescription>Manage your solar-powered properties</CardDescription>
          </CardHeader>
          <CardContent>
            {buildings.length === 0 ? (
              <div className="text-center py-8">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No buildings found</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Add your first property to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {buildings.map((building) => (
                  <div key={building.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{building.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{building.address}</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full">
                        Solar Active
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{building.apartments.length} apartments</span>
                      <span>
                        {building.apartments.filter(apt => apt.tenant).length} occupied
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Tenant Overview
            </CardTitle>
            <CardDescription>Current tenant status and energy consumption</CardDescription>
          </CardHeader>
          <CardContent>
            {totalTenants === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No tenants found</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Tenants will appear here when they move in</p>
              </div>
            ) : (
              <div className="space-y-4">
                {buildings.flatMap(building =>
                  building.apartments
                    .filter(apt => apt.tenant)
                    .map(apartment => (
                      <div key={apartment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{apartment.tenant?.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {building.name} - {apartment.apartmentNumber}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-green-600 dark:text-green-400">
                              €18/month saved
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              with solar
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest updates from your properties</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Sun className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Solar system generating optimal power</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Musterstraße Building - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Euro className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Monthly billing cycle completed</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">All tenants invoiced - Yesterday</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}