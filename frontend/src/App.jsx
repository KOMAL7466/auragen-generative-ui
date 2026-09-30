import "./styles/admin.css";
import "./styles/user.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProperties from "./pages/AdminProperties";
import AdminUsers from "./pages/AdminUsers";
import AdminCognitiveLoad from "./pages/AdminCognitiveLoad";
import AdminEnquiries from "./pages/AdminEnquiries";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminAIAnalytics from "./pages/AdminAIAnalytics";
import AdminSettings from "./pages/AdminSettings";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import PropertyList from "./pages/PropertyList";
import PropertyDetail from "./pages/PropertyDetail";
import AIChat from "./pages/AIChat";


function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">{children}</main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/ai-chat" element={<AIChat />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/properties" element={<AdminLayout><AdminProperties /></AdminLayout>} />
        <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
        <Route path="/admin/cognitive-load" element={<AdminLayout><AdminCognitiveLoad /></AdminLayout>} />
        <Route path="/admin/enquiries" element={<AdminLayout><AdminEnquiries /></AdminLayout>} />
        <Route path="/admin/analytics" element={<AdminLayout><AdminAnalytics /></AdminLayout>} />
        <Route path="/admin/ai-analytics" element={<AdminLayout><AdminAIAnalytics /></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;