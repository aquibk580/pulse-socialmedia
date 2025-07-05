import SocialPost from "./social-post"
import StoriesSection from "./stories-section"
import type { Post } from "../types/post"

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
    <div className=" pt-20 pb-20 md:pb-8">
      <div className="w-full px-4">
          <StoriesSection />
        <div className="md:ml-64 max-w-2xl mx-auto">
          {/* Stories Section */}

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
    </div>
  )
}
