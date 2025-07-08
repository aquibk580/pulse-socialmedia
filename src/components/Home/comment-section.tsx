"use client"

import { useState } from "react"
import { Heart, Send, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface User {
  username: string
  avatar: string
  isVerified: boolean
}

interface Comment {
  id: string
  user: User
  content: string
  timestamp: string
  likes: number
}

interface CommentSectionProps {
  postId: string
  isVisible?: boolean
  onClose?: () => void
}

export default function CommentSection({ postId, isVisible = true, onClose }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: {
        username: "john_doe",
        avatar: "/placeholder.svg?height=32&width=32",
        isVerified: false,
      },
      content: "Amazing shot! The lighting is perfect 📸",
      timestamp: "1h ago",
      likes: 12,
    },
    {
      id: "2",
      user: {
        username: "photo_lover",
        avatar: "/placeholder.svg?height=32&width=32",
        isVerified: true,
      },
      content: "This is absolutely stunning! What camera did you use?",
      timestamp: "45m ago",
      likes: 8,
    },
    {
      id: "3",
      user: {
        username: "nature_fan",
        avatar: "/placeholder.svg?height=32&width=32",
        isVerified: false,
      },
      content: "I was there last week! Such a beautiful place 🌅",
      timestamp: "30m ago",
      likes: 5,
    },
    {
      id: "4",
      user: {
        username: "travel_enthusiast",
        avatar: "/placeholder.svg?height=32&width=32",
        isVerified: false,
      },
      content: "Would love to visit this place someday! Adding to my bucket list ✈️",
      timestamp: "15m ago",
      likes: 3,
    },
  ])

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: {
          username: "you",
          avatar: "/placeholder.svg?height=32&width=32",
          isVerified: false,
        },
        content: newComment,
        timestamp: "now",
        likes: 0,
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
  }

  const handleLikeComment = (commentId: string) => {
    setLikedComments((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(commentId)) {
        newSet.delete(commentId)
      } else {
        newSet.add(commentId)
      }
      return newSet
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  if (!isVisible) return null

  return (
    <div className="bg-background border-t border-border/50">
      {/* Comments Header */}
      <div className="px-4 py-3 border-b border-border/30">
        <h3 className="font-semibold text-sm">Comments</h3>
      </div>

      {/* Comments List */}
      <ScrollArea className="h-64 px-4">
        <div className="space-y-4 py-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-3">
              <img
                src={comment.user.avatar || "/placeholder.svg"}
                alt={comment.user.username}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1 mb-1">
                  <span className="font-semibold text-sm">{comment.user.username}</span>
                  {comment.user.isVerified && <BadgeCheck className="w-3 h-3 text-blue-500 fill-blue-100" />}
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                </div>
                <p className="text-sm leading-relaxed break-words mb-2">{comment.content}</p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className={cn(
                      "flex items-center space-x-1 text-xs transition-colors",
                      likedComments.has(comment.id) ? "text-red-500" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Heart className={cn("w-3 h-3", likedComments.has(comment.id) && "fill-current")} />
                    <span>{formatNumber(comment.likes + (likedComments.has(comment.id) ? 1 : 0))}</span>
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Comment Input */}
      <div className="p-4 border-t border-border/30">
        <div className="flex items-center space-x-3">
          <img
            src="/placeholder.svg?height=32&width=32"
            alt="Your avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 flex items-center space-x-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 border-none bg-muted/50 focus-visible:ring-0 focus-visible:ring-offset-0"
              onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
            />
            <Button onClick={handleAddComment} size="sm" disabled={!newComment.trim()} className="px-3">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
