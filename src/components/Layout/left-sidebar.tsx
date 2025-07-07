import { NavLink } from "react-router-dom"
import { Home, Search, Settings, User, Compass, MessageCircle, Grid2x2, Bell, Bookmark, LoaderPinwheel, LogOut } from "lucide-react"
import { cn } from "../../lib/utils"

interface LeftSidebarProps {
  className?: string
}

export default function LeftSidebar({ className = "" }: LeftSidebarProps) {
  const menuItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "explore", label: "Explore", icon: Compass, path: "/explore" },
    { id: "messages", label: "Messages", icon: MessageCircle, path: "/messages" },
    { id: "create", label: "Create", icon: Grid2x2, path: "/create" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex flex-col h-screen md:w-[28%] lg:w-[21%]  backdrop-blur-sm  fixed top-0",
          className,
        )}
      >
        {/* Logo Section */}
        <div className=" py-5  ">
          <h1 className="text-2xl lg:text-3xl flex items-center justify-center gap-2 font-bold text-foreground ">
            <LoaderPinwheel className="w-10 h-10 animate-spin hover:scale-115 text-orange-400  text-xl font-semibold" />  <span className="">PulseUp</span>
          </h1>
        </div>

        <div className=" lg:p-6 flex-1 overflow-y-auto">
          <nav className="">
            <ul className="space-y-1 lg:space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center  space-x-3 lg:space-x-4 w-full px-4 lg:px-6 py-3  rounded-2xl transition-all duration-200 ",
                          isActive
                            ? "bg-foreground text-background "
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
        <div className=" hidden md:flex px-6 py-4 ">
          <button className="w-full flex cursor-pointer items-center gap-3 hover:bg-accent-background py-3 px-6 hover:text-red-400 rounded-2xl text-left  text-muted-foreground ">
            <LogOut /> <span> Logout</span>
          </button>
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
