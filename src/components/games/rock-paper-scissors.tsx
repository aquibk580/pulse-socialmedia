"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Choice = "rock" | "paper" | "scissors"

export function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null)
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null)
  const [result, setResult] = useState<string>("")
  const [score, setScore] = useState({ player: 0, computer: 0 })

  const choices: { value: Choice; emoji: string; label: string }[] = [
    { value: "rock", emoji: "🪨", label: "Rock" },
    { value: "paper", emoji: "📄", label: "Paper" },
    { value: "scissors", emoji: "✂️", label: "Scissors" },
  ]

  const getRandomChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * choices.length)
    return choices[randomIndex].value
  }

  const determineWinner = (player: Choice, computer: Choice): string => {
    if (player === computer) return "tie"

    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      return "player"
    }

    return "computer"
  }

  const playGame = (choice: Choice) => {
    const computerChoice = getRandomChoice()
    const winner = determineWinner(choice, computerChoice)

    setPlayerChoice(choice)
    setComputerChoice(computerChoice)

    if (winner === "player") {
      setResult("You win!")
      setScore((prev) => ({ ...prev, player: prev.player + 1 }))
    } else if (winner === "computer") {
      setResult("Computer wins!")
      setScore((prev) => ({ ...prev, computer: prev.computer + 1 }))
    } else {
      setResult("It's a tie!")
    }
  }

  const resetGame = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult("")
    setScore({ player: 0, computer: 0 })
  }

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Rock Paper Scissors</h2>

      <div className="text-center mb-6">
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-center">
            <p className="text-white mb-2">You</p>
            <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center text-3xl">
              {playerChoice ? choices.find((c) => c.value === playerChoice)?.emoji : "❓"}
            </div>
            <p className="text-blue-400 mt-2">Score: {score.player}</p>
          </div>

          <div className="flex items-center">
            <span className="text-2xl">VS</span>
          </div>

          <div className="text-center">
            <p className="text-white mb-2">Computer</p>
            <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center text-3xl">
              {computerChoice ? choices.find((c) => c.value === computerChoice)?.emoji : "❓"}
            </div>
            <p className="text-red-400 mt-2">Score: {score.computer}</p>
          </div>
        </div>

        {result && <p className="text-xl font-bold text-yellow-400 mb-4">{result}</p>}
      </div>

      <div className="flex justify-center gap-4 mb-4">
        {choices.map((choice) => (
          <Button
            key={choice.value}
            onClick={() => playGame(choice.value)}
            className="flex flex-col items-center p-4 bg-gray-700 hover:bg-gray-600 text-white"
          >
            <span className="text-2xl mb-1">{choice.emoji}</span>
            <span className="text-sm">{choice.label}</span>
          </Button>
        ))}
      </div>

      <div className="text-center">
        <Button onClick={resetGame} className="bg-red-600 hover:bg-red-700">
          Reset Score
        </Button>
      </div>
    </Card>
  )
}
