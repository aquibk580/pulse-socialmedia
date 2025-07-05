"use client"

import { Bell, Send, User, Users, Heart } from "lucide-react"
import { useState } from "react"
import ActivityDialog from "./activity-dialog"

export default function NavigationHeader() {
  const [notifications, setNotifications] = useState(3)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showActivity, setShowActivity] = useState(false)

  return (
    <>
      <header className="bg-background/95 backdrop-blur-sm border-b border-border fixed top-0 left-0 right-0 z-40">
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left - Desktop spacing for sidebar */}
            <div className="hidden md:flex items-center w-64 border-r border-gray-200 dark:border-gray-700 h-full">
              <div className="pl-6">
                <h1 className="text-2xl font-bold italic text-gray-900 dark:text-white">Prism</h1>
              </div>
            </div>

            {/* Mobile Logo */}
            <div className="md:hidden">
              <h1 className="text-xl font-bold italic text-gray-900 dark:text-white">Prism</h1>
            </div>

            {/* Center - Empty space for main content */}
            <div className="flex-1"></div>

            {/* Right - Navigation Icons */}
            <div className="flex items-center space-x-2 md:space-x-4 pr-4 lg:pr-80">
              {/* Mobile Suggestions Icon */}
              <button
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <Users className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>

              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative">
                <Send className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>

              <button
                onClick={() => setShowActivity(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative"
              >
                <Heart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative">
                <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>

              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <User className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Suggestions Dropdown */}
        {showSuggestions && (
          <div className="md:hidden absolute top-16 right-0 left-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg z-30">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Suggestions</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={`/placeholder.svg?height=32&width=32`} alt="Profile" className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">User {i}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">@user{i}</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <ActivityDialog isOpen={showActivity} onClose={() => setShowActivity(false)} />
    </>
  )
}
