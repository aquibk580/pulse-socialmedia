"use client"

import { TrendingUp, Hash, MapPin, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export default function TrendingSection() {
  const trendingData = {
    hashtags: [
      { tag: "#photography", posts: "2.1M", growth: "+15%" },
      { tag: "#travel", posts: "1.8M", growth: "+8%" },
      { tag: "#nature", posts: "950K", growth: "+22%" },
    ],
    places: [
      { name: "Bali, Indonesia", posts: "450K" },
      { name: "Paris, France", posts: "380K" },
      { name: "Tokyo, Japan", posts: "320K" },
    ],
    creators: [
      { name: "Alex Johnson", username: "alexj_photo", followers: "1.2M" },
      { name: "Sarah Wilson", username: "sarah_travels", followers: "890K" },
      { name: "Mike Chen", username: "mike_tech", followers: "650K" },
    ],
  }

  return (
    <div className="space-y-4">
      {/* Trending Hashtags */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
            Trending Hashtags
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {trendingData.hashtags.map((hashtag, index) => (
              <div
                key={index}
                className="flex items-center justify-between hover:bg-muted p-2 rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{hashtag.tag}</p>
                    <p className="text-xs text-muted-foreground">{hashtag.posts} posts</p>
                  </div>
                </div>
                <span className="text-xs text-green-500 font-medium">{hashtag.growth}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Places */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
            Popular Places
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {trendingData.places.map((place, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 hover:bg-muted p-2 rounded-lg cursor-pointer transition-colors"
              >
                <img
                  src={`/placeholder.svg?height=32&width=32`}
                  alt={place.name}
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-sm">{place.name}</p>
                  <p className="text-xs text-muted-foreground">{place.posts} posts</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Creators */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <User className="w-4 h-4 mr-2 text-purple-500" />
            Rising Creators
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {trendingData.creators.map((creator, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 hover:bg-muted p-2 rounded-lg cursor-pointer transition-colors"
              >
                <img
                  src={`/placeholder.svg?height=32&width=32`}
                  alt={creator.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{creator.name}</p>
                  <p className="text-xs text-muted-foreground">@{creator.username}</p>
                </div>
                <span className="text-xs text-muted-foreground">{creator.followers}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
