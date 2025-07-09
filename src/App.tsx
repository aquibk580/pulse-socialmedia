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

import AdminLayout from "./layouts/AdminLayout";
import AnalyticsPage from "./pages/Admin/Analytics/Growth";
import ContentPage from "./pages/Admin/Content/Posts";
import ReportsPage from "./pages/Admin/Reports/Content";
import SecurityPage from "./pages/Admin/Security/Logins";
import AdminSettingsPage from "./pages/Admin/Settings/General";
import FeedbackPage from "./pages/Admin/Support/Feedback";
import NotificationsPage from "./pages/Admin/Notification";
import RolesPage from "./pages/Admin/Roles";
import UsersPage from "./pages/Admin/Users";
import DashboardPage from "./pages/Admin/Dashboard";

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
          <Route path="create" element={<Create />} />
        </Route>
        <Route path="/auth/login" element={<Auth />} />
        {/* <Route path="/create" element={<CreateLayout />}>
          </Route> */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="analytics/growth" element={<AnalyticsPage />} />
          <Route path="content/posts" element={<ContentPage />} />
          <Route path="reports/content" element={<ReportsPage />} />
          <Route path="security/logins" element={<SecurityPage />} />
          <Route path="settings/general" element={<AdminSettingsPage />} />
          <Route path="support/feedback" element={<FeedbackPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="users/roles" element={<RolesPage />} />
          <Route path="users" element={<UsersPage />} />
          {/* Add more admin routes as needed */}
        </Route>
          {/* Define admin routes here */}
      </Routes>
    </Router>
  );
}

export default App;


