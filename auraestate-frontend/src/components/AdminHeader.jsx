import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "Ôûª" },
    { name: "Properties", path: "/admin/properties", icon: "Ôîé" },
    { name: "Users", path: "/admin/users", icon: "ÔÖÖ" },
    {
      name: "Cognitive Load",
      path: "/admin/cognitive-load",
      icon: "Ôùë",
    },
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
        <span>ÔùÅ</span>
        <span>Admin</span>
      </div>
    </aside>
  );
}

export default AdminSidebar;
