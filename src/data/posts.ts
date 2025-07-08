import type { Post } from "../types/post"

// Generate more posts for infinite scroll demo
export const postsData: Post[] = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  user: {
    username: `user_${i + 1}`,
    avatar: `https://picsum.photos/40/40?random=${i + 100}`,
    isVerified: i % 3 === 0, // Every 3rd user is verified
  },
  content: `This is a sample post caption number ${i + 1}. ${
    i % 4 === 0
      ? "🔥 This is a trending post with lots of engagement! Check out this amazing content that everyone is talking about. #trending #viral #amazing"
      : i % 3 === 0
        ? "Just sharing some thoughts and moments from my day. Hope everyone is doing well! 😊 #life #moments #sharing"
        : i % 2 === 0
          ? "Another great day to share something awesome with all of you! 🌟 #awesome #great #sharing"
          : "Simple post sharing some content with the community. Thanks for all the support! 🙏"
  }`,
  images: [
    `https://picsum.photos/400/300?random=${i + 1}`,
    ...(i % 3 === 0 ? [`https://picsum.photos/400/400?random=${i + 101}`] : []),
    ...(i % 5 === 0 ? [`https://picsum.photos/400/400?random=${i + 201}`] : []),
  ],
  timestamp: `${Math.floor(Math.random() * 24) + 1}h ago`,
  isFollowing: i % 4 === 0, // Every 4th user is followed
  likes: Math.floor(Math.random() * 5000) + 100,
  comments: Math.floor(Math.random() * 500) + 10,
  shares: Math.floor(Math.random() * 100) + 5,
}))
