"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function SimonSays() {
  const [sequence, setSequence] = useState<number[]>([])
  const [playerSequence, setPlayerSequence] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlayerTurn, setIsPlayerTurn] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [activeButton, setActiveButton] = useState<number | null>(null)

  const colors = [
    { id: 0, color: "bg-red-500", activeColor: "bg-red-300", sound: "C" },
    { id: 1, color: "bg-blue-500", activeColor: "bg-blue-300", sound: "D" },
    { id: 2, color: "bg-green-500", activeColor: "bg-green-300", sound: "E" },
    { id: 3, color: "bg-yellow-500", activeColor: "bg-yellow-300", sound: "F" },
  ]

  const startGame = () => {
    setSequence([])
    setPlayerSequence([])
    setScore(0)
    setGameOver(false)
    setIsPlaying(true)
    addToSequence()
  }

  const addToSequence = () => {
    const newNumber = Math.floor(Math.random() * 4)
    setSequence((prev) => [...prev, newNumber])
  }

  const playSequence = async (seq: number[]) => {
    setIsPlayerTurn(false)

    for (let i = 0; i < seq.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600))
      setActiveButton(seq[i])
      await new Promise((resolve) => setTimeout(resolve, 400))
      setActiveButton(null)
    }

    setIsPlayerTurn(true)
  }

  const handleButtonClick = (buttonId: number) => {
    if (!isPlayerTurn || gameOver) return

    const newPlayerSequence = [...playerSequence, buttonId]
    setPlayerSequence(newPlayerSequence)

    // Check if the player's move is correct
    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameOver(true)
      setIsPlaying(false)
      return
    }

    // Check if player completed the sequence
    if (newPlayerSequence.length === sequence.length) {
      setScore((prev) => prev + 1)
      setPlayerSequence([])

      setTimeout(() => {
        addToSequence()
      }, 1000)
    }
  }

  useEffect(() => {
    if (sequence.length > 0 && isPlaying && !gameOver) {
      playSequence(sequence)
    }
  }, [sequence, isPlaying, gameOver])

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Simon Says</h2>

      <div className="text-center mb-6">
        <p className="text-xl text-white mb-2">Score: {score}</p>
        {gameOver && <p className="text-xl text-red-400 mb-2">Game Over! Final Score: {score}</p>}
        {isPlaying && !isPlayerTurn && !gameOver && <p className="text-yellow-400">Watch the sequence...</p>}
        {isPlayerTurn && <p className="text-green-400">Your turn! Repeat the sequence</p>}
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-6">
        {colors.map((colorObj) => (
          <button
            key={colorObj.id}
            onClick={() => handleButtonClick(colorObj.id)}
            className={`w-24 h-24 rounded-lg transition-all duration-200 ${
              activeButton === colorObj.id ? colorObj.activeColor : colorObj.color
            } ${isPlayerTurn ? "hover:opacity-80 cursor-pointer" : "cursor-not-allowed"}`}
            disabled={!isPlayerTurn}
          >
            <span className="text-white font-bold text-lg">{colorObj.sound}</span>
          </button>
        ))}
      </div>

      <div className="text-center">
        <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700" disabled={isPlaying && !gameOver}>
          {isPlaying && !gameOver ? "Game in Progress" : "Start Game"}
        </Button>
        <p className="text-gray-400 text-sm mt-2">Watch the sequence, then repeat it by clicking the buttons!</p>
      </div>
    </Card>
  )
}
