import SuggestionsSidebar from "../components/Home/suggestions-sidebar"
import SocialFeed from "../components/Home/social-feed"
import { postsData } from "../data/posts"
import { suggestionsData } from "../data/suggestions"

export default function Home() {
  return (
    <div className="flex w-full min-h-full">
      {/* Main Content - Social Feed */}
      <div className="flex-1 min-w-0">
        <div className="max-w-2xl mx-auto px-4 lg:px-6">
          <SocialFeed posts={postsData} />
        </div>
      </div>

      {/* Right Sidebar - Suggestions (Desktop only) */}
      <div className="hidden xl:block w-80 2xl:w-96 shrink-0">
        <div className="sticky top-0 h-[calc(100vh-4rem)] overflow-y-auto">
          <SuggestionsSidebar suggestions={suggestionsData} />
        </div>
      </div>
    </div>
  )
}
