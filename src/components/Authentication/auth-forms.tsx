import type React from "react"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"
import { OTPForm } from "./otp-form"

type AuthView = "login" | "signup" | "otp"

export function AuthForms({ className, ...props }: React.ComponentProps<"div">) {
  const [currentView, setCurrentView] = useState<AuthView>("login")
  const [userEmail, setUserEmail] = useState<string>("")

  const switchToLogin = () => setCurrentView("login")
  const switchToSignup = () => setCurrentView("signup")
  const switchToOTP = (email?: string) => {
    if (email) setUserEmail(email)
    setCurrentView("otp")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentView === "login" && (
            <LoginForm key="login" onSwitchToSignup={switchToSignup} onSwitchToOTP={switchToOTP} />
          )}
          {currentView === "signup" && (
            <SignupForm key="signup" onSwitchToLogin={switchToLogin} onSwitchToOTP={switchToOTP} />
          )}
          {currentView === "otp" && <OTPForm key="otp" onSwitchToLogin={switchToLogin} email={userEmail} />}
        </AnimatePresence>
      </div>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
