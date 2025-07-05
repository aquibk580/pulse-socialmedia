"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type ThemeColor = "default" | "purple" | "blue" | "green" | "orange" | "pink" | "red" | "yellow" | "cyan"

interface ThemeContextType {
  theme: Theme
  themeColor: ThemeColor
  toggleTheme: () => void
  setThemeColor: (color: ThemeColor) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [themeColor, setThemeColorState] = useState<ThemeColor>("default")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme
    const savedThemeColor = localStorage.getItem("themeColor") as ThemeColor

    if (savedTheme) {
      setTheme(savedTheme)
    }
    if (savedThemeColor) {
      setThemeColorState(savedThemeColor)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  useEffect(() => {
    localStorage.setItem("themeColor", themeColor)

    // Remove all theme color classes
    const themeColors = ["default", "purple", "blue", "green", "orange", "pink", "red", "yellow", "cyan"]
    themeColors.forEach((color) => {
      document.documentElement.classList.remove(`theme-${color}`)
    })

    // Add current theme color class
    document.documentElement.classList.add(`theme-${themeColor}`)
  }, [themeColor])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color)
  }

  return (
    <ThemeContext.Provider value={{ theme, themeColor, toggleTheme, setThemeColor }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
