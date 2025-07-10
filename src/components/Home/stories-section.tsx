"use client"

import { useState } from "react"
import StoryModal from "./story-modal"

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

export default function StoriesSection() {
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null)
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0)

  // Generate users with multiple stories each
  const userStories: UserStories[] = Array.from({ length: 25 }, (_, i) => {
    const storyCount = Math.floor(Math.random() * 5) + 1 // 1-5 stories per user
    const stories: Story[] = Array.from({ length: storyCount }, (_, j) => ({
      id: `${i + 1}_${j + 1}`,
      image: `https://picsum.photos/${Math.random() > 0.5 ? "400/600" : "600/400"}?random=${i * 10 + j + 1}`,
      timestamp: `${Math.floor(Math.random() * 24)}h`,
      type: Math.random() > 0.7 ? "video" : "image",
      duration: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : undefined,
    }))

    return {
      userId: (i + 1).toString(),
      username: `user_${i + 1}`,
      avatar: `https://picsum.photos/40/40?random=${i + 100}`,
      isViewed: Math.random() < 0.3,
      stories,
    }
  })

  const handleStoryClick = (userIndex: number) => {
    setSelectedUserIndex(userIndex)
    setSelectedStoryIndex(0)
  }

  const handleCloseStory = () => {
    setSelectedUserIndex(null)
    setSelectedStoryIndex(0)
  }

  const handleUserChange = (newUserIndex: number, newStoryIndex = 0) => {
    setSelectedUserIndex(newUserIndex)
    setSelectedStoryIndex(newStoryIndex)
  }

  const handleStoryChange = (newStoryIndex: number) => {
    setSelectedStoryIndex(newStoryIndex)
  }

  return (
    <>
      <div className=" relative px-4 pb-4">
        {/* Left blur overlay */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white dark:from-black to-transparent" />

        {/* Right blur overlay */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white dark:from-black to-transparent" />

        <div className="flex gap-3 py-4 px-4  overflow-x-auto scrollbar-hide pb-1">
          {userStories.map((userStory, index) => (
            <div key={userStory.userId} className="shrink-0 w-24   group">
              <div
                onClick={() => handleStoryClick(index)}
                className={`relative h-32 w-full rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300    ${userStory.isViewed
                  ? "ring-2 ring-muted-foreground/30"
                  : "ring-2 ring-transparent bg-gradient-to-tr from-pink-600 via-orange-500 to-yellow-300 p-0.5"
                  }`}
              >
                <div
                  className="w-full h-full rounded-2xl bg-cover bg-center transition-transform duration-300 "
                  style={{
                    backgroundImage: `url(${userStory.stories[0].image})`,
                  }}
                >
                  {/* Profile Picture - moved away from border */}
                  <div className="absolute top-3 left-3 transform transition-all duration-300 ">
                    <div className="w-7 h-7 rounded-full ring-2 ring-white overflow-hidden shadow-md">
                      <img
                        src={userStory.avatar || "/placeholder.svg"}
                        alt={userStory.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Story count indicator - removed as requested */}
                  {/* {userStory.stories.length > 1 && (
                    <div className="absolute top-2 right-2">
                      <div className="bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        {userStory.stories.length}
                      </div>
                    </div>
                  )} */}

                  {/* Video indicator - removed as requested */}
                  {/* {userStory.stories[0].type === "video" && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-0.5"></div>
                      </div>
                    </div>
                  )} */}

                  {/* Username */}
                  <div className="absolute bottom-2 left-2 right-2 transform transition-all duration-300 group-hover:translate-y-1">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 shadow-sm">
                      <span className="text-[11px] font-medium text-gray-800 truncate block text-center">
                        {userStory.username}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Modal */}
      {selectedUserIndex !== null && (
        <StoryModal
          userStories={userStories}
          currentUserIndex={selectedUserIndex}
          currentStoryIndex={selectedStoryIndex}
          onClose={handleCloseStory}
          onUserChange={handleUserChange}
          onStoryChange={handleStoryChange}
        />
      )}
    </>
  )
}
