'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, MapPin, Users, Plus, Eye, Edit } from 'lucide-react';

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

export default function BuildingsPage() {
  const [buildings, setBuildings] = useState<BuildingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuildings();
  }, []);

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
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading buildings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Buildings Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your solar-powered properties</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Building
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Buildings</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buildings.length}</div>
            <p className="text-xs text-muted-foreground">Active properties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {buildings.reduce((total, building) => total + building.apartments.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Rental units</p>
          </CardContent>
        </Card>

      </div>

      {/* Buildings List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {buildings.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="text-center py-12">
              <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No buildings yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Add your first property to start managing your solar-powered buildings
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Building
              </Button>
            </CardContent>
          </Card>
        ) : (
          buildings.map((building) => (
            <Card key={building.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2" />
                      {building.name}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {building.address}
                    </CardDescription>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full">
                    Solar Active
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Building Stats */}
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Total Units</p>
                      <p className="font-semibold">{building.apartments.length}</p>
                    </div>
                  </div>

                  {/* Apartments List */}
                  <div>
                    <h4 className="font-medium mb-2">Apartments</h4>
                    <div className="space-y-2">
                      {building.apartments.map((apartment) => (
                        <div
                          key={apartment.id}
                          className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded"
                        >
                          <span className="text-sm">{apartment.apartmentNumber}</span>
                          {apartment.tenant && (
                            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                              {apartment.tenant.name}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}