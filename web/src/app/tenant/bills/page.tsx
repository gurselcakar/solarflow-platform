'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Receipt,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Euro,
  Sun,
  Zap,
  Calendar,
  CreditCard,
  Mail,
  FileText,
  TrendingUp,
  Info
} from 'lucide-react';

export default function BillsPage() {
  // Sample bills data based on hackathon dataset
  const billsData = {
    current: {
      id: 'INV-2025-009',
      month: 'September 2025',
      dueDate: '2025-10-15',
      issueDate: '2025-09-30',
      status: 'pending',
      amount: 81.44,
      breakdown: {
        baseFee: 10.00,
        solarEnergy: { kwh: 142, rate: 0.26, cost: 36.92 },
        gridEnergy: { kwh: 103, rate: 0.3351, cost: 34.52 }
      },
      savings: 18.50,
      consumption: 245,
      solarPercentage: 58
    },
    history: [
      {
        id: 'INV-2025-008',
        month: 'August 2025',
        amount: 78.30,
        status: 'paid',
        paidDate: '2025-09-10',
        consumption: 238,
        solarPercentage: 60,
        savings: 20.15
      },
      {
        id: 'INV-2025-007',
        month: 'July 2025',
        amount: 85.60,
        status: 'paid',
        paidDate: '2025-08-12',
        consumption: 265,
        solarPercentage: 55,
        savings: 17.80
      },
      {
        id: 'INV-2025-006',
        month: 'June 2025',
        amount: 83.25,
        status: 'paid',
        paidDate: '2025-07-08',
        consumption: 251,
        solarPercentage: 57,
        savings: 19.25
      },
      {
        id: 'INV-2025-005',
        month: 'May 2025',
        amount: 79.40,
        status: 'paid',
        paidDate: '2025-06-11',
        consumption: 240,
        solarPercentage: 61,
        savings: 21.10
      },
      {
        id: 'INV-2025-004',
        month: 'April 2025',
        amount: 76.85,
        status: 'paid',
        paidDate: '2025-05-09',
        consumption: 232,
        solarPercentage: 63,
        savings: 22.35
      }
    ],
    yearToDate: {
      totalBills: 483.84,
      totalSavings: 119.15,
      avgMonthly: 80.64,
      totalConsumption: 1471,
      avgSolarPercentage: 59
    }
  };

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
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Receipt className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Bills
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your energy bills and payment history
          </p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bills</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Year to Date Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bills YTD</CardTitle>
            <Euro className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              €{billsData.yearToDate.totalBills.toFixed(0)}
            </div>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/80">
              {billsData.history.length + 1} bills this year
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saved YTD</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              €{billsData.yearToDate.totalSavings.toFixed(0)}
            </div>
            <p className="text-xs text-green-600/80 dark:text-green-400/80">
              with solar energy
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Monthly</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
              €{billsData.yearToDate.avgMonthly.toFixed(0)}
            </div>
            <p className="text-xs text-orange-600/80 dark:text-orange-400/80">
              average bill amount
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Solar Usage</CardTitle>
            <Sun className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
              {billsData.yearToDate.avgSolarPercentage}%
            </div>
            <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80">
              solar energy share
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Current Bill Detail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Receipt className="h-5 w-5 mr-2" />
              Current Bill - {billsData.current.month}
            </div>
            {getStatusBadge(billsData.current.status)}
          </CardTitle>
          <CardDescription>
            Due: {billsData.current.dueDate} • Issued: {billsData.current.issueDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bill Breakdown */}
            <div>
              <h3 className="font-semibold mb-3">Bill Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Monthly Base Fee</span>
                  <span className="font-medium">€{billsData.current.breakdown.baseFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm flex items-center">
                      <Sun className="h-4 w-4 mr-1 text-yellow-500" />
                      Solar Energy
                    </span>
                    <div className="text-xs text-green-600">
                      {billsData.current.breakdown.solarEnergy.kwh} kWh × €{billsData.current.breakdown.solarEnergy.rate}
                    </div>
                  </div>
                  <span className="font-medium text-green-600">€{billsData.current.breakdown.solarEnergy.cost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm flex items-center">
                      <Zap className="h-4 w-4 mr-1 text-gray-500" />
                      Grid Energy
                    </span>
                    <div className="text-xs text-gray-500">
                      {billsData.current.breakdown.gridEnergy.kwh} kWh × €{billsData.current.breakdown.gridEnergy.rate}
                    </div>
                  </div>
                  <span className="font-medium">€{billsData.current.breakdown.gridEnergy.cost.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total Amount</span>
                  <span>€{billsData.current.amount.toFixed(2)}</span>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">
                    You saved €{billsData.current.savings.toFixed(2)} this month!
                  </div>
                  <div className="text-xs text-green-600/80 dark:text-green-400/80">
                    Thanks to {billsData.current.solarPercentage}% solar energy usage
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Bill Details
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Bill Copy
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Set up Auto-pay
                </Button>
              </div>

              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-start">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
                  <div className="text-sm text-blue-800 dark:text-blue-400">
                    <strong>Payment Info:</strong> Bills are due 15 days after issue date.
                    Set up auto-pay to never miss a payment and get a 2% discount!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bill History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Payment History
          </CardTitle>
          <CardDescription>Your past energy bills and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billsData.history.map((bill) => (
              <div
                key={bill.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(bill.status)}
                  <div>
                    <h4 className="font-medium">{bill.month}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {bill.id} • {bill.consumption} kWh consumed
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{bill.solarPercentage}% solar</span>
                      <span>•</span>
                      <span className="text-green-600">€{bill.savings.toFixed(2)} saved</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold">€{bill.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {bill.status === 'paid' ? `Paid: ${bill.paidDate}` : 'Pending'}
                    </p>
                  </div>

                  {getStatusBadge(bill.status)}

                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Methods
            </CardTitle>
            <CardDescription>Manage your payment options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <div className="font-medium">•••• •••• •••• 4532</div>
                    <div className="text-sm text-gray-500">Expires 08/27</div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  Default
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg border-dashed">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-xs">+</span>
                  </div>
                  <div className="text-gray-500">Add new payment method</div>
                </div>
                <Button variant="outline" size="sm">Add</Button>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-green-800 dark:text-green-400">Auto-pay Discount</div>
                    <div className="text-sm text-green-600">Save 2% on all bills</div>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Enable
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Bill Preferences
            </CardTitle>
            <CardDescription>Customize how you receive bills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-gray-500">Get notified when bills are ready</div>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Paper Bills</div>
                  <div className="text-sm text-gray-500">Receive printed bills by mail</div>
                </div>
                <Button variant="outline" size="sm">Disabled</Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Due Date Reminders</div>
                  <div className="text-sm text-gray-500">3 days before due date</div>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">💚 Go Green</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  You&apos;ve saved 12 sheets of paper this year by using digital bills.
                  That&apos;s equivalent to 0.001 trees saved!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}