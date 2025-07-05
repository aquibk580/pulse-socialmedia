"use client"

import { Home, Search, Settings, User, Compass, MessageCircle } from "lucide-react"
import { useState } from "react"
import { cn } from "../lib/utils"

interface LeftSidebarProps {
  className?: string
  onPageChange?: (page: string) => void
}

export default function LeftSidebar({ className = "", onPageChange }: LeftSidebarProps) {
  const [activeItem, setActiveItem] = useState("home")

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "explore", label: "Explore", icon: Compass },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "profile", label: "Profile", icon: User },
  ]

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId)
    onPageChange?.(itemId)
  }

  return (
    <div className={`${className}`}>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-screen w-64 bg-card/95 backdrop-blur-sm border-r border-border fixed left-0 top-16 z-30">
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Navigation Menu */}
          <nav className="flex-1 pt-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className={cn(
                        "flex items-center space-x-4 w-full p-4 rounded-xl transition-all duration-200",
                        activeItem === item.id
                          ? "bg-foreground text-background shadow-lg scale-105"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      )}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-lg font-medium">{item.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50">
        <div className="flex justify-around items-center py-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  "flex flex-col items-center p-3 transition-all duration-200",
                  activeItem === item.id ? "text-foreground scale-110" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
