"use client"

import { Camera, Edit, Settings, MoreHorizontal, Grid, Bookmark, UserCheck } from "lucide-react"
import { useState } from "react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("posts")
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "john_doe",
    bio: "📸 Photography enthusiast\n🌍 Travel lover\n☕ Coffee addict",
    website: "johndoe.com",
    avatar: "/placeholder.svg?height=150&width=150",
    isPrivate: false,
    posts: 127,
    followers: 1234,
    following: 567,
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
  }))

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save profile logic here
  }

  return (
    <div className="flex-1 pt-20 pb-20 md:pb-8">
      <div className="w-full px-4">
        <div className="md:ml-64 lg:mr-80 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Profile Header */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                {/* Profile Picture */}
                <div className="relative">
                  <img
                    src={profile.avatar || "/placeholder.svg"}
                    alt={profile.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                  />
                  {isEditing && (
                    <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.username}
                        onChange={(e) => setProfile((prev) => ({ ...prev, username: e.target.value }))}
                        className="text-2xl font-light bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white mb-2 md:mb-0"
                      />
                    ) : (
                      <h1 className="text-2xl font-light text-gray-900 dark:text-white">{profile.username}</h1>
                    )}

                    <div className="flex space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleSaveProfile}
                            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center space-x-1"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit profile</span>
                          </button>
                          <button className="p-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <Settings className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-center md:justify-start space-x-8 mb-4">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-white">{profile.posts}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">posts</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {profile.followers.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-white">{profile.following}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">following</div>
                    </div>
                  </div>

                  {/* Name and Bio */}
                  <div className="space-y-2">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                          className="font-semibold bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white w-full"
                          placeholder="Name"
                        />
                        <textarea
                          value={profile.bio}
                          onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                          className="bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white w-full resize-none"
                          rows={3}
                          placeholder="Bio"
                        />
                        <input
                          type="text"
                          value={profile.website}
                          onChange={(e) => setProfile((prev) => ({ ...prev, website: e.target.value }))}
                          className="bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 text-blue-600 dark:text-blue-400 w-full"
                          placeholder="Website"
                        />
                      </>
                    ) : (
                      <>
                        <div className="font-semibold text-gray-900 dark:text-white">{profile.name}</div>
                        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{profile.bio}</div>
                        <a
                          href={`https://${profile.website}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {profile.website}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200 dark:border-gray-700">
              <div className="flex">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-1 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "text-gray-900 dark:text-white border-t-2 border-gray-900 dark:border-white"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Posts Grid */}
            <div className="p-4">
              <div className="grid grid-cols-3 gap-1 md:gap-4">
                {posts.map((post) => (
                  <div key={post.id} className="aspect-square relative group cursor-pointer">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={`Post ${post.id}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-sm font-medium">{post.likes} likes</div>
                        <div className="text-sm">{post.comments} comments</div>
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
