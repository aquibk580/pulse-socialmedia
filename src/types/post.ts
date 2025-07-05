export interface Post {
  id: string
  user: {
    username: string
    avatar: string
    isVerified?: boolean
  }
  content: string
  images?: string[] // Changed from single image to array of images
  timestamp: string
  isFollowing: boolean
  likes: number
  comments: number
  shares: number
}
