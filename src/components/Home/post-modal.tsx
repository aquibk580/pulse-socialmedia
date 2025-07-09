"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { X, Heart, MessageCircle, Share, Bookmark, MoreHorizontal, BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import CommentSection from "./comment-section"
import ImageCarousel from "./image-carousel"
import type { Post } from "../../types/post"

interface PostModalProps {
  post: Post
  isOpen: boolean
  onClose: () => void
  onLike?: (postId: string) => void
  onShare?: (postId: string) => void
}

export default function PostModal({ post, isOpen, onClose, onLike, onShare }: PostModalProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [isSaved, setIsSaved] = useState(false)
  const navigate = useNavigate()

  const handleProfileClick = (username: string) => {
    navigate(`/profile/${username}`)
    onClose()
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
    onLike?.(post.id)
  }

  const handleShare = () => {
    onShare?.(post.id)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-6xl max-h-[95vh] bg-white rounded-xl overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 max-h-[95vh]">
          {/* Image Section */}
          <div className="lg:col-span-2 flex items-center justify-center bg-black">
            {post.images && post.images.length > 0 ? (
              <div className="w-full h-full flex items-center justify-center">
                <ImageCarousel
                  images={post.images}
                  alt={`Post by ${post.user.username}`}
                  className="max-w-full max-h-full"
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <p className="text-lg font-medium">Text Post</p>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex flex-col bg-white max-h-[95vh]">
            {/* Post Header */}
            <div className="p-6 border-b border-border/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <img
                    src={post.user.avatar || "/placeholder.svg"}
                    alt={post.user.username}
                    className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
                    onClick={() => handleProfileClick(post.user.username)}
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className="font-semibold cursor-pointer hover:text-primary transition-colors"
                      onClick={() => handleProfileClick(post.user.username)}
                    >
                      {post.user.username}
                    </span>
                    {post.user.isVerified && <BadgeCheck className="w-4 h-4 text-blue-600 fill-blue-200" />}
                  </div>
                  <p className="text-xs text-muted-foreground">Posted {post.timestamp}</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post Description */}
              <div className="mb-4">
                <p className="text-sm leading-relaxed break-words">{post.content}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={handleLike}
                    className="flex items-center space-x-2 hover:text-red-500 transition-colors"
                  >
                    <Heart className={cn("w-6 h-6", isLiked ? "fill-red-500 text-red-500" : "")} />
                    <span className="font-medium">{formatNumber(likeCount)}</span>
                  </button>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MessageCircle className="w-6 h-6" />
                    <span className="font-medium">{formatNumber(post.comments)}</span>
                  </div>
                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
                  >
                    <Share className="w-6 h-6" />
                    <span className="font-medium">{formatNumber(post.shares)}</span>
                  </button>
                </div>
                <button
                  onClick={handleSave}
                  className={cn("hover:text-yellow-500 transition-colors", isSaved ? "text-yellow-500" : "")}
                >
                  <Bookmark className={cn("w-6 h-6", isSaved && "fill-current")} />
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="flex-1 overflow-hidden">
              <CommentSection postId={post.id} isVisible={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
