"use client"
import { useState } from "react"
import { Play, Heart, MessageCircle, Bookmark, MoreHorizontal, Eye } from "lucide-react"

interface ExploreGridProps {
  viewMode: "grid" | "list"
  filter?: string
}

interface ExploreItem {
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

export default function ExploreGrid({ viewMode, filter }: ExploreGridProps) {
  const [selectedItem, setSelectedItem] = useState<ExploreItem | null>(null)
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set())
  const [savedItems, setSavedItems] = useState<Set<number>>(new Set())

  // Generate items with Instagram-like pattern
  const generateItems = (): ExploreItem[] => {
    const items: ExploreItem[] = []

    // Instagram-like pattern: mostly small with strategic medium and large placements
    const patterns = [
      ["small", "small", "small"],
      ["small", "medium"],
      ["large"],
      ["small", "small", "small"],
      ["medium", "small"],
      ["small", "small", "small"],
      ["small", "large"],
      ["small", "small", "small"],
      ["medium", "small"],
      ["small", "small", "small"],
    ]

    let itemId = 1

    patterns.forEach((pattern, patternIndex) => {
      pattern.forEach((size, index) => {
        const isVideo = Math.random() > 0.4 // 60% videos
        const dimensions = size === "large" ? 400 : size === "medium" ? 300 : 200

        items.push({
          id: itemId,
          type: isVideo ? "video" : "image",
          src: `https://picsum.photos/${dimensions}/${dimensions}?random=${itemId}`,
          thumbnail: `https://picsum.photos/${dimensions}/${dimensions}?random=${itemId}`,
          duration: isVideo
            ? `${Math.floor(Math.random() * 9)}:${Math.floor(Math.random() * 60)
                .toString()
                .padStart(2, "0")}`
            : undefined,
          likes: Math.floor(Math.random() * 50000) + 500,
          comments: Math.floor(Math.random() * 2000) + 50,
          views: Math.floor(Math.random() * 100000) + 5000,
          size: size as "small" | "medium" | "large",
          user: {
            username: `creator_${itemId}`,
            avatar: `https://picsum.photos/40/40?random=${itemId + 100}`,
            verified: Math.random() > 0.8,
          },
          caption: `Amazing content from creator ${itemId}! Check this out 🔥 #trending #explore #content`,
        })
        itemId++
      })
    })

    // Add more small items to fill gaps
    for (let i = itemId; i < itemId + 20; i++) {
      const isVideo = Math.random() > 0.4
      items.push({
        id: i,
        type: isVideo ? "video" : "image",
        src: `https://picsum.photos/200/200?random=${i}`,
        thumbnail: `https://picsum.photos/200/200?random=${i}`,
        duration: isVideo
          ? `${Math.floor(Math.random() * 9)}:${Math.floor(Math.random() * 60)
              .toString()
              .padStart(2, "0")}`
          : undefined,
        likes: Math.floor(Math.random() * 50000) + 500,
        comments: Math.floor(Math.random() * 2000) + 50,
        views: Math.floor(Math.random() * 100000) + 5000,
        size: "small",
        user: {
          username: `creator_${i}`,
          avatar: `https://picsum.photos/40/40?random=${i + 100}`,
          verified: Math.random() > 0.8,
        },
        caption: `Amazing content from creator ${i}! Check this out 🔥 #trending #explore #content`,
      })
    }

    return items
  }

  const exploreItems = generateItems()

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

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {exploreItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
              <div className="relative aspect-square sm:aspect-auto">
                <img
                  src={item.type === "video" ? item.thumbnail : item.src}
                  alt={`Content by ${item.user.username}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                />
                {item.type === "video" && (
                  <>
                    <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {item.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-3">
                        <Play className="w-5 h-5 text-gray-900 fill-current" />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="sm:col-span-2 lg:col-span-3 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <img
                      src={item.user.avatar || "/placeholder.svg"}
                      alt={item.user.username}
                      className="w-7 h-7 rounded-full"
                    />
                    <span className="font-semibold text-sm">{item.user.username}</span>
                    {item.user.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.caption}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{formatNumber(item.likes)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{formatNumber(item.comments)}</span>
                    </div>
                    {item.views && (
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{formatNumber(item.views)}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      onClick={() => toggleLike(item.id)}
                    >
                      <Heart
                        className={`w-5 h-5 ${likedItems.has(item.id) ? "fill-red-500 text-red-500" : "text-gray-700"}`}
                      />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      onClick={() => toggleSave(item.id)}
                    >
                      <Bookmark
                        className={`w-5 h-5 ${savedItems.has(item.id) ? "fill-current text-yellow-500" : "text-gray-700"}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Instagram-style masonry grid
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-1 auto-rows-fr">
          {exploreItems.map((item) => {
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
                className={`relative group cursor-pointer overflow-hidden ${getGridSpan()} ${getAspectRatio()}`}
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

                {/* Multiple content indicator for large items */}
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
