"use client"

import { Grid3X3, ImageIcon, Video, Tag, User, Bookmark } from "lucide-react"
import { cn } from "../../lib/utils"

interface ProfileTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  const tabs = [
    { id: "posts", label: "Posts", icon: Grid3X3, count: 127 },
    { id: "photos", label: "Photos", icon: ImageIcon, count: 89 },
    { id: "videos", label: "Videos", icon: Video, count: 23 },
    { id: "tagged", label: "Tagged", icon: Tag, count: 45 },
    { id: "about", label: "About", icon: User, count: null },
    { id: "saved", label: "Saved", icon: Bookmark, count: 156, private: true },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Mobile Tabs - Horizontal Scroll */}
      <div className="sm:hidden border-b border-border">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center space-y-1 px-3 py-3 min-w-[70px] transition-colors",
                  activeTab === tab.id
                    ? "text-foreground border-b-2 border-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium">{tab.label}</span>
                {tab.count !== null && <span className="text-xs text-muted-foreground">{tab.count}</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:block border-b border-border">
        <div className="flex space-x-8 lg:space-x-12">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex items-center space-x-2 py-4 cursor-pointer transition-colors relative",
                  activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
                {tab.count !== null && <span className="text-sm text-muted-foreground">({tab.count})</span>}
                {tab.private && <span className="text-xs bg-muted text-muted-foreground px-1 rounded">Private</span>}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
