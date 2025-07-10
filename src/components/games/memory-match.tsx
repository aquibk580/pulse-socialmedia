"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface MemoryCard {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

export function MemoryMatch() {
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  const emojis = ["🎮", "🎯", "🎲", "🎪", "🎨", "🎭", "🎸", "🎺"]

  const initializeGame = () => {
    const gameCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))

    setCards(gameCards)
    setFlippedCards([])
    setMoves(0)
    setGameWon(false)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards
      const firstCard = cards[first]
      const secondCard = cards[second]

      if (firstCard.emoji === secondCard.emoji) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, isMatched: true } : card)),
          )
          setFlippedCards([])
        }, 1000)
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, isFlipped: false } : card)),
          )
          setFlippedCards([])
        }, 1000)
      }
      setMoves((prev) => prev + 1)
    }
  }, [flippedCards, cards])

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setGameWon(true)
    }
  }, [cards])

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return
    if (cards[cardId].isFlipped || cards[cardId].isMatched) return

    setCards((prev) => prev.map((card) => (card.id === cardId ? { ...card, isFlipped: true } : card)))
    setFlippedCards((prev) => [...prev, cardId])
  }

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Memory Match</h2>
      <div className="text-center mb-4">
        <p className="text-xl text-white">Moves: {moves}</p>
        {gameWon && <p className="text-xl text-green-400">Congratulations! You won!</p>}
      </div>

      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto mb-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`w-16 h-16 rounded-lg text-2xl font-bold transition-all duration-300 ${
              card.isFlipped || card.isMatched ? "bg-blue-500 text-white" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {card.isFlipped || card.isMatched ? card.emoji : "?"}
          </button>
        ))}
      </div>

      <div className="text-center">
        <Button onClick={initializeGame} className="bg-purple-600 hover:bg-purple-700">
          New Game
        </Button>
      </div>
    </Card>
  )
}
