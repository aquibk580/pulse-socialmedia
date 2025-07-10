import { NavLink, useLocation } from "react-router-dom"
import { Home, Settings, User, Compass, MessageCircle, Grid2x2 } from "lucide-react"
import { cn } from "../../lib/utils"

export default function MobileNavigation() {
  const location = useLocation()

  // Check if current route is profile and if it's alexj_photo
  const isProfileRoute = location.pathname.startsWith("/profile/")
  const currentUsername = isProfileRoute ? location.pathname.split("/profile/")[1] : null
  const isOwnProfile = currentUsername === "alexj_photo"

  const menuItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "explore", label: "Explore", icon: Compass, path: "/explore" },
    // { id: "messages", label: "Messages", icon: MessageCircle, path: "/messages" },
    { id: "create", label: "Create", icon: Grid2x2, path: "/create" },
    { id: "profile", label: "Profile", icon: User, path: "/profile/alexj_photo" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 z-50 pb-safe">
      <div className="grid grid-cols-5 gap-1 py-2 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) => {
                // Special handling for profile link on mobile
                if (item.id === "profile") {
                  const shouldBeActive = isProfileRoute && isOwnProfile
                  return cn(
                    "flex items-center justify-center p-2.5 transition-all duration-300 rounded-xl min-h-[48px] active:scale-95 touch-manipulation",
                    shouldBeActive
                      ? "text-white dark:text-black bg-black dark:bg-white shadow-lg scale-105"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 hover:scale-105 active:bg-gray-200 dark:active:bg-gray-800",
                  )
                }

                return cn(
                  "flex items-center justify-center p-2.5 transition-all duration-300 rounded-xl min-h-[48px] active:scale-95 touch-manipulation",
                  isActive
                    ? "text-white dark:text-black bg-black dark:bg-white shadow-lg scale-105"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 hover:scale-105 active:bg-gray-200 dark:active:bg-gray-800",
                )
              }}
            >
              <Icon className="w-6 h-6 stroke-2" strokeWidth={2.5} />
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}