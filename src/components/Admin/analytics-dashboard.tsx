"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, TrendingDown, Users, UserPlus, Eye, Heart, MessageCircle, Share, Clock, Globe } from "lucide-react"

export function AnalyticsDashboard() {
  const growthData = [
    { month: "Jan", users: 1200, activeUsers: 800, newUsers: 150 },
    { month: "Feb", users: 1350, activeUsers: 950, newUsers: 180 },
    { month: "Mar", users: 1500, activeUsers: 1100, newUsers: 220 },
    { month: "Apr", users: 1680, activeUsers: 1250, newUsers: 280 },
    { month: "May", users: 1850, activeUsers: 1400, newUsers: 320 },
    { month: "Jun", users: 2100, activeUsers: 1600, newUsers: 380 },
  ]

  const engagementData = [
    { day: "Mon", likes: 2400, comments: 800, shares: 400 },
    { day: "Tue", likes: 2200, comments: 750, shares: 350 },
    { day: "Wed", likes: 2800, comments: 900, shares: 500 },
    { day: "Thu", likes: 2600, comments: 850, shares: 450 },
    { day: "Fri", likes: 3200, comments: 1100, shares: 600 },
    { day: "Sat", likes: 3800, comments: 1300, shares: 750 },
    { day: "Sun", likes: 3500, comments: 1200, shares: 650 },
  ]

  const contentTypeData = [
    { name: "Images", value: 45, color: "#8884d8" },
    { name: "Videos", value: 30, color: "#82ca9d" },
    { name: "Text Posts", value: 20, color: "#ffc658" },
    { name: "Stories", value: 5, color: "#ff7300" },
  ]

  const trafficSources = [
    { source: "Direct", users: 3500, percentage: 35 },
    { source: "Social Media", users: 2800, percentage: 28 },
    { source: "Search Engines", users: 2200, percentage: 22 },
    { source: "Referrals", users: 1000, percentage: 10 },
    { source: "Email", users: 500, percentage: 5 },
  ]

  const topPosts = [
    {
      id: 1,
      content: "Beautiful sunset at the beach 🌅",
      author: "Sarah Wilson",
      likes: 1250,
      comments: 89,
      shares: 45,
      views: 5600,
    },
    {
      id: 2,
      content: "Quick cooking tutorial for pasta",
      author: "Mike Johnson",
      likes: 892,
      comments: 67,
      shares: 34,
      views: 4200,
    },
    {
      id: 3,
      content: "My latest artwork - digital painting",
      author: "John Doe",
      likes: 756,
      comments: 45,
      shares: 28,
      views: 3800,
    },
  ]

  const activeUsers = [
    { name: "Sarah Wilson", posts: 45, engagement: 2340 },
    { name: "Mike Johnson", posts: 38, engagement: 1890 },
    { name: "Emma Davis", posts: 32, engagement: 1650 },
    { name: "John Doe", posts: 28, engagement: 1420 },
    { name: "Alice Cooper", posts: 25, engagement: 1280 },
  ]

  const realTimeStats = {
    activeUsers: 1247,
    postsToday: 89,
    commentsToday: 234,
    likesToday: 1567,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your platform's performance and user engagement</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      <Tabs defaultValue="growth" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="growth">Growth Metrics</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="content">Content Stats</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="space-y-6">
          {/* Growth Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,100</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+13.5%</span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Users</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">380</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+18.7%</span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,600</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+14.3%</span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">76.2%</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">-2.1%</span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth Over Time</CardTitle>
              <CardDescription>Monthly user acquisition and activity trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  users: { label: "Total Users", color: "hsl(var(--chart-1))" },
                  activeUsers: { label: "Active Users", color: "hsl(var(--chart-2))" },
                  newUsers: { label: "New Users", color: "hsl(var(--chart-3))" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} />
                    <Line type="monotone" dataKey="activeUsers" stroke="var(--color-activeUsers)" strokeWidth={2} />
                    <Line type="monotone" dataKey="newUsers" stroke="var(--color-newUsers)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your users are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source) => (
                  <div key={source.source} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{source.source}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{source.users.toLocaleString()}</span>
                      <Badge variant="outline">{source.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          {/* Engagement Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Engagement</CardTitle>
              <CardDescription>Likes, comments, and shares over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  likes: { label: "Likes", color: "hsl(var(--chart-1))" },
                  comments: { label: "Comments", color: "hsl(var(--chart-2))" },
                  shares: { label: "Shares", color: "hsl(var(--chart-3))" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="likes"
                      stackId="1"
                      stroke="var(--color-likes)"
                      fill="var(--color-likes)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="comments"
                      stackId="1"
                      stroke="var(--color-comments)"
                      fill="var(--color-comments)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="shares"
                      stackId="1"
                      stroke="var(--color-shares)"
                      fill="var(--color-shares)"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Top Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
              <CardDescription>Posts with highest engagement this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPosts.map((post, index) => (
                  <div key={post.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="font-medium">{post.content}</p>
                      <p className="text-sm text-muted-foreground">by {post.author}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Share className="h-3 w-3" />
                          <span>{post.shares}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Most Active Users */}
          <Card>
            <CardHeader>
              <CardTitle>Most Active Users</CardTitle>
              <CardDescription>Users with highest engagement this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeUsers.map((user, index) => (
                  <div key={user.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{user.posts} posts</span>
                      <Badge variant="outline">{user.engagement} engagement</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          {/* Content Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Content Type Distribution</CardTitle>
              <CardDescription>Breakdown of content types on your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  images: { label: "Images", color: "#8884d8" },
                  videos: { label: "Videos", color: "#82ca9d" },
                  text: { label: "Text Posts", color: "#ffc658" },
                  stories: { label: "Stories", color: "#ff7300" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contentTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {contentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Content Performance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,847</div>
                <p className="text-xs text-muted-foreground">+89 today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2%</div>
                <p className="text-xs text-muted-foreground">+0.3% from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Viral Posts</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">Posts with 1k+ engagement</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          {/* Real-time Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{realTimeStats.activeUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Users online</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Posts Today</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{realTimeStats.postsToday}</div>
                <p className="text-xs text-muted-foreground">New posts created</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comments Today</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{realTimeStats.commentsToday}</div>
                <p className="text-xs text-muted-foreground">New comments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Likes Today</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{realTimeStats.likesToday.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total likes given</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Real-time Activity Feed</CardTitle>
              <CardDescription>Live updates from your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">2 seconds ago</span>
                  <span>Sarah Wilson liked a post</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">15 seconds ago</span>
                  <span>New user registered: Mike Johnson</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-muted-foreground">32 seconds ago</span>
                  <span>Emma Davis created a new post</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-muted-foreground">1 minute ago</span>
                  <span>John Doe commented on a post</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-muted-foreground">2 minutes ago</span>
                  <span>Content reported by user</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
