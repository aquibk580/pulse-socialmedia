"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Calendar, MapPin, Clock, Users, ImageIcon, Globe, Lock } from "lucide-react"
import { cn } from "../../lib/utils"

export default function CreateEvent() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    privacy: "public",
    maxAttendees: "",
    category: "social",
  })
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    { value: "social", label: "Social", emoji: "🎉" },
    { value: "business", label: "Business", emoji: "💼" },
    { value: "education", label: "Education", emoji: "📚" },
    { value: "sports", label: "Sports", emoji: "⚽" },
    { value: "music", label: "Music", emoji: "🎵" },
    { value: "food", label: "Food & Drink", emoji: "🍕" },
  ]

  const privacyOptions = [
    { value: "public", label: "Public", icon: Globe, description: "Anyone can see and join" },
    { value: "private", label: "Private", icon: Lock, description: "Invite only" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setEventData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!eventData.title.trim() || !eventData.date || !eventData.time) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setEventData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      privacy: "public",
      maxAttendees: "",
      category: "social",
    })
    setIsLoading(false)

    alert("Event created successfully!")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <span>Create Event</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Event Title */}
        <div>
          <label className="text-sm font-medium mb-2 block">Event Title *</label>
          <Input
            placeholder="What's the name of your event?"
            value={eventData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>

        {/* Event Description */}
        <div>
          <label className="text-sm font-medium mb-2 block">Description</label>
          <Textarea
            placeholder="Tell people what your event is about..."
            value={eventData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={3}
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Date *</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="date"
                value={eventData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Time *</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="time"
                value={eventData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium mb-2 block">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Where is your event?"
              value={eventData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleInputChange("category", category.value)}
                className={cn(
                  "flex items-center space-x-2 p-3 rounded-lg transition-colors text-left",
                  eventData.category === category.value
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80",
                )}
              >
                <span>{category.emoji}</span>
                <span className="text-sm">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Privacy and Capacity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Privacy</label>
            <div className="space-y-2">
              {privacyOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.value}
                    onClick={() => handleInputChange("privacy", option.value)}
                    className={cn(
                      "flex items-center space-x-3 w-full p-3 rounded-lg transition-colors text-left",
                      eventData.privacy === option.value
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:bg-muted/80",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <div>
                      <p className="text-sm font-medium">{option.label}</p>
                      <p className="text-xs opacity-70">{option.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Max Attendees</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder="No limit"
                value={eventData.maxAttendees}
                onChange={(e) => handleInputChange("maxAttendees", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Event Cover */}
        <div>
          <label className="text-sm font-medium mb-2 block">Event Cover</label>
          <button className="w-full h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center hover:border-muted-foreground/50 transition-colors">
            <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">Add cover photo</span>
          </button>
        </div>

        {/* Preview */}
        <div className="p-4 border border-border rounded-lg">
          <h4 className="font-medium mb-3">Preview</h4>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{eventData.title || "Event Title"}</h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{eventData.date || "Date"}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{eventData.time || "Time"}</span>
              </div>
            </div>
            {eventData.location && (
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{eventData.location}</span>
              </div>
            )}
            <p className="text-sm">{eventData.description || "Event description will appear here"}</p>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!eventData.title.trim() || !eventData.date || !eventData.time || isLoading}
          className="w-full"
        >
          {isLoading ? "Creating Event..." : "Create Event"}
        </Button>
      </CardContent>
    </Card>
  )
}
