"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Radio, Camera, Mic, Settings, Users, Globe, Lock, Eye, Heart } from "lucide-react"
import { cn } from "../../lib/utils"

export default function GoLive() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [privacy, setPrivacy] = useState("public")
  const [isLive, setIsLive] = useState(false)
  const [viewers, setViewers] = useState(0)
  const [likes, setLikes] = useState(0)

  const privacyOptions = [
    { value: "public", label: "Public", icon: Globe },
    { value: "friends", label: "Friends Only", icon: Users },
    { value: "private", label: "Private", icon: Lock },
  ]

  const startLive = () => {
    setIsLive(true)
    // Simulate viewer count
    const interval = setInterval(() => {
      setViewers((prev) => prev + Math.floor(Math.random() * 3))
      setLikes((prev) => prev + Math.floor(Math.random() * 2))
    }, 2000)

    return () => clearInterval(interval)
  }

  const endLive = () => {
    setIsLive(false)
    setViewers(0)
    setLikes(0)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Setup Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <Radio className="w-4 h-4 text-white" />
            </div>
            <span>Go Live</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isLive ? (
            <>
              {/* Stream Setup */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Stream Title</label>
                  <Input
                    placeholder="What's your stream about?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    placeholder="Tell viewers what to expect..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Privacy Settings */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Who can watch?</label>
                  <div className="flex space-x-2">
                    {privacyOptions.map((option) => {
                      const Icon = option.icon
                      return (
                        <button
                          key={option.value}
                          onClick={() => setPrivacy(option.value)}
                          className={cn(
                            "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
                            privacy === option.value
                              ? "bg-foreground text-background"
                              : "bg-muted text-muted-foreground hover:bg-muted/80",
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{option.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Stream Settings */}
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Camera className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">Camera</span>
                  </div>
                  <button className="p-2 hover:bg-background rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mic className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">Microphone</span>
                  </div>
                  <button className="p-2 hover:bg-background rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <Button onClick={startLive} disabled={!title.trim()} className="w-full bg-red-500 hover:bg-red-600">
                <Radio className="w-4 h-4 mr-2" />
                Start Live Stream
              </Button>
            </>
          ) : (
            <>
              {/* Live Controls */}
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-lg font-semibold text-red-500">LIVE</span>
                </div>

                <h3 className="text-xl font-bold">{title}</h3>

                {/* Live Stats */}
                <div className="flex items-center justify-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{viewers} viewers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{likes} likes</span>
                  </div>
                </div>

                <Button onClick={endLive} variant="destructive" className="w-full">
                  End Stream
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Preview/Stream Panel */}
      <Card>
        <CardHeader>
          <CardTitle>{isLive ? "Live Stream" : "Preview"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
            {isLive ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500">
                <div className="text-center text-white">
                  <Radio className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                  <p className="text-lg font-semibold">You're Live!</p>
                  <p className="text-sm opacity-80">Streaming to {viewers} viewers</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <div className="text-center text-muted-foreground">
                  <Camera className="w-12 h-12 mx-auto mb-4" />
                  <p>Camera preview will appear here</p>
                </div>
              </div>
            )}

            {/* Live Indicator */}
            {isLive && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>LIVE</span>
              </div>
            )}
          </div>

          {/* Stream Info */}
          {isLive && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Stream Information</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>Title:</strong> {title}
                </p>
                <p>
                  <strong>Privacy:</strong> {privacyOptions.find((p) => p.value === privacy)?.label}
                </p>
                <p>
                  <strong>Duration:</strong> 00:05:23
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
