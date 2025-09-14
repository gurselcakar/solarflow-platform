'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Building2,
  Euro,
  Sun,
  Mail,
  MapPin,
} from 'lucide-react';

interface Tenant {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  tenantApartment?: {
    id: string;
    apartmentNumber: string;
    meterColumn: string;
    building: {
      id: string;
      name: string;
      address: string;
    };
  };
}

interface VacantApartment {
  id: string;
  apartmentNumber: string;
  meterColumn: string;
  building: {
    id: string;
    name: string;
    address: string;
  };
}

interface TenantFormData {
  name: string;
  email: string;
  apartmentId: string;
}

export default function TenantsPage() {
  const { data: session } = useSession();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [vacantApartments, setVacantApartments] = useState<VacantApartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [formData, setFormData] = useState<TenantFormData>({
    name: '',
    email: '',
    apartmentId: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (session?.user) {
      fetchTenants();
    }
  }, [session]);

  const fetchTenants = async () => {
    try {
      const response = await fetch('/api/landlord/tenants');
      if (!response.ok) {
        throw new Error('Failed to fetch tenants');
      }
      const data = await response.json();
      setTenants(data.tenants || []);
      setVacantApartments(data.vacantApartments || []);
    } catch (error) {
      console.error('Failed to fetch tenants:', error);
      setError('Failed to load tenants');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/landlord/tenants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add tenant');
      }

      await fetchTenants(); // Refresh the list
      setIsAddDialogOpen(false);
      setFormData({ name: '', email: '', apartmentId: '' });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTenant) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/landlord/tenants/${editingTenant.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update tenant');
      }

      await fetchTenants(); // Refresh the list
      setIsEditDialogOpen(false);
      setEditingTenant(null);
      setFormData({ name: '', email: '', apartmentId: '' });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTenant = async (tenantId: string) => {
    try {
      const response = await fetch(`/api/landlord/tenants/${tenantId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to remove tenant');
      }

      await fetchTenants(); // Refresh the list
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const openEditDialog = (tenant: Tenant) => {
    setEditingTenant(tenant);
    setFormData({
      name: tenant.name,
      email: tenant.email,
      apartmentId: tenant.tenantApartment?.id || '',
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', apartmentId: '' });
    setError(null);
  };

  const getAllAvailableApartments = () => {
    const available = [...vacantApartments];

    // If editing, also include the current apartment
    if (editingTenant?.tenantApartment) {
      available.push({
        id: editingTenant.tenantApartment.id,
        apartmentNumber: editingTenant.tenantApartment.apartmentNumber,
        meterColumn: editingTenant.tenantApartment.meterColumn,
        building: editingTenant.tenantApartment.building,
      });
    }

    return available;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading tenants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tenant Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage tenants across all your solar-powered properties
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Tenant</DialogTitle>
              <DialogDescription>
                Add a tenant to one of your vacant apartments.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddTenant} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter tenant's full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter tenant's email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="apartmentId">Apartment</Label>
                <Select
                  value={formData.apartmentId}
                  onValueChange={(value) => setFormData({ ...formData, apartmentId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an apartment" />
                  </SelectTrigger>
                  <SelectContent>
                    {vacantApartments.map((apartment) => (
                      <SelectItem key={apartment.id} value={apartment.id}>
                        {apartment.building.name} - {apartment.apartmentNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Adding...' : 'Add Tenant'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {tenants.length}
            </div>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/80">
              Active contracts
            </p>
          </CardContent>
        </Card>


        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Solar Savings</CardTitle>
            <Sun className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
              €18/mo
            </div>
            <p className="text-xs text-orange-600/80 dark:text-orange-400/80">
              22% cost reduction
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tenants List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Active Tenants
          </CardTitle>
          <CardDescription>
            Manage tenant information and apartment assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tenants.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No tenants found</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Add your first tenant to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {tenants.map((tenant) => (
                <div
                  key={tenant.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {tenant.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {tenant.tenantApartment?.meterColumn === 'we1_consumption_kWh'
                            ? 'Meter 1'
                            : 'Meter 2'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {tenant.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          {tenant.tenantApartment ? (
                            `${tenant.tenantApartment.building.name} - ${tenant.tenantApartment.apartmentNumber}`
                          ) : (
                            'No apartment assigned'
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {tenant.tenantApartment?.building.address || 'N/A'}
                        </div>
                        <div className="flex items-center gap-2">
                          <Euro className="h-4 w-4" />
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            €18/mo saved
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(tenant)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Tenant</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove {tenant.name} from their apartment?
                              This will make the apartment vacant and available for new tenants.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteTenant(tenant.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Remove Tenant
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tenant</DialogTitle>
            <DialogDescription>
              Update tenant information and apartment assignment.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditTenant} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter tenant's full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter tenant's email"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-apartmentId">Apartment</Label>
              <Select
                value={formData.apartmentId}
                onValueChange={(value) => setFormData({ ...formData, apartmentId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an apartment" />
                </SelectTrigger>
                <SelectContent>
                  {getAllAvailableApartments().map((apartment) => (
                    <SelectItem key={apartment.id} value={apartment.id}>
                      {apartment.building.name} - {apartment.apartmentNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Updating...' : 'Update Tenant'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}