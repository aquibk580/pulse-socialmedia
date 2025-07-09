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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Search, MoreHorizontal, Eye, CheckCircle, XCircle, Ban, MessageSquare, Flag, Shield } from "lucide-react"

export function ReportsModeration() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const reportedContent = [
    {
      id: 1,
      type: "post",
      content: "This post contains inappropriate language and offensive content that violates community guidelines",
      reportedBy: "Multiple Users",
      reportCount: 5,
      author: "John Doe",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      reason: "Hate Speech",
      severity: "high",
      status: "pending",
      createdAt: "2024-01-15 14:30",
      reportedAt: "2024-01-15 15:45",
    },
    {
      id: 2,
      type: "comment",
      content: "Spam comment with promotional links",
      reportedBy: "Sarah Wilson",
      reportCount: 1,
      author: "Spam User",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      reason: "Spam",
      severity: "medium",
      status: "resolved",
      createdAt: "2024-01-15 12:15",
      reportedAt: "2024-01-15 13:20",
    },
    {
      id: 3,
      type: "user",
      content: "User profile contains fake information and impersonation",
      reportedBy: "Mike Johnson",
      reportCount: 3,
      author: "Fake Account",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      reason: "Impersonation",
      severity: "high",
      status: "investigating",
      createdAt: "2024-01-14 18:20",
      reportedAt: "2024-01-15 09:10",
    },
  ]

  const reportedUsers = [
    {
      id: 1,
      name: "Problematic User",
      username: "@problemuser",
      avatar: "/placeholder.svg?height=40&width=40",
      reportCount: 8,
      reasons: ["Harassment", "Spam", "Hate Speech"],
      status: "suspended",
      lastReported: "2024-01-15 16:30",
      strikes: 3,
    },
    {
      id: 2,
      name: "Spam Account",
      username: "@spamaccount",
      avatar: "/placeholder.svg?height=40&width=40",
      reportCount: 12,
      reasons: ["Spam", "Fake Account"],
      status: "banned",
      lastReported: "2024-01-15 14:20",
      strikes: 5,
    },
  ]

  const autoModSettings = {
    wordFilters: ["badword1", "badword2", "spam"],
    imageModeration: true,
    linkModeration: true,
    spamDetection: true,
    autoSuspendThreshold: 3,
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      case "investigating":
        return <Badge className="bg-blue-100 text-blue-800">Investigating</Badge>
      case "dismissed":
        return <Badge variant="outline">Dismissed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports & Moderation</h1>
          <p className="text-muted-foreground">Manage reported content and user violations</p>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Reported Content</TabsTrigger>
          <TabsTrigger value="users">Reported Users</TabsTrigger>
          <TabsTrigger value="queue">Moderation Queue</TabsTrigger>
          <TabsTrigger value="automod">AutoMod Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Search & Filter Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports by content or reason..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reported Content Table */}
          <Card>
            <CardHeader>
              <CardTitle>Reported Content</CardTitle>
              <CardDescription>Review and take action on reported posts, comments, and media</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Content</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Report Details</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportedContent.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div className="max-w-md">
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {report.type}
                              </Badge>
                              {report.reportCount > 1 && (
                                <Badge variant="destructive" className="text-xs">
                                  {report.reportCount} reports
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm truncate">{report.content}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={report.authorAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {report.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{report.author}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{report.reason}</p>
                            <p className="text-xs text-muted-foreground">By: {report.reportedBy}</p>
                            <p className="text-xs text-muted-foreground">Reported: {report.reportedAt}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getSeverityColor(report.severity)}>{report.severity}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{report.createdAt}</span>
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
                                View Content
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Contact Author
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve Content
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" />
                                Remove Content
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Ban className="mr-2 h-4 w-4" />
                                Suspend Author
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

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reported Users</CardTitle>
              <CardDescription>Users with multiple reports or violations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Report Count</TableHead>
                      <TableHead>Violations</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Strikes</TableHead>
                      <TableHead>Last Reported</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportedUsers.map((user) => (
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
                              <p className="text-sm text-muted-foreground">{user.username}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive">{user.reportCount}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.reasons.map((reason, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {reason}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          <Badge variant={user.strikes >= 3 ? "destructive" : "secondary"}>{user.strikes}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{user.lastReported}</span>
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
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Flag className="mr-2 h-4 w-4" />
                                View Reports
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Send Warning
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Ban className="mr-2 h-4 w-4" />
                                Suspend User
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

        <TabsContent value="queue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Moderation Queue</CardTitle>
              <CardDescription>Items requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportedContent
                  .filter((item) => item.status === "pending")
                  .map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{item.type}</Badge>
                          <Badge variant={getSeverityColor(item.severity)}>{item.severity}</Badge>
                          <Badge variant="destructive">{item.reportCount} reports</Badge>
                        </div>
                        <p className="text-sm font-medium">{item.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>By: {item.author}</span>
                          <span>Reason: {item.reason}</span>
                          <span>Reported: {item.reportedAt}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <XCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automod" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>AutoMod Configuration</span>
              </CardTitle>
              <CardDescription>Configure automatic moderation rules and filters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Image Moderation</Label>
                    <p className="text-sm text-muted-foreground">Automatically detect inappropriate images</p>
                  </div>
                  <Switch defaultChecked={autoModSettings.imageModeration} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Link Moderation</Label>
                    <p className="text-sm text-muted-foreground">Review posts containing external links</p>
                  </div>
                  <Switch defaultChecked={autoModSettings.linkModeration} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Spam Detection</Label>
                    <p className="text-sm text-muted-foreground">Automatically detect and flag spam content</p>
                  </div>
                  <Switch defaultChecked={autoModSettings.spamDetection} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="suspendThreshold">Auto-Suspend Threshold</Label>
                <Input
                  id="suspendThreshold"
                  type="number"
                  defaultValue={autoModSettings.autoSuspendThreshold}
                  className="w-32"
                />
                <p className="text-sm text-muted-foreground">Automatically suspend users after this many strikes</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wordFilters">Blocked Words</Label>
                <Textarea
                  id="wordFilters"
                  placeholder="Enter blocked words, one per line..."
                  defaultValue={autoModSettings.wordFilters.join("\n")}
                  rows={6}
                />
                <p className="text-sm text-muted-foreground">
                  Posts containing these words will be automatically flagged
                </p>
              </div>

              <Button>Save AutoMod Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
