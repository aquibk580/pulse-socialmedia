import NavigationHeader from "../components/Home/navigation-header"
import LeftSidebar from "../components/Layout/left-sidebar"
import { Outlet } from "react-router-dom"

export default function HomeLayout() {
    return (
        <div className="min-h-screen bg-background">
            {/* <NavigationHeader /> */}

            {/* Main container with proper spacing */}
            {/* <div className="pt-16"> */}
                {" "}
                {/* Account for fixed header */}
                <div className="flex min-h-[calc(100vh-4rem)]">
                    {/* Left Sidebar - Hidden on mobile, fixed width on desktop */}
                    <div className=" md:w-64 lg:w-72 xl:w-80 shrink-0">
                        <LeftSidebar />
                    </div>

                    {/* Main Content Area */}
                    <main className="flex-1 min-w-0 pb-16 md:pb-0">
                        {" "}
                        {/* pb-16 for mobile nav */}
                        <div className="max-w-full mx-auto">
                            <Outlet />
                        </div>
                    </main>
                {/* </div> */}
            </div>
        </div>
    )
}
