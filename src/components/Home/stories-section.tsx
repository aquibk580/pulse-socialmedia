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
      username: "mike_chen",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/placeholder.svg?height=120&width=90",
      isViewed: true,
    },
    {
      id: "3",
      username: "emma_w",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/placeholder.svg?height=120&width=90",
      isViewed: false,
    },
    {
      id: "4",
      username: "alex_r",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/placeholder.svg?height=120&width=90",
      isViewed: true,
    },
    {
      id: "5",
      username: "sarah_j",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/placeholder.svg?height=120&width=90",
      isViewed: false,
    },
    {
      id: "6",
      username: "sarah_j",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/placeholder.svg?height=120&width=90",
      isViewed: false,
    },
    {
      id: "7",
      username: "john_doe",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/placeholder.svg?height=120&width=90",
      isViewed: true,
    },
    {
      id: "8",
      username: "jane_smith",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/placeholder.svg?height=120&width=90",
      isViewed: false,
    },
    {
      id: "9",
      username: "mark_t",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/placeholder.svg?height=120&width=90",
      isViewed: true,
    },
    {
      id: "10",
      username: "linda_k",
      avatar: "/placeholder.svg?height=32&width=32",
      storyImage: "/placeholder.svg?height=120&width=90",
      isViewed: false,
    },
  ]

  return (
    <div className="px-4 pb-4 ">
      <div className="flex gap-3 py-4 px-4 overflow-x-auto scrollbar-hide pb-1">
        {stories.map((story) => (
          <div key={story.id} className="shrink-0 w-24">
            <div
              className={`relative h-32 w-full rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-[1.03] shadow-sm ${
                story.isViewed
                  ? "ring-2 ring-muted-foreground/30 grayscale"
                  : "ring-2 ring-transparent bg-gradient-to-tr from-pink-600 via-orange-500 to-yellow-300 p-0.5"
              }`}
            >
              <div
                className="w-full h-full rounded-2xl bg-cover bg-center"
                style={{
                  backgroundImage: `url(${story.storyImage})`,
                }}
              >
                {/* Profile Picture */}
                <div className="absolute top-2 left-2">
                  <div className="w-7 h-7 rounded-full ring-2 ring-white overflow-hidden">
                    <img
                      src={story.avatar}
                      alt={story.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Username */}
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-white/80 backdrop-blur-sm rounded-full px-2 py-0.5">
                    <span className="text-[11px] font-medium text-gray-800 truncate block text-center">
                      {story.username}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
