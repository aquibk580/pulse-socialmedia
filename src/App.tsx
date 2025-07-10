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

import { AdminLayout } from "./layouts/AdminLayout";
import { Dashboard } from "./pages/Admin/dashboard";
import { Analytics } from "./pages/Admin/analytics";
import { Users } from "./pages/Admin/users";
import { Orders } from "./pages/Admin/orders";
import { Products } from "./pages/Admin/products";
import { Settings } from "./pages/Admin/settings";
import { Calendar } from "./pages/Admin/calendar";
import { Reports } from "./pages/Admin/reports";
import { Messages } from "./pages/Admin/messages";
import { Insights } from "./pages/Admin/insights";
import FollowersPage from "./components/Profile/followers";
import FollowingPage from "./components/Profile/Following";

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
          <Route path="profile/:username" element={<ProfilePage />} />
          <Route path="/profile/:username/followers" element={<FollowersPage />} />
          <Route path="/profile/:username/following" element={<FollowingPage />} />
          <Route path="create" element={<Create />} />
        </Route>
        {/* <Route path="/auth/login" element={<Auth />} /> */}

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="reports" element={<Reports />} />
          <Route path="messages" element={<Messages />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="insights" element={<Insights />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


