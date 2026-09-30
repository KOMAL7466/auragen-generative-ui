import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Heart,
  GitCompare,
  User,
  LogOut,
  Bot,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  getCurrentUser,
  logoutUser,
} from "../services/api";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const logout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link
        to="/home"
        className="brand"
        onClick={() => setOpen(false)}
      >
        <img
          src="/auraestate-logo.png"
          alt="AURAESTATE"
          className="auraestate-logo"
        />
      </Link>

      <button
        className="mobile-menu"
        onClick={() => setOpen(!open)}
        type="button"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className={`nav-links ${open ? "show" : ""}`}>
        <Link
          to="/home"
          onClick={() => setOpen(false)}
        >
          <Home size={17} />
          Home
        </Link>

        <Link
          to="/properties"
          onClick={() => setOpen(false)}
        >
          Properties
        </Link>

        <Link
          to="/saved"
          onClick={() => setOpen(false)}
        >
          <Heart size={17} />
          Saved
        </Link>

        <Link
          to="/compare"
          onClick={() => setOpen(false)}
        >
          <GitCompare size={17} />
          Compare
        </Link>

        <Link
          to="/ai-assistant"
          onClick={() => setOpen(false)}
        >
          <Bot size={17} />
          AI Assistant
        </Link>

        <Link
          to="/profile"
          onClick={() => setOpen(false)}
        >
          <User size={17} />
          {user.name}
        </Link>

        <button
          className="logout-btn"
          onClick={logout}
          type="button"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </nav>
  );
}