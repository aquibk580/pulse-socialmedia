import SuggestionsSidebar from "../components/Home/suggestions-sidebar"
import SocialFeed from "../components/Home/social-feed"
import { postsData } from "../data/posts"
import { suggestionsData } from "../data/suggestions"
import { ScrollArea } from "@/components/ui/scroll-area"
export default function Home() {
  return (
    <div className="flex w-full min-h-screen">
      {/* Main Content - Social Feed */}
      <div className="flex-1 min-w-0">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <SocialFeed posts={postsData} />
        </div>
      </div>

      {/* Right Sidebar - Suggestions (Desktop only) */}
      {/* <div className="hidden xl:block w-80 2xl:w-[400px] shrink-0">
        <div className="sticky top-0 h-screen border-l border-gray-100">
          <ScrollArea className="h-full">
            <SuggestionsSidebar suggestions={suggestionsData} />
          </ScrollArea>
        </div>
      </div> */}
    </div>
  )
}