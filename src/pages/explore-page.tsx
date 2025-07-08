"use client"

import { Play, Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react"
import { useState } from "react"

interface ExploreItem {
  id: number
  type: "image" | "video"
  src: string
  thumbnail?: string
  likes: number
  comments: number
  duration?: string
  user: {
    username: string
    avatar: string
  }
}

export default function ExplorePage() {
  const [selectedItem, setSelectedItem] = useState<ExploreItem | null>(null)

  const exploreItems: ExploreItem[] = [
    {
      id: 1,
      type: "image",
      src: "/placeholder.svg?height=400&width=400",
      likes: 1234,
      comments: 89,
      user: { username: "photographer_pro", avatar: "/placeholder.svg?height=32&width=32" },
    },
    {
      id: 2,
      type: "video",
      src: "/placeholder.svg?height=600&width=400",
      thumbnail: "/placeholder.svg?height=600&width=400",
      duration: "0:45",
      likes: 2156,
      comments: 234,
      user: { username: "travel_vlogger", avatar: "/placeholder.svg?height=32&width=32" },
    },
    {
      id: 3,
      type: "image",
      src: "/placeholder.svg?height=500&width=400",
      likes: 892,
      comments: 67,
      user: { username: "nature_lover", avatar: "/placeholder.svg?height=32&width=32" },
    },
    {
      id: 4,
      type: "video",
      src: "/placeholder.svg?height=400&width=400",
      thumbnail: "/placeholder.svg?height=400&width=400",
      duration: "1:23",
      likes: 3421,
      comments: 456,
      user: { username: "fitness_guru", avatar: "/placeholder.svg?height=32&width=32" },
    },
    {
      id: 5,
      type: "image",
      src: "/placeholder.svg?height=600&width=400",
      likes: 567,
      comments: 34,
      user: { username: "food_artist", avatar: "/placeholder.svg?height=32&width=32" },
    },
    {
      id: 6,
      type: "video",
      src: "/placeholder.svg?height=500&width=400",
      thumbnail: "/placeholder.svg?height=500&width=400",
      duration: "2:15",
      likes: 1876,
      comments: 123,
      user: { username: "music_maker", avatar: "/placeholder.svg?height=32&width=32" },
    },
    // Add more items to fill the grid
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 7,
      type: Math.random() > 0.5 ? "image" : ("video" as "image" | "video"),
      src: `/placeholder.svg?height=${Math.floor(Math.random() * 200) + 400}&width=400`,
      thumbnail: `/placeholder.svg?height=${Math.floor(Math.random() * 200) + 400}&width=400`,
      duration:
        Math.random() > 0.5
          ? `${Math.floor(Math.random() * 3)}:${Math.floor(Math.random() * 60)
              .toString()
              .padStart(2, "0")}`
          : undefined,
      likes: Math.floor(Math.random() * 5000) + 100,
      comments: Math.floor(Math.random() * 500) + 10,
      user: {
        username: `user_${i + 7}`,
        avatar: `/placeholder.svg?height=32&width=32`,
      },
    })),
  ]

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  return (
    <div className="flex-1 pt-20 pb-20 md:pb-8">
      <div className="w-full px-4">
        <div className="md:ml-64 lg:mr-80 max-w-6xl mx-auto">
          {/* Explore Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Explore</h1>
            <p className="text-gray-600 dark:text-gray-400">Discover amazing content from creators around the world</p>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap- space-y-">
            {exploreItems.map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid relative group cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative">
                  <img
                    src={item.type === "video" ? item.thumbnail : item.src}
                    alt={`Content by ${item.user.username}`}
                    className="w-full h-auto object-cover"
                  />

                  {/* Video Overlay */}
                  {item.type === "video" && (
                    <>
                      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {item.duration}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white bg-opacity-90 rounded-full p-3">
                          <Play className="w-6 h-6 text-gray-900 fill-current" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Hover Overlay with Stats */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-3 text-white w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm font-medium">{formatNumber(item.likes)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">{formatNumber(item.comments)}</span>
                          </div>
                        </div>
                        <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="p-3">
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.user.avatar || "/placeholder.svg"}
                      alt={item.user.username}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.user.username}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for selected item */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-10 text-white rounded-full hover:bg-opacity-70 transition-colors"
            >
              ×
            </button>
            <div className="flex flex-co border-4 border-red-500 lg:flex-row max-h-[90vh]">
              <div className="flex-1 flex items-center justify-center bg-black">
                <img
                  src={selectedItem.src || "/placeholder.svg"}
                  alt="Selected content"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="w-full lg:w-80 p-4 overflow-y-auto">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={selectedItem.user.avatar || "/placeholder.svg"}
                    alt={selectedItem.user.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-semibold text-gray-900 dark:text-white">{selectedItem.user.username}</span>
                  <button className="ml-auto">
                    <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                <div className="flex items-center space-x-6 mb-4">
                  <button className="flex items-center space-x-1">
                    <Heart className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatNumber(selectedItem.likes)}
                    </span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <MessageCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatNumber(selectedItem.comments)}
                    </span>
                  </button>
                  <button>
                    <Bookmark className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
