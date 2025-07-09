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
import {
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Star,
  ImageIcon,
  Video,
  FileText,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react"

export function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [contentFilter, setContentFilter] = useState("all")

  const posts = [
    {
      id: 1,
      type: "image",
      content: "Beautiful sunset at the beach 🌅",
      author: "Sarah Wilson",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=100&width=100",
      likes: 245,
      comments: 18,
      shares: 12,
      reports: 0,
      featured: true,
      createdAt: "2024-01-15 14:30",
      status: "published",
    },
    {
      id: 2,
      type: "video",
      content: "Quick cooking tutorial for pasta",
      author: "Mike Johnson",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=100&width=100",
      likes: 892,
      comments: 67,
      shares: 34,
      reports: 2,
      featured: false,
      createdAt: "2024-01-15 12:15",
      status: "published",
    },
    {
      id: 3,
      type: "text",
      content:
        "Just finished reading an amazing book about AI and machine learning. Highly recommend it to anyone interested in technology!",
      author: "Emma Davis",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      thumbnail: null,
      likes: 156,
      comments: 23,
      shares: 8,
      reports: 1,
      featured: false,
      createdAt: "2024-01-15 10:45",
      status: "under_review",
    },
    {
      id: 4,
      type: "image",
      content: "My latest artwork - digital painting",
      author: "John Doe",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=100&width=100",
      likes: 423,
      comments: 45,
      shares: 19,
      reports: 0,
      featured: true,
      createdAt: "2024-01-15 09:20",
      status: "published",
    },
  ]

  const comments = [
    {
      id: 1,
      content: "This is absolutely beautiful! Great work!",
      author: "Alice Cooper",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      postId: 1,
      postTitle: "Beautiful sunset at the beach",
      likes: 12,
      reports: 0,
      createdAt: "2024-01-15 15:30",
      status: "published",
    },
    {
      id: 2,
      content: "Thanks for sharing this recipe, will try it tonight!",
      author: "Bob Smith",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      postId: 2,
      postTitle: "Quick cooking tutorial for pasta",
      likes: 8,
      reports: 0,
      createdAt: "2024-01-15 13:45",
      status: "published",
    },
    {
      id: 3,
      content: "This comment contains inappropriate language and should be reviewed",
      author: "Spam User",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      postId: 3,
      postTitle: "Just finished reading an amazing book",
      likes: 0,
      reports: 5,
      createdAt: "2024-01-15 11:20",
      status: "flagged",
    },
  ]

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>
      case "under_review":
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>
      case "flagged":
        return <Badge className="bg-red-100 text-red-800">Flagged</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Manage posts, comments, and media content</p>
        </div>
      </div>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Search & Filter Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts by content or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={contentFilter} onValueChange={setContentFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="image">Images</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="text">Text Posts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Posts Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Posts</CardTitle>
              <CardDescription>Manage all user-generated content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Content</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div className="flex items-start space-x-3 max-w-md">
                            {post.thumbnail && (
                              <img
                                src={post.thumbnail || "/placeholder.svg"}
                                alt="Post thumbnail"
                                className="w-12 h-12 rounded object-cover flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{post.content}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                {post.featured && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                                {post.reports > 0 && (
                                  <Badge variant="destructive" className="text-xs">
                                    {post.reports} reports
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {post.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{post.author}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {getContentTypeIcon(post.type)}
                            <span className="text-sm capitalize">{post.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
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
                        </TableCell>
                        <TableCell>{getStatusBadge(post.status)}</TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{post.createdAt}</span>
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
                                View Post
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Content
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Star className="mr-2 h-4 w-4" />
                                {post.featured ? "Remove from Featured" : "Mark as Featured"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Post
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

        <TabsContent value="comments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comment Moderation</CardTitle>
              <CardDescription>Review and manage user comments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Comment</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Post</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comments.map((comment) => (
                      <TableRow key={comment.id}>
                        <TableCell>
                          <div className="max-w-md">
                            <p className="text-sm">{comment.content}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <Heart className="h-3 w-3" />
                                <span>{comment.likes}</span>
                              </div>
                              {comment.reports > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {comment.reports} reports
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {comment.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{comment.author}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground truncate max-w-[200px] block">
                            {comment.postTitle}
                          </span>
                        </TableCell>
                        <TableCell>{getStatusBadge(comment.status)}</TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{comment.createdAt}</span>
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
                                View Comment
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Comment
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Comment
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

        <TabsContent value="stories">
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Stories management coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="featured">
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Featured content management coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
