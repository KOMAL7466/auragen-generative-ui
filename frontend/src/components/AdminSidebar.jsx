import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <h2>AuraGen</h2>
        <span>ADMIN PORTAL</span>
      </div>

      <nav className="admin-nav">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/properties">Properties</NavLink>
        <NavLink to="/admin/enquiries">Enquiries</NavLink>
        <NavLink to="/admin/analytics">Analytics</NavLink>
        <NavLink to="/admin/cognitive-load">Cognitive Load</NavLink>
        <NavLink to="/admin/ai-analytics">AI Analytics</NavLink>
        <NavLink to="/admin/settings">Settings</NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;