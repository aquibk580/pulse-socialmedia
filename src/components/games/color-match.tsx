"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function ColorMatch() {
  const [targetColor, setTargetColor] = useState<string>("")
  const [options, setOptions] = useState<string[]>([])
  const [score, setScore] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(30)
  const [gameActive, setGameActive] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")

  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E9",
  ]

  const colorNames = ["Red", "Teal", "Blue", "Green", "Yellow", "Purple", "Mint", "Gold", "Lavender", "Sky Blue"]

  const generateRound = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    const correct = colors[randomIndex]
    setTargetColor(correct)

    // Create options with correct answer and 3 random wrong answers
    const wrongOptions = colors.filter((color) => color !== correct)
    const shuffledWrong = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 3)
    const allOptions = [correct, ...shuffledWrong].sort(() => Math.random() - 0.5)

    setOptions(allOptions)
    setMessage("")
  }

  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setGameActive(true)
    generateRound()
  }

  const handleColorClick = (selectedColor: string) => {
    if (!gameActive) return

    if (selectedColor === targetColor) {
      setScore((prev) => prev + 1)
      setMessage("Correct! +1 point")
      setTimeout(() => generateRound(), 500)
    } else {
      setMessage("Wrong! Try again")
      setTimeout(() => setMessage(""), 1000)
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000)
    } else if (timeLeft === 0) {
      setGameActive(false)
      setMessage(`Game Over! Final Score: ${score}`)
    }
    return () => clearTimeout(timer)
  }, [timeLeft, gameActive, score])

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Color Match</h2>

      <div className="text-center mb-6">
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <p className="text-white mb-1">Score</p>
            <p className="text-2xl font-bold text-green-400">{score}</p>
          </div>
          <div className="text-center">
            <p className="text-white mb-1">Time</p>
            <p className="text-2xl font-bold text-red-400">{timeLeft}s</p>
          </div>
        </div>

        {message && (
          <p
            className={`text-lg mb-4 ${message.includes("Correct") ? "text-green-400" : message.includes("Wrong") ? "text-red-400" : "text-white"}`}
          >
            {message}
          </p>
        )}
      </div>

      {gameActive && targetColor && (
        <div className="mb-6">
          <p className="text-white text-center mb-4">Match this color:</p>
          <div
            className="w-32 h-32 mx-auto rounded-lg border-4 border-white shadow-lg"
            style={{ backgroundColor: targetColor }}
          />
        </div>
      )}

      {gameActive && options.length > 0 && (
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
          {options.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorClick(color)}
              className="w-24 h-24 rounded-lg border-2 border-gray-600 hover:border-white transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}

      <div className="text-center">
        <Button onClick={startGame} className="bg-orange-600 hover:bg-orange-700" disabled={gameActive}>
          {gameActive ? "Game in Progress" : "Start Game"}
        </Button>
        <p className="text-gray-400 text-sm mt-2">Click the color that matches the target color above!</p>
      </div>
    </Card>
  )
}
