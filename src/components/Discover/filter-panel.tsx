"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Slider } from "../ui/slider"
import { Switch } from "../ui/switch"
import { Filter, Calendar, Users, Heart, X } from "lucide-react"

export default function FilterPanel({ onClose }: { onClose: () => void }) {
  const [filters, setFilters] = useState({
    timeRange: "week",
    minLikes: [1000],
    contentType: "all",
    verified: false,
    hasVideo: false,
  })

  const timeRanges = [
    { value: "day", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" },
  ]

  const contentTypes = [
    { value: "all", label: "All Content" },
    { value: "photos", label: "Photos Only" },
    { value: "videos", label: "Videos Only" },
    { value: "carousels", label: "Carousels" },
  ]

  return (
    <div className="fixed top-0 left-0 z-10 h-full w-screen flex items-center justify-center bg-black/30">
      <Card className="relative w-[60%] max-w-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Time Range */}
          <div>
            <label className="text-sm font-medium mb-3 block flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Time Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              {timeRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={filters.timeRange === range.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilters({ ...filters, timeRange: range.value })}
                  className="text-xs"
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Content Type */}
          <div>
            <label className="text-sm font-medium mb-3 block">Content Type</label>
            <div className="space-y-2">
              {contentTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={filters.contentType === type.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilters({ ...filters, contentType: type.value })}
                  className="w-full justify-start text-xs"
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Minimum Likes */}
          <div>
            <label className="text-sm font-medium mb-3 block flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Minimum Likes: {filters.minLikes[0].toLocaleString()}
            </label>
            <Slider
              value={filters.minLikes}
              onValueChange={(value) => setFilters({ ...filters, minLikes: value })}
              max={10000}
              min={0}
              step={100}
              className="w-full"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Verified Only
              </label>
              <Switch
                checked={filters.verified}
                onCheckedChange={(checked) => setFilters({ ...filters, verified: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Has Video</label>
              <Switch
                checked={filters.hasVideo}
                onCheckedChange={(checked) => setFilters({ ...filters, hasVideo: checked })}
              />
            </div>
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setFilters({
                timeRange: "week",
                minLikes: [1000],
                contentType: "all",
                verified: false,
                hasVideo: false,
              })
            }
            className="w-full"
          >
            Reset Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
