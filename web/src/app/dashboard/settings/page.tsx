'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  User,
  Sun,
  Save
} from 'lucide-react';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account and system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Settings */}
        <div className="space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    defaultValue={session?.user?.name?.split(' ')[0] || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    defaultValue={session?.user?.name?.split(' ')[1] || ''}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  defaultValue={session?.user?.email || ''}
                />
              </div>


              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Solar System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sun className="h-5 w-5 mr-2" />
                Solar System Settings
              </CardTitle>
              <CardDescription>Basic solar energy configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="solarRate">Energy Rate (€/kWh)</Label>
                <Input
                  id="solarRate"
                  type="number"
                  step="0.01"
                  defaultValue="0.25"
                />
              </div>

              <div>
                <Label htmlFor="systemCapacity">System Capacity (kW)</Label>
                <Input
                  id="systemCapacity"
                  type="number"
                  defaultValue="12.5"
                />
              </div>

              <Button variant="outline">
                <Sun className="h-4 w-4 mr-2" />
                Update Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <div className="space-y-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Configure system-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-refresh Dashboard</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Automatically update energy data</p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}