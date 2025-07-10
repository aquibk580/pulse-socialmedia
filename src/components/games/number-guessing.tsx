"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function NumberGuessing() {
  const [targetNumber, setTargetNumber] = useState<number>(0)
  const [guess, setGuess] = useState<string>("")
  const [attempts, setAttempts] = useState<number>(0)
  const [message, setMessage] = useState<string>("")
  const [gameWon, setGameWon] = useState<boolean>(false)
  const [guessHistory, setGuessHistory] = useState<number[]>([])

  const initializeGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1)
    setGuess("")
    setAttempts(0)
    setMessage("Guess a number between 1 and 100!")
    setGameWon(false)
    setGuessHistory([])
  }

  useEffect(() => {
    initializeGame()
  }, [])

  const handleGuess = () => {
    const guessNumber = Number.parseInt(guess)

    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
      setMessage("Please enter a valid number between 1 and 100!")
      return
    }

    const newAttempts = attempts + 1
    setAttempts(newAttempts)
    setGuessHistory((prev) => [...prev, guessNumber])

    if (guessNumber === targetNumber) {
      setMessage(`🎉 Congratulations! You guessed it in ${newAttempts} attempts!`)
      setGameWon(true)
    } else if (guessNumber < targetNumber) {
      setMessage(`Too low! Try a higher number. (Attempt ${newAttempts})`)
    } else {
      setMessage(`Too high! Try a lower number. (Attempt ${newAttempts})`)
    }

    setGuess("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !gameWon) {
      handleGuess()
    }
  }

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Number Guessing Game</h2>

      <div className="text-center mb-6">
        <p className={`text-lg mb-4 ${gameWon ? "text-green-400" : "text-white"}`}>{message}</p>

        {!gameWon && (
          <div className="flex gap-2 max-w-xs mx-auto mb-4">
            <Input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your guess"
              min="1"
              max="100"
              className="bg-gray-700 border-gray-600 text-white"
            />
            <Button onClick={handleGuess} className="bg-blue-600 hover:bg-blue-700">
              Guess
            </Button>
          </div>
        )}

        <p className="text-gray-400 mb-4">Attempts: {attempts}</p>
      </div>

      {guessHistory.length > 0 && (
        <div className="mb-4">
          <h3 className="text-white font-semibold mb-2">Your Guesses:</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {guessHistory.map((historyGuess, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded text-sm ${
                  historyGuess === targetNumber
                    ? "bg-green-600 text-white"
                    : historyGuess < targetNumber
                      ? "bg-blue-600 text-white"
                      : "bg-red-600 text-white"
                }`}
              >
                {historyGuess}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <Button onClick={initializeGame} className="bg-purple-600 hover:bg-purple-700">
          New Game
        </Button>
      </div>
    </Card>
  )
}
