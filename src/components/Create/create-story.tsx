"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Camera, Video, Type, Palette, Music, Upload } from "lucide-react"
import { cn } from "../../lib/utils"

export default function CreateStory() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [storyType, setStoryType] = useState<"photo" | "video" | "text">("photo")
  const [textContent, setTextContent] = useState("")
  const [backgroundColor, setBackground] = useState("#6366f1")
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const backgroundColors = ["#6366f1", "#8b5cf6", "#ec4899", "#ef4444", "#f59e0b", "#10b981", "#06b6d4", "#6b7280"]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setStoryType(file.type.startsWith("image/") ? "photo" : "video")
    }
  }

  const handleSubmit = async () => {
    if (!selectedFile && !textContent.trim()) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setSelectedFile(null)
    setTextContent("")
    setStoryType("photo")
    setIsLoading(false)

    alert("Story created successfully!")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Creation Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <span>Create Story</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Story Type Selection */}
          <div className="flex space-x-2">
            {[
              { type: "photo" as const, icon: Camera, label: "Photo" },
              { type: "video" as const, icon: Video, label: "Video" },
              { type: "text" as const, icon: Type, label: "Text" },
            ].map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => setStoryType(type)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
                  storyType === type
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80",
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* File Upload for Photo/Video */}
          {(storyType === "photo" || storyType === "video") && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept={storyType === "photo" ? "image/*" : "video/*"}
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-40 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center hover:border-muted-foreground/50 transition-colors"
              >
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Click to upload {storyType}</span>
              </button>
            </div>
          )}

          {/* Text Story */}
          {storyType === "text" && (
            <div className="space-y-4">
              <Input
                placeholder="What's on your mind?"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="text-center text-lg"
              />

              {/* Background Colors */}
              <div>
                <p className="text-sm font-medium mb-2">Background Color</p>
                <div className="flex space-x-2">
                  {backgroundColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setBackground(color)}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all",
                        backgroundColor === color ? "border-foreground scale-110" : "border-transparent",
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Additional Options */}
          <div className="flex items-center space-x-4 pt-4 border-t border-border">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
              <Music className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Add Music</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
              <Palette className="w-4 h-4 text-pink-500" />
              <span className="text-sm">Effects</span>
            </button>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={(!selectedFile && !textContent.trim()) || isLoading}
            className="w-full"
          >
            {isLoading ? "Creating..." : "Share Story"}
          </Button>
        </CardContent>
      </Card>

      {/* Preview Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-[9/16] bg-muted rounded-lg overflow-hidden relative">
            {selectedFile ? (
              selectedFile.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(selectedFile) || "/placeholder.svg"}
                  alt="Story preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video src={URL.createObjectURL(selectedFile)} className="w-full h-full object-cover" controls />
              )
            ) : storyType === "text" && textContent ? (
              <div className="w-full h-full flex items-center justify-center p-6" style={{ backgroundColor }}>
                <p className="text-white text-xl font-semibold text-center">{textContent}</p>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-foreground">Preview will appear here</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
