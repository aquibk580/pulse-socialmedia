import { Button } from '@/components/ui/button';
import { UsersTable } from '@/components/Admin/users/users-table';
import { BreadcrumbNav } from '@/components/Admin/breadcrumb-nav';
import { Plus, Download, Filter } from 'lucide-react';

export function Users() {
  return (
    <div className="w-full max-w-none space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <BreadcrumbNav items={[{ title: 'Users' }]} />
        </div>
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <UsersTable />
    </div>
  );
}