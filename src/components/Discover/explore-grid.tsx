"use client"
import { useState, useEffect, useCallback } from "react"
import type React from "react"

import { useNavigate } from "react-router-dom"
import { Play, Heart, MessageCircle, Bookmark, MoreHorizontal, BadgeCheck, X } from "lucide-react"
import CommentSection from "../Home/comment-section"

interface PostItem {
  id: number
  type: "image" | "video"
  src: string
  thumbnail?: string
  likes: number
  comments: number
  views?: number
  duration?: string
  size: "small" | "medium" | "large"
  user: {
    username: string
    avatar: string
    verified?: boolean
  }
  caption?: string
}

interface PostGridProps {
  posts?: PostItem[]
  className?: string
}

export default function ExploreGrid({ posts, className = "" }: PostGridProps) {
  const [selectedItem, setSelectedItem] = useState<PostItem | null>(null)
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set())
  const [savedItems, setSavedItems] = useState<Set<number>>(new Set())
  const [displayedPosts, setDisplayedPosts] = useState<PostItem[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [showComments, setShowComments] = useState(false)
  const navigate = useNavigate()

  const POSTS_PER_PAGE = 10
  const sizePattern = ["large", "small", "small", "medium", "small", "small", "medium", "small", "medium", "small"]

  // Navigate to user profile
  const handleProfileClick = (username: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    navigate(`/profile/${username}`)
  }

  // Generate posts with repeating pattern
  const generatePostBatch = (startId: number, count: number): PostItem[] => {
    const items: PostItem[] = []
    const usernames = ["alexj_photo", "sarah_wilson", "mike_chen", "emma_davis", "john_doe", "jane_smith"]

    for (let i = 0; i < count; i++) {
      const id = startId + i
      const patternIndex = i % sizePattern.length
      const isVideo = Math.random() > 0.5
      const randomUsername = usernames[Math.floor(Math.random() * usernames.length)]

      items.push({
        id,
        type: isVideo ? "video" : "image",
        src: `https://picsum.photos/300/300?random=${id}`,
        thumbnail: `https://picsum.photos/300/300?random=${id}`,
        duration: isVideo
          ? `${Math.floor(Math.random() * 9)}:${Math.floor(Math.random() * 60)
              .toString()
              .padStart(2, "0")}`
          : undefined,
        likes: Math.floor(Math.random() * 50000) + 500,
        comments: Math.floor(Math.random() * 2000) + 50,
        views: Math.floor(Math.random() * 100000) + 5000,
        size: sizePattern[patternIndex] as "small" | "medium" | "large",
        user: {
          username: randomUsername,
          avatar: `https://picsum.photos/40/40?random=${id + 100}`,
          verified: Math.random() > 0.7,
        },
        caption: `Amazing content from ${randomUsername}! Check this out 🔥 #trending #explore #content`,
      })
    }

    return items
  }

  // Load more posts
  const loadMorePosts = useCallback(() => {
    if (loading || !hasMore) return

    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const startId = currentPage * POSTS_PER_PAGE + 1
      const newPosts = generatePostBatch(startId, POSTS_PER_PAGE)

      setDisplayedPosts((prev) => [...prev, ...newPosts])
      setCurrentPage((prev) => prev + 1)
      setLoading(false)

      // Stop loading after 100 posts (10 pages) for demo
      if (currentPage >= 9) {
        setHasMore(false)
      }
    }, 500)
  }, [currentPage, loading, hasMore])

  // Initial load
  useEffect(() => {
    loadMorePosts()
  }, [])

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        loadMorePosts()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loadMorePosts])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  const toggleLike = (id: number) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleSave = (id: number) => {
    setSavedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  // Group posts into blocks of 10 for rendering
  const postBlocks = []
  for (let i = 0; i < displayedPosts.length; i += POSTS_PER_PAGE) {
    postBlocks.push(displayedPosts.slice(i, i + POSTS_PER_PAGE))
  }

  return (
    <>
      <div className={`w-full ${className}`}>
        <div className="space-y-1.5">
          {postBlocks.map((block, blockIndex) => (
            <div key={blockIndex} className="grid grid-cols-4 gap-1 auto-rows-fr">
              {block.map((item) => {
                // Calculate grid spans based on size
                const getGridSpan = () => {
                  switch (item.size) {
                    case "large":
                      return "col-span-2 row-span-2"
                    case "medium":
                      return "col-span-2 row-span-1"
                    default:
                      return "col-span-1 row-span-1"
                  }
                }

                // Calculate aspect ratio based on size
                const getAspectRatio = () => {
                  switch (item.size) {
                    case "large":
                      return "aspect-square"
                    case "medium":
                      return "aspect-[2/1]"
                    default:
                      return "aspect-square"
                  }
                }

                return (
                  <div
                    key={item.id}
                    className={`relative group cursor-pointer rounded-xl overflow-hidden ${getGridSpan()} ${getAspectRatio()}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <img
                      src={item.type === "video" ? item.thumbnail : item.src}
                      alt={`Content by ${item.user.username}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Video duration overlay */}
                    {item.type === "video" && (
                      <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                        <Play className="w-3 h-3 fill-current" />
                        <span>{item.duration}</span>
                      </div>
                    )}

                    {/* User info overlay */}
                    <div className="absolute bottom-2 left-2 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <img
                        src={item.user.avatar || "/placeholder.svg"}
                        alt={item.user.username}
                        className="w-6 h-6 rounded-full border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                        onClick={(e) => handleProfileClick(item.user.username, e)}
                      />
                      <span
                        className="text-white text-xs font-medium cursor-pointer hover:text-primary transition-colors"
                        onClick={(e) => handleProfileClick(item.user.username, e)}
                      >
                        @{item.user.username}
                      </span>
                      {item.user.verified && <BadgeCheck className="w-3 h-3 text-blue-400 fill-current" />}
                    </div>

                    {/* Hover overlay with stats */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center space-x-4 text-white">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4 fill-current" />
                            <span className="text-sm font-semibold">{formatNumber(item.likes)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4 fill-current" />
                            <span className="text-sm font-semibold">{formatNumber(item.comments)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Size indicator for large posts */}
                    {item.size === "large" && (
                      <div className="absolute top-2 left-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* End of content indicator */}
        {!hasMore && displayedPosts.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>You've reached the end!</p>
          </div>
        )}
      </div>

      {/* Modal for selected item */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-[95vh] bg-white rounded-xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-3 max-h-[95vh]">
              <div className="lg:col-span-2 flex items-center justify-center bg-black">
                <img
                  src={selectedItem.src || "/placeholder.svg"}
                  alt="Selected content"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex flex-col bg-white max-h-[95vh]">
                {/* Post Header */}
                <div className="p-6 border-b border-border/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={selectedItem.user.avatar || "/placeholder.svg"}
                      alt={selectedItem.user.username}
                      className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
                      onClick={() => handleProfileClick(selectedItem.user.username)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span
                          className="font-semibold cursor-pointer hover:text-primary transition-colors"
                          onClick={() => handleProfileClick(selectedItem.user.username)}
                        >
                          {selectedItem.user.username}
                        </span>
                        {selectedItem.user.verified && <BadgeCheck className="w-4 h-4 text-blue-500 fill-current" />}
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm mb-4">{selectedItem.caption}</p>
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => toggleLike(selectedItem.id)}
                      className="flex items-center space-x-2 hover:text-red-500 transition-colors"
                    >
                      <Heart
                        className={`w-6 h-6 ${likedItems.has(selectedItem.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                      <span className="font-medium">{formatNumber(selectedItem.likes)}</span>
                    </button>
                    <button
                      className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
                      onClick={() => setShowComments(!showComments)}
                    >
                      <MessageCircle className="w-6 h-6" />
                      <span className="font-medium">{formatNumber(selectedItem.comments)}</span>
                    </button>
                    <button
                      onClick={() => toggleSave(selectedItem.id)}
                      className="hover:text-yellow-500 transition-colors"
                    >
                      <Bookmark
                        className={`w-6 h-6 ${savedItems.has(selectedItem.id) ? "fill-current text-yellow-500" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="flex-1 overflow-hidden">
                  <CommentSection postId={selectedItem.id.toString()} isVisible={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
