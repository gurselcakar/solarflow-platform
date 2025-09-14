'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Settings,
  User,
  Moon,
  Save,
  Mail,
  CreditCard,
  Shield
} from 'lucide-react';

export default function SettingsPage() {
  const { data: session } = useSession();

  // Simplified settings data for demo
  const [settings, setSettings] = useState({
    profile: {
      name: session?.user?.name || 'Max Mustermann',
      email: session?.user?.email || 'max@example.com',
      language: 'de'
    },
    notifications: {
      billReady: true,
      paymentDue: true,
      energyAlerts: false,
      solarUpdates: true
    },
    appearance: {
      darkMode: false,
      language: 'de'
    },
    billing: {
      autoPayEnabled: false,
      paperBills: false
    }
  });

  const handleSave = () => {
    // Handle settings save
    console.log('Settings saved successfully!');
  };

  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const languages = [
    { value: 'de', label: 'Deutsch' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account preferences and notifications
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Profile
          </CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={settings.profile.name}
                onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Select
                value={settings.profile.language}
                onValueChange={(value) => handleInputChange('profile', 'language', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={settings.profile.email}
              onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
              placeholder="your@email.com"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Dashboard Preferences
            </CardTitle>
            <CardDescription>Customize your dashboard experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Auto-refresh Data</Label>
                  <p className="text-xs text-gray-500">Automatically update energy consumption data</p>
                </div>
                <Switch
                  checked={settings.notifications.billReady}
                  onCheckedChange={(checked) => handleInputChange('notifications', 'billReady', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Show Detailed Metrics</Label>
                  <p className="text-xs text-gray-500">Display advanced energy analytics</p>
                </div>
                <Switch
                  checked={settings.notifications.paymentDue}
                  onCheckedChange={(checked) => handleInputChange('notifications', 'paymentDue', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Energy Efficiency Tips</Label>
                  <p className="text-xs text-gray-500">Show optimization suggestions</p>
                </div>
                <Switch
                  checked={settings.notifications.energyAlerts}
                  onCheckedChange={(checked) => handleInputChange('notifications', 'energyAlerts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Solar Updates</Label>
                  <p className="text-xs text-gray-500">Solar system performance updates</p>
                </div>
                <Switch
                  checked={settings.notifications.solarUpdates}
                  onCheckedChange={(checked) => handleInputChange('notifications', 'solarUpdates', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance & Billing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Preferences
            </CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center">
                  <Moon className="h-4 w-4 mr-2" />
                  <div>
                    <Label className="text-sm font-medium">Dark Mode</Label>
                    <p className="text-xs text-gray-500">Use dark theme</p>
                  </div>
                </div>
                <Switch
                  checked={settings.appearance.darkMode}
                  onCheckedChange={(checked) => handleInputChange('appearance', 'darkMode', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <div>
                    <Label className="text-sm font-medium">Auto-pay</Label>
                    <p className="text-xs text-gray-500">Automatic payments (2% discount)</p>
                  </div>
                </div>
                <Switch
                  checked={settings.billing.autoPayEnabled}
                  onCheckedChange={(checked) => handleInputChange('billing', 'autoPayEnabled', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <div>
                    <Label className="text-sm font-medium">Paper Bills</Label>
                    <p className="text-xs text-gray-500">Receive printed bills by mail</p>
                  </div>
                </div>
                <Switch
                  checked={settings.billing.paperBills}
                  onCheckedChange={(checked) => handleInputChange('billing', 'paperBills', checked)}
                />
              </div>
            </div>

            <div className="pt-2">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-blue-600 mr-2" />
                  <div className="text-sm text-blue-800 dark:text-blue-400">
                    Your data is protected according to GDPR regulations.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}