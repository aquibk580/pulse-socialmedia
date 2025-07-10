"use client"

import { useState } from "react"
// import { GameGallery } from "@/components/games/game-gallery"
import { GameGallery } from "@/components/games/game-gallery"
import { TicTacToe } from "@/components/games/tic-tac-toe"
import { SnakeGame } from "@/components/games/snake-game"
import { MemoryMatch } from "@/components/games/memory-match"
import { RockPaperScissors } from "@/components/games/rock-paper-scissors"
import { NumberGuessing } from "@/components/games/number-guessing"
import { ColorMatch } from "@/components/games/color-match"
import { SimonSays } from "@/components/games/simon-says"
import { Breakout } from "@/components/games/breakout"

export default function GamePage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  const games = [
    {
      id: "tic-tac-toe",
      title: "Tic Tac Toe",
      genre: "Strategy",
      component: TicTacToe,
      gradient: "from-blue-400 to-purple-600",
      icon: "⭕",
    },
    {
      id: "snake",
      title: "Snake Game",
      genre: "Arcade",
      component: SnakeGame,
      gradient: "from-green-400 to-blue-500",
      icon: "🐍",
    },
    {
      id: "memory-match",
      title: "Memory Match",
      genre: "Puzzle",
      component: MemoryMatch,
      gradient: "from-pink-400 to-red-500",
      icon: "🧠",
    },
    {
      id: "rock-paper-scissors",
      title: "Rock Paper Scissors",
      genre: "Action",
      component: RockPaperScissors,
      gradient: "from-yellow-400 to-orange-500",
      icon: "✂️",
    },
    {
      id: "number-guessing",
      title: "Number Guessing",
      genre: "Puzzle",
      component: NumberGuessing,
      gradient: "from-indigo-400 to-purple-600",
      icon: "🔢",
    },
    {
      id: "color-match",
      title: "Color Match",
      genre: "Puzzle",
      component: ColorMatch,
      gradient: "from-teal-400 to-cyan-500",
      icon: "🎨",
    },
    {
      id: "simon-says",
      title: "Simon Says",
      genre: "Memory",
      component: SimonSays,
      gradient: "from-purple-400 to-pink-500",
      icon: "🎵",
    },
    {
      id: "breakout",
      title: "Breakout",
      genre: "Arcade",
      component: Breakout,
      gradient: "from-orange-400 to-red-500",
      icon: "🏓",
    },
  ]

  if (selectedGame) {
    const game = games.find((g) => g.id === selectedGame)
    if (game) {
      const GameComponent = game.component
      return (
        <div className="min-h-screen bg-gray-900 p-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedGame(null)}
              className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Back to Games
            </button>
            <GameComponent />
          </div>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Game Gallery</h1>
        <GameGallery games={games} onGameSelect={setSelectedGame} />
      </div>
    </div>
  )
}
