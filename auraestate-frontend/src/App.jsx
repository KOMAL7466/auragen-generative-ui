import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/AdminRegister";
import Home from "./pages/Home";
import PropertyList from "./pages/PropertyList";
import PropertyDetail from "./pages/PropertyDetail";
import Dashboard from "./pages/Dashboard";
import Saved from "./pages/Saved";
import Shortlisted from "./pages/Shortlisted";
import RecentlyViewed from "./pages/RecentlyViewed";
import Enquiries from "./pages/Enquiries";
import Compare from "./pages/Compare";
import AIAssistant from "./pages/AIAssistant";
import Profile from "./pages/Profile";

import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProperties from "./pages/AdminProperties";
import AdminUsers from "./pages/AdminUsers";
import AdminCognitiveLoad from "./pages/AdminCognitiveLoad";
import AdminAIAnalytics from "./pages/AdminAIAnalytics";

function App() {
  return (
    <Routes>

      {/* DEFAULT */}

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* AUTH */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* USER */}

      <Route
        path="/home"
        element={<Home />}
      />

      <Route
        path="/properties"
        element={<PropertyList />}
      />

      <Route
        path="/properties/:id"
        element={<PropertyDetail />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/saved"
        element={<Saved />}
      />

      <Route
        path="/shortlisted"
        element={<Shortlisted />}
      />

      <Route
        path="/recently-viewed"
        element={<RecentlyViewed />}
      />

      <Route
        path="/enquiries"
        element={<Enquiries />}
      />

      <Route
        path="/compare"
        element={<Compare />}
      />

      <Route
        path="/ai-assistant"
        element={<AIAssistant />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />


      {/* ADMIN */}
      <Route
        path="/admin-register"
        element={<AdminRegister />}
      />


      <Route
        path="/admin-login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin-dashboard"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin-properties"
        element={<AdminProperties />}
      />

      <Route
        path="/admin-users"
        element={<AdminUsers />}
      />

      <Route
        path="/admin-cognitive-load"
        element={<AdminCognitiveLoad />}
      />

      <Route
        path="/admin-ai-analytics"
        element={<AdminAIAnalytics />}
      />


      {/* UNKNOWN URL */}

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;