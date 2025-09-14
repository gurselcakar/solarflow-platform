'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Receipt,
  Euro,
  Download,
  Send,
  Eye,
  Plus,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const invoices = [
  {
    id: 'INV-2024-001',
    tenant: 'Tenant 1',
    apartment: 'EG rechts',
    amount: 145.50,
    dueDate: '2024-01-15',
    status: 'paid',
    issueDate: '2023-12-15',
    energyUsed: 320
  },
  {
    id: 'INV-2024-002',
    tenant: 'Tenant 2',
    apartment: 'EG links',
    amount: 128.75,
    dueDate: '2024-01-15',
    status: 'pending',
    issueDate: '2023-12-15',
    energyUsed: 285
  },
  {
    id: 'INV-2023-024',
    tenant: 'Tenant 1',
    apartment: 'EG rechts',
    amount: 162.30,
    dueDate: '2023-12-15',
    status: 'overdue',
    issueDate: '2023-11-15',
    energyUsed: 365
  }
];

export default function BillingPage() {
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === 'paid');
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending');
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing & Invoices</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage tenant billing and payments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Euro className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              €{totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-green-600/80 dark:text-green-400/80">Last 3 months</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paidInvoices.length}</div>
            <p className="text-xs text-muted-foreground">
              €{paidInvoices.reduce((sum, inv) => sum + inv.amount, 0).toFixed(2)} collected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingInvoices.length}</div>
            <p className="text-xs text-muted-foreground">
              €{pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0).toFixed(2)} outstanding
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueInvoices.length}</div>
            <p className="text-xs text-muted-foreground">
              €{overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0).toFixed(2)} overdue
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Receipt className="h-5 w-5 mr-2" />
            Recent Invoices
          </CardTitle>
          <CardDescription>Manage tenant energy billing and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(invoice.status)}
                  <div>
                    <h4 className="font-medium">{invoice.id}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {invoice.tenant} - {invoice.apartment}
                    </p>
                    <p className="text-xs text-gray-500">
                      {invoice.energyUsed} kWh used • Issued {invoice.issueDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold">€{invoice.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Due: {invoice.dueDate}
                    </p>
                  </div>

                  {getStatusBadge(invoice.status)}

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    {invoice.status === 'pending' && (
                      <Button variant="outline" size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing Settings & Energy Costs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Energy Pricing
            </CardTitle>
            <CardDescription>Current energy costs and solar savings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <p className="font-medium">Grid Electricity Rate</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Standard utility rate</p>
                </div>
                <p className="text-lg font-bold">€0.3351/kWh</p>
              </div>

              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                  <p className="font-medium">Solar Energy Rate</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your solar rate to tenants</p>
                </div>
                <p className="text-lg font-bold text-green-600">€0.26/kWh</p>
              </div>

              <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div>
                  <p className="font-medium">Feed-in Tariff</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Grid feed-back rate</p>
                </div>
                <p className="text-lg font-bold text-orange-600">€0.08/kWh</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Billing Summary</CardTitle>
            <CardDescription>Breakdown of this month&apos;s energy charges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Solar Energy Consumed</span>
                <span className="font-medium">2,234 kWh × €0.26</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Tenant Charges</span>
                <span className="font-bold">€580.84</span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between items-center">
                <span className="text-sm">Grid Feed-in Revenue</span>
                <span className="font-medium">613 kWh × €0.08</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Feed-in Income</span>
                <span className="font-bold text-green-600">+€49.04</span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Net Monthly Revenue</span>
                <span className="font-bold text-green-600">€629.88</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}