import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";

import HomeLayout from "./layouts/HomeLayout";

import Home from "./pages/home";
import SearchPage from "./pages/search-page";
import ExplorePage from "./pages/explore-page";
import MessagesPage from "./pages/messages-page";
import SettingsPage from "./pages/settings-page";
import ProfilePage from "./pages/profile-page";
import Create from "./pages/Create";
import Discover from "./pages/discover";
import Auth from "./pages/Auth";
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="explore" element={<Discover />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          <Route path="create" element={<Create />} />
          </Route>
          <Route path="/auth/login" element={<Auth />} />
          {/* <Route path="/create" element={<CreateLayout />}>

          </Route> */}
          

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;




// import { useState } from "react"
// import { ThemeProvider } from "./contexts/theme-context"
// import NavigationHeader from "./components/navigation-header"
// import LeftSidebar from "./components/left-sidebar"
// import SearchPage from "./pages/search-page"
// import ExplorePage from "./pages/explore-page"
// import MessagesPage from "./pages/messages-page"
// import SettingsPage from "./pages/settings-page"
// import ProfilePage from "./pages/profile-page"
// import Home from "./pages/home"

// function AppContent() {
//   const [currentPage, setCurrentPage] = useState("home")
//   const renderCurrentPage = () => {
//     switch (currentPage) {
//       case "search":
//         return <SearchPage />
//       case "explore":
//         return <ExplorePage />
//       case "messages":
//         return <MessagesPage />
//       case "settings":
//         return <SettingsPage />
//       case "profile":
//         return <ProfilePage />
//       default:
//         return <Home/>
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
//       <NavigationHeader />
//       <LeftSidebar onPageChange={setCurrentPage} />
//       {renderCurrentPage()}
//     </div>
//   )
// }

// function App() {
//   return (
//     <ThemeProvider>
//       <AppContent />
//     </ThemeProvider>
//   )
// }

// export default App
