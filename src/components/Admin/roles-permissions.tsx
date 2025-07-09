"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Shield, Users, Key, Plus, Edit, Trash2, MoreHorizontal, Crown, UserCheck, Eye } from "lucide-react"

export function RolesPermissions() {
  const [newRoleName, setNewRoleName] = useState("")
  const [newRoleDescription, setNewRoleDescription] = useState("")

  const roles = [
    {
      id: 1,
      name: "Super Admin",
      description: "Full access to all platform features and settings",
      userCount: 2,
      permissions: ["all"],
      color: "purple",
      isSystem: true,
    },
    {
      id: 2,
      name: "Admin",
      description: "Administrative access with some restrictions",
      userCount: 5,
      permissions: ["user_management", "content_management", "analytics", "settings"],
      color: "blue",
      isSystem: true,
    },
    {
      id: 3,
      name: "Moderator",
      description: "Content moderation and user management",
      userCount: 12,
      permissions: ["content_management", "user_moderation", "reports"],
      color: "green",
      isSystem: true,
    },
    {
      id: 4,
      name: "Support",
      description: "Customer support and ticket management",
      userCount: 8,
      permissions: ["support_tickets", "user_communication"],
      color: "orange",
      isSystem: false,
    },
  ]

  const permissions = [
    {
      category: "User Management",
      items: [
        { id: "user_management", name: "Manage Users", description: "Create, edit, and delete user accounts" },
        { id: "user_moderation", name: "User Moderation", description: "Suspend, ban, and warn users" },
        { id: "user_verification", name: "User Verification", description: "Verify user accounts" },
      ],
    },
    {
      category: "Content Management",
      items: [
        { id: "content_management", name: "Manage Content", description: "Edit and delete posts, comments" },
        { id: "content_moderation", name: "Content Moderation", description: "Review and moderate content" },
        { id: "featured_content", name: "Featured Content", description: "Manage featured posts and stories" },
      ],
    },
    {
      category: "Reports & Security",
      items: [
        { id: "reports", name: "View Reports", description: "Access user and content reports" },
        { id: "security_logs", name: "Security Logs", description: "View security and admin logs" },
        { id: "ip_management", name: "IP Management", description: "Manage IP blacklist and whitelist" },
      ],
    },
    {
      category: "Analytics & Insights",
      items: [
        { id: "analytics", name: "Analytics", description: "View platform analytics and metrics" },
        { id: "user_insights", name: "User Insights", description: "Access detailed user behavior data" },
        { id: "export_data", name: "Export Data", description: "Export analytics and user data" },
      ],
    },
    {
      category: "System & Settings",
      items: [
        { id: "settings", name: "System Settings", description: "Modify platform settings and configuration" },
        { id: "api_management", name: "API Management", description: "Manage API keys and integrations" },
        { id: "backup_restore", name: "Backup & Restore", description: "Perform system backups and restores" },
      ],
    },
    {
      category: "Communication",
      items: [
        { id: "notifications", name: "Send Notifications", description: "Send platform-wide notifications" },
        { id: "support_tickets", name: "Support Tickets", description: "Manage customer support tickets" },
        { id: "user_communication", name: "User Communication", description: "Contact users directly" },
      ],
    },
  ]

  const roleUsers = [
    {
      id: 1,
      name: "John Admin",
      email: "john@admin.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Super Admin",
      roleColor: "purple",
      lastActive: "2024-01-15 16:30:00",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Manager",
      email: "sarah@admin.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Admin",
      roleColor: "blue",
      lastActive: "2024-01-15 15:45:00",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Moderator",
      email: "mike@admin.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Moderator",
      roleColor: "green",
      lastActive: "2024-01-15 14:20:00",
      status: "active",
    },
    {
      id: 4,
      name: "Lisa Support",
      email: "lisa@admin.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Support",
      roleColor: "orange",
      lastActive: "2024-01-15 12:10:00",
      status: "inactive",
    },
  ]

  const getRoleIcon = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case "super admin":
        return <Crown className="h-4 w-4" />
      case "admin":
        return <Shield className="h-4 w-4" />
      case "moderator":
        return <UserCheck className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getRoleBadge = (role: string, color: string) => {
    const colorClasses = {
      purple: "bg-purple-100 text-purple-800",
      blue: "bg-blue-100 text-blue-800",
      green: "bg-green-100 text-green-800",
      orange: "bg-orange-100 text-orange-800",
    }

    return (
      <Badge className={colorClasses[color as keyof typeof colorClasses] || "bg-gray-100 text-gray-800"}>{role}</Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Roles & Permissions</h1>
          <p className="text-muted-foreground">Manage user roles and access permissions</p>
        </div>
      </div>

      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="users">Role Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-6">
          {/* Create New Role */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Create New Role</span>
              </CardTitle>
              <CardDescription>Define a new role with specific permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roleName">Role Name</Label>
                  <Input
                    id="roleName"
                    placeholder="e.g., Content Manager"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roleColor">Role Color</Label>
                  <Select defaultValue="blue">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="roleDescription">Description</Label>
                <Textarea
                  id="roleDescription"
                  placeholder="Describe the role and its responsibilities..."
                  value={newRoleDescription}
                  onChange={(e) => setNewRoleDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Role
              </Button>
            </CardContent>
          </Card>

          {/* Existing Roles */}
          <Card>
            <CardHeader>
              <CardTitle>Existing Roles</CardTitle>
              <CardDescription>Manage platform roles and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role) => (
                  <Card key={role.id} className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(role.name)}
                          <CardTitle className="text-lg">{role.name}</CardTitle>
                          {role.isSystem && <Badge variant="outline">System</Badge>}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Users
                            </DropdownMenuItem>
                            {!role.isSystem && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Role
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Users with this role</span>
                          <Badge variant="outline">{role.userCount}</Badge>
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm text-muted-foreground">Permissions</span>
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.slice(0, 3).map((permission) => (
                              <Badge key={permission} variant="outline" className="text-xs">
                                {permission.replace("_", " ")}
                              </Badge>
                            ))}
                            {role.permissions.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{role.permissions.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <span>Permission Management</span>
              </CardTitle>
              <CardDescription>Configure permissions for different platform features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {permissions.map((category) => (
                  <div key={category.category} className="space-y-3">
                    <h3 className="text-lg font-medium">{category.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {category.items.map((permission) => (
                        <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">{permission.name}</p>
                            <p className="text-sm text-muted-foreground">{permission.description}</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Role Assignments</CardTitle>
              <CardDescription>Manage user role assignments and access levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Current Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roleUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getRoleIcon(user.role)}
                            {getRoleBadge(user.role, user.roleColor)}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{user.lastActive}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Change Role
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Permissions
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove Access
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Assign Role */}
          <Card>
            <CardHeader>
              <CardTitle>Assign Role to User</CardTitle>
              <CardDescription>Grant administrative access to existing users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userSelect">Select User</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a user..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user1">John Doe (john@example.com)</SelectItem>
                      <SelectItem value="user2">Jane Smith (jane@example.com)</SelectItem>
                      <SelectItem value="user3">Bob Wilson (bob@example.com)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roleSelect">Assign Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a role..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full">
                    <UserCheck className="mr-2 h-4 w-4" />
                    Assign Role
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
