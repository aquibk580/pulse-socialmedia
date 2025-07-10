"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MoreVertical } from "lucide-react"

interface Game {
  id: string
  title: string
  genre: string
  gradient: string
  icon: string
}

interface GameGalleryProps {
  games: Game[]
  onGameSelect: (gameId: string) => void
}

export function GameGallery({ games, onGameSelect }: GameGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map((game) => (
        <Card
          key={game.id}
          className="bg-gray-800 border-gray-700 overflow-hidden group hover:scale-105 transition-transform duration-200"
        >
          <div className={`h-48 bg-gradient-to-br ${game.gradient} relative flex items-center justify-center`}>
            <div className="text-6xl">{game.icon}</div>
            <div className="absolute top-3 right-3">
              <MoreVertical className="w-5 h-5 text-white/70" />
            </div>
          </div>
          <div className="p-4">
            <Button
              onClick={() => onGameSelect(game.id)}
              className="w-full mb-3 bg-white text-gray-900 hover:bg-gray-100"
            >
              Play
            </Button>
            <h3 className="text-white font-semibold text-lg">{game.title}</h3>
            <p className="text-gray-400 text-sm">{game.genre}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
