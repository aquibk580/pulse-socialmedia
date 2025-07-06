"use client"

import { useState } from "react"
import { Bell, Plus, User } from "lucide-react"
import { useNavigate } from "react-router-dom" 
import type { Suggestion } from "../../types/suggestion"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { cn } from "../../lib/utils"
import ActivityDialog from "./activity-dialog"

interface SuggestionsSidebarProps {
  suggestions: Suggestion[]
  // Add these props for user data
  currentUser?: {
    id: string
    username: string
    fullName: string
    avatar?: string
  }
}

export default function SuggestionsSidebar({ 
  suggestions, 
  currentUser = {
    id: "1",
    username: "johndoe",
    fullName: "John Doe",
    avatar: "/placeholder.svg"
  }
}: SuggestionsSidebarProps) {
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set())
  const [notifications, setNotifications] = useState(3)
  const [showActivity, setShowActivity] = useState(false)
  // const router = useRouter()

  const handleFollow = (userId: string) => {
    setFollowedUsers((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    })
  }

  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate("/create")
    // This will navigate to the Create page
    // You can also implement a modal or other UI for creating content
  }

  const categories = [
    { name: "Photography", icon: "📸" },
    { name: "Travel", icon: "✈️" },
    { name: "Food", icon: "🍕" },
    { name: "Tech", icon: "💻" },
    { name: "Music", icon: "🎵" },
    { name: "Art", icon: "🎨" },
  ]

  return (
    <>
      <div className="w-full bg-background/95 backdrop-blur-sm border-l border-border p-4 lg:p-6 space-y-6">
        {/* Top Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowActivity(true)}
            className="flex-1 flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 border border-primary/20 rounded-xl transition-all duration-200 hover:shadow-lg group relative"
          >
            <Bell className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-primary">Activity</span>
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          
          <button
            onClick={handleCreateClick}
            className="flex-1 flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-green-500/10 to-green-400/5 hover:from-green-500/20 hover:to-green-400/10 border border-green-500/20 rounded-xl transition-all duration-200 hover:shadow-lg group"
          >
            <Plus className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-green-600">Create</span>
          </button>
        </div>

        {/* Current User Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-muted/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={currentUser.avatar || "/placeholder.svg"}
                  alt={`${currentUser.fullName} profile`}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground text-sm truncate">{currentUser.fullName}</h3>
                <p className="text-xs text-muted-foreground truncate">@{currentUser.username}</p>
              </div>
              <button className="p-2 hover:bg-muted/50 rounded-full transition-colors">
                <User className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-muted/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {suggestions.slice(0, 5).map((suggestion) => (
                <div key={suggestion.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <img
                      src={suggestion.avatar || "/placeholder.svg"}
                      alt={`${suggestion.fullName} profile`}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-muted/20 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground text-sm truncate">{suggestion.fullName}</h3>
                      <p className="text-xs text-muted-foreground truncate">@{suggestion.username}</p>
                      {suggestion.mutualFriends && (
                        <p className="text-xs text-muted-foreground truncate">
                          {suggestion.mutualFriends} mutual friends
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleFollow(suggestion.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 shrink-0 ml-2",
                      followedUsers.has(suggestion.id)
                        ? "bg-muted text-muted-foreground hover:bg-muted/80"
                        : "bg-foreground text-background hover:bg-foreground/90 shadow-md hover:shadow-lg",
                    )}
                  >
                    {followedUsers.has(suggestion.id) ? "Following" : "Follow"}
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-muted/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Explore Categories</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg bg-muted hover:bg-muted/80"
                >
                  <div className="text-xl mb-2">{category.icon}</div>
                  <p className="text-sm font-medium text-foreground truncate">{category.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="pt-4 border-t border-border/50">
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="flex flex-wrap gap-2">
              <a href="#" className="hover:text-foreground transition-colors">
                About
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Help
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
            </div>
            <p>&copy; 2024 Prism. All rights reserved.</p>
          </div>
        </div>
      </div>

      <ActivityDialog isOpen={showActivity} onClose={() => setShowActivity(false)} />
    </>
  )
}