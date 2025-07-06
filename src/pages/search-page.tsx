"use client"

import { Search, MapPin, Hash, User, Clock, X } from "lucide-react"
import { useState } from "react"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [recentSearches, setRecentSearches] = useState(["john_doe", "#photography", "New York", "travel_blogger"])

  const tabs = [
    { id: "all", label: "All" },
    { id: "people", label: "People" },
    { id: "hashtags", label: "Hashtags" },
    { id: "places", label: "Places" },
  ]

  const searchResults = {
    people: [
      {
        id: 1,
        name: "John Doe",
        username: "john_doe",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
        followers: "1.2M",
      },
      {
        id: 2,
        name: "Jane Smith",
        username: "jane_smith",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: false,
        followers: "45K",
      },
      {
        id: 3,
        name: "Mike Johnson",
        username: "mike_j",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
        followers: "890K",
      },
    ],
    hashtags: [
      { id: 1, tag: "#photography", posts: "2.1M posts" },
      { id: 2, tag: "#travel", posts: "1.8M posts" },
      { id: 3, tag: "#nature", posts: "950K posts" },
    ],
    places: [
      { id: 1, name: "New York, NY", country: "United States", posts: "15.2M posts" },
      { id: 2, name: "Paris, France", country: "France", posts: "8.7M posts" },
      { id: 3, name: "Tokyo, Japan", country: "Japan", posts: "12.1M posts" },
    ],
  }

  const clearRecentSearch = (index: number) => {
    setRecentSearches((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex-1 pt-20 pb-20 md:pb-8">
      <div className="w-full px-4">
        <div className="md:ml-64 lg:mr-80 max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Search Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search people, hashtags, places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* Search Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Content */}
            <div className="p-4">
              {!searchQuery ? (
                /* Recent Searches */
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent</h3>
                  <div className="space-y-3">
                    {recentSearches.map((search, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900 dark:text-white">{search}</span>
                        </div>
                        <button
                          onClick={() => clearRecentSearch(index)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Search Results */
                <div className="space-y-4">
                  {(activeTab === "all" || activeTab === "people") && (
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        People
                      </h4>
                      <div className="space-y-3">
                        {searchResults.people.map((person) => (
                          <div
                            key={person.id}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={person.avatar || "/placeholder.svg"}
                                alt={person.name}
                                className="w-12 h-12 rounded-full"
                              />
                              <div>
                                <div className="flex items-center space-x-1">
                                  <h5 className="font-semibold text-gray-900 dark:text-white">{person.name}</h5>
                                  {person.verified && (
                                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                      <span className="text-white text-xs">✓</span>
                                    </div>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500">@{person.username}</p>
                                <p className="text-xs text-gray-400">{person.followers} followers</p>
                              </div>
                            </div>
                            <button className="px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                              Follow
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(activeTab === "all" || activeTab === "hashtags") && (
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Hash className="w-4 h-4 mr-2" />
                        Hashtags
                      </h4>
                      <div className="space-y-3">
                        {searchResults.hashtags.map((hashtag) => (
                          <div
                            key={hashtag.id}
                            className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                          >
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                              <Hash className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900 dark:text-white">{hashtag.tag}</h5>
                              <p className="text-sm text-gray-500">{hashtag.posts}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(activeTab === "all" || activeTab === "places") && (
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Places
                      </h4>
                      <div className="space-y-3">
                        {searchResults.places.map((place) => (
                          <div
                            key={place.id}
                            className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                          >
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                              <MapPin className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900 dark:text-white">{place.name}</h5>
                              <p className="text-sm text-gray-500">{place.country}</p>
                              <p className="text-xs text-gray-400">{place.posts}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
