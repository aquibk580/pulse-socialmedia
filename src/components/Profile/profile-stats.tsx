"use client"

import { Card } from "../ui/card"

interface ProfileStatsProps {
  stats: {
    posts: number
    followers: number
    following: number
    likes: number
  }
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  const statItems = [
    { label: "Posts", value: stats.posts, key: "posts" },
    { label: "Followers", value: stats.followers, key: "followers" },
    { label: "Following", value: stats.following, key: "following" },
    { label: "Likes", value: stats.likes, key: "likes" },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Mobile Stats - Horizontal Scroll */}
      <div className="sm:hidden">
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {statItems.map((stat) => (
            <div key={stat.key} className="flex-shrink-0 text-center min-w-[80px]">
              <div className="text-lg font-bold text-foreground">{formatNumber(stat.value)}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tablet and Desktop Stats - Grid */}
      <div className="hidden sm:block">
        <Card className="p-4 lg:p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {statItems.map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{formatNumber(stat.value)}</div>
                <div className="text-sm lg:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Highlights/Stories Section */}
      <div className="mt-4 sm:mt-6">
        <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {/* Add Story - Only for own profile */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 border-2 border-dashed border-muted-foreground/30 rounded-full flex items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
              <span className="text-2xl">+</span>
            </div>
            <p className="text-xs text-center mt-2 text-muted-foreground">New</p>
          </div>

          {/* Story Highlights */}
          {[1, 2, 3, 4, 5].map((highlight) => (
            <div key={highlight} className="flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full ring-2 ring-foreground p-1 cursor-pointer hover:scale-105 transition-transform">
                <img
                  src={`/placeholder.svg?height=80&width=80`}
                  alt={`Highlight ${highlight}`}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <p className="text-xs text-center mt-2 text-muted-foreground truncate max-w-[64px] sm:max-w-[80px]">
                Travel
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
