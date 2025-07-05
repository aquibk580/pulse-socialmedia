"use client"

import {
  User,
  Bell,
  Lock,
  Users,
  UserX,
  EyeOff,
  MessageCircle,
  AtSign,
  MessageSquare,
  Share,
  UserMinus,
  Type,
  VolumeX,
  SettingsIcon,
  Heart,
  Moon,
  Sun,
  ChevronRight,
  Palette,
  Check,
} from "lucide-react"
import { useTheme } from "../contexts/theme-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { cn } from "../lib/utils"

export default function SettingsPage() {
  const { theme, themeColor, toggleTheme, setThemeColor } = useTheme()

  const themeColors = [
    { name: "Default", value: "default" as const, color: "bg-slate-500" },
    { name: "Purple", value: "purple" as const, color: "bg-purple-500" },
    { name: "Blue", value: "blue" as const, color: "bg-blue-500" },
    { name: "Green", value: "green" as const, color: "bg-green-500" },
    { name: "Orange", value: "orange" as const, color: "bg-orange-500" },
    { name: "Pink", value: "pink" as const, color: "bg-pink-500" },
    { name: "Red", value: "red" as const, color: "bg-red-500" },
    { name: "Yellow", value: "yellow" as const, color: "bg-yellow-500" },
    { name: "Cyan", value: "cyan" as const, color: "bg-cyan-500" },
  ]

  const settingsSections = [
    {
      title: "How you use Prism",
      items: [
        { icon: User, label: "Edit profile", description: "Change your profile info" },
        { icon: Bell, label: "Notifications", description: "Manage your notifications" },
      ],
    },
    {
      title: "Who can see your content",
      items: [
        { icon: Lock, label: "Account privacy", description: "Private or public account" },
        { icon: Users, label: "Close Friends", description: "Share with close friends only" },
        { icon: UserX, label: "Blocked", description: "Manage blocked accounts" },
        { icon: EyeOff, label: "Hide story and live", description: "Hide from specific people" },
      ],
    },
    {
      title: "How others can interact with you",
      items: [
        { icon: MessageCircle, label: "Messages and story replies", description: "Control who can message you" },
        { icon: AtSign, label: "Tags and mentions", description: "Control who can tag you" },
        { icon: MessageSquare, label: "Comments", description: "Control who can comment" },
        { icon: Share, label: "Sharing", description: "Control sharing permissions" },
        { icon: UserMinus, label: "Restricted accounts", description: "Manage restricted users" },
        { icon: Type, label: "Hidden Words", description: "Hide offensive comments" },
      ],
    },
    {
      title: "What you see",
      items: [
        { icon: VolumeX, label: "Muted accounts", description: "Accounts you've muted" },
        { icon: SettingsIcon, label: "Content preferences", description: "Manage what you see" },
        { icon: Heart, label: "Like and share counts", description: "Hide like counts" },
      ],
    },
  ]

  return (
    <div className="flex-1 pt-20 pb-20 md:pb-8">
      <div className="w-full px-4">
        <div className="md:ml-64 lg:mr-80 max-w-2xl mx-auto space-y-6">
          {/* Settings Header */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-muted/20">
            <CardHeader>
              <CardTitle className="text-2xl">Settings</CardTitle>
              <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </CardHeader>
          </Card>

          {/* Appearance Settings */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-muted/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Appearance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {theme === "light" ? (
                    <Sun className="w-6 h-6 text-muted-foreground" />
                  ) : (
                    <Moon className="w-6 h-6 text-muted-foreground" />
                  )}
                  <div>
                    <h3 className="font-medium text-foreground">Theme</h3>
                    <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    theme === "dark" ? "bg-primary" : "bg-muted",
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-background transition-transform shadow-lg",
                      theme === "dark" ? "translate-x-6" : "translate-x-1",
                    )}
                  />
                </button>
              </div>

              {/* Theme Colors */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Theme Color</h3>
                <p className="text-sm text-muted-foreground mb-4">Choose your preferred accent color</p>
                <div className="grid grid-cols-3 gap-3">
                  {themeColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setThemeColor(color.value)}
                      className={cn(
                        "relative flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105",
                        themeColor === color.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-muted-foreground/50",
                      )}
                    >
                      <div className={cn("w-8 h-8 rounded-full mb-2 shadow-md", color.color)} />
                      <span className="text-xs font-medium text-foreground">{color.name}</span>
                      {themeColor === color.value && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-primary-foreground" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings Sections */}
          {settingsSections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="border-0 shadow-lg bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      className="w-full flex items-center justify-between p-4 hover:bg-muted/50 rounded-xl transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-6 h-6 text-muted-foreground" />
                        <div className="text-left">
                          <h3 className="font-medium text-foreground">{item.label}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
