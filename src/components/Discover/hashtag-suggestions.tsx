"use client"

import { Hash, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface HashtagSuggestionsProps {
  query: string
}

export default function HashtagSuggestions({ query }: HashtagSuggestionsProps) {
  const allHashtags = [
    { tag: "#photography", posts: "2.1M", trending: true },
    { tag: "#travel", posts: "1.8M", trending: true },
    { tag: "#nature", posts: "950K", trending: true },
    { tag: "#food", posts: "1.2M", trending: false },
    { tag: "#art", posts: "800K", trending: true },
    { tag: "#fashion", posts: "1.5M", trending: false },
  ]

  // Filter hashtags based on query
  const filteredHashtags = query.trim()
    ? allHashtags.filter((hashtag) => hashtag.tag.toLowerCase().includes(query.toLowerCase()))
    : allHashtags

  if (filteredHashtags.length === 0) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Hash className="w-5 h-5 mr-2 text-blue-500" />
          Trending Hashtags
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-3">
          {filteredHashtags.map((hashtag, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900 px-4 py-2 rounded-full cursor-pointer transition-colors group border border-blue-200 dark:border-blue-800"
            >
              <Hash className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">{hashtag.tag}</span>
              {hashtag.trending && <TrendingUp className="w-4 h-4 text-green-500" />}
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{hashtag.posts}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
