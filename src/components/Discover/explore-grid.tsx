"use client"

import { useState } from "react"
import { Play, Heart, MessageCircle, Bookmark, MoreHorizontal, Eye } from "lucide-react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"

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

  // Generate items with varied sizes for Instagram-style layout
  const generateItems = (): ExploreItem[] => {
    return Array.from({ length: 30 }, (_, i) => {
      // Create a pattern for varied sizes
      let size: "small" | "medium" | "large"
      if (i % 8 === 0) size = "large"
      else if (i % 4 === 0) size = "medium"
      else size = "small"

      const isVideo = Math.random() > 0.3 // 70% videos

      return {
        id: i + 1,
        type: isVideo ? "video" : "image",
        src: `/placeholder.svg?height=${size === "large" ? 600 : size === "medium" ? 400 : 300}&width=${size === "large" ? 400 : 300}`,
        thumbnail: `/placeholder.svg?height=${size === "large" ? 600 : size === "medium" ? 400 : 300}&width=${size === "large" ? 400 : 300}`,
        duration: isVideo
          ? `0:${Math.floor(Math.random() * 60)
              .toString()
              .padStart(2, "0")}`
          : undefined,
        likes: Math.floor(Math.random() * 10000) + 100,
        comments: Math.floor(Math.random() * 1000) + 10,
        views: Math.floor(Math.random() * 50000) + 1000,
        size,
        user: {
          username: `creator_${i + 1}`,
          avatar: `/placeholder.svg?height=40&width=40`,
          verified: Math.random() > 0.7,
        },
        caption: `Amazing content from creator ${i + 1}! Check this out 🔥 #trending #explore`,
      }
    })
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
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
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
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {item.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-2">
                        <Play className="w-4 h-4 text-gray-900 fill-current" />
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
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-semibold text-sm">{item.user.username}</span>
                    {item.user.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.caption}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleLike(item.id)}>
                      <Heart className={cn("w-4 h-4", likedItems.has(item.id) && "fill-red-500 text-red-500")} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleSave(item.id)}>
                      <Bookmark className={cn("w-4 h-4", savedItems.has(item.id) && "fill-current")} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  // Responsive Instagram-style grid
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-1 sm:gap-2">
        {exploreItems.map((item) => {
          // Determine grid span based on size and screen
          const getGridClass = () => {
            if (item.size === "large") return "col-span-2 row-span-2"
            if (item.size === "medium") return "sm:col-span-2 row-span-1"
            return "col-span-1 row-span-1"
          }

          return (
            <div
              key={item.id}
              className={cn(
                "relative group cursor-pointer overflow-hidden bg-black rounded-lg",
                getGridClass(),
                "aspect-square",
              )}
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.type === "video" ? item.thumbnail : item.src}
                alt={`Content by ${item.user.username}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />

              {/* Video Overlay */}
              {item.type === "video" && (
                <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                  <Play className="w-3 h-3 fill-current" />
                  <span>{item.duration}</span>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span className="text-xs font-medium">{formatNumber(item.likes)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span className="text-xs font-medium">{formatNumber(item.comments)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal for selected item */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-[95vh] bg-background rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              ×
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-3 max-h-[95vh]">
              <div className="lg:col-span-2 flex items-center justify-center bg-black">
                <img
                  src={selectedItem.src || "/placeholder.svg"}
                  alt="Selected content"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="p-4 lg:p-6 overflow-y-auto bg-background">
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
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>

                <p className="text-sm mb-4">{selectedItem.caption}</p>

                <div className="flex items-center space-x-6 mb-6">
                  <button
                    onClick={() => toggleLike(selectedItem.id)}
                    className="flex items-center space-x-2 hover:text-red-500 transition-colors"
                  >
                    <Heart className={cn("w-6 h-6", likedItems.has(selectedItem.id) && "fill-red-500 text-red-500")} />
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
                      className={cn("w-6 h-6", savedItems.has(selectedItem.id) && "fill-current text-yellow-500")}
                    />
                  </button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Comments</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className="flex space-x-3">
                        <img
                          src={`/placeholder.svg?height=32&width=32`}
                          alt="Commenter"
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-sm">user_{i + 1}</span>
                            <span className="text-xs text-muted-foreground">2h</span>
                          </div>
                          <p className="text-sm">Great content! Love this 🔥</p>
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
