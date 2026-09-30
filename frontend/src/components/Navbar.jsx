import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuthUser, isLoggedIn, logoutUser } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();
  const user = getAuthUser();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="user-navbar">
      <div className="user-navbar-brand" onClick={() => navigate("/")}>
        <img src="/logo.png" alt="AuraGen" className="logo-img" />
      </div>

      <div className="user-navbar-links">
        <NavLink to="/" className="user-navbar-link" end>
          Home
        </NavLink>
        <NavLink to="/properties" className="user-navbar-link">
          Properties
        </NavLink>
        <NavLink to="/ai-chat" className="user-navbar-link">
          AI Advisor
        </NavLink>
        {loggedIn && (
          <NavLink to="/dashboard" className="user-navbar-link">
            Dashboard
          </NavLink>
        )}
      </div>

      <div className="user-navbar-actions">
        {loggedIn ? (
          <>
            <span className="user-greeting">
              Hi, {user?.name || "User"}
            </span>
            <button className="btn-ghost" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn-ghost">Sign In</button>
            </Link>
            <Link to="/register">
              <button className="btn-primary">Get Started</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;