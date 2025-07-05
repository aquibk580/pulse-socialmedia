"use client"

import { Camera, Edit, Settings, MoreHorizontal, Grid, Bookmark, UserCheck, Heart, MessageCircle, Share, ExternalLink, Lock, CheckCircle, Users, MapPin, Calendar, Link2 } from "lucide-react"
import { useState } from "react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("posts")
  const [isFollowing, setIsFollowing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "john_doe",
    bio: "📸 Photography enthusiast\n🌍 Travel lover\n☕ Coffee addict\n✨ Creating memories one shot at a time",
    website: "johndoe.com",
    location: "New York, NY",
    joinDate: "Joined March 2020",
    avatar: "/placeholder.svg?height=150&width=150",
    coverImage: "/placeholder.svg?height=200&width=800",
    isPrivate: false,
    isVerified: true,
    posts: 127,
    followers: 1234,
    following: 567,
    mutualFollowers: 12,
  })

  const tabs = [
    { id: "posts", label: "Posts", icon: Grid },
    { id: "saved", label: "Saved", icon: Bookmark },
    { id: "tagged", label: "Tagged", icon: UserCheck },
  ]

  const posts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    image: `/placeholder.svg?height=300&width=300`,
    likes: Math.floor(Math.random() * 1000) + 100,
    comments: Math.floor(Math.random() * 50) + 5,
    isVideo: i % 4 === 0,
    isCarousel: i % 3 === 0,
  }))

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save profile logic here
  }

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ml-20 mt-8 p-3.5">
      {/* Main Content */}
      <div className="w-full pl-4 pr-4 md:pl-72 lg:pr-60 xl:pr-96 pt-8 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-y-0 sm:space-x-8 space-y-4">
              {/* Profile Picture */}
              <div className="relative">
                <div className="relative">
                  <img
                    src={profile.avatar || "/placeholder.svg"}
                    alt={profile.name}
                    className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-full ring-4 ring-white dark:ring-gray-800 ring-opacity-50"></div>
                  {profile.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 shadow-lg">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="mb-4 sm:mb-0">
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.username}
                        onChange={(e) => setProfile((prev) => ({ ...prev, username: e.target.value }))}
                        className="text-2xl md:text-3xl font-bold bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white mb-2"
                      />
                    ) : (
                      <div className="flex items-center justify-center sm:justify-start space-x-2">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{profile.username}</h1>
                        {profile.isVerified && (
                          <CheckCircle className="w-6 h-6 text-blue-500" />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSaveProfile}
                          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleFollowToggle}
                          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                            isFollowing
                              ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                              : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
                          }`}
                        >
                          {isFollowing ? "Following" : "Follow"}
                        </button>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center space-x-1"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button className="p-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button className="p-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-center sm:justify-start space-x-6 lg:space-x-8 mb-6">
                  <div className="text-center group cursor-pointer">
                    <div className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{profile.posts}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Posts</div>
                  </div>
                  <div className="text-center group cursor-pointer">
                    <div className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                      {profile.followers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
                  </div>
                  <div className="text-center group cursor-pointer">
                    <div className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{profile.following}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
                  </div>
                </div>

                {/* Mutual Followers */}
                {profile.mutualFollowers > 0 && (
                  <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Followed by {profile.mutualFollowers} people you follow
                    </span>
                  </div>
                )}

                {/* Name and Bio */}
                <div className="space-y-3">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                        className="font-semibold text-lg bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white w-full"
                        placeholder="Display Name"
                      />
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                        className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white w-full resize-none"
                        rows={4}
                        placeholder="Tell us about yourself..."
                      />
                      <div className="flex space-x-2">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={profile.website}
                            onChange={(e) => setProfile((prev) => ({ ...prev, website: e.target.value }))}
                            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600 dark:text-blue-400 w-full"
                            placeholder="Website"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={profile.location}
                            onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white w-full"
                            placeholder="Location"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-semibold text-lg text-gray-900 dark:text-white">{profile.name}</div>
                      <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{profile.bio}</div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        {profile.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{profile.location}</span>
                          </div>
                        )}
                        {profile.website && (
                          <div className="flex items-center space-x-1">
                            <Link2 className="w-4 h-4" />
                            <a
                              href={`https://${profile.website}`}
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {profile.website}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{profile.joinDate}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-4 text-sm font-semibold transition-all duration-200 relative ${
                      activeTab === tab.id
                        ? "text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-700"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="p-6 bg-white dark:bg-gray-800">
            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
              {posts.map((post) => (
                <div key={post.id} className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={`Post ${post.id}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Video/Carousel indicators */}
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {post.isVideo && (
                      <div className="bg-black bg-opacity-70 rounded-full p-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                    {post.isCarousel && (
                      <div className="bg-black bg-opacity-70 rounded-full p-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full ml-1"></div>
                      </div>
                    )}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105">
                      <div className="flex items-center justify-center space-x-3 lg:space-x-4 mb-2">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4 lg:w-5 lg:h-5 fill-current" />
                          <span className="font-semibold text-xs lg:text-sm">{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5 fill-current" />
                          <span className="font-semibold text-xs lg:text-sm">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}