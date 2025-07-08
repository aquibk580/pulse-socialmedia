"use client"

import { useState, useEffect, useRef } from "react"
import { X, ChevronLeft, ChevronRight, Heart, Send, Volume2, VolumeX, Play, Pause, MessageCircle } from "lucide-react"

interface Story {
  id: string
  image: string
  timestamp: string
  type: "image" | "video"
  duration?: number
}

interface UserStories {
  userId: string
  username: string
  avatar: string
  isViewed: boolean
  stories: Story[]
}

interface Comment {
  id: string
  username: string
  avatar: string
  text: string
  timestamp: string
}

interface StoryModalProps {
  userStories: UserStories[]
  currentUserIndex: number
  currentStoryIndex: number
  onClose: () => void
  onUserChange: (userIndex: number, storyIndex?: number) => void
  onStoryChange: (storyIndex: number) => void
}

export default function StoryModal({
  userStories,
  currentUserIndex,
  currentStoryIndex,
  onClose,
  onUserChange,
  onStoryChange,
}: StoryModalProps) {
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentUser = userStories[currentUserIndex]
  const currentStory = currentUser.stories[currentStoryIndex]
  const STORY_DURATION = currentStory.type === "video" ? (currentStory.duration || 15) * 1000 : 5000

  // Sample comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      username: "alice_wonder",
      avatar: "https://picsum.photos/32/32?random=501",
      text: "Amazing story! 🔥",
      timestamp: "2m",
    },
    {
      id: "2",
      username: "bob_builder",
      avatar: "https://picsum.photos/32/32?random=502",
      text: "Love this content!",
      timestamp: "5m",
    },
    {
      id: "3",
      username: "charlie_brown",
      avatar: "https://picsum.photos/32/32?random=503",
      text: "Where is this place?",
      timestamp: "8m",
    },
  ])

  // Load image dimensions
  useEffect(() => {
    if (currentStory.type === "image") {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height })
      }
      img.src = currentStory.image
    } else {
      setImageDimensions({ width: 400, height: 600 })
    }
  }, [currentStory])

  // Calculate modal dimensions based on image aspect ratio
  const getModalDimensions = () => {
    const { width, height } = imageDimensions
    if (width === 0 || height === 0) return { width: "400px", height: "600px" }

    const aspectRatio = width / height
    const maxWidth = Math.min(window.innerWidth * 0.9, 500)
    const maxHeight = Math.min(window.innerHeight * 0.9, 800)

    let modalWidth, modalHeight

    if (aspectRatio > 1) {
      modalWidth = Math.min(maxWidth, maxHeight * aspectRatio)
      modalHeight = modalWidth / aspectRatio
    } else {
      modalHeight = Math.min(maxHeight, maxWidth / aspectRatio)
      modalWidth = modalHeight * aspectRatio
    }

    return {
      width: `${modalWidth}px`,
      height: `${modalHeight}px`,
    }
  }

  // Progress animation - fixed to respect pause state
  useEffect(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    if (!isPaused) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNextStory()
            return 0
          }
          return prev + 100 / (STORY_DURATION / 100)
        })
      }, 100)
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [currentUserIndex, currentStoryIndex, isPaused, STORY_DURATION])

  // Reset progress when story changes
  useEffect(() => {
    setProgress(0)
  }, [currentUserIndex, currentStoryIndex])

  // Video controls
  useEffect(() => {
    if (currentStory.type === "video" && videoRef.current) {
      if (isVideoPlaying && !isPaused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isVideoPlaying, isPaused, currentStory])

  const handleNextStory = () => {
    if (currentStoryIndex < currentUser.stories.length - 1) {
      onStoryChange(currentStoryIndex + 1)
    } else if (currentUserIndex < userStories.length - 1) {
      // Move to next user's first story
      onUserChange(currentUserIndex + 1, 0)
    } else {
      onClose()
    }
  }

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      onStoryChange(currentStoryIndex - 1)
    } else if (currentUserIndex > 0) {
      // Move to previous user's last story
      const prevUser = userStories[currentUserIndex - 1]
      onUserChange(currentUserIndex - 1, prevUser.stories.length - 1)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose()
    if (e.key === "ArrowLeft") handlePrevStory()
    if (e.key === "ArrowRight") handleNextStory()
    if (e.key === " ") {
      e.preventDefault()
      setIsPaused(!isPaused)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [currentUserIndex, currentStoryIndex, isPaused])

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        username: "you",
        avatar: "https://picsum.photos/32/32?random=999",
        text: newComment,
        timestamp: "now",
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
  }

  const modalDimensions = getModalDimensions()

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
      {/* Background overlay with blur effect */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Story container */}
      <div
        className="relative bg-black rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 ease-out"
        style={{
          width: modalDimensions.width,
          height: modalDimensions.height,
          animation: "modalSlideIn 0.3s ease-out",
        }}
      >
        {/* Progress bars */}
        <div className="absolute top-4 left-4 right-4 flex space-x-1 z-20">
          {currentUser.stories.map((_, index) => (
            <div key={index} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width: index < currentStoryIndex ? "100%" : index === currentStoryIndex ? `${progress}%` : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-20">
          <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
            <img
              src={currentUser.avatar || "/placeholder.svg"}
              alt={currentUser.username}
              className="w-8 h-8 rounded-full ring-2 ring-white/50"
            />
            <span className="text-white font-medium text-sm">{currentUser.username}</span>
            <span className="text-white/70 text-xs">{currentStory.timestamp}</span>
          </div>
          <div className="flex items-center space-x-2">
            {currentStory.type === "video" && (
              <>
                <button
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/40 transition-colors"
                >
                  {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/40 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/40 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Story Content */}
        <div className="w-full h-full relative">
          {currentStory.type === "image" ? (
            <img
              ref={imageRef}
              src={currentStory.image || "/placeholder.svg"}
              alt="Story"
              className="w-full h-full object-cover transition-transform duration-300"
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            />
          ) : (
            <video
              ref={videoRef}
              src={currentStory.image}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  setImageDimensions({
                    width: videoRef.current.videoWidth,
                    height: videoRef.current.videoHeight,
                  })
                }
              }}
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            />
          )}
        </div>

        {/* Navigation areas */}
        <div className="absolute inset-0 flex z-10">
          <div
            className="flex-1 cursor-pointer"
            onClick={currentStoryIndex > 0 || currentUserIndex > 0 ? handlePrevStory : undefined}
          />
          <div className="flex-1 cursor-pointer" onClick={handleNextStory} />
        </div>

        {/* Navigation arrows */}
        {(currentStoryIndex > 0 || currentUserIndex > 0) && (
          <button
            onClick={handlePrevStory}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-all duration-200 hover:scale-110 z-20"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}
        {(currentStoryIndex < currentUser.stories.length - 1 || currentUserIndex < userStories.length - 1) && (
          <button
            onClick={handleNextStory}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-all duration-200 hover:scale-110 z-20"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}

        {/* Bottom actions */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-3 z-20">
          <input
            type="text"
            placeholder="Send message"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
            className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/70 text-sm focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-200"
          />
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-white hover:text-blue-500 transition-all duration-200 hover:scale-110 p-2"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
          <button className="text-white hover:text-red-500 transition-all duration-200 hover:scale-110 p-2">
            <Heart className="w-5 h-5" />
          </button>
          <button
            onClick={handleAddComment}
            className="text-white hover:text-blue-500 transition-all duration-200 hover:scale-110 p-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="absolute bottom-20 left-4 right-4 max-h-60 bg-black/80 backdrop-blur-sm rounded-2xl p-4 z-20">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium text-sm">Comments</h4>
              <button
                onClick={() => setShowComments(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-2">
                  <img
                    src={comment.avatar || "/placeholder.svg"}
                    alt={comment.username}
                    className="w-6 h-6 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium text-xs">{comment.username}</span>
                      <span className="text-white/50 text-xs">{comment.timestamp}</span>
                    </div>
                    <p className="text-white/90 text-xs mt-1">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
