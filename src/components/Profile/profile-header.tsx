"use client"
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
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {/* Profile Picture and Stats Row */}
        <div className="flex items-start space-x-4 sm:space-x-6 mb-4">
          {/* Profile Picture */}
          <div className="relative flex-shrink-0">
            <img
              src={profile.avatar || "/placeholder.svg?height=150&width=150"}
              alt={profile.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-lg"
            />

            {/* Online Status */}
            {profile.isOnline && (
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
            )}

            {/* Profile Picture Edit - Only for own profile */}
            {profile.isOwnProfile && (
              <button className="absolute bottom-0 right-0 p-1.5 bg-foreground text-background rounded-full shadow-lg hover:scale-105 transition-transform">
                <Camera className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex-1 grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div>
              <div className="text-lg sm:text-xl font-bold text-foreground">{formatNumber(profile.stats.posts)}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Posts</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-foreground">
                {formatNumber(profile.stats.followers)}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Followers</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-foreground">
                {formatNumber(profile.stats.following)}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Following</div>
            </div>
          </div>
        </div>

        {/* Name and Username */}
        <div className="mb-3">
          <div className="flex items-center space-x-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">{profile.name}</h1>
            {profile.isVerified && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">@{profile.username}</p>
        </div>

        {/* Bio */}
        <p className="text-sm text-foreground leading-relaxed mb-3">{profile.bio}</p>

        {/* Profile Details */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
          {profile.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{profile.location}</span>
            </div>
          )}
          {profile.website && (
            <div className="flex items-center space-x-1">
              <Link className="w-3 h-3" />
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
            <Calendar className="w-3 h-3" />
            <span>Joined {profile.joinDate}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {profile.isOwnProfile ? (
            <>
              <Button variant="outline" className="flex-1 bg-transparent">
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
                  "flex-1 transition-all duration-200",
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
              <Button variant="outline" className="bg-transparent">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {/* Mutual Connections */}
        {!profile.isOwnProfile && profile.mutualConnections && (
          <div className="mt-4">
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

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="flex items-start space-x-8">
          {/* Profile Picture */}
          <div className="relative flex-shrink-0">
            <img
              src={profile.avatar || "/placeholder.svg?height=150&width=150"}
              alt={profile.name}
              className="w-32 h-32 xl:w-40 xl:h-40 rounded-full object-cover shadow-xl"
            />

            {/* Online Status */}
            {profile.isOnline && (
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-background rounded-full" />
            )}

            {/* Profile Picture Edit - Only for own profile */}
            {profile.isOwnProfile && (
              <button className="absolute bottom-0 right-0 p-2 bg-foreground text-background rounded-full shadow-lg hover:scale-105 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            {/* Top Row: Name and Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl xl:text-3xl font-bold text-foreground">{profile.name}</h1>
                {profile.isVerified && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {profile.isOwnProfile ? (
                  <>
                    <Button variant="outline" className="bg-transparent">
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
                        "transition-all duration-200",
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
                    <Button variant="outline" className="bg-transparent">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Username and Stats Row */}
            <div className="flex items-center space-x-8">
              <p className="text-base text-muted-foreground">@{profile.username}</p>

              {/* Stats */}
              <div className="flex space-x-6">
                <div className="text-center">
                  <span className="text-xl font-bold text-foreground">{formatNumber(profile.stats.posts)}</span>
                  <span className="text-sm text-muted-foreground ml-1">Posts</span>
                </div>
                <div className="text-center">
                  <span className="text-xl font-bold text-foreground">{formatNumber(profile.stats.followers)}</span>
                  <span className="text-sm text-muted-foreground ml-1">Followers</span>
                </div>
                <div className="text-center">
                  <span className="text-xl font-bold text-foreground">{formatNumber(profile.stats.following)}</span>
                  <span className="text-sm text-muted-foreground ml-1">Following</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-base text-foreground leading-relaxed max-w-2xl">{profile.bio}</p>

            {/* Profile Details */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {profile.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center space-x-1">
                  <Link className="w-4 h-4" />
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
                <Calendar className="w-4 h-4" />
                <span>Joined {profile.joinDate}</span>
              </div>
            </div>

            {/* Mutual Connections */}
            {!profile.isOwnProfile && profile.mutualConnections && (
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
            )}
          </div>
        </div>
      </div>

      {/* Highlights/Stories Section */}
      <div className="mt-6 lg:mt-8 ">
        <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-2 scrollbar-hide py-10">
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
              <p className="text-xs text-center mt-2 text-muted-foreground truncate max-w-[64px] sm:max-w-[80px] mx-auto">
                Travel
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
