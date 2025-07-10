import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, FileText, Settings, ShoppingCart } from 'lucide-react';

const actions = [
  {
    title: 'Add New User',
    icon: Users,
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    title: 'Create Order',
    icon: ShoppingCart,
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    title: 'Generate Report',
    icon: FileText,
    color: 'bg-purple-500 hover:bg-purple-600',
  },
  {
    title: 'System Settings',
    icon: Settings,
    color: 'bg-orange-500 hover:bg-orange-600',
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="justify-start h-12"
            >
              <action.icon className="h-4 w-4 mr-3" />
              {action.title}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}