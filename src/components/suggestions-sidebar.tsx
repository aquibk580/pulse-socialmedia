"use client"

import { useState } from "react"
import type { Suggestion } from "../types/suggestion"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { cn } from "../lib/utils"

interface SuggestionsSidebarProps {
  suggestions: Suggestion[]
}

export default function SuggestionsSidebar({ suggestions }: SuggestionsSidebarProps) {
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set())

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

  const categories = [
    { name: "Photography", color: "bg-gradient-to-br from-purple-400 to-pink-400", icon: "📸" },
    { name: "Travel", color: "bg-gradient-to-br from-blue-400 to-cyan-400", icon: "✈️" },
    { name: "Food", color: "bg-gradient-to-br from-orange-400 to-red-400", icon: "🍕" },
    { name: "Tech", color: "bg-gradient-to-br from-green-400 to-blue-400", icon: "💻" },
    { name: "Music", color: "bg-gradient-to-br from-pink-400 to-purple-400", icon: "🎵" },
    { name: "Art", color: "bg-gradient-to-br from-yellow-400 to-orange-400", icon: "🎨" },
  ]

  return (
    <div className="hidden lg:block w-80 bg-background/95 backdrop-blur-sm border-l border-border h-screen fixed right-0 top-16 z-30 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Stories Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-muted/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Stories</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 p-0.5">
                    <img
                      src={`/placeholder.svg?height=60&width=60`}
                      alt={`Story ${i}`}
                      className="w-full h-full rounded-full object-cover border-2 border-background"
                    />
                  </div>
                  <p className="text-xs text-center mt-1 text-muted-foreground">User {i}</p>
                </div>
              ))}
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
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={suggestion.avatar || "/placeholder.svg"}
                      alt={`${suggestion.fullName} profile`}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/10"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{suggestion.fullName}</h3>
                      <p className="text-xs text-muted-foreground">@{suggestion.username}</p>
                      {suggestion.mutualFriends && (
                        <p className="text-xs text-muted-foreground">{suggestion.mutualFriends} mutual friends</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleFollow(suggestion.id)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                      followedUsers.has(suggestion.id)
                        ? "bg-muted text-muted-foreground hover:bg-muted/80"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
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
                  className={cn(
                    "p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg",
                    category.color,
                  )}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <p className="text-sm font-medium text-white">{category.name}</p>
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
    </div>
  )
}
