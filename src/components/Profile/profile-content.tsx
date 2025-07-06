"use client"

import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import { Heart, MessageCircle, Play, MapPin, Calendar, Users, Globe } from "lucide-react"

interface ProfileContentProps {
  activeTab: string
  profile: any
}

export default function ProfileContent({ activeTab, profile }: ProfileContentProps) {
  const [selectedPost, setSelectedPost] = useState(null)

  // Mock data for different content types
  const posts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    type: Math.random() > 0.7 ? "video" : "image",
    thumbnail: `/placeholder.svg?height=300&width=300`,
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
    caption: `This is post ${i + 1} with some interesting content...`,
  }))

  const aboutInfo = {
    bio: profile.bio,
    details: [
      { label: "Lives in", value: profile.location, icon: MapPin },
      { label: "Joined", value: profile.joinDate, icon: Calendar },
      { label: "Followers", value: `${profile.stats.followers} people`, icon: Users },
      { label: "Website", value: profile.website, icon: Globe },
    ],
    interests: ["Photography", "Travel", "Technology", "Art", "Music", "Food"],
  }

  const renderPostsGrid = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-2 lg:gap-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg"
          onClick={() => setSelectedPost(post)}
        >
          <img
            src={post.thumbnail || "/placeholder.svg"}
            alt={`Post ${post.id}`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />

          {/* Video Indicator */}
          {post.type === "video" && (
            <div className="absolute top-2 right-2">
              <Play className="w-4 h-4 text-white drop-shadow-lg" />
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex items-center space-x-4 text-white text-sm">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderAbout = () => (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">{aboutInfo.bio}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aboutInfo.details.map((detail, index) => {
              const Icon = detail.icon
              return (
                <div key={index} className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">{detail.label}</p>
                    <p className="font-medium">{detail.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-4">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {aboutInfo.interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm hover:bg-muted/80 transition-colors"
              >
                {interest}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderEmptyState = (message: string) => (
    <div className="text-center py-12 sm:py-16">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl sm:text-3xl">📷</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">No {activeTab} yet</h3>
      <p className="text-muted-foreground text-sm sm:text-base">{message}</p>
    </div>
  )

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {activeTab === "posts" && renderPostsGrid()}
      {activeTab === "photos" && renderPostsGrid()}
      {activeTab === "videos" && renderPostsGrid()}
      {activeTab === "tagged" && renderEmptyState("No tagged posts to show")}
      {activeTab === "about" && renderAbout()}
      {activeTab === "saved" && renderEmptyState("Your saved posts will appear here")}

      {/* Post Modal - Simple implementation */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-square">
                <img
                  src={selectedPost.thumbnail || "/placeholder.svg"}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img src={profile.avatar || "/placeholder.svg"} alt={profile.name} className="w-8 h-8 rounded-full" />
                  <span className="font-semibold">{profile.username}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{selectedPost.caption}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{selectedPost.likes} likes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{selectedPost.comments} comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
