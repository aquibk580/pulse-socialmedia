"use client"

import { useState } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import CreatePost from "../components/Create/create-post"
import CreateStory from "../components/Create/create-story"
import GoLive from "../components/Create/go-live"
import CreatePoll from "../components/Create/create-poll"
import CreateEvent from "../components/Create/create-event"
import { FileText, Camera, Radio, BarChart3, Calendar } from "lucide-react"

export default function Create() {
  const [activeTab, setActiveTab] = useState("post")

  const creationOptions = [
    {
      id: "post",
      label: "Post",
      icon: FileText,
      description: "Share your thoughts, photos, and videos",
      color: "bg-blue-500",
    },
    {
      id: "story",
      label: "Story",
      icon: Camera,
      description: "Share a moment that disappears in 24 hours",
      color: "bg-purple-500",
    },
    {
      id: "live",
      label: "Go Live",
      icon: Radio,
      description: "Broadcast live to your followers",
      color: "bg-red-500",
    },
    {
      id: "poll",
      label: "Poll",
      icon: BarChart3,
      description: "Ask your audience a question",
      color: "bg-green-500",
    },
    {
      id: "event",
      label: "Event",
      icon: Calendar,
      description: "Create and share an event",
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Create</h1>
        <p className="text-muted-foreground">Share your creativity with the world</p>
      </div>

      {/* Quick Actions - Mobile Grid */}
      <div className="md:hidden mb-6">
        <div className="grid grid-cols-2 gap-4">
          {creationOptions.map((option) => {
            const Icon = option.icon
            return (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                  activeTab === option.id ? "ring-2 ring-foreground" : ""
                }`}
                onClick={() => setActiveTab(option.id)}
              >
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm">{option.label}</h3>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Desktop Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full h-10">
          {creationOptions.map((option) => {
            const Icon = option.icon
            return (
              <TabsTrigger key={option.id} value={option.id} className="flex items-center space-x-2 py-3">
                <Icon className="w-4 h-4" />
                <span>{option.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {/* Content Areas */}
        <TabsContent value="post" className="mt-0">
          <CreatePost />
        </TabsContent>

        <TabsContent value="story" className="mt-0">
          <CreateStory />
        </TabsContent>

        <TabsContent value="live" className="mt-0">
          <GoLive />
        </TabsContent>

        <TabsContent value="poll" className="mt-0">
          <CreatePoll />
        </TabsContent>

        <TabsContent value="event" className="mt-0">
          <CreateEvent />
        </TabsContent>
      </Tabs>
    </div>
  )
}
