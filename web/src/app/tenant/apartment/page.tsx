'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  MapPin,
  Sun,
  Zap,
  Gauge,
  Building2,
  Users,
  Calendar,
  Phone,
  Mail,
  Wrench,
  Info,
  Activity,
  Battery,
  Thermometer,
  Wifi
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

export default function ApartmentPage() {
  const { data: session } = useSession();
  const [tenantData, setTenantData] = useState<TenantData | null>(null);
  const [loading, setLoading] = useState(true);

  // Sample apartment data
  const apartmentData = {
    details: {
      size: '75 m²',
      rooms: '2.5',
      floor: 'Ground Floor',
      balcony: 'Yes',
      parking: 'Included',
      moveInDate: '2025-08-01'
    },
    building: {
      yearBuilt: 2022,
      totalUnits: 8,
      solarInstalled: '2025-07-15',
      solarCapacity: '45 kWp',
      energyRating: 'A+',
      heatingType: 'Heat Pump'
    },
    meter: {
      serialNumber: 'SM-2025-089432',
      installDate: '2025-07-20',
      type: 'Smart Meter',
      readingFrequency: '15 minutes',
      lastReading: '2025-09-14 14:30',
      totalReading: '2,847 kWh'
    },
    services: {
      internet: { provider: 'Deutsche Telekom', speed: '100 Mbps', included: false },
      heating: { type: 'Central Heat Pump', included: true },
      water: { type: 'Central Hot Water', included: true },
      waste: { type: 'Municipal Collection', included: true }
    },
    contact: {
      landlord: {
        name: 'Schmidt Immobilien GmbH',
        phone: '+49 30 12345678',
        email: 'service@schmidt-immobilien.de',
        address: 'Hauptstraße 123, 10115 Berlin'
      },
      property: {
        name: 'Herr Weber',
        phone: '+49 30 87654321',
        email: 'weber@schmidt-immobilien.de'
      },
      emergency: {
        name: 'Emergency Hotline',
        phone: '+49 30 99999999',
        email: 'emergency@schmidt-immobilien.de'
      }
    },
    solarSystem: {
      panels: '180 panels',
      inverter: '3x SMA Sunny Tripower 15000TL',
      monitoring: 'Real-time via SMA portal',
      warranty: 'Until 2045 (20 years)',
      efficiency: '94%',
      currentProduction: '12.4 kW'
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
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading apartment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Apartment
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Detailed information about your apartment and building
        </p>
      </div>

      {/* Apartment Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Apartment Details
            </CardTitle>
            <CardDescription>Your living space information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tenantData?.apartment && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="font-semibold text-lg">{tenantData.apartment.building.name}</div>
                  <div className="text-gray-600 dark:text-gray-400 flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {tenantData.apartment.building.address}
                  </div>
                  <div className="text-sm text-blue-600 mt-2">
                    Apartment {tenantData.apartment.apartmentNumber}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Size</span>
                    <span className="font-medium">{apartmentData.details.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Rooms</span>
                    <span className="font-medium">{apartmentData.details.rooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Floor</span>
                    <span className="font-medium">{apartmentData.details.floor}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Balcony</span>
                    <span className="font-medium">{apartmentData.details.balcony}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Parking</span>
                    <span className="font-medium">{apartmentData.details.parking}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Move-in</span>
                    <span className="font-medium">{apartmentData.details.moveInDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Building Information
            </CardTitle>
            <CardDescription>Details about your residential building</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Built</span>
                    <span className="font-medium">{apartmentData.building.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Units</span>
                    <span className="font-medium">{apartmentData.building.totalUnits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Heating</span>
                    <span className="font-medium">{apartmentData.building.heatingType}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Energy Rating</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      {apartmentData.building.energyRating}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Solar Capacity</span>
                    <span className="font-medium">{apartmentData.building.solarCapacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Solar Since</span>
                    <span className="font-medium">{apartmentData.building.solarInstalled}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center">
                  <Sun className="h-4 w-4 text-green-600 mr-2" />
                  <div className="text-sm text-green-800 dark:text-green-400">
                    This building is equipped with a modern solar energy system, allowing you to benefit from clean, renewable energy directly from your rooftop!
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Meter & Solar System */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gauge className="h-5 w-5 mr-2" />
              Smart Meter
            </CardTitle>
            <CardDescription>Your energy measurement system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Serial Number</div>
                    <div className="text-sm text-gray-600">{apartmentData.meter.serialNumber}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">Current Reading</div>
                    <div className="text-sm text-gray-600">{apartmentData.meter.totalReading}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className="font-medium">{apartmentData.meter.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Installed</span>
                    <span className="font-medium">{apartmentData.meter.installDate}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Reading Freq.</span>
                    <span className="font-medium">{apartmentData.meter.readingFrequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Reading</span>
                    <span className="font-medium text-xs">{apartmentData.meter.lastReading}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 text-blue-600 mr-2" />
                  <div className="text-sm text-gray-800 dark:text-gray-300">
                    Your smart meter automatically records energy usage every 15 minutes, enabling accurate solar vs grid energy tracking.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sun className="h-5 w-5 mr-2" />
              Solar System
            </CardTitle>
            <CardDescription>Rooftop solar installation details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Current Output</div>
                    <div className="text-sm text-gray-600">Real-time generation</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg text-yellow-600">{apartmentData.solarSystem.currentProduction}</div>
                    <div className="text-sm text-yellow-600">Live now</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Panels</span>
                  <span className="font-medium">{apartmentData.solarSystem.panels}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Inverter</span>
                  <span className="font-medium text-xs">{apartmentData.solarSystem.inverter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Efficiency</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    {apartmentData.solarSystem.efficiency}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Warranty</span>
                  <span className="font-medium text-sm">{apartmentData.solarSystem.warranty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Monitoring</span>
                  <span className="font-medium text-sm">{apartmentData.solarSystem.monitoring}</span>
                </div>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center">
                  <Battery className="h-4 w-4 text-green-600 mr-2" />
                  <div className="text-sm text-green-800 dark:text-green-400">
                    High-efficiency solar system with 20-year warranty. Real-time monitoring ensures optimal performance.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services & Utilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wrench className="h-5 w-5 mr-2" />
            Services & Utilities
          </CardTitle>
          <CardDescription>Available services and utility connections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Wifi className="h-5 w-5 text-blue-500" />
                <Badge variant={apartmentData.services.internet.included ? "default" : "secondary"}>
                  {apartmentData.services.internet.included ? "Included" : "Optional"}
                </Badge>
              </div>
              <div className="font-semibold">Internet</div>
              <div className="text-sm text-gray-600">{apartmentData.services.internet.provider}</div>
              <div className="text-sm text-gray-600">{apartmentData.services.internet.speed}</div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Thermometer className="h-5 w-5 text-orange-500" />
                <Badge variant={apartmentData.services.heating.included ? "default" : "secondary"}>
                  {apartmentData.services.heating.included ? "Included" : "Extra"}
                </Badge>
              </div>
              <div className="font-semibold">Heating</div>
              <div className="text-sm text-gray-600">{apartmentData.services.heating.type}</div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <Badge variant={apartmentData.services.water.included ? "default" : "secondary"}>
                  {apartmentData.services.water.included ? "Included" : "Extra"}
                </Badge>
              </div>
              <div className="font-semibold">Hot Water</div>
              <div className="text-sm text-gray-600">{apartmentData.services.water.type}</div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Home className="h-5 w-5 text-green-500" />
                <Badge variant={apartmentData.services.waste.included ? "default" : "secondary"}>
                  {apartmentData.services.waste.included ? "Included" : "Extra"}
                </Badge>
              </div>
              <div className="font-semibold">Waste</div>
              <div className="text-sm text-gray-600">{apartmentData.services.waste.type}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Contact Information
          </CardTitle>
          <CardDescription>Important contacts for your apartment and building</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Landlord Contact */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center">
                <Building2 className="h-4 w-4 mr-2" />
                Landlord
              </h3>
              <div className="space-y-2 text-sm">
                <div className="font-medium">{apartmentData.contact.landlord.name}</div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-3 w-3 mr-2" />
                  {apartmentData.contact.landlord.phone}
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-3 w-3 mr-2" />
                  {apartmentData.contact.landlord.email}
                </div>
                <div className="text-gray-600 text-xs">
                  {apartmentData.contact.landlord.address}
                </div>
              </div>
            </div>

            {/* Property Manager */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Property Manager
              </h3>
              <div className="space-y-2 text-sm">
                <div className="font-medium">{apartmentData.contact.property.name}</div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-3 w-3 mr-2" />
                  {apartmentData.contact.property.phone}
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-3 w-3 mr-2" />
                  {apartmentData.contact.property.email}
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                <Calendar className="h-3 w-3 mr-2" />
                Schedule Visit
              </Button>
            </div>

            {/* Emergency Contact */}
            <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-900/20 border-red-200">
              <h3 className="font-semibold mb-3 flex items-center text-red-800 dark:text-red-400">
                <Phone className="h-4 w-4 mr-2" />
                Emergency
              </h3>
              <div className="space-y-2 text-sm">
                <div className="font-medium text-red-800 dark:text-red-400">{apartmentData.contact.emergency.name}</div>
                <div className="flex items-center text-red-700 dark:text-red-300">
                  <Phone className="h-3 w-3 mr-2" />
                  {apartmentData.contact.emergency.phone}
                </div>
                <div className="flex items-center text-red-700 dark:text-red-300">
                  <Mail className="h-3 w-3 mr-2" />
                  {apartmentData.contact.emergency.email}
                </div>
              </div>
              <div className="mt-3 p-2 bg-red-100 dark:bg-red-900/30 rounded text-xs text-red-800 dark:text-red-400">
                For urgent issues only (water leaks, electrical problems, heating failures)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="h-5 w-5 mr-2" />
            Useful Resources
          </CardTitle>
          <CardDescription>Quick access to apartment-related information and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="flex flex-col h-20">
              <Home className="h-4 w-4 mb-2" />
              <span className="text-xs">House Rules</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-20">
              <Wrench className="h-4 w-4 mb-2" />
              <span className="text-xs">Maintenance</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-20">
              <Users className="h-4 w-4 mb-2" />
              <span className="text-xs">Neighbors</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-20">
              <Calendar className="h-4 w-4 mb-2" />
              <span className="text-xs">Events</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}