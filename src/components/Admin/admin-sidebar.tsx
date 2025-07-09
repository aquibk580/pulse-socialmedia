"use client"

import type * as React from "react"
import {
  BarChart3,
  Users,
  FileText,
  AlertTriangle,
  Settings,
  Bell,
  Shield,
  MessageSquare,
  Home,
  ChevronDown,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/admin",
  },
  {
    title: "User Management",
    icon: Users,
    items: [
      { title: "All Users", url: "/admin/users" },
      { title: "Roles & Permissions", url: "/admin/users/roles" },
      { title: "Verification Requests", url: "/admin/users/verification" },
    ],
  },
  {
    title: "Content Management",
    icon: FileText,
    items: [
      { title: "All Posts", url: "/admin/content/posts" },
      { title: "Comments", url: "/admin/content/comments" },
      { title: "Stories", url: "/admin/content/stories" },
      { title: "Featured Content", url: "/admin/content/featured" },
    ],
  },
  {
    title: "Reports & Moderation",
    icon: AlertTriangle,
    items: [
      { title: "Reported Content", url: "/admin/reports/content" },
      { title: "Reported Users", url: "/admin/reports/users" },
      { title: "Moderation Queue", url: "/admin/reports/queue" },
      { title: "AutoMod Settings", url: "/admin/reports/automod" },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    items: [
      { title: "Growth Metrics", url: "/admin/analytics/growth" },
      { title: "Content Stats", url: "/admin/analytics/content" },
      { title: "Engagement", url: "/admin/analytics/engagement" },
      { title: "Real-time", url: "/admin/analytics/realtime" },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    items: [
      { title: "Login History", url: "/admin/security/logins" },
      { title: "IP Blacklist", url: "/admin/security/blacklist" },
      { title: "Admin Logs", url: "/admin/security/logs" },
      { title: "2FA Management", url: "/admin/security/2fa" },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    url: "/admin/notifications",
  },
  {
    title: "Feedback & Support",
    icon: MessageSquare,
    items: [
      { title: "User Feedback", url: "/admin/support/feedback" },
      { title: "Contact Requests", url: "/admin/support/contacts" },
      { title: "Support Tickets", url: "/admin/support/tickets" },
    ],
  },
  {
    title: "App Settings",
    icon: Settings,
    items: [
      { title: "General", url: "/admin/settings/general" },
      { title: "Privacy & Terms", url: "/admin/settings/privacy" },
      { title: "Feature Toggles", url: "/admin/settings/features" },
      { title: "Maintenance", url: "/admin/settings/maintenance" },
    ],
  },
]

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center space-x-2 px-2 py-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SM</span>
          </div>
          <div>
            <h2 className="font-semibold text-sidebar-foreground">Social Media</h2>
            <p className="text-xs text-sidebar-foreground/70">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                if (item.items) {
                  return (
                    <Collapsible key={item.title} defaultOpen className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto w-4 h-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.url}>{subItem.title}</a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
