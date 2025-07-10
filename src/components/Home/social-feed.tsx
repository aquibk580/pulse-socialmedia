"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import SocialPost from "./social-post"
import StoriesSection from "./stories-section"
import type { Post } from "../../types/post"
import ModernGameGallery from "@/pages/modern-game-gallery"
interface SocialFeedProps {
  posts: Post[]
}

export default function SocialFeed({ posts }: SocialFeedProps) {
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const feedRef = useRef<HTMLDivElement>(null)

  const POSTS_PER_PAGE = 10

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

  // Load more posts
  const loadMorePosts = useCallback(() => {
    if (loading || !hasMore) return

    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const startIndex = currentPage * POSTS_PER_PAGE
      const endIndex = startIndex + POSTS_PER_PAGE
      const newPosts = posts.slice(startIndex, endIndex)

      if (newPosts.length === 0) {
        setHasMore(false)
      } else {
        setDisplayedPosts((prev) => [...prev, ...newPosts])
        setCurrentPage((prev) => prev + 1)
      }

      setLoading(false)
    }, 800)
  }, [currentPage, loading, hasMore, posts])

  // Initial load
  useEffect(() => {
    if (posts.length > 0 && currentPage === 0) {
      loadMorePosts()
    }
  }, [posts, currentPage, loadMorePosts])

  // Scroll event handler for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      // Check if we're near the bottom of the page
      if (
        window.innerHeight + document.documentElement.scrollTop >= 
        document.documentElement.offsetHeight - 1000
      ) {
        loadMorePosts()
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loadMorePosts])

  return (
    <div ref={feedRef} className="w-full py-4 md:py-6">
      <StoriesSection />

      <div className="space-y-4">
        {/* Posts Feed */}
        {displayedPosts.map((post) => (
          <SocialPost
            key={post.id}
            post={post}
            onFollow={handleFollow}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
          />
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="text-sm text-muted-foreground">Loading more posts...</p>
            </div>
          </div>
        )}

        {/* End of content indicator */}
        {!hasMore && displayedPosts.length > 0 && (
          <div className="text-center py-8">
            <div className="bg-muted/50 rounded-lg p-6 mx-4">
              <p className="text-muted-foreground font-medium">You're all caught up!</p>
              <p className="text-sm text-muted-foreground mt-1">No more posts to show</p>
            </div>
          </div>
        )}

        {/* No posts state */}
        {displayedPosts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts to display</p>
          </div>
        )}
      </div>
    </div>
  )
}