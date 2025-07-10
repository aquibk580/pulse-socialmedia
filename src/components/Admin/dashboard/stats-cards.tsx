import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingCart, TrendingUp, DollarSign } from 'lucide-react';

const stats = [
  {
    title: 'Total Users',
    value: '12,345',
    change: '+12.5%',
    icon: Users,
    color: 'text-blue-600',
  },
  {
    title: 'Total Orders',
    value: '8,901',
    change: '+8.2%',
    icon: ShoppingCart,
    color: 'text-green-600',
  },
  {
    title: 'Revenue',
    value: '$45,678',
    change: '+15.3%',
    icon: DollarSign,
    color: 'text-purple-600',
  },
  {
    title: 'Growth',
    value: '23.4%',
    change: '+3.1%',
    icon: TrendingUp,
    color: 'text-orange-600',
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-green-600 font-medium">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}