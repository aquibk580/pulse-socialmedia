import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  BarChart3,
  Users,
  Settings,
  FileText,
  ShoppingCart,
  MessageSquare,
  Home,
  ChevronLeft,
  ChevronRight,
  Calendar,
  FolderOpen,
  TrendingUp,
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    title: 'Dashboard',
    icon: Home,
    href: '/admin/dashboard',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    href: '/admin/analytics',
  },
  {
    title: 'Users',
    icon: Users,
    href: '/admin/users',
  },
  {
    title: 'Orders',
    icon: ShoppingCart,
    href: '/admin/orders',
  },
  {
    title: 'Products',
    icon: FolderOpen,
    href: '/admin/products',
  },
  {
    title: 'Reports',
    icon: FileText,
    href: '/admin/reports',
  },
  {
    title: 'Messages',
    icon: MessageSquare,
    href: '/admin/messages',
  },
  {
    title: 'Calendar',
    icon: Calendar,
    href: '/admin/calendar',
  },
  {
    title: 'Insights',
    icon: TrendingUp,
    href: '/admin/insights',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/admin/settings',
  },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col border-r bg-background transition-all duration-300 shrink-0',
        isCollapsed ? 'w-16' : 'w-64',
        'lg:relative lg:translate-x-0'
      )}
    >
      {/* Logo section */}
      <div className="flex h-16 items-center justify-between px-3 border-b">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg truncate">AdminPanel</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 shrink-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center w-full h-10 px-3 rounded-md text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground group',
                  isActive
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground',
                  isCollapsed && 'justify-center px-2',
                  'relative overflow-hidden'
                )
              }
            >
              <item.icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
              {!isCollapsed && (
                <span className="ml-3 truncate">{item.title}</span>
              )}
            </NavLink>
          ))}
        </div>
      </ScrollArea>

      {/* User section */}
      <div className="border-t p-2">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">
              JD
            </span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">
                john@example.com
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}