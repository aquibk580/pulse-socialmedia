"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface OTPFormData {
  otp: string[]
}

interface OTPFormProps {
  onSwitchToLogin: () => void
  email?: string
}

export function OTPForm({ onSwitchToLogin, email = "your email" }: OTPFormProps) {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""))
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<OTPFormData>()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    // Focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData("text").slice(0, 6)
    const newOtp = [...otp]

    for (let i = 0; i < pasteData.length; i++) {
      if (i < 6 && !isNaN(Number(pasteData[i]))) {
        newOtp[i] = pasteData[i]
      }
    }

    setOtp(newOtp)

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((val) => val === "")
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  const onSubmit = async () => {
    const otpValue = otp.join("")
    if (otpValue.length !== 6) {
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("OTP verified:", otpValue)
      // Handle successful verification
      alert("OTP verified successfully!")
    } catch (error) {
      console.error("OTP verification error:", error)
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCountdown(60)
      setOtp(new Array(6).fill(""))
      inputRefs.current[0]?.focus()
    } catch (error) {
      console.error("Resend OTP error:", error)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent>
        <motion.div
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Verify your email</h1>
                <p className="text-balance text-muted-foreground">We've sent a 6-digit code to {email}</p>
              </div>

              <div className="grid gap-4">
                <Label className="text-center">Enter verification code</Label>
                <div className="flex justify-center gap-2">
                  {otp.map((data, index) => (
                    <Input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="w-12 h-12 text-center text-lg font-semibold"
                      type="text"
                      maxLength={1}
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting || otp.join("").length !== 6}>
                {isSubmitting ? "Verifying..." : "Verify Code"}
              </Button>

              <div className="text-center text-sm">
                {"Didn't receive the code? "}
                {countdown > 0 ? (
                  <span className="text-muted-foreground">Resend in {countdown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={isResending}
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    {isResending ? "Sending..." : "Resend code"}
                  </button>
                )}
              </div>

              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Back to login
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </CardContent>
    </Card>
  )
}
