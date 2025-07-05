"use client"

import { useState } from "react"
import { ThemeProvider } from "./contexts/theme-context"
import NavigationHeader from "./components/navigation-header"
import LeftSidebar from "./components/left-sidebar"
import SocialFeed from "./components/social-feed"
import SearchPage from "./components/search-page"
import ExplorePage from "./components/explore-page"
import MessagesPage from "./components/messages-page"
import SettingsPage from "./components/settings-page"
import ProfilePage from "./components/profile-page"
import SuggestionsSidebar from "./components/suggestions-sidebar"
import { postsData } from "./data/posts"
import { suggestionsData } from "./data/suggestions"

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home")

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "search":
        return <SearchPage />
      case "explore":
        return <ExplorePage />
      case "messages":
        return <MessagesPage />
      case "settings":
        return <SettingsPage />
      case "profile":
        return <ProfilePage />
      default:
        return <SocialFeed posts={postsData} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <NavigationHeader />
      <LeftSidebar onPageChange={setCurrentPage} />
      {renderCurrentPage()}
      {currentPage === "home" && <SuggestionsSidebar suggestions={suggestionsData} />}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
