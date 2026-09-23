import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "▦" },
    { name: "Properties", path: "/admin/properties", icon: "⌂" },
    { name: "Users", path: "/admin/users", icon: "♙" },
    { name: "Enquiries", path: "/admin/enquiries", icon: "✉" },
    { name: "Analytics", path: "/admin/analytics", icon: "▤" },
    { name: "Cognitive Load", path: "/admin/cognitive-load", icon: "◉" },
    { name: "AI Analytics", path: "/admin/ai-analytics", icon: "✦" },
    { name: "Settings", path: "/admin/settings", icon: "⚙" },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <h2>AuraGen</h2>
        <span>ADMIN PORTAL</span>
      </div>

      <nav className="admin-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            <span className="admin-nav-icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <span>●</span>
        <span>Admin</span>
      </div>
    </aside>
  );
}

export default AdminSidebar;