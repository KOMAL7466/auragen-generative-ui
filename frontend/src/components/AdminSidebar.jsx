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
        <NavLink to="/admin/properties">Properties</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/cognitive-load">Cognitive Load</NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;