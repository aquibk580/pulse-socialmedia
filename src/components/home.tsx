import SuggestionsSidebar from "./suggestions-sidebar";
import SocialFeed from "./social-feed";
import { postsData } from "../data/posts"
import { suggestionsData } from "../data/suggestions"
export default function Home() {
  return (
    <div className="flex mx-auto max-w-7xl">
   
            <SocialFeed posts={postsData} />
  
      <SuggestionsSidebar suggestions={suggestionsData} />
    </div>
  );
}