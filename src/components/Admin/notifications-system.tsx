"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Send, Calendar, Users, Eye, Edit, Trash2, MoreHorizontal, Clock } from "lucide-react"

export function NotificationsSystem() {
  const [notificationTitle, setNotificationTitle] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [targetAudience, setTargetAudience] = useState("all")

  const sentNotifications = [
    {
      id: 1,
      title: "Platform Maintenance Scheduled",
      message: "We will be performing scheduled maintenance on January 20th from 2:00 AM to 4:00 AM UTC.",
      audience: "All Users",
      audienceCount: 2100,
      status: "sent",
      sentAt: "2024-01-15 14:30:00",
      sentBy: "Admin",
      opens: 1456,
      clicks: 234,
    },
    {
      id: 2,
      title: "New Feature: Stories",
      message: "Exciting news! We've just launched Stories feature. Share your moments that disappear in 24 hours.",
      audience: "Active Users",
      audienceCount: 1600,
      status: "sent",
      sentAt: "2024-01-14 10:15:00",
      sentBy: "Product Team",
      opens: 1203,
      clicks: 456,
    },
    {
      id: 3,
      title: "Community Guidelines Update",
      message: "We've updated our community guidelines to ensure a safer environment for everyone.",
      audience: "All Users",
      audienceCount: 2100,
      status: "scheduled",
      sentAt: "2024-01-16 09:00:00",
      sentBy: "Moderation Team",
      opens: 0,
      clicks: 0,
    },
  ]

  const notificationLogs = [
    {
      id: 1,
      type: "push",
      title: "New follower",
      recipient: "Sarah Wilson",
      status: "delivered",
      sentAt: "2024-01-15 16:45:00",
      deliveredAt: "2024-01-15 16:45:02",
    },
    {
      id: 2,
      type: "email",
      title: "Weekly digest",
      recipient: "Mike Johnson",
      status: "opened",
      sentAt: "2024-01-15 08:00:00",
      deliveredAt: "2024-01-15 08:00:15",
    },
    {
      id: 3,
      type: "push",
      title: "Post liked",
      recipient: "Emma Davis",
      status: "failed",
      sentAt: "2024-01-15 15:30:00",
      deliveredAt: null,
    },
  ]

  const scheduledNotifications = [
    {
      id: 1,
      title: "Weekend Highlights",
      message: "Check out the most popular posts from this weekend!",
      audience: "Active Users",
      scheduledFor: "2024-01-20 18:00:00",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Monthly Newsletter",
      message: "Your monthly summary of platform updates and community highlights.",
      audience: "All Users",
      scheduledFor: "2024-02-01 10:00:00",
      status: "scheduled",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-100 text-green-800">Sent</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
      case "opened":
        return <Badge className="bg-blue-100 text-blue-800">Opened</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "push":
        return <Bell className="h-4 w-4" />
      case "email":
        return <Send className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications System</h1>
          <p className="text-muted-foreground">Send announcements and manage notification settings</p>
        </div>
      </div>

      <Tabs defaultValue="send" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="send">Send Notification</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Send Global Notification</span>
              </CardTitle>
              <CardDescription>Send announcements to your users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Notification Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter notification title..."
                    value={notificationTitle}
                    onChange={(e) => setNotificationTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select value={targetAudience} onValueChange={setTargetAudience}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users (2,100)</SelectItem>
                      <SelectItem value="active">Active Users (1,600)</SelectItem>
                      <SelectItem value="new">New Users (380)</SelectItem>
                      <SelectItem value="premium">Premium Users (450)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your notification message..."
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Notification Type</Label>
                  <Select defaultValue="both">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="push">Push Notification Only</SelectItem>
                      <SelectItem value="email">Email Only</SelectItem>
                      <SelectItem value="both">Push + Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Send Time</Label>
                  <Select defaultValue="now">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Send Now</SelectItem>
                      <SelectItem value="schedule">Schedule for Later</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button>
                  <Send className="mr-2 h-4 w-4" />
                  Send Notification
                </Button>
                <Button variant="outline">Save as Draft</Button>
                <Button variant="outline">Preview</Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Templates</CardTitle>
              <CardDescription>Use pre-made templates for common notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                  <h3 className="font-medium">Maintenance Notice</h3>
                  <p className="text-sm text-muted-foreground mt-1">Scheduled maintenance announcement</p>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                  <h3 className="font-medium">New Feature</h3>
                  <p className="text-sm text-muted-foreground mt-1">Announce new platform features</p>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                  <h3 className="font-medium">Security Alert</h3>
                  <p className="text-sm text-muted-foreground mt-1">Important security updates</p>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
              <CardDescription>View all sent and scheduled notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sent By</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sentNotifications.map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                              {notification.message}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{notification.audience}</span>
                            <Badge variant="outline" className="text-xs">
                              {notification.audienceCount}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(notification.status)}</TableCell>
                        <TableCell>{notification.sentBy}</TableCell>
                        <TableCell>
                          {notification.status === "sent" && (
                            <div className="text-sm">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{notification.opens} opens</span>
                              </div>
                              <div className="flex items-center space-x-1 text-muted-foreground">
                                <span>{notification.clicks} clicks</span>
                              </div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{notification.sentAt}</span>
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
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
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

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Scheduled Notifications</span>
              </CardTitle>
              <CardDescription>Manage notifications scheduled for future delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{notification.title}</h3>
                        {getStatusBadge(notification.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Audience: {notification.audience}</span>
                        <span>Scheduled: {notification.scheduledFor}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Delivery Logs</CardTitle>
              <CardDescription>Monitor individual notification delivery status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sent At</TableHead>
                      <TableHead>Delivered At</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notificationLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(log.type)}
                            <span className="capitalize">{log.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{log.title}</TableCell>
                        <TableCell>{log.recipient}</TableCell>
                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                        <TableCell>{log.sentAt}</TableCell>
                        <TableCell>{log.deliveredAt || "—"}</TableCell>
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

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure global notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Allow sending push notifications to users</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Allow sending email notifications to users</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Rate Limiting</Label>
                  <p className="text-sm text-muted-foreground">Limit notifications per user per day</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dailyLimit">Daily Notification Limit</Label>
                  <Input id="dailyLimit" type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quietHours">Quiet Hours</Label>
                  <Select defaultValue="22-08">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Quiet Hours</SelectItem>
                      <SelectItem value="22-08">10 PM - 8 AM</SelectItem>
                      <SelectItem value="23-07">11 PM - 7 AM</SelectItem>
                      <SelectItem value="00-06">12 AM - 6 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
