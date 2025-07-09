"use client"

import type React from "react"

import { Heart, MessageCircle, Share, Plus, Check, MoreHorizontal, BadgeCheck, Bookmark } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { Post } from "../../types/post"
import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import { cn } from "../../lib/utils"
import ImageCarousel from "./image-carousel"
import ShareModal from "./share-modal"
import PostOptionsModal from "./post-options-modal"
import PostModal from "./post-modal"

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
  const [showShareModal, setShowShareModal] = useState(false)
  const [showOptionsModal, setShowOptionsModal] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const navigate = useNavigate()

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
    onLike?.(post.id)
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    onFollow?.(post.user.username)
  }

  const handleShare = () => {
    setShowShareModal(true)
    onShare?.(post.id)
  }

  const handleComment = () => {
    setShowPostModal(true)
    onComment?.(post.id)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  // Navigate to user profile when clicking on avatar or username
  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/profile/${post.user.username}`)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <>
      <Card className="py-0 gap-3 rounded-none shadow-none px-4 overflow-hidden border-0 border-b border-border/30">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between px-6 pt-4">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            <div className="relative">
              <img
                src={post.user.avatar || "/placeholder.svg"}
                alt={`${post.user.username} profile`}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-muted/20 cursor-pointer hover:ring-primary/50 transition-all"
                onClick={handleProfileClick}
              />
              <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-background rounded-full"></div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <h3
                  className="font-semibold text-foreground text-sm sm:text-base truncate cursor-pointer hover:text-primary transition-colors"
                  onClick={handleProfileClick}
                >
                  {post.user.username}
                </h3>
                {post.user.isVerified && (
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center flex-shrink-0">
                    <BadgeCheck className="w-4 h-4 text-blue-600 fill-blue-200" />
                  </div>
                )}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Posted {post.timestamp}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-2">
            <button
              onClick={handleFollow}
              className={cn(
                "flex items-center space-x-1 px-2 py-1.5 cursor-pointer rounded-full text-xs sm:text-sm font-medium transition-all duration-200",
                isFollowing
                  ? "bg-muted text-muted-foreground hover:bg-muted/80"
                  : "bg-foreground text-background hover:bg-foreground/90 shadow-md",
              )}
            >
              {isFollowing ? (
                <div className="flex cursor-pointer items-center gap-1.5 py-0.5 px-3">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Following</span>
                </div>
              ) : (
                <div className="flex cursor-pointer items-center gap-1.5 py-0.5 px-3">
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Follow</span>
                </div>
              )}
            </button>
            <button
              onClick={() => setShowOptionsModal(true)}
              className="p-1.5 sm:p-2 hover:bg-muted rounded-full transition-colors"
            >
              <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Post Content */}
        <CardContent className="px-3 sm:px-6 shadow-none pb-4">
          <p className="text-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base break-words h-[80%]">
            {post.content}
          </p>

          {/* Image Carousel */}
          {post.images && post.images.length > 0 && (
            <div className="mb-4">
              <ImageCarousel images={post.images} alt={`Post by ${post.user.username}`} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between py-3 sm:py-4">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <button
                onClick={handleLike}
                className={cn(
                  "flex items-center space-x-1.5 sm:space-x-2 transition-all duration-200 hover:scale-105 touch-manipulation",
                  isLiked ? "text-red-500" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
                <span className="text-sm font-medium">{formatNumber(likeCount)}</span>
              </button>
              <button
                onClick={handleComment}
                className="flex items-center space-x-1.5 sm:space-x-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 touch-manipulation"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{formatNumber(post.comments)}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center space-x-1.5 sm:space-x-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 touch-manipulation"
              >
                <Share className="w-5 h-5" />
                <span className="text-sm font-medium">{formatNumber(post.shares)}</span>
              </button>
            </div>
            <button
              onClick={handleSave}
              className={cn(
                "p-2 transition-all duration-200 hover:scale-105",
                isSaved ? "text-yellow-500" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Bookmark className={cn("w-5 h-5", isSaved && "fill-current")} />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Post Modal for Comments */}
      <PostModal
        post={post}
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        onLike={onLike}
        onShare={onShare}
      />

      {/* Share Modal */}
      {showShareModal && <ShareModal post={post} onClose={() => setShowShareModal(false)} />}

      {/* Post Options Modal */}
      {showOptionsModal && (
        <PostOptionsModal
          post={post}
          isFollowing={isFollowing}
          onClose={() => setShowOptionsModal(false)}
          onFollow={handleFollow}
        />
      )}
    </>
  )
}
