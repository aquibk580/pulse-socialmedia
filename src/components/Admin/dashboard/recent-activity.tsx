import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const activities = [
  {
    user: 'John Smith',
    action: 'created a new order',
    time: '2 minutes ago',
    status: 'success',
  },
  {
    user: 'Sarah Johnson',
    action: 'updated profile',
    time: '5 minutes ago',
    status: 'info',
  },
  {
    user: 'Mike Wilson',
    action: 'cancelled order #1234',
    time: '10 minutes ago',
    status: 'warning',
  },
  {
    user: 'Emily Davis',
    action: 'left a review',
    time: '15 minutes ago',
    status: 'success',
  },
  {
    user: 'Alex Brown',
    action: 'requested refund',
    time: '20 minutes ago',
    status: 'destructive',
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {activity.user
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.action}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={activity.status as any}>
                  {activity.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}