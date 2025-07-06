"use client"

import { NavLink } from "react-router-dom"
import { Home, Search, Settings, User, Compass, MessageCircle } from "lucide-react"
import { cn } from "../../lib/utils"

interface LeftSidebarProps {
  className?: string
}

export default function LeftSidebar({ className = "" }: LeftSidebarProps) {
  const menuItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "search", label: "Search", icon: Search, path: "/search" },
    { id: "explore", label: "Explore", icon: Compass, path: "/explore" },
    { id: "messages", label: "Messages", icon: MessageCircle, path: "/messages" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex flex-col h-[calc(100vh-4rem)]  md:w-[28%] lg:w-[21%]  bg-card/50 backdrop-blur-sm border-r border-border fixed top-0",
          className,
        )}
      >
        {/* Logo Section */}
        <div className="p-4 lg:p-6 border-b border-border my-6 ">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground" style={{ fontFamily: 'cursive' }}>
            PULSE
          </h1>
        </div>

        <div className="p-4 lg:p-6 flex-1 overflow-y-auto">
          <nav className="pt-2">
            <ul className="space-y-1 lg:space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center space-x-3 lg:space-x-4 w-full p-3 lg:p-4 rounded-xl transition-all duration-200 text-sm lg:text-base",
                          isActive
                            ? "bg-foreground text-background shadow-lg"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                        )
                      }
                    >
                      <Icon className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
                      <span className="font-medium truncate">{item.label}</span>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className=" md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50">
        <div className="grid grid-cols-6 gap-1 py-2 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center p-2 transition-all duration-200 rounded-lg",
                    isActive
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] mt-1 font-medium truncate">{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      </div>
    </>
  )
}
