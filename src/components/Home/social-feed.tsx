import SocialPost from "./social-post"
import StoriesSection from "./stories-section"
import type { Post } from "../../types/post"

interface SocialFeedProps {
  posts: Post[]
}

export default function SocialFeed({ posts }: SocialFeedProps) {
  const handleFollow = (username: string) => {
    console.log(`Following/Unfollowing ${username}`)
  }

  const handleLike = (postId: string) => {
    console.log(`Liked post ${postId}`)
  }

  const handleComment = (postId: string) => {
    console.log(`Commenting on post ${postId}`)
  }

  const handleShare = (postId: string) => {
    console.log(`Sharing post ${postId}`)
  }

  return (
    <div className="w-full py-4 md:py-6">
      <StoriesSection />

      <div className="space-y-4 ">
        {/* Posts Feed */}
        {posts.map((post) => (
          <SocialPost
            key={post.id}
            post={post}
            onFollow={handleFollow}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
          />
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts to display</p>
          </div>
        )}
      </div>
    </div>
  )
}
