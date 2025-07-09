type Provider = "GOOGLE" | "DEFAULT";
type AccountStatus = "PUBLIC" | "PRIVATE";

export interface User {
  id: string;
  email: string;
  username?: string | null;
  name: string;
  phone?: string | null;
  password?: string | null;
  provider: Provider;
  isVerified: boolean;
  is2FAEnabled: boolean;
  isDeleted: boolean;
  deletedAt?: Date | null;
  otp?: string | null;
  otpExpiry?: Date | null;
  bio?: string | null;
  pfp?: string | null;
  coverImage?: string | null;
  accountStatus: AccountStatus;
  posts: Post[];
  stories: Story[];
  comments: Comment[];
  likes: Like[];
  followers: Follower[];
  following: Follower[];
  chats: ChatMember[];
  messages: Message[];
  notifications: Notification[];
  sentFollowRequests: FollowRequest[];
  receivedFollowRequests: FollowRequest[];
  blocked: Block[];
  blockers: Block[];
  createdAt: Date;
  updatedAt: Date;
  otpAttempts: number;
}

export interface Image {
  id: string;
  imgUrl: string;
  post?: Post;
  postId?: string;
}

export interface Post {
  id: string;
  caption?: string;
  images: Image[];
  videoUrl?: string;
  author?: User;
  authorId: string;
  isActive: boolean;
  isAchived: boolean;
  comments: Comment[];
  likes: Like[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  text: string;
  post?: Post;
  postId: string;
  author?: User;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Like {
  id: string;
  postId: string;
  post?: Post;
  userId: string;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Follower {
  id: string;
  follower?: User;
  followerId: string;
  following?: User;
  followingId: string;
  createdAt: Date;
  updatedAt: Date;
}

type FollowRequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface FollowRequest {
  id: string;
  sender?: User;
  senderId: string;
  receriver: User;
  receiverId: string;
  status: FollowRequestStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Highlight {
  id: string;
  storyId: string;
  story: Story;
}

export interface Story {
  id: string;
  caption?: string;
  imageUrl: string;
  user?: User;
  userId: string;
  isHiglighted: boolean;
  expiresAt: Date;
  createdAt: Date;
  Highlights?: Highlight[];
}

export interface Chat {
  id: string;
  members: ChatMember[];
  messages: Message[];
  createAt: Date;
  updatedAt: Date;
}

export interface ChatMember {
  id: string;
  chat?: Chat;
  chatId: string;
  user?: User;
  userId: string;
}

export interface Message {
  id: string;
  chat?: Chat;
  chatId: string;
  sender?: User;
  senderId: string;
  content: string;
  image?: string;
  editedAt: Date;
  seen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  user?: User;
  userId: string;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Block {
  id: string;
  blockerId: string;
  blocker?: User;
  blockedId: string;
  blocked?: User;
  createdAt: Date;
  updatedAt: Date;
}
