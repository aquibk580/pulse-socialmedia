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

  const navigate = useNavigate()
  const handleCreateClick = () => {
    navigate("/create")
  }

  const categories = [
    { name: "Games", icon: "🎮", nav: "/games" },
    { name: "Travel", icon: "✈️", nav: "/discover/travel" },
    { name: "Food", icon: "🍕", nav: "/discover/food" },
    { name: "Tech", icon: "💻", nav: "/discover/tech" },
    { name: "Music", icon: "🎵", nav: "/discover/music" },
    { name: "Art", icon: "🎨", nav: "/discover/art" },
  ]

  return (
    <>
      <div className="w-full bg-background/95 backdrop-blur-sm p-4 lg:p-6 space-y-4">
        {/* Top Action Buttons */}
        <div className="flex gap-3 relative">
          <button
            onClick={() => setShowActivity(true)}
            className="flex-1 flex items-center justify-center gap-2 p-3 border cursor-pointer hover:bg-gray-100 bg-background text-foreground rounded-2xl transition-all duration-200 relative"
          >
            <Bell className="w-5 h-5 hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Notifications</span>
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          <button
            onClick={handleCreateClick}
            className="relative inline-block group font-semibold leading-6 text-white bg-gray-800 cursor-pointer rounded-2xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
              <div className="relative z-10 flex items-center space-x-2">
                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Create</span>
                <svg
                  className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                  data-slot="icon"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </span>
          </button>
        </div>

        {/* Current User Card */}
        <Card className="border-b shadow-none rounded-none">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={currentUser.avatar || "/placeholder.svg"}
                  alt={`${currentUser.fullName} profile`}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground text-sm truncate">{currentUser.fullName}</h3>
                <p className="text-xs text-muted-foreground truncate">@{currentUser.username}</p>
              </div>
              <button className="px-2.5 py-1.5 flex items-center gap-1 text-xs bg-muted/50 rounded-full transition-colors">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>Private</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card className="border-b pt-2 shadow-none rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {suggestions.slice(0, 5).map((suggestion) => (
                <div key={suggestion.id} className="flex items-center justify-between pb-1">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <img
                      src={suggestion.avatar || "/placeholder.svg"}
                      alt={`${suggestion.fullName} profile`}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-muted/20 shrink-0"
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
                      "px-3 py-1.5 rounded-full cursor-pointer text-xs font-medium transition-all duration-200 shrink-0 ml-2",
                      followedUsers.has(suggestion.id)
                        ? "bg-muted text-muted-foreground hover:bg-muted/80"
                        : "bg-foreground text-background hover:bg-foreground/90",
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
        <Card className="border-none shadow-none rounded-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Explore Categories</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="p-3 flex items-center justify-center flex-col rounded-3xl px-4 cursor-pointer transition-all duration-200 bg-muted hover:bg-muted/80"
                  onClick={() => navigate(category.nav || "#")}
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
          <div className="text-xs flex items-center flex-col text-muted-foreground space-y-2">
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