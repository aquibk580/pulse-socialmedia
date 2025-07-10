import { NavLink, useLocation } from "react-router-dom"
import { Home, Settings, User, Compass, MessageCircle, Grid2x2, LoaderPinwheel, LogOut } from "lucide-react"
import { cn } from "../../lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import MobileNavigation from "./MobileNavigation"
interface LeftSidebarProps {
  className?: string
}

export default function LeftSidebar({ className = "" }: LeftSidebarProps) {
  const location = useLocation()

  // Check if current route is profile and if it's alexj_photo
  const isProfileRoute = location.pathname.startsWith("/profile/")
  const currentUsername = isProfileRoute ? location.pathname.split("/profile/")[1] : null
  const isOwnProfile = currentUsername === "alexj_photo"

  // Check if current route should show collapsed sidebar
  const shouldCollapse = location.pathname === "/messages" || location.pathname === "/create"

  const menuItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "explore", label: "Explore", icon: Compass, path: "/explore" },
    { id: "messages", label: "Messages", icon: MessageCircle, path: "/messages" },
    { id: "create", label: "Create", icon: Grid2x2, path: "/create" },
    { id: "profile", label: "Profile", icon: User, path: "/profile/alexj_photo" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ]

  const NavItem = ({ item, isCollapsed = false }: { item: typeof menuItems[0], isCollapsed?: boolean }) => {
    const Icon = item.icon
    const isActive = (() => {
      if (item.id === "profile") {
        return isProfileRoute && isOwnProfile
      }
      return location.pathname === item.path || (item.path === "/" && location.pathname === "/")
    })()
    // md:w-64 lg:w-72 xl:w-80
    const navButton = (
      <NavLink
        to={item.path}
        end={item.path === "/"}
        className={cn(
          "flex items-center w-full  rounded-xl transition-all duration-300 group relative",
          isCollapsed ? "justify-center px-3 py-4" : "space-x-4 px-5 py-4 min-w-64",
          isActive
            ? "bg-foreground text-background shadow-lg shadow-foreground/10"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/70 hover:shadow-sm",
        )}
      >
        <Icon className={cn(
          "shrink-0 group-hover:scale-110 transition-transform duration-300 ",
          isCollapsed ? "w-6 h-6 group-hover:stroke-[3]" : "w-5 h-5 lg:w-6 lg:h-6"
        )} />
        {!isCollapsed && (
          <span className="font-medium truncate text-sm lg:text-base transition-all duration-300">
            {item.label}
          </span>
        )}
      </NavLink>
    )

    if (isCollapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            {navButton}
          </TooltipTrigger>
          <TooltipContent side="right" >
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      )
    }

    return navButton
  }

  return (
    <TooltipProvider>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex flex-col h-screen border-r border-gray-100 backdrop-blur-sm bg-background/95 sticky top-0 transition-all duration-300",
          shouldCollapse ? "w-20" : "w-full",
          className,
        )}
      >
        {/* Logo Section */}
        <div className={cn(
          "py-6 shrink-0 border-b border-gray-50",
          shouldCollapse ? "px-3" : "px-5 lg:px-7"
        )}>
          {shouldCollapse ? (
            <div className="flex justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center">
                    <LoaderPinwheel className="w-8 h-8 animate-spin hover:scale-110  text-orange-400 transition-transform duration-300" />
                  </div>
                </TooltipTrigger>
                <TooltipContent >
                  <p>PulseUp</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ) : (
            <h1 className="text-xl lg:text-2xl xl:text-3xl flex items-center gap-3 font-bold text-foreground">
              <LoaderPinwheel className="w-8 h-8 lg:w-10 lg:h-10 animate-spin hover:scale-110 text-orange-400 transition-transform duration-300" />
              <span className="truncate">PulseUp</span>
            </h1>
          )}
        </div>

        {/* Navigation */}
        <div className={cn(
          "flex-1 overflow-y-auto",
          shouldCollapse ? "px-2" : "px-4 lg:px-5"
        )}>
          <nav className="py-6">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <NavItem item={item} isCollapsed={shouldCollapse} />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Logout Button */}
        <div className={cn(
          "shrink-0 border-t border-gray-50 py-5",
          shouldCollapse ? "px-2" : "px-4 lg:px-5"
        )}>
          {shouldCollapse ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="w-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 py-4 px-3 rounded-xl text-muted-foreground transition-all duration-300 group">
                  <LogOut className="w-6 h-6 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </TooltipTrigger>
              <TooltipContent  >
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <button className="w-full flex items-center gap-4 hover:bg-red-50 hover:text-red-500 py-4 px-5 rounded-xl text-left text-muted-foreground transition-all duration-300 group">
              <LogOut className="w-5 h-5 lg:w-6 lg:h-6 shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium truncate text-sm lg:text-base">Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {/* <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-50 safe-area-pb">
        <div className="grid grid-cols-6 gap-1 py-3 px-3">
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
                      "flex flex-col items-center justify-center p-3 transition-all duration-300 rounded-xl min-h-[68px]",
                      shouldBeActive
                        ? "text-foreground bg-muted/80 shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )
                  }

                  return cn(
                    "flex flex-col items-center justify-center p-3 transition-all duration-300 rounded-xl min-h-[68px]",
                    isActive
                      ? "text-foreground bg-muted/80 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )
                }}
              >
                <Icon className="w-5 h-5 mb-1.5 transition-transform duration-300 hover:scale-110" />
                <span className="text-[10px] font-medium truncate leading-tight">{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      </div> */}
      <MobileNavigation/>
    </TooltipProvider>
  )
}