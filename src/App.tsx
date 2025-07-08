import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  );
}

export default App;


