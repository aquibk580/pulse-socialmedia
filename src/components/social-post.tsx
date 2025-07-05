"use client"

import { Heart, MessageCircle, Share, Plus, Check, MoreHorizontal } from "lucide-react"
import type { Post } from "../types/post"
import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { cn } from "../lib/utils"
import ImageCarousel from "./image-carousel"

interface SocialPostProps {
  post: Post
  onFollow?: (userId: string) => void
  onLike?: (postId: string) => void
  onComment?: (postId: string) => void
  onShare?: (postId: string) => void
}

export default function SocialPost({ post, onFollow, onLike, onComment, onShare }: SocialPostProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [isFollowing, setIsFollowing] = useState(post.isFollowing)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
    onLike?.(post.id)
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    onFollow?.(post.user.username)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k"
    }
    return num.toString()
  }

  return (
    <Card className="mb-6 overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={post.user.avatar || "/placeholder.svg"}
              alt={`${post.user.username} profile`}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/10"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-foreground">{post.user.username}</h3>
              {post.user.isVerified && (
                <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-primary-foreground" />
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Posted {post.timestamp}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleFollow}
            className={cn(
              "flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              isFollowing
                ? "bg-muted text-muted-foreground hover:bg-muted/80"
                : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
            )}
          >
            {isFollowing ? (
              <>
                <Check className="w-4 h-4" />
                <span>Following</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Follow</span>
              </>
            )}
          </button>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <CardContent className="px-6 py-0">
        <p className="text-foreground leading-relaxed mb-4">{post.content}</p>

        {/* Image Carousel */}
        {post.images && post.images.length > 0 && (
          <ImageCarousel images={post.images} alt={`Post by ${post.user.username}`} />
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between py-4 border-t border-border/50">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center space-x-2 transition-all duration-200 hover:scale-105",
                isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500",
              )}
            >
              <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
              <span className="text-sm font-medium">{formatNumber(likeCount)}</span>
            </button>
            <button
              onClick={() => onComment?.(post.id)}
              className="flex items-center space-x-2 text-muted-foreground hover:text-blue-500 transition-all duration-200 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{formatNumber(post.comments)}</span>
            </button>
            <button
              onClick={() => onShare?.(post.id)}
              className="flex items-center space-x-2 text-muted-foreground hover:text-green-500 transition-all duration-200 hover:scale-105"
            >
              <Share className="w-5 h-5" />
              <span className="text-sm font-medium">{formatNumber(post.shares)}</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
