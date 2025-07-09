"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Search,
  MoreHorizontal,
  Shield,
  Key,
  Clock,
  MapPin,
  Monitor,
  Smartphone,
  AlertTriangle,
  Ban,
  Eye,
  Trash2,
} from "lucide-react"

export function SecurityTools() {
  const [searchTerm, setSearchTerm] = useState("")

  const loginHistory = [
    {
      id: 1,
      user: "Sarah Wilson",
      userAvatar: "/placeholder.svg?height=32&width=32",
      ip: "192.168.1.100",
      location: "New York, US",
      device: "Chrome on Windows",
      deviceType: "desktop",
      status: "success",
      timestamp: "2024-01-15 14:30:25",
      suspicious: false,
    },
    {
      id: 2,
      user: "Mike Johnson",
      userAvatar: "/placeholder.svg?height=32&width=32",
      ip: "10.0.0.50",
      location: "London, UK",
      device: "Safari on iPhone",
      deviceType: "mobile",
      status: "failed",
      timestamp: "2024-01-15 13:45:12",
      suspicious: true,
    },
    {
      id: 3,
      user: "Emma Davis",
      userAvatar: "/placeholder.svg?height=32&width=32",
      ip: "172.16.0.25",
      location: "Toronto, CA",
      device: "Firefox on Mac",
      deviceType: "desktop",
      status: "success",
      timestamp: "2024-01-15 12:20:08",
      suspicious: false,
    },
  ]

  const blacklistedIPs = [
    {
      id: 1,
      ip: "192.168.1.200",
      reason: "Multiple failed login attempts",
      addedBy: "Admin",
      addedAt: "2024-01-15 10:30:00",
      attempts: 15,
    },
    {
      id: 2,
      ip: "10.0.0.100",
      reason: "Spam activity detected",
      addedBy: "AutoMod",
      addedAt: "2024-01-14 16:45:00",
      attempts: 8,
    },
    {
      id: 3,
      ip: "172.16.0.50",
      reason: "Suspicious behavior pattern",
      addedBy: "Security System",
      addedAt: "2024-01-14 09:15:00",
      attempts: 12,
    },
  ]

  const adminLogs = [
    {
      id: 1,
      admin: "John Admin",
      adminAvatar: "/placeholder.svg?height=32&width=32",
      action: "Suspended user account",
      target: "problematic_user",
      ip: "192.168.1.10",
      timestamp: "2024-01-15 15:20:00",
      severity: "high",
    },
    {
      id: 2,
      admin: "Sarah Moderator",
      adminAvatar: "/placeholder.svg?height=32&width=32",
      action: "Deleted reported post",
      target: "post_12345",
      ip: "192.168.1.11",
      timestamp: "2024-01-15 14:45:00",
      severity: "medium",
    },
    {
      id: 3,
      admin: "Mike Support",
      adminAvatar: "/placeholder.svg?height=32&width=32",
      action: "Updated user permissions",
      target: "user_settings",
      ip: "192.168.1.12",
      timestamp: "2024-01-15 13:30:00",
      severity: "low",
    },
  ]

  const apiKeys = [
    {
      id: 1,
      name: "Mobile App API",
      key: "sk_live_51H7...****...3xYz",
      permissions: ["read", "write"],
      lastUsed: "2024-01-15 14:30:00",
      status: "active",
      createdAt: "2024-01-01 10:00:00",
    },
    {
      id: 2,
      name: "Analytics Service",
      key: "sk_test_51H8...****...9aBC",
      permissions: ["read"],
      lastUsed: "2024-01-15 12:15:00",
      status: "active",
      createdAt: "2024-01-05 15:30:00",
    },
    {
      id: 3,
      name: "Backup Service",
      key: "sk_live_51H9...****...7dEF",
      permissions: ["read", "backup"],
      lastUsed: "2024-01-14 23:00:00",
      status: "inactive",
      createdAt: "2024-01-10 09:45:00",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Success</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getDeviceIcon = (deviceType: string) => {
    return deviceType === "mobile" ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Security Tools</h1>
          <p className="text-muted-foreground">Monitor and manage platform security</p>
        </div>
      </div>

      <Tabs defaultValue="logins" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logins">Login History</TabsTrigger>
          <TabsTrigger value="blacklist">IP Blacklist</TabsTrigger>
          <TabsTrigger value="logs">Admin Logs</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="logins" className="space-y-6">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Search Login History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by user, IP, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Attempts</SelectItem>
                    <SelectItem value="success">Successful</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="suspicious">Suspicious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Login History Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Login Attempts</CardTitle>
              <CardDescription>Monitor user authentication activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loginHistory.map((login) => (
                      <TableRow key={login.id} className={login.suspicious ? "bg-red-50 dark:bg-red-900/10" : ""}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={login.userAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {login.user
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <span className="font-medium">{login.user}</span>
                              {login.suspicious && <AlertTriangle className="inline h-3 w-3 text-red-500 ml-1" />}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-sm bg-muted px-1 py-0.5 rounded">{login.ip}</code>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{login.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getDeviceIcon(login.deviceType)}
                            <span className="text-sm">{login.device}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(login.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{login.timestamp}</span>
                          </div>
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
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Ban className="mr-2 h-4 w-4" />
                                Block IP Address
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
        </TabsContent>

        <TabsContent value="blacklist" className="space-y-6">
          {/* Add IP Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add IP to Blacklist</CardTitle>
              <CardDescription>Block suspicious IP addresses from accessing the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input placeholder="Enter IP address (e.g., 192.168.1.1)" className="flex-1" />
                <Input placeholder="Reason for blocking" className="flex-1" />
                <Button>Add to Blacklist</Button>
              </div>
            </CardContent>
          </Card>

          {/* Blacklisted IPs */}
          <Card>
            <CardHeader>
              <CardTitle>Blacklisted IP Addresses</CardTitle>
              <CardDescription>Currently blocked IP addresses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Added By</TableHead>
                      <TableHead>Failed Attempts</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blacklistedIPs.map((ip) => (
                      <TableRow key={ip.id}>
                        <TableCell>
                          <code className="text-sm bg-muted px-2 py-1 rounded">{ip.ip}</code>
                        </TableCell>
                        <TableCell>{ip.reason}</TableCell>
                        <TableCell>{ip.addedBy}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{ip.attempts}</Badge>
                        </TableCell>
                        <TableCell>{ip.addedAt}</TableCell>
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
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove from Blacklist
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
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Activity Logs</CardTitle>
              <CardDescription>Track all administrative actions performed on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admin</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={log.adminAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {log.admin
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{log.admin}</span>
                          </div>
                        </TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>
                          <code className="text-sm bg-muted px-1 py-0.5 rounded">{log.target}</code>
                        </TableCell>
                        <TableCell>
                          <code className="text-sm bg-muted px-1 py-0.5 rounded">{log.ip}</code>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getSeverityColor(log.severity)}>{log.severity}</Badge>
                        </TableCell>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          {/* Create API Key */}
          <Card>
            <CardHeader>
              <CardTitle>Create New API Key</CardTitle>
              <CardDescription>Generate API keys for external services and integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="keyName">Key Name</Label>
                    <Input id="keyName" placeholder="e.g., Mobile App API" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="keyPermissions">Permissions</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select permissions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="read">Read Only</SelectItem>
                        <SelectItem value="write">Read & Write</SelectItem>
                        <SelectItem value="admin">Full Access</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button>
                  <Key className="mr-2 h-4 w-4" />
                  Generate API Key
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* API Keys Table */}
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys and monitor their usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Key</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((key) => (
                      <TableRow key={key.id}>
                        <TableCell className="font-medium">{key.name}</TableCell>
                        <TableCell>
                          <code className="text-sm bg-muted px-2 py-1 rounded">{key.key}</code>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {key.permissions.map((permission) => (
                              <Badge key={permission} variant="outline" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(key.status)}</TableCell>
                        <TableCell>{key.lastUsed}</TableCell>
                        <TableCell>{key.createdAt}</TableCell>
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
                                <Eye className="mr-2 h-4 w-4" />
                                View Usage
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Key className="mr-2 h-4 w-4" />
                                Regenerate Key
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Key
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

          {/* 2FA Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Two-Factor Authentication</span>
              </CardTitle>
              <CardDescription>Manage 2FA settings for admin accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enforce 2FA for Admins</Label>
                  <p className="text-sm text-muted-foreground">Require all admin accounts to use 2FA</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enforce 2FA for Moderators</Label>
                  <p className="text-sm text-muted-foreground">Require all moderator accounts to use 2FA</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow SMS 2FA</Label>
                  <p className="text-sm text-muted-foreground">Enable SMS as a 2FA method</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
