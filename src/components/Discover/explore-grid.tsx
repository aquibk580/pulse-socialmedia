"use client"
import { useState, useEffect, useCallback } from "react"
import { Play, Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react"

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

  const POSTS_PER_PAGE = 10
  const sizePattern = ["large", "small", "small", "medium", "small", "small", "medium", "small", "medium", "small"]

  // Generate posts with repeating pattern
  const generatePostBatch = (startId: number, count: number): PostItem[] => {
    const items: PostItem[] = []

    for (let i = 0; i < count; i++) {
      const id = startId + i
      const patternIndex = i % sizePattern.length
      const isVideo = Math.random() > 0.5

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
          username: `creator_${id}`,
          avatar: `https://picsum.photos/40/40?random=${id + 100}`,
          verified: Math.random() > 0.7,
        },
        caption: `Amazing content from creator ${id}! Check this out 🔥 #trending #explore #content`,
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
        <div className=" space-y-1.5  ">
          {postBlocks.map((block, blockIndex) => (
            <div key={blockIndex} className="grid grid-cols-4 gap-1   auto-rows-fr">
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
                    className={`relative group cursor-pointer rounded-xl   overflow-hidden   ${getGridSpan()} ${getAspectRatio()}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <img
                      src={item.type === "video" ? item.thumbnail : item.src}
                      alt={`Content by ${item.user.username}`}
                      className="w-full h-full object-cover transition-transform duration-300  group-hover:scale-105"
                    />

                    {/* Video duration overlay */}
                    {item.type === "video" && (
                      <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                        <Play className="w-3 h-3 fill-current" />
                        <span>{item.duration}</span>
                      </div>
                    )}

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
              <span className="text-lg">×</span>
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-3 max-h-[95vh]">
              <div className="lg:col-span-2 flex items-center justify-center bg-black">
                <img
                  src={selectedItem.src || "/placeholder.svg"}
                  alt="Selected content"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="p-6 overflow-y-auto bg-white">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={selectedItem.user.avatar || "/placeholder.svg"}
                    alt={selectedItem.user.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{selectedItem.user.username}</span>
                      {selectedItem.user.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm mb-4">{selectedItem.caption}</p>
                <div className="flex items-center space-x-6 mb-6">
                  <button
                    onClick={() => toggleLike(selectedItem.id)}
                    className="flex items-center space-x-2 hover:text-red-500 transition-colors"
                  >
                    <Heart
                      className={`w-6 h-6 ${likedItems.has(selectedItem.id) ? "fill-red-500 text-red-500" : ""}`}
                    />
                    <span className="font-medium">{formatNumber(selectedItem.likes)}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
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
                <div className="space-y-4">
                  <h4 className="font-semibold">Comments</h4>
                  <div className="space-y-4 max-h-60 overflow-y-auto">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className="flex space-x-3">
                        <img
                          src={`https://picsum.photos/32/32?random=${i + 200}`}
                          alt="Commenter"
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-sm">user_{i + 1}</span>
                            <span className="text-xs text-gray-500">{Math.floor(Math.random() * 12) + 1}h</span>
                          </div>
                          <p className="text-sm text-gray-700">
                            {
                              [
                                "Great content! Love this 🔥",
                                "Amazing work! 👏",
                                "This is so cool! 😍",
                                "Incredible! Keep it up! 💪",
                                "Stunning! 🤩✨",
                              ][i]
                            }
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
