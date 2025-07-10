"use client"

import { useState } from "react"

interface Game {
  id: string
  title: string
  genre: string
  image: string
  description?: string
  rating?: number
  players?: string
}

interface ModernGameGalleryProps {
  games?: Game[]
  title?: string
  className?: string
  onGameSelect?: (gameId: string) => void
}

const defaultGames: Game[] = [
  {
    id: "strategy-master",
    title: "Strategy Master",
    genre: "Strategy",
    image: "/placeholder.svg?height=200&width=300",
    description: "Master the art of strategic thinking",
    rating: 4.8,
    players: "1-4 Players",
  },
  {
    id: "puzzle-quest",
    title: "Puzzle Quest",
    genre: "Puzzle",
    image: "/placeholder.svg?height=200&width=300",
    description: "Challenge your mind with complex puzzles",
    rating: 4.6,
    players: "Single Player",
  },
  {
    id: "action-arena",
    title: "Action Arena",
    genre: "Action",
    image: "/placeholder.svg?height=200&width=300",
    description: "Fast-paced action and combat",
    rating: 4.9,
    players: "Multiplayer",
  },
  {
    id: "adventure-world",
    title: "Adventure World",
    genre: "Adventure",
    image: "/placeholder.svg?height=200&width=300",
    description: "Explore vast worlds and discover secrets",
    rating: 4.7,
    players: "Single Player",
  },
  {
    id: "racing-legends",
    title: "Racing Legends",
    genre: "Racing",
    image: "/placeholder.svg?height=200&width=300",
    description: "High-speed racing excitement",
    rating: 4.5,
    players: "1-8 Players",
  },
  {
    id: "mind-games",
    title: "Mind Games",
    genre: "Educational",
    image: "/placeholder.svg?height=200&width=300",
    description: "Train your brain with fun challenges",
    rating: 4.4,
    players: "Single Player",
  },
]

export function ModernGameGallery({
  games = defaultGames,
  title = "Featured Games",
  className = "",
  onGameSelect,
}: ModernGameGalleryProps) {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null)

  const handleGameClick = (gameId: string) => {
    if (onGameSelect) {
      onGameSelect(gameId)
    }
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half-fill)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>,
      )
    }

    return stars
  }

  return (
    <div className={`w-full bg-background text-foreground ${className}`}>
      {/* Header */}
      <div className="mb-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">{title}</h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">Discover and play amazing games</p>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <button className="p-2 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
                />
              </svg>
            </button>
            <button className="p-2 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="group relative bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              onMouseEnter={() => setHoveredGame(game.id)}
              onMouseLeave={() => setHoveredGame(null)}
            >
              {/* Game Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={game.image || "/placeholder.svg"}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play Button Overlay */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredGame === game.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button
                    onClick={() => handleGameClick(game.id)}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-primary/90 transition-colors transform hover:scale-105"
                  >
                    Play Now
                  </button>
                </div>

                {/* Genre Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-background/90 text-foreground px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm">
                    {game.genre}
                  </span>
                </div>

                {/* Menu Button */}
                <div className="absolute top-3 right-3">
                  <button className="bg-background/90 text-foreground p-1.5 rounded-md hover:bg-background transition-colors backdrop-blur-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Game Info */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                    {game.title}
                  </h3>
                  {game.description && <p className="text-sm text-muted-foreground line-clamp-2">{game.description}</p>}
                </div>

                {/* Rating and Players */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    {game.rating && (
                      <>
                        <div className="flex items-center space-x-1">{renderStars(game.rating)}</div>
                        <span className="text-muted-foreground ml-1">{game.rating}</span>
                      </>
                    )}
                  </div>
                  {game.players && <span className="text-muted-foreground">{game.players}</span>}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleGameClick(game.id)}
                  className="w-full mt-4 bg-secondary text-secondary-foreground py-2.5 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  Play Game
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="mt-12 text-center px-4 sm:px-6 lg:px-8">
        <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
          Load More Games
        </button>
      </div>
    </div>
  )
}

export default ModernGameGallery
