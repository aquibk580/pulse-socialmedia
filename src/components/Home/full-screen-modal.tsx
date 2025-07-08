"use client"

import { useState, useEffect } from "react"
import { X, Heart, MessageCircle, Share, MoreHorizontal, BadgeCheck } from "lucide-react"
import type { Post } from "@/types/post"
import { cn } from "@/lib/utils"
import CommentSection from "./comment-section"
import ImageCarousel from "./image-carousel"

interface FullScreenModalProps {
  post: Post
  onClose: () => void
  onLike?: (postId: string) => void
  onFollow?: () => void
  onShare?: () => void
}

export default function FullScreenModal({ post, onClose, onLike, onFollow, onShare }: FullScreenModalProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [isFollowing, setIsFollowing] = useState(post.isFollowing)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
    onLike?.(post.id)
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    onFollow?.()
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k"
    }
    return num.toString()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-background border-b border-border">
          <div className="flex items-center space-x-3">
            <img
              src={post.user.avatar || "/placeholder.svg"}
              alt={post.user.username}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-muted/20"
            />
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-sm">{post.user.username}</span>
                {post.user.isVerified && <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-100" />}
              </div>
              <span className="text-xs text-muted-foreground">Posted {post.timestamp}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Image Section */}
          <div className="flex-1 flex items-center justify-center bg-black">
            {post.images && post.images.length > 0 && (
              <div className="max-w-full max-h-full">
                <ImageCarousel images={post.images} alt={`Post by ${post.user.username}`} />
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="w-96 bg-background flex flex-col border-l border-border">
            {/* Post Content */}
            <div className="p-4 border-b border-border">
              <p className="text-sm leading-relaxed break-words">{post.content}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleLike}
                  className={cn(
                    "flex items-center space-x-2 transition-all hover:scale-105",
                    isLiked ? "text-red-500" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
                  <span className="text-sm font-medium">{formatNumber(likeCount)}</span>
                </button>
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-all hover:scale-105">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{formatNumber(post.comments)}</span>
                </button>
                <button
                  onClick={onShare}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-all hover:scale-105"
                >
                  <Share className="w-5 h-5" />
                  <span className="text-sm font-medium">{formatNumber(post.shares)}</span>
                </button>
              </div>
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Comments Section */}
            <div className="flex-1">
              <CommentSection postId={post.id} isVisible={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
