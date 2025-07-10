"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, UserPlus, UserCheck, X, ArrowLeft, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface User {
  id: string
  username: string
  name: string
  avatar?: string
  bio?: string
  isFollowing: boolean
  isFollowedBy: boolean
  isVerified?: boolean
  mutualFollowers?: number
}

interface FollowersDialogProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  username: string
  initialTab?: "followers" | "following"
}

// Mock data - replace with actual API calls
const mockFollowers: User[] = [
  {
    id: "1",
    username: "johndoe",
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Software Engineer at Tech Corp",
    isFollowing: true,
    isFollowedBy: true,
    isVerified: true,
    mutualFollowers: 12,
  },
  {
    id: "2",
    username: "janesmith",
    name: "Jane Smith",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Designer & Creative Director",
    isFollowing: false,
    isFollowedBy: true,
    mutualFollowers: 5,
  },
  {
    id: "3",
    username: "alexchen",
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Product Manager | Tech Enthusiast",
    isFollowing: true,
    isFollowedBy: true,
    isVerified: true,
    mutualFollowers: 8,
  },
  {
    id: "4",
    username: "sarahwilson",
    name: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "UX Designer & Photographer",
    isFollowing: false,
    isFollowedBy: true,
    mutualFollowers: 3,
  },
  {
    id: "5",
    username: "mikejohnson",
    name: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    bio: "Entrepreneur | Startup Founder",
    isFollowing: true,
    isFollowedBy: false,
    isVerified: true,
    mutualFollowers: 15,
  },
]

const mockFollowing: User[] = [
  {
    id: "6",
    username: "emilydavis",
    name: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    bio: "Marketing Director | Content Creator",
    isFollowing: true,
    isFollowedBy: false,
    mutualFollowers: 7,
  },
  {
    id: "7",
    username: "davidbrown",
    name: "David Brown",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face",
    bio: "Full Stack Developer",
    isFollowing: true,
    isFollowedBy: true,
    isVerified: true,
    mutualFollowers: 22,
  },
  {
    id: "8",
    username: "lisagarcia",
    name: "Lisa Garcia",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    bio: "Data Scientist | AI Researcher",
    isFollowing: true,
    isFollowedBy: false,
    mutualFollowers: 4,
  },
]

export function FollowersDialog({ isOpen, onClose, userId, username, initialTab = "followers" }: FollowersDialogProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(initialTab)
  const [searchQuery, setSearchQuery] = useState("")
  const [followers, setFollowers] = useState<User[]>(mockFollowers)
  const [following, setFollowing] = useState<User[]>(mockFollowing)
  const [isLoading, setIsLoading] = useState(false)

  // Update URL when tab changes
  useEffect(() => {
    if (isOpen) {
      const newPath = `/profile/${username}/${activeTab}`
      if (location.pathname !== newPath) {
        navigate(newPath, { replace: true })
      }
    }
  }, [activeTab, isOpen, navigate, username, location.pathname])

  // Filter users based on search query
  const filteredFollowers = followers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredFollowing = following.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleFollow = async (userId: string, isCurrentlyFollowing: boolean) => {
    // Optimistic update
    const updateUser = (users: User[]) =>
      users.map((user) => (user.id === userId ? { ...user, isFollowing: !isCurrentlyFollowing } : user))

    if (activeTab === "followers") {
      setFollowers(updateUser)
    } else {
      setFollowing(updateUser)
    }

    // TODO: Make API call to follow/unfollow user
    try {
      // await followUser(userId, !isCurrentlyFollowing)
      console.log(`${isCurrentlyFollowing ? "Unfollowing" : "Following"} user ${userId}`)
    } catch (error) {
      // Revert optimistic update on error
      if (activeTab === "followers") {
        setFollowers(updateUser)
      } else {
        setFollowing(updateUser)
      }
    }
  }

  const handleClose = () => {
    onClose()
    navigate(`/profile/${username}`, { replace: true })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full h-full sm:h-[85vh] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-0 gap-0 flex flex-col sm:rounded-lg border-0 sm:border">
        {/* Header - Fixed at top */}
        <DialogHeader className="p-3 sm:p-4 pb-2 sm:pb-3 space-y-0 flex-shrink-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Button 
                variant="ghost" 
                size="icon" 
                className="sm:hidden h-8 w-8 p-0 flex-shrink-0" 
                onClick={handleClose}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <DialogTitle className="text-base sm:text-lg font-semibold truncate">
                @{username}
              </DialogTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex h-8 w-8 p-0 flex-shrink-0" 
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Tabs Container */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "followers" | "following")}
          className="flex-1 flex flex-col min-h-0"
        >
          {/* Tab List - Fixed below header */}
          <div className="px-3 sm:px-4 py-2 sm:py-3 flex-shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <TabsList className="grid w-full grid-cols-2 h-8 sm:h-9">
              <TabsTrigger value="followers" className="text-xs sm:text-sm font-medium">
                <span className="hidden xs:inline">{followers.length} </span>
                Followers
              </TabsTrigger>
              <TabsTrigger value="following" className="text-xs sm:text-sm font-medium">
                <span className="hidden xs:inline">{following.length} </span>
                Following
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Search Bar - Fixed below tabs */}
          <div className="px-3 sm:px-4 py-2 sm:py-3 flex-shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 sm:pl-10 h-8 sm:h-9 text-sm"
              />
            </div>
          </div>

          {/* Content Area - Scrollable */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <TabsContent value="followers" className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col">
              <UserList
                users={filteredFollowers}
                onFollow={handleFollow}
                isLoading={isLoading}
                emptyMessage="No followers found"
              />
            </TabsContent>

            <TabsContent value="following" className="h-full m-0 data-[state=active]:flex data-[state=active]:flex-col">
              <UserList
                users={filteredFollowing}
                onFollow={handleFollow}
                isLoading={isLoading}
                emptyMessage="Not following anyone yet"
              />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

interface UserListProps {
  users: User[]
  onFollow: (userId: string, isCurrentlyFollowing: boolean) => void
  isLoading: boolean
  emptyMessage: string
}

function UserList({ users, onFollow, isLoading, emptyMessage }: UserListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32 flex-1">
        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-muted-foreground flex-1">
        <p className="text-sm sm:text-base">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="space-y-0 p-3 sm:p-4 pt-0">
        {users.map((user) => (
          <UserItem key={user.id} user={user} onFollow={() => onFollow(user.id, user.isFollowing)} />
        ))}
      </div>
    </ScrollArea>
  )
}

interface UserItemProps {
  user: User
  onFollow: () => void
}

function UserItem({ user, onFollow }: UserItemProps) {
  return (
    <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors border-b border-border/50 last:border-b-0">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback className="text-xs sm:text-sm">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 sm:gap-2">
            <p className="font-semibold text-sm sm:text-base truncate">{user.name}</p>
            {user.isVerified && (
              <Badge variant="secondary" className="h-3 w-3 sm:h-4 sm:w-4 p-0 rounded-full bg-blue-500 flex-shrink-0">
                <span className="text-white text-[8px] sm:text-xs">✓</span>
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">@{user.username}</p>
          
          {/* Bio - Hidden on very small screens */}
          {user.bio && (
            <p className="text-xs text-muted-foreground truncate mt-0.5 sm:mt-1 hidden xs:block">
              {user.bio}
            </p>
          )}
          
          {/* Mutual followers - Only show on larger screens */}
          {user.mutualFollowers && user.mutualFollowers > 0 && (
            <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1 hidden sm:block">
              {user.mutualFollowers} mutual followers
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        {/* Follows you badge - Hidden on small screens */}
        {user.isFollowedBy && (
          <Badge variant="outline" className="text-xs px-1.5 py-0.5 hidden md:inline-flex">
            Follows you
          </Badge>
        )}
        
        <Button
          size="sm"
          variant={user.isFollowing ? "outline" : "default"}
          onClick={onFollow}
          className={cn(
            "min-w-[60px] sm:min-w-[80px] text-xs h-7 sm:h-8 px-2 sm:px-3",
            user.isFollowing && "hover:bg-red-500 hover:text-white hover:border-red-500",
          )}
        >
          {user.isFollowing ? (
            <>
              <UserCheck className="h-3 w-3 sm:mr-1" />
              <span className="hidden sm:inline">Following</span>
            </>
          ) : (
            <>
              <UserPlus className="h-3 w-3 sm:mr-1" />
              <span className="hidden sm:inline">Follow</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}