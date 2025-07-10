"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Ball {
  x: number
  y: number
  dx: number
  dy: number
}

interface Paddle {
  x: number
  width: number
  height: number
}

interface Brick {
  x: number
  y: number
  width: number
  height: number
  visible: boolean
  color: string
}

export function Breakout() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)

  const canvasWidth = 480
  const canvasHeight = 320

  const [ball, setBall] = useState<Ball>({
    x: canvasWidth / 2,
    y: canvasHeight - 30,
    dx: 2,
    dy: -2,
  })

  const [paddle, setPaddle] = useState<Paddle>({
    x: (canvasWidth - 75) / 2,
    width: 75,
    height: 10,
  })

  const [bricks, setBricks] = useState<Brick[]>([])

  const initializeBricks = () => {
    const newBricks: Brick[] = []
    const brickRowCount = 3
    const brickColumnCount = 5
    const brickWidth = 75
    const brickHeight = 20
    const brickPadding = 10
    const brickOffsetTop = 60
    const brickOffsetLeft = 30

    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1"]

    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        newBricks.push({
          x: c * (brickWidth + brickPadding) + brickOffsetLeft,
          y: r * (brickHeight + brickPadding) + brickOffsetTop,
          width: brickWidth,
          height: brickHeight,
          visible: true,
          color: colors[r],
        })
      }
    }
    setBricks(newBricks)
  }

  const resetGame = () => {
    setBall({
      x: canvasWidth / 2,
      y: canvasHeight - 30,
      dx: 2,
      dy: -2,
    })
    setPaddle({
      x: (canvasWidth - 75) / 2,
      width: 75,
      height: 10,
    })
    setScore(0)
    setLives(3)
    setGameOver(false)
    setGameStarted(true)
    initializeBricks()
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw ball
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()

    // Draw paddle
    ctx.beginPath()
    ctx.rect(paddle.x, canvasHeight - paddle.height, paddle.width, paddle.height)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()

    // Draw bricks
    bricks.forEach((brick) => {
      if (brick.visible) {
        ctx.beginPath()
        ctx.rect(brick.x, brick.y, brick.width, brick.height)
        ctx.fillStyle = brick.color
        ctx.fill()
        ctx.closePath()
      }
    })
  }, [ball, paddle, bricks])

  const collisionDetection = useCallback(() => {
    setBricks((prevBricks) => {
      const newBricks = [...prevBricks]
      let hitBrick = false

      newBricks.forEach((brick) => {
        if (brick.visible) {
          if (
            ball.x > brick.x &&
            ball.x < brick.x + brick.width &&
            ball.y > brick.y &&
            ball.y < brick.y + brick.height
          ) {
            setBall((prevBall) => ({ ...prevBall, dy: -prevBall.dy }))
            brick.visible = false
            setScore((prev) => prev + 10)
            hitBrick = true
          }
        }
      })

      return newBricks
    })
  }, [ball])

  const updateGame = useCallback(() => {
    if (!gameStarted || gameOver) return

    setBall((prevBall) => {
      let newBall = { ...prevBall }

      // Move ball
      newBall.x += newBall.dx
      newBall.y += newBall.dy

      // Ball collision with walls
      if (newBall.x + 10 > canvasWidth || newBall.x - 10 < 0) {
        newBall.dx = -newBall.dx
      }
      if (newBall.y - 10 < 0) {
        newBall.dy = -newBall.dy
      }

      // Ball collision with paddle
      if (newBall.y + 10 > canvasHeight - paddle.height) {
        if (newBall.x > paddle.x && newBall.x < paddle.x + paddle.width) {
          newBall.dy = -newBall.dy
        } else if (newBall.y + 10 > canvasHeight) {
          // Ball missed paddle
          setLives((prev) => {
            const newLives = prev - 1
            if (newLives <= 0) {
              setGameOver(true)
              setGameStarted(false)
            }
            return newLives
          })

          // Reset ball position
          newBall = {
            x: canvasWidth / 2,
            y: canvasHeight - 30,
            dx: 2,
            dy: -2,
          }
        }
      }

      return newBall
    })

    collisionDetection()
  }, [gameStarted, gameOver, paddle, collisionDetection])

  useEffect(() => {
    const gameLoop = setInterval(() => {
      updateGame()
      draw()
    }, 16)

    return () => clearInterval(gameLoop)
  }, [updateGame, draw])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gameStarted) return

      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const relativeX = e.clientX - rect.left

      setPaddle((prev) => ({
        ...prev,
        x: Math.max(0, Math.min(canvasWidth - prev.width, relativeX - prev.width / 2)),
      }))
    }

    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove)
      return () => canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [gameStarted])

  useEffect(() => {
    initializeBricks()
  }, [])

  // Check win condition
  useEffect(() => {
    if (bricks.every((brick) => !brick.visible) && gameStarted) {
      setGameOver(true)
      setGameStarted(false)
    }
  }, [bricks, gameStarted])

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Breakout</h2>

      <div className="text-center mb-4">
        <div className="flex justify-center gap-8 mb-2">
          <p className="text-white">Score: {score}</p>
          <p className="text-white">Lives: {lives}</p>
        </div>
        {gameOver && (
          <p className="text-xl text-red-400">{bricks.every((brick) => !brick.visible) ? "You Win!" : "Game Over!"}</p>
        )}
      </div>

      <div className="flex justify-center mb-4">
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="border-2 border-gray-600 bg-black"
        />
      </div>

      <div className="text-center">
        <Button onClick={resetGame} className="bg-orange-600 hover:bg-orange-700">
          {gameStarted ? "Reset Game" : "Start Game"}
        </Button>
        <p className="text-gray-400 text-sm mt-2">Move your mouse to control the paddle!</p>
      </div>
    </Card>
  )
}
