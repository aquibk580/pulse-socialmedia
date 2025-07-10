import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BreadcrumbNav } from '@/components/Admin/breadcrumb-nav';
import { Download, FileText, Calendar, TrendingUp, Users, ShoppingCart } from 'lucide-react';

const reports = [
  {
    id: 'RPT-001',
    name: 'Monthly Sales Report',
    type: 'Sales',
    status: 'Ready',
    lastGenerated: '2024-01-15 10:30 AM',
    size: '2.4 MB',
  },
  {
    id: 'RPT-002',
    name: 'User Activity Report',
    type: 'Analytics',
    status: 'Processing',
    lastGenerated: '2024-01-14 3:45 PM',
    size: '1.8 MB',
  },
  {
    id: 'RPT-003',
    name: 'Inventory Report',
    type: 'Inventory',
    status: 'Ready',
    lastGenerated: '2024-01-13 9:15 AM',
    size: '3.2 MB',
  },
  {
    id: 'RPT-004',
    name: 'Financial Summary',
    type: 'Financial',
    status: 'Failed',
    lastGenerated: '2024-01-12 2:20 PM',
    size: '-',
  },
  {
    id: 'RPT-005',
    name: 'Customer Insights',
    type: 'Analytics',
    status: 'Ready',
    lastGenerated: '2024-01-11 11:00 AM',
    size: '4.1 MB',
  },
];

const statusColors = {
  Ready: 'default',
  Processing: 'secondary',
  Failed: 'destructive',
  Scheduled: 'outline',
};

const reportTypes = [
  {
    title: 'Sales Reports',
    description: 'Revenue, orders, and sales performance',
    icon: TrendingUp,
    color: 'text-green-600',
  },
  {
    title: 'User Reports',
    description: 'User activity, engagement, and demographics',
    icon: Users,
    color: 'text-blue-600',
  },
  {
    title: 'Inventory Reports',
    description: 'Stock levels, product performance',
    icon: ShoppingCart,
    color: 'text-purple-600',
  },
  {
    title: 'Financial Reports',
    description: 'Revenue, expenses, and profit analysis',
    icon: FileText,
    color: 'text-orange-600',
  },
];

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <BreadcrumbNav items={[{ title: 'Reports' }]} />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reportTypes.map((type) => (
          <Card key={type.title} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{type.title}</CardTitle>
              <type.icon className={`h-4 w-4 ${type.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{type.description}</p>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Generate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Generated</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>
                    <Badge variant={statusColors[report.status as keyof typeof statusColors] as any}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.lastGenerated}</TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {report.status === 'Ready' && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-green-600 font-medium">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-blue-600 font-medium">Active schedules</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 GB</div>
            <p className="text-xs text-muted-foreground">of 10 GB limit</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}