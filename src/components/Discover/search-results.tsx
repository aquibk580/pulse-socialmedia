"use client"

import { useState } from "react"
import { User, Hash, MapPin, Clock, X, UserPlus, UserCheck } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { cn } from "../../lib/utils"

interface SearchResultsProps {
  query: string
  viewMode: "grid" | "list"
}

export default function SearchResults({ query, viewMode }: SearchResultsProps) {
  const [recentSearches, setRecentSearches] = useState(["john_doe", "#photography", "New York", "travel_blogger"])
  const [followedUsers, setFollowedUsers] = useState<Set<number>>(new Set())

  const searchResults = {
    people: [
      {
        id: 1,
        name: "John Doe",
        username: "john_doe",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
        followers: "1.2M",
        bio: "Professional photographer & content creator",
        mutualFriends: 12,
      },
      {
        id: 2,
        name: "Jane Smith",
        username: "jane_smith",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: false,
        followers: "45K",
        bio: "Travel enthusiast sharing adventures",
        mutualFriends: 5,
      },
      {
        id: 3,
        name: "Mike Johnson",
        username: "mike_j",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
        followers: "890K",
        bio: "Tech reviewer and gadget lover",
        mutualFriends: 8,
      },
    ],
    hashtags: [
      { id: 1, tag: "#photography", posts: "2.1M posts", trending: true },
      { id: 2, tag: "#travel", posts: "1.8M posts", trending: false },
      { id: 3, tag: "#nature", posts: "950K posts", trending: true },
      { id: 4, tag: "#food", posts: "1.2M posts", trending: false },
    ],
    places: [
      {
        id: 1,
        name: "New York, NY",
        country: "United States",
        posts: "15.2M posts",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 2,
        name: "Paris, France",
        country: "France",
        posts: "8.7M posts",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 3,
        name: "Tokyo, Japan",
        country: "Japan",
        posts: "12.1M posts",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
  }

  const clearRecentSearch = (index: number) => {
    setRecentSearches((prev) => prev.filter((_, i) => i !== index))
  }

  const toggleFollow = (userId: number) => {
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

  if (!query.trim()) {
    return (
      <Card className="border shadow-none rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Searches</h3>
            <Button variant="ghost" size="sm" onClick={() => setRecentSearches([])}>
              Clear All
            </Button>
          </div>
          <div className="space-y-3">
            {recentSearches.length > 0 ? (
              recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{search}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      clearRecentSearch(index)
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No recent searches</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Mobile Tabs */}
      <div className="lg:hidden">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-9">
            <TabsTrigger value="all" className="text-xs">
              All
            </TabsTrigger>
            <TabsTrigger value="people" className="text-xs">
              People
            </TabsTrigger>
            <TabsTrigger value="hashtags" className="text-xs">
              Tags
            </TabsTrigger>
            <TabsTrigger value="places" className="text-xs">
              Places
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="space-y-6">
              {renderPeopleSection()}
              {renderHashtagsSection()}
              {renderPlacesSection()}
            </div>
          </TabsContent>
          <TabsContent value="people" className="mt-4">
            {renderPeopleSection()}
          </TabsContent>
          <TabsContent value="hashtags" className="mt-4">
            {renderHashtagsSection()}
          </TabsContent>
          <TabsContent value="places" className="mt-4">
            {renderPlacesSection()}
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block space-y-4">
        {renderPeopleSection()}
        {renderHashtagsSection()}
        {renderPlacesSection()}
      </div>
    </div>
  )

  function renderPeopleSection() {
    return (
      <Card className="border shadow-none rounded-3xl ">
        <CardContent className="">
          <h4 className="text-lg font-semibold  flex items-center">
            <User className="w-5 h-5 mr-2" />
            People
          </h4>
          <div
            className={cn(viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4")}
          >
            {searchResults.people.map((person) => (
              <div
                key={person.id}
                className={cn(
                  "flex items-center justify-between p-4 mt-3 hover:bg-muted rounded-2xl transition-colors",
                  viewMode === "grid" && "flex-col text-center space-y-3",
                )}
              >
                <div
                  className={cn("flex items-center space-x-3", viewMode === "grid" && "flex-col space-x-0 space-y-2")}
                >
                  <img
                    src={person.avatar || "/placeholder.svg"}
                    alt={person.name}
                    className={cn("rounded-full object-cover", viewMode === "grid" ? "w-20 h-20" : "w-12 h-12")}
                  />
                  <div className={cn(viewMode === "grid" && "text-center")}>
                    <div className="flex items-center space-x-1 justify-center">
                      <h5 className="font-semibold">{person.name}</h5>
                      {person.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">@{person.username}</p>
                    <p className="text-xs text-muted-foreground">{person.followers} followers</p>
                    {person.mutualFriends > 0 && (
                      <p className="text-xs text-muted-foreground">{person.mutualFriends} mutual friends</p>
                    )}
                    {viewMode === "grid" && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{person.bio}</p>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => toggleFollow(person.id)}
                  size="sm"
                  className={cn(
                    "transition-all duration-200",
                    followedUsers.has(person.id)
                      ? "bg-muted text-muted-foreground hover:bg-red-500 hover:text-white"
                      : "bg-foreground text-background hover:bg-foreground/90",
                  )}
                >
                  {followedUsers.has(person.id) ? (
                    <>
                      <UserCheck className="w-4 h-4 mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  function renderHashtagsSection() {
    return (
      <Card className="border shadow-none rounded-3xl ">
        <CardContent className="">
          <h4 className="text-lg font-semibold mb-3 flex items-center">
            <Hash className="w-5 h-5 mr-2" />
            Hashtags
          </h4>
          <div
            className={cn(viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3")}
          >
            {searchResults.hashtags.map((hashtag) => (
              <div
                key={hashtag.id}
                className="flex items-center p-4 hover:bg-muted rounded-lg cursor-pointer transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Hash className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-semibold truncate">{hashtag.tag}</h5>
                    {hashtag.trending && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Trending</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{hashtag.posts}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  function renderPlacesSection() {
    return (
      <Card className="border shadow-none rounded-3xl ">
        <CardContent className="">
          <h4 className="text-lg font-semibold mb-3 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Places
          </h4>
          <div
            className={cn(viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3")}
          >
            {searchResults.places.map((place) => (
              <div
                key={place.id}
                className="flex items-center p-4 hover:bg-muted rounded-lg cursor-pointer transition-colors"
              >
                <img
                  src={place.image || "/placeholder.svg"}
                  alt={place.name}
                  className="w-12 h-12 rounded-lg object-cover mr-3 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold truncate">{place.name}</h5>
                  <p className="text-sm text-muted-foreground">{place.country}</p>
                  <p className="text-xs text-muted-foreground">{place.posts}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
}
