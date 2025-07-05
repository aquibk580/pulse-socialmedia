export interface Suggestion {
  id: string
  username: string
  fullName: string
  avatar: string
  isVerified?: boolean
  mutualFriends?: number
}
