"use client"

import { X, Heart, MessageCircle, UserPlus, AtSign } from "lucide-react"
import { useState } from "react"

interface ActivityDialogProps {
  isOpen: boolean
  onClose: () => void
}

interface Activity {
  id: number
  type: "like" | "comment" | "follow" | "mention"
  user: {
    name: string
    username: string
    avatar: string
  }
  content?: string
  post?: {
    image: string
  }
  time: string
  isRead: boolean
}

export default function ActivityDialog({ isOpen, onClose }: ActivityDialogProps) {
  const [activeTab, setActiveTab] = useState("all")

  const activities: Activity[] = [
    {
      id: 1,
      type: "like",
      user: {
        name: "Sarah Johnson",
        username: "sarah_j",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      post: {
        image: "/placeholder.svg?height=60&width=60",
      },
      time: "2m",
      isRead: false,
    },
    {
      id: 2,
      type: "comment",
      user: {
        name: "Mike Chen",
        username: "mike_chen",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: "Amazing shot! 📸",
      post: {
        image: "/placeholder.svg?height=60&width=60",
      },
      time: "5m",
      isRead: false,
    },
    {
      id: 3,
      type: "follow",
      user: {
        name: "Emma Wilson",
        username: "emma_w",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      time: "1h",
      isRead: true,
    },
    {
      id: 4,
      type: "mention",
      user: {
        name: "Alex Rodriguez",
        username: "alex_r",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: "Check out this amazing place!",
      post: {
        image: "/placeholder.svg?height=60&width=60",
      },
      time: "2h",
      isRead: true,
    },
    {
      id: 5,
      type: "like",
      user: {
        name: "Lisa Park",
        username: "lisa_p",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      post: {
        image: "/placeholder.svg?height=60&width=60",
      },
      time: "3h",
      isRead: true,
    },
  ]

  const tabs = [
    { id: "all", label: "All" },
    { id: "likes", label: "Likes" },
    { id: "comments", label: "Comments" },
    { id: "follows", label: "Follows" },
  ]

  const filteredActivities = activities.filter((activity) => {
    if (activeTab === "all") return true
    if (activeTab === "likes") return activity.type === "like"
    if (activeTab === "comments") return activity.type === "comment" || activity.type === "mention"
    if (activeTab === "follows") return activity.type === "follow"
    return true
  })

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-4 h-4 text-red-500 fill-current" />
      case "comment":
        return <MessageCircle className="w-4 h-4 text-blue-500" />
      case "follow":
        return <UserPlus className="w-4 h-4 text-green-500" />
      case "mention":
        return <AtSign className="w-4 h-4 text-purple-500" />
      default:
        return null
    }
  }

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case "like":
        return "liked your post"
      case "comment":
        return "commented on your post"
      case "follow":
        return "started following you"
      case "mention":
        return "mentioned you in a post"
      default:
        return ""
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Activity</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Activities List */}
        <div className="flex-1 overflow-y-auto">
          {filteredActivities.length > 0 ? (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    !activity.isRead ? "bg-blue-50 dark:bg-blue-900/10" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={activity.user.avatar || "/placeholder.svg"}
                        alt={activity.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-900 rounded-full p-1">
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-white">
                            <span className="font-semibold">{activity.user.username}</span> {getActivityText(activity)}
                          </p>
                          {activity.content && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">"{activity.content}"</p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                        </div>
                        {activity.post && (
                          <img
                            src={activity.post.image || "/placeholder.svg"}
                            alt="Post"
                            className="w-12 h-12 rounded-lg object-cover ml-3"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32">
              <p className="text-gray-500 dark:text-gray-400">No activities yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
