"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Grid3X3, List, Sparkles } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import ExploreGrid from "../components/Discover/explore-grid"
import SearchResults from "../components/Discover/search-results"
import TrendingSidebar from "../components/Discover/trending-sidebar"
import FilterPanel from "../components/Discover/filter-panel"
import HashtagSuggestions from "@/components/Discover/hashtag-suggestions"

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeView, setActiveView] = useState<"explore" | "search">("explore")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // Auto-switch to search view when typing
  useEffect(() => {
    if (searchQuery.trim()) {
      setActiveView("search")
    } else {
      setActiveView("explore")
    }
  }, [searchQuery])

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Center - Search Bar */}
            <div className="flex-1 max-w-2xl mx-4 sm:mx-8">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search people, hashtags, places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="pl-12 pr-4 h-12 w-full bg-white border border-gray-200 rounded-full  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 ease-in-out"
                />

              </div>
            </div>

            {/* Right - Controls */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="h-8">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-2 py-1">
        {/* Show hashtags and sidebar only when search is focused */}
        {isSearchFocused || searchQuery.trim() ? (
          <div className="flex gap-4">
            {/* Left Sidebar - Trending */}
            <div className="hidden lg:block w-80 shrink-0">
              <div className="sticky top-3 space-y-4">
                <TrendingSidebar />

              </div>
            </div>

            {/* Main Content with Hashtags */}
            <div className="flex-1 min-w-0 ">
              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden mb-6">
                  <FilterPanel onClose={() => setShowFilters(false)} />
                </div>
              )}

              {/* Hashtag Suggestions */}
              <div className="">
                <HashtagSuggestions query={searchQuery} />
              </div>

              {/* Search Results or Explore Grid */}
              {activeView === "search" && searchQuery.trim() ? (
                <SearchResults query={searchQuery} viewMode={viewMode} />
              ) : (
                <ExploreGrid viewMode={viewMode} />
              )}
            </div>
          </div>
        ) : (
          /* Show only media grid when search not focused */
          <div className="w-full">
            {/* Mobile Filters */}
            {showFilters && (
              <div className="">
                <FilterPanel onClose={() => setShowFilters(false)} />
              </div>
            )}

            {/* Full Width Media Grid */}
            <ExploreGrid viewMode={viewMode} />
          </div>
        )}
      </div>

      {showFilters && <FilterPanel onClose={() => setShowFilters(false)} />}
    </div>
  )
}
