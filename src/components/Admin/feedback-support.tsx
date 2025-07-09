"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import {
  MessageSquare,
  Star,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  Eye,
  Reply,
  Archive,
  Trash2,
  MoreHorizontal,
  Search,
} from "lucide-react"

export function FeedbackSupport() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const feedbackItems = [
    {
      id: 1,
      user: "Sarah Wilson",
      userAvatar: "/placeholder.svg?height=32&width=32",
      email: "sarah@example.com",
      type: "feature_request",
      subject: "Add Dark Mode Support",
      message: "It would be great to have a dark mode option for better viewing at night.",
      rating: 5,
      status: "open",
      priority: "medium",
      createdAt: "2024-01-15 14:30:00",
      updatedAt: "2024-01-15 14:30:00",
    },
    {
      id: 2,
      user: "Mike Johnson",
      userAvatar: "/placeholder.svg?height=32&width=32",
      email: "mike@example.com",
      type: "bug_report",
      subject: "Upload Issue with Large Files",
      message: "I'm having trouble uploading videos larger than 100MB. The upload fails every time.",
      rating: 2,
      status: "in_progress",
      priority: "high",
      createdAt: "2024-01-15 12:15:00",
      updatedAt: "2024-01-15 15:20:00",
    },
    {
      id: 3,
      user: "Emma Davis",
      userAvatar: "/placeholder.svg?height=32&width=32",
      email: "emma@example.com",
      type: "general",
      subject: "Love the New Stories Feature!",
      message: "The new Stories feature is amazing! Great work on the implementation.",
      rating: 5,
      status: "resolved",
      priority: "low",
      createdAt: "2024-01-14 18:45:00",
      updatedAt: "2024-01-15 09:30:00",
    },
  ]

  const contactRequests = [
    {
      id: 1,
      name: "John Smith",
      email: "john@company.com",
      company: "Tech Corp",
      subject: "Partnership Inquiry",
      message: "We're interested in exploring a potential partnership opportunity.",
      type: "business",
      status: "new",
      createdAt: "2024-01-15 16:20:00",
    },
    {
      id: 2,
      name: "Lisa Brown",
      email: "lisa@media.com",
      company: "Media Agency",
      subject: "Press Inquiry",
      message: "I'm writing an article about social media trends and would like to interview someone from your team.",
      type: "press",
      status: "responded",
      createdAt: "2024-01-15 11:30:00",
    },
  ]

  const supportTickets = [
    {
      id: 1,
      ticketNumber: "TICK-001",
      user: "Alex Cooper",
      userAvatar: "/placeholder.svg?height=32&width=32",
      subject: "Account Recovery Request",
      category: "account",
      priority: "high",
      status: "open",
      assignedTo: "Support Team",
      createdAt: "2024-01-15 15:45:00",
      lastUpdate: "2024-01-15 16:30:00",
    },
    {
      id: 2,
      ticketNumber: "TICK-002",
      user: "Maria Garcia",
      userAvatar: "/placeholder.svg?height=32&width=32",
      subject: "Payment Issue",
      category: "billing",
      priority: "medium",
      status: "in_progress",
      assignedTo: "Billing Team",
      createdAt: "2024-01-15 13:20:00",
      lastUpdate: "2024-01-15 14:15:00",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
      case "new":
        return <Badge className="bg-blue-100 text-blue-800">Open</Badge>
      case "in_progress":
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
      case "resolved":
      case "responded":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      case "closed":
        return <Badge variant="outline">Closed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "business":
        return <MessageSquare className="h-4 w-4" />
      case "press":
        return <Mail className="h-4 w-4" />
      case "support":
        return <Phone className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Feedback & Support</h1>
          <p className="text-muted-foreground">Manage user feedback, contact requests, and support tickets</p>
        </div>
      </div>

      <Tabs defaultValue="feedback" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feedback">User Feedback</TabsTrigger>
          <TabsTrigger value="contacts">Contact Requests</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="feedback" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Search & Filter Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search feedback by user or subject..."
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
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="feature_request">Feature Request</SelectItem>
                    <SelectItem value="bug_report">Bug Report</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Table */}
          <Card>
            <CardHeader>
              <CardTitle>User Feedback</CardTitle>
              <CardDescription>Review and respond to user feedback and suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feedbackItems.map((feedback) => (
                      <TableRow key={feedback.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={feedback.userAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {feedback.user
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <span className="font-medium">{feedback.user}</span>
                              <p className="text-xs text-muted-foreground">{feedback.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{feedback.subject}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-[200px]">{feedback.message}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {feedback.type.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">{renderStars(feedback.rating)}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getPriorityColor(feedback.priority)}>{feedback.priority}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(feedback.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{feedback.createdAt}</span>
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
                                <Reply className="mr-2 h-4 w-4" />
                                Reply to User
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
                              </DropdownMenuItem>
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

        <TabsContent value="contacts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Requests</CardTitle>
              <CardDescription>Manage business inquiries and press requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contact</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contactRequests.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-muted-foreground">{contact.email}</p>
                            {contact.company && <p className="text-xs text-muted-foreground">{contact.company}</p>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{contact.subject}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-[300px]">{contact.message}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(contact.type)}
                            <Badge variant="outline" className="capitalize">
                              {contact.type}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(contact.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{contact.createdAt}</span>
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
                                <Reply className="mr-2 h-4 w-4" />
                                Reply
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
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

        <TabsContent value="tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Manage user support requests and technical issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Last Update</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supportTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <code className="text-sm bg-muted px-2 py-1 rounded">{ticket.ticketNumber}</code>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={ticket.userAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {ticket.user
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{ticket.user}</span>
                          </div>
                        </TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {ticket.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>{ticket.assignedTo}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{ticket.lastUpdate}</span>
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
                                View Ticket
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Reply className="mr-2 h-4 w-4" />
                                Add Response
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark Resolved
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Archive className="mr-2 h-4 w-4" />
                                Close Ticket
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

          {/* Quick Response Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Response Templates</CardTitle>
              <CardDescription>Pre-written responses for common support scenarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                  <h3 className="font-medium">Account Recovery</h3>
                  <p className="text-sm text-muted-foreground mt-1">Standard account recovery instructions</p>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                  <h3 className="font-medium">Password Reset</h3>
                  <p className="text-sm text-muted-foreground mt-1">Help with password reset issues</p>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                  <h3 className="font-medium">Technical Issue</h3>
                  <p className="text-sm text-muted-foreground mt-1">General technical troubleshooting</p>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                  <h3 className="font-medium">Billing Question</h3>
                  <p className="text-sm text-muted-foreground mt-1">Common billing and payment queries</p>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                  <h3 className="font-medium">Feature Request</h3>
                  <p className="text-sm text-muted-foreground mt-1">Acknowledge feature suggestions</p>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
                  <h3 className="font-medium">Bug Report</h3>
                  <p className="text-sm text-muted-foreground mt-1">Thank user for bug reports</p>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
