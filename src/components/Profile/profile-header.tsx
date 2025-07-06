"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import {
  Settings,
  UserPlus,
  UserCheck,
  MessageCircle,
  MoreHorizontal,
  Camera,
  MapPin,
  Link,
  Calendar,
} from "lucide-react"
import { cn } from "../../lib/utils"

interface ProfileHeaderProps {
  profile: any
  isFollowing: boolean
  onFollow: () => void
  onSettings: () => void
}

export default function ProfileHeader({ profile, isFollowing, onFollow, onSettings }: ProfileHeaderProps) {
  const [imageLoading, setImageLoading] = useState(false)

  return (
    <div className="relative">
      {/* Cover Photo */}
      <div className="relative h-32 sm:h-48 md:h-56 lg:h-64 xl:h-72 w-full overflow-hidden">
        <img
          src={profile.coverPhoto || "/placeholder.svg?height=300&width=1200"}
          alt="Cover"
          className="w-full h-full object-cover"
          onLoad={() => setImageLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Cover Photo Edit Button - Only for own profile */}
        {profile.isOwnProfile && (
          <button className="absolute bottom-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Profile Info Container */}
      <div className="relative px-4 sm:px-6 lg:px-8">
        {/* Profile Picture */}
        <div className="relative -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 mb-4">
          <div className="relative inline-block">
            <img
              src={profile.avatar || "/placeholder.svg?height=150&width=150"}
              alt={profile.name}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border-4 border-background object-cover shadow-xl"
            />

            {/* Online Status */}
            {profile.isOnline && (
              <div className="absolute bottom-2 right-2 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 border-2 border-background rounded-full" />
            )}

            {/* Profile Picture Edit - Only for own profile */}
            {profile.isOwnProfile && (
              <button className="absolute bottom-0 right-0 p-2 bg-foreground text-background rounded-full shadow-lg hover:scale-105 transition-transform">
                <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Profile Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {/* Name and Username */}
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{profile.name}</h1>
                {profile.isVerified && (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">@{profile.username}</p>
            </div>

            {/* Bio */}
            <p className="text-sm sm:text-base text-foreground leading-relaxed max-w-2xl">{profile.bio}</p>

            {/* Profile Details */}
            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              {profile.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center space-x-1">
                  <Link className="w-3 h-3 sm:w-4 sm:h-4" />
                  <a
                    href={profile.website}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.website.replace("https://", "")}
                  </a>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Joined {profile.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Action Buttons */}
          <div className="flex flex-col space-y-3 lg:items-end">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {profile.isOwnProfile ? (
                <>
                  <Button variant="outline" className="flex-1 sm:flex-none bg-transparent">
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="icon" onClick={onSettings}>
                    <Settings className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={onFollow}
                    className={cn(
                      "flex-1 sm:flex-none transition-all duration-200",
                      isFollowing
                        ? "bg-muted text-muted-foreground hover:bg-red-500 hover:text-white"
                        : "bg-foreground text-background hover:bg-foreground/90",
                    )}
                  >
                    {isFollowing ? (
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
                  <Button variant="outline" className="flex-1 sm:flex-none bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Mutual Connections - Mobile */}
            {!profile.isOwnProfile && profile.mutualConnections && (
              <div className="lg:hidden">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {profile.mutualConnections.slice(0, 3).map((connection: any, index: number) => (
                      <img
                        key={index}
                        src={connection.avatar || "/placeholder.svg"}
                        alt={connection.name}
                        className="w-6 h-6 rounded-full border-2 border-background"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {profile.mutualConnections.length} mutual connections
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mutual Connections - Desktop */}
        {!profile.isOwnProfile && profile.mutualConnections && (
          <div className="hidden lg:block mt-4">
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-3">
                {profile.mutualConnections.slice(0, 5).map((connection: any, index: number) => (
                  <img
                    key={index}
                    src={connection.avatar || "/placeholder.svg"}
                    alt={connection.name}
                    className="w-8 h-8 rounded-full border-2 border-background"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Followed by {profile.mutualConnections[0]?.name}
                {profile.mutualConnections.length > 1 &&
                  ` and ${profile.mutualConnections.length - 1} others you follow`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
