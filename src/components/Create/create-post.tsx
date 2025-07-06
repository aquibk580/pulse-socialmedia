"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import { ImageIcon, Video, MapPin, Smile, X, Plus, Users, Globe, Lock } from "lucide-react"
import { cn } from "../../lib/utils"

export default function CreatePost() {
  const [content, setContent] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [location, setLocation] = useState("")
  const [privacy, setPrivacy] = useState("public")
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const privacyOptions = [
    { value: "public", label: "Public", icon: Globe, description: "Anyone can see this post" },
    { value: "friends", label: "Friends", icon: Users, description: "Only your friends can see this" },
    { value: "private", label: "Only me", icon: Lock, description: "Only you can see this post" },
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles((prev) => [...prev, ...files].slice(0, 10)) // Max 10 files
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!content.trim() && selectedFiles.length === 0) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setContent("")
    setSelectedFiles([])
    setLocation("")
    setIsLoading(false)

    // Show success message or redirect
    alert("Post created successfully!")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <ImageIcon className="w-4 h-4 text-white" />
          </div>
          <span>Create Post</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="Your profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-foreground">Your Name</h3>
            <div className="flex items-center space-x-2">
              {privacyOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.value}
                    onClick={() => setPrivacy(option.value)}
                    className={cn(
                      "flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-colors",
                      privacy === option.value
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:bg-muted/80",
                    )}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{option.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content Input */}
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] resize-none border-0 text-lg placeholder:text-muted-foreground focus-visible:ring-0"
        />

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {selectedFiles.length < 10 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center hover:border-muted-foreground/50 transition-colors"
              >
                <Plus className="w-8 h-8 text-muted-foreground" />
              </button>
            )}
          </div>
        )}

        {/* Location Input */}
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Add location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-0 focus-visible:ring-0"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ImageIcon className="w-4 h-4 text-green-500" />
              <span className="text-sm">Photo/Video</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
              <Smile className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">Emoji</span>
            </button>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={(!content.trim() && selectedFiles.length === 0) || isLoading}
            className="px-8"
          >
            {isLoading ? "Posting..." : "Post"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
