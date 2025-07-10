import { StatsCards } from '@/components/Admin/dashboard/stats-cards';
import { OverviewChart } from '@/components/Admin/dashboard/overview-chart';
import { RecentActivity } from '@/components/Admin/dashboard/recent-activity';
import { QuickActions } from '@/components/Admin/dashboard/quick-actions';
import { BreadcrumbNav } from '@/components/Admin/breadcrumb-nav';

export function Dashboard() {
  return (
    <div className="w-full max-w-none space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <BreadcrumbNav items={[{ title: 'Dashboard' }]} />
        </div>
      </div>

      <StatsCards />
      <OverviewChart />
      
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  );
}