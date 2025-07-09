"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  UserCheck,
  FileText,
  AlertTriangle,
  Activity,
  TrendingUp,
  TrendingDown,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Users",
      value: "124,532",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      description: "Active registered users",
    },
    {
      title: "Daily Active Users",
      value: "45,231",
      change: "+8.2%",
      trend: "up",
      icon: UserCheck,
      description: "Users active in last 24h",
    },
    {
      title: "Posts Today",
      value: "2,847",
      change: "-3.1%",
      trend: "down",
      icon: FileText,
      description: "New posts created today",
    },
    {
      title: "Reports Pending",
      value: "23",
      change: "+5",
      trend: "up",
      icon: AlertTriangle,
      description: "Awaiting moderation",
    },
  ]

  const systemHealth = [
    { name: "API Response Time", value: 95, status: "good" },
    { name: "Database Performance", value: 88, status: "good" },
    { name: "CDN Uptime", value: 99, status: "excellent" },
    { name: "Error Rate", value: 12, status: "warning" },
  ]

  const recentActivity = [
    {
      user: "John Doe",
      action: "reported a post",
      target: "Inappropriate content",
      time: "2 minutes ago",
      type: "report",
    },
    {
      user: "Sarah Wilson",
      action: "created a new post",
      target: "Travel photography",
      time: "5 minutes ago",
      type: "post",
    },
    {
      user: "Mike Johnson",
      action: "was suspended",
      target: "Spam violation",
      time: "10 minutes ago",
      type: "moderation",
    },
    {
      user: "Emma Davis",
      action: "requested verification",
      target: "Blue checkmark",
      time: "15 minutes ago",
      type: "verification",
    },
  ]

  const moderationQueue = [
    {
      id: 1,
      type: "Post",
      content: "Suspicious promotional content detected",
      reporter: "AutoMod",
      severity: "medium",
      time: "1 hour ago",
    },
    {
      id: 2,
      type: "Comment",
      content: "Hate speech reported by multiple users",
      reporter: "Community",
      severity: "high",
      time: "2 hours ago",
    },
    {
      id: 3,
      type: "User",
      content: "Fake account suspected",
      reporter: "AI Detection",
      severity: "low",
      time: "3 hours ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "warning":
        return "text-yellow-600"
      case "critical":
        return "text-red-600"
      default:
        return "text-gray-600"
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

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                  <span>from last month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>System Health</span>
            </CardTitle>
            <CardDescription>Real-time system performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemHealth.map((metric) => (
              <div key={metric.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                    <AvatarFallback>
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-muted-foreground"> {activity.action} </span>
                      <span className="font-medium">{activity.target}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Moderation Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Quick Moderation Queue</span>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardTitle>
          <CardDescription>Items requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moderationQueue.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{item.type}</Badge>
                    <Badge variant={getSeverityColor(item.severity)}>{item.severity}</Badge>
                  </div>
                  <p className="text-sm font-medium">{item.content}</p>
                  <p className="text-xs text-muted-foreground">
                    Reported by {item.reporter} • {item.time}
                  </p>
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
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
