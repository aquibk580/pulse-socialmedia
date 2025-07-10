"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? "X" : "O"
    setBoard(newBoard)
    setIsXNext(!isXNext)

    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
  }

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Tic Tac Toe</h2>
      <div className="text-center mb-4">
        {winner ? (
          <p className="text-xl text-green-400">Winner: {winner}!</p>
        ) : (
          <p className="text-xl text-white">Next player: {isXNext ? "X" : "O"}</p>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-4">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 bg-gray-700 border-2 border-gray-600 text-2xl font-bold text-white hover:bg-gray-600 transition-colors"
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="text-center">
        <Button onClick={resetGame} className="bg-blue-600 hover:bg-blue-700">
          Reset Game
        </Button>
      </div>
    </Card>
  )
}
