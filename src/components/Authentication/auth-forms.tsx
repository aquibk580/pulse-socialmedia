import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AuthForms({ className, ...props }: React.ComponentProps<"div">) {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="relative overflow-hidden">
        <Card className="overflow-hidden -p-3">
          <CardContent className="grid p-0 md:grid-cols-2 relative">
            <AnimatePresence mode="wait">
              {!isSignUp ? (
                // Login Form
                <motion.div
                  key="login"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="order-2 md:order-1"
                >
                  <form className="p-6 md:p-8">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold">Welcome back</h1>
                        <p className="text-balance text-muted-foreground">Login to your Acme Inc account</p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input id="login-email" type="email" placeholder="m@example.com" required />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="login-password">Password</Label>
                          <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                            Forgot your password?
                          </a>
                        </div>
                        <Input id="login-password" type="password" required />
                      </div>
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
                      </div>
                      {/* <div className=""> */}
                      <Button
                        variant="outline"
                        className="w-full bg-transparent flex items-center gap-2"
                        onClick={() => {
                          // Handle Google sign-in here
                        }}
                      >
                        <img
                          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                          alt="Google"
                          className="h-4 w-4"
                        />
                        <span>Sign in with Google</span>
                      </Button>

                      {/* </div> */}
                      <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setIsSignUp(true)}
                          className="underline underline-offset-4 hover:text-primary"
                        >
                          Sign up
                        </button>
                      </div>
                    </div>
                  </form>
                </motion.div>
              ) : (
                // Sign Up Form
                <motion.div
                  key="signup"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="order-2 md:order-2"
                >
                  <form className="p-6 md:p-8">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold">Create an account</h1>
                        <p className="text-balance text-muted-foreground">Join Acme Inc and get started today</p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <Input id="signup-name" type="text" placeholder="John Doe" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input id="signup-email" type="email" placeholder="m@example.com" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input id="signup-password" type="password" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" required />
                      </div>
                      <Button type="submit" className="w-full">
                        Create Account
                      </Button>
                      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
                      </div>
                      <div>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent flex items-center gap-2"
                          onClick={() => {
                            // Handle Google sign-in here
                          }}
                        >
                          <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            className="h-4 w-4"
                          />
                          <span>Sign in with Google</span>
                        </Button>
                      </div>
                      <div className="text-center text-sm">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setIsSignUp(false)}
                          className="underline underline-offset-4 hover:text-primary"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Background Image Section */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isSignUp ? "signup-img" : "login-img"}
                className={cn(
                  "relative hidden bg-muted md:block w-full h-full",
                  isSignUp ? "order-1" : "order-2"
                )}
                initial={{ x: isSignUp ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: isSignUp ? 100 : -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src="/placeholder.svg?height=600&width=400"
                  alt={isSignUp ? "Sign up illustration" : "Login illustration"}
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
