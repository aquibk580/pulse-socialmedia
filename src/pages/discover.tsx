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
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left - Logo */}
            <div className="flex items-center">
              <h1 className="text-xl lg:text-2xl font-bold text-foreground flex items-center space-x-2">
                <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                <span>Discover</span>
              </h1>
            </div>

            {/* Center - Search Bar */}
            <div className="flex-1 max-w-md mx-4 sm:mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search people, hashtags, places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="pl-10 pr-4 h-10 bg-muted/50 border border-border rounded-full focus-visible:ring-1"
                />
              </div>
            </div>

            {/* Right - Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="h-8 hidden sm:flex"
              >
                {viewMode === "grid" ? <List className="w-4 h-4 mr-2" /> : <Grid3X3 className="w-4 h-4 mr-2" />}
                {viewMode === "grid" ? "List" : "Grid"}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="h-8">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Show hashtags and sidebar only when search is focused */}
        {isSearchFocused || searchQuery.trim() ? (
          <div className="flex gap-6">
            {/* Left Sidebar - Trending */}
            <div className="hidden lg:block w-80 shrink-0">
              <div className="sticky top-32 space-y-6">
                <TrendingSidebar />
                {showFilters && <FilterPanel />}
              </div>
            </div>

            {/* Main Content with Hashtags */}
            <div className="flex-1 min-w-0">
              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden mb-6">
                  <FilterPanel />
                </div>
              )}

              {/* Hashtag Suggestions */}
              <div className="mb-6">
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
              <div className="mb-6">
                <FilterPanel />
              </div>
            )}

            {/* Full Width Media Grid */}
            <ExploreGrid viewMode={viewMode} />
          </div>
        )}
      </div>
    </div>
  )
}
