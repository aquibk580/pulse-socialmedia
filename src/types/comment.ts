export interface User {
    username: string
    avatar: string
    isVerified: boolean
  }
  
  export interface Comment {
    id: string
    user: User
    content: string
    timestamp: string
    likes: number
  }
  