import { ScrollArea } from "@/components/ui/scroll-area"
import LeftSidebar from "../components/Layout/left-sidebar"
import MobileNavigation from "@/components/Layout/MobileNavigation"
import { Outlet, useLocation } from "react-router-dom"
import SuggestionsSidebar from "@/components/Home/suggestions-sidebar"
import { suggestionsData } from "@/data/suggestions"

export default function HomeLayout() {
  const location = useLocation()
  const shouldShowSuggestions = location.pathname === "/" || location.pathname === "/home"

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar Container */}
        <div className="hidden md:block w-fit shrink-0">
          <LeftSidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 pb-20 md:pb-0 overflow-x-hidden">
          <div className="w-full min-h-screen">
            <Outlet />
          </div>
        </main>

        {/* Suggestions Sidebar only on "/" or "/home" */}
        {shouldShowSuggestions && (
          <div className="hidden xl:block w-80 2xl:w-[400px] shrink-0">
            <div className="sticky top-0 h-screen border-l border-gray-100">
              <ScrollArea className="h-full">
                <SuggestionsSidebar suggestions={suggestionsData} />
              </ScrollArea>
            </div>
          </div>
        )}
      </div>

      <MobileNavigation />
    </div>
  )
}
