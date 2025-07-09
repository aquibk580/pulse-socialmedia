"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import ProfileHeader from "../components/Profile/profile-header"
import ProfileTabs from "../components/Profile/profile-tabs"
import ProfileContent from "../components/Profile/profile-content"
import ProfileSettings from "../components/Profile/profile-settings"
import { getProfileByUsername, getCurrentUserProfile } from "../data/profile"

export default function Profile() {
  const [activeTab, setActiveTab] = useState("posts")
  const [showSettings, setShowSettings] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const { username } = useParams<{ username: string }>()

  // Get the profile data based on username
  const profileData = username ? getProfileByUsername(username) : null
  const currentUser = getCurrentUserProfile()

  // If profile not found, show error
  if (!profileData) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Profile Not Found</h1>
          <p className="text-muted-foreground">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  // Check if this is the current user's own profile
  const isOwnProfile = profileData.username === currentUser.username

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Profile Container */}
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <ProfileHeader
          profile={{ ...profileData, isOwnProfile }}
          isFollowing={isFollowing}
          onFollow={handleFollow}
          onSettings={() => setShowSettings(true)}
        />

        {/* Profile Navigation */}
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Profile Content */}
        <ProfileContent activeTab={activeTab} profile={profileData} />
      </div>

      {/* Settings Modal - only show for own profile */}
      {isOwnProfile && (
        <ProfileSettings isOpen={showSettings} onClose={() => setShowSettings(false)} profile={profileData} />
      )}
    </div>
  )
}
