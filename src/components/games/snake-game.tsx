"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Position = { x: number; y: number }

export function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [direction, setDirection] = useState<Position>({ x: 0, y: -1 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  const gridSize = 20

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    }
  }, [])

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setFood(generateFood())
    setDirection({ x: 0, y: -1 })
    setGameOver(false)
    setScore(0)
    setGameStarted(true)
  }

  const moveSnake = useCallback(() => {
    if (!gameStarted || gameOver) return

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }

      head.x += direction.x
      head.y += direction.y

      // Check boundaries
      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        setGameOver(true)
        return currentSnake
      }

      // Check self collision
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10)
        setFood(generateFood())
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameOver, gameStarted, generateFood])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) return

      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 })
          break
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 })
          break
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 })
          break
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 })
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [direction, gameStarted])

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150)
    return () => clearInterval(gameInterval)
  }, [moveSnake])

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Snake Game</h2>
      <div className="text-center mb-4">
        <p className="text-xl text-white">Score: {score}</p>
        {gameOver && <p className="text-xl text-red-400">Game Over!</p>}
      </div>

      <div className="relative mx-auto mb-4" style={{ width: "400px", height: "400px" }}>
        <div className="absolute inset-0 bg-gray-900 border-2 border-gray-600">
          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`absolute ${index === 0 ? "bg-green-400" : "bg-green-600"}`}
              style={{
                left: `${(segment.x / gridSize) * 100}%`,
                top: `${(segment.y / gridSize) * 100}%`,
                width: `${100 / gridSize}%`,
                height: `${100 / gridSize}%`,
              }}
            />
          ))}

          {/* Food */}
          <div
            className="absolute bg-red-500 rounded-full"
            style={{
              left: `${(food.x / gridSize) * 100}%`,
              top: `${(food.y / gridSize) * 100}%`,
              width: `${100 / gridSize}%`,
              height: `${100 / gridSize}%`,
            }}
          />
        </div>
      </div>

      <div className="text-center">
        <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700">
          {gameStarted ? "Reset Game" : "Start Game"}
        </Button>
        <p className="text-gray-400 text-sm mt-2">Use arrow keys to control the snake</p>
      </div>
    </Card>
  )
}
