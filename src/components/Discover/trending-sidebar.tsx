"use client"

import { TrendingUp, Hash, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export default function TrendingSidebar() {
  const trendingHashtags = [
    { tag: "#travel", posts: "1.8M posts", growth: "+8%", color: "text-green-500" },
    { tag: "#photography", posts: "2.1M posts", growth: "+15%", color: "text-green-500" },
    { tag: "#nature", posts: "950K posts", growth: "+22%", color: "text-green-500" },
    { tag: "#food", posts: "1.2M posts", growth: "+5%", color: "text-green-500" },
    { tag: "#art", posts: "800K posts", growth: "+12%", color: "text-green-500" },
  ]

  const popularPlaces = [
    { name: "Bali, Indonesia", posts: "450K posts", image: "/placeholder.svg?height=40&width=40" },
    { name: "Paris, France", posts: "380K posts", image: "/placeholder.svg?height=40&width=40" },
    { name: "Tokyo, Japan", posts: "320K posts", image: "/placeholder.svg?height=40&width=40" },
    { name: "New York, USA", posts: "290K posts", image: "/placeholder.svg?height=40&width=40" },
  ]

  const risingCreators = [
    { name: "Alex Johnson", username: "alexj_photo", followers: "1.2M", avatar: "/placeholder.svg?height=32&width=32" },
    {
      name: "Sarah Wilson",
      username: "sarah_travels",
      followers: "890K",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    { name: "Mike Chen", username: "mike_tech", followers: "650K", avatar: "/placeholder.svg?height=32&width=32" },
  ]

  return (
    <div className="space-y-4">
      {/* Trending Hashtags */}
      <Card className=" border shadow-none rounded-3xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Hash className="w-5 h-5 mr-2 text-blue-500" />
            Trending Hashtags
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {trendingHashtags.map((hashtag, index) => (
              <div
                key={index}
                className="flex items-center justify-between hover:bg-muted p-3 rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Hash className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{hashtag.tag}</p>
                    <p className="text-sm text-muted-foreground">{hashtag.posts}</p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${hashtag.color}`}>{hashtag.growth}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Places */}
      <Card className="border shadow-none rounded-3xl ">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
            Popular Places
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {popularPlaces.map((place, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 hover:bg-muted p-3 rounded-lg cursor-pointer transition-colors"
              >
                <img
                  src={place.image || "/placeholder.svg"}
                  alt={place.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{place.name}</p>
                  <p className="text-sm text-muted-foreground">{place.posts}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rising Creators */}
      <Card className="border shadow-none rounded-3xl ">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            Rising Creators
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {risingCreators.map((creator, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 hover:bg-muted p-3 rounded-lg cursor-pointer transition-colors"
              >
                <img
                  src={creator.avatar || "/placeholder.svg"}
                  alt={creator.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{creator.name}</p>
                  <p className="text-sm text-muted-foreground">@{creator.username}</p>
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
