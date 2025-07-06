"use client"

import { useState } from "react"
import ProfileHeader from "../components/Profile/profile-header"
import ProfileStats from "../components/Profile/profile-stats"
import ProfileTabs from "../components/Profile/profile-tabs"
import ProfileContent from "../components/Profile/profile-content"
import ProfileSettings from "../components/Profile/profile-settings"
import { profileData } from "../data/profile"

export default function Profile() {
  const [activeTab, setActiveTab] = useState("posts")
  const [showSettings, setShowSettings] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Profile Container */}
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <ProfileHeader
          profile={profileData}
          isFollowing={isFollowing}
          onFollow={handleFollow}
          onSettings={() => setShowSettings(true)}
        />

        {/* Profile Stats */}
        <ProfileStats stats={profileData.stats} />

        {/* Profile Navigation */}
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Profile Content */}
        <ProfileContent activeTab={activeTab} profile={profileData} />
      </div>

      {/* Settings Modal */}
      <ProfileSettings isOpen={showSettings} onClose={() => setShowSettings(false)} profile={profileData} />
    </div>
  )
}
