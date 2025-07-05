"use client"

interface Story {
  id: string
  username: string
  avatar: string
  storyImage: string
  isViewed?: boolean
}

export default function StoriesSection() {
  const stories: Story[] = [
    {
      id: "1",
      username: "Lisa_Stern",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/story-bg.png",
      isViewed: false,
    },
    {
      id: "2",
      username: "Lisa_Stern",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/story-bg.png",
      isViewed: false,
    },
    {
      id: "3",
      username: "Lisa_Stern",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/story-bg.png",
      isViewed: false,
    },
    {
      id: "4",
      username: "Lisa_Stern",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/story-bg.png",
      isViewed: false,
    },
    {
      id: "5",
      username: "mike_chen",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/placeholder.svg?height=120&width=90",
      isViewed: true,
    },
    {
      id: "6",
      username: "emma_w",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/placeholder.svg?height=120&width=90",
      isViewed: false,
    },
    {
      id: "7",
      username: "alex_r",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/placeholder.svg?height=120&width=90",
      isViewed: true,
    },
    {
      id: "8",
      username: "sarah_j",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/placeholder.svg?height=120&width=90",
      isViewed: false,
    },
  ]

  return (
    <div className="mb-6">
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0">
            <div
              className={`relative w-20 h-28 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                story.isViewed ? "ring-2 ring-muted" : "ring-2 ring-primary"
              }`}
              style={{
                backgroundImage: `url(${story.storyImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Profile picture at top */}
              <div className="absolute top-2 left-2">
                <img
                  src={story.avatar || "/placeholder.svg"}
                  alt={story.username}
                  className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                />
              </div>

              {/* Username at bottom */}
              <div className="absolute bottom-2 left-2 right-2">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium text-gray-900 truncate block">{story.username}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
