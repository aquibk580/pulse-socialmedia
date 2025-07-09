export interface Profile {
  id: string
  name: string
  username: string
  bio: string
  avatar: string
  coverPhoto: string
  location: string
  website: string
  joinDate: string
  isVerified: boolean
  isOnline: boolean
  isOwnProfile: boolean
  stats: {
    posts: number
    followers: number
    following: number
    likes: number
  }
  mutualConnections: Array<{
    name: string
    avatar: string
  }>
}

export const profiles: Record<string, Profile> = {
  alexj_photo: {
    id: "1",
    name: "Alex Johnson",
    username: "alexj_photo",
    bio: "📸 Professional photographer & visual storyteller\n🌍 Traveling the world one shot at a time\n✨ Capturing moments that matter\n📧 hello@alexjohnson.com",
    avatar: "/placeholder.svg?height=200&width=200",
    coverPhoto: "/placeholder.svg?height=400&width=1200",
    location: "New York, NY",
    website: "https://alexjohnson.com",
    joinDate: "March 2020",
    isVerified: true,
    isOnline: true,
    isOwnProfile: true,
    stats: {
      posts: 127,
      followers: 15420,
      following: 892,
      likes: 45600,
    },
    mutualConnections: [
      { name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Mike Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  sarah_wilson: {
    id: "2",
    name: "Sarah Wilson",
    username: "sarah_wilson",
    bio: "🎨 Digital artist & UI/UX designer\n💡 Creating beautiful experiences\n🚀 Always learning something new\n📱 Design enthusiast",
    avatar: "/placeholder.svg?height=200&width=200",
    coverPhoto: "/placeholder.svg?height=400&width=1200",
    location: "San Francisco, CA",
    website: "https://sarahwilson.design",
    joinDate: "January 2021",
    isVerified: false,
    isOnline: false,
    isOwnProfile: false,
    stats: {
      posts: 89,
      followers: 8750,
      following: 456,
      likes: 23400,
    },
    mutualConnections: [
      { name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Mike Chen", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  mike_chen: {
    id: "3",
    name: "Mike Chen",
    username: "mike_chen",
    bio: "💻 Full-stack developer\n🌟 Open source contributor\n☕ Coffee addict\n🎮 Gaming enthusiast",
    avatar: "/placeholder.svg?height=200&width=200",
    coverPhoto: "/placeholder.svg?height=400&width=1200",
    location: "Seattle, WA",
    website: "https://mikechen.dev",
    joinDate: "June 2019",
    isVerified: true,
    isOnline: true,
    isOwnProfile: false,
    stats: {
      posts: 234,
      followers: 12300,
      following: 678,
      likes: 34500,
    },
    mutualConnections: [
      { name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
}

export const getProfileByUsername = (username: string): Profile | null => {
  return profiles[username] || null
}

export const getCurrentUserProfile = (): Profile => {
  return profiles.alexj_photo // This would come from auth context in real app
}
