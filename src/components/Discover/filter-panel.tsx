"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Slider } from "../ui/slider"
import { Switch } from "../ui/switch"
import { Filter, Calendar, Users, Heart } from "lucide-react"

export default function FilterPanel() {
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
    <Card>
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

        {/* Toggle Filters */}
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

        {/* Reset Filters */}
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
  )
}
