import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import {
  loginUser,
  logoutUser,
} from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const isAdmin = role === "admin";

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Admin sign-in redirects to the dedicated Admin Login page
    if (isAdmin) {
      navigate("/admin-login");
      return;
    }

    // Normal user login
    try {
      const user = loginUser(email, password);

      // Prevent an admin account from entering the user area
      if (user.role === "admin") {
        logoutUser();
        setError("Please select Admin to sign in with this account.");
        return;
      }

      navigate("/home");
    } catch (err) {
      setError(err.message || "Unable to sign in. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      {/* LEFT SIDE */}
      <section className="auth-left">
        <Link to="/login" className="auth-brand">
          <img
            src="/auraestate-logo.png"
            alt="AURAESTATE"
            className="auth-logo"
          />
        </Link>

        <div className="auth-hero">
          <span className="eyebrow">
            <Sparkles size={16} />
            AI-ADAPTIVE REAL ESTATE
          </span>

          <h1>
            Find a place
            <br />
            that feels like <span>home.</span>
          </h1>

          <p>
            Explore properties with an intelligent
            experience designed around your needs,
            preferences and journey.
          </p>
        </div>

        <div className="auth-stats">
          <div>
            <strong>10K+</strong>
            <span>Properties</span>
          </div>

          <div>
            <strong>2.4K</strong>
            <span>Users</span>
          </div>

          <div>
            <strong>98%</strong>
            <span>Satisfaction</span>
          </div>
        </div>

        <div className="auth-features">
          <span>Smart search</span>
          <span>Personalized discovery</span>
          <span>Better decisions</span>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="auth-right">
        <div className="auth-card">
          <div className="auth-heading">
            <p className="small-label">WELCOME BACK</p>

            <h2>Sign in to AURAESTATE</h2>

            <p>
              Continue your property discovery journey.
            </p>
          </div>

          {/* USER / ADMIN SELECTOR */}
          <div className="role-switch">
            <button
              type="button"
              className={!isAdmin ? "active" : ""}
              onClick={() => handleRoleChange("user")}
            >
              User
            </button>

            <button
              type="button"
              className={isAdmin ? "active" : ""}
              onClick={() => handleRoleChange("admin")}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="login-email">
              Email address
            </label>

            <input
              id="login-email"
              type="email"
              placeholder={
                isAdmin
                  ? "admin@example.com"
                  : "you@example.com"
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <div className="password-label">
              <label htmlFor="login-password">
                Password
              </label>

              {!isAdmin && (
                <button
                  type="button"
                  onClick={() =>
                    setError(
                      "Please contact support to reset your password."
                    )
                  }
                >
                  Forgot password?
                </button>
              )}
            </div>

            <div className="password-box">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            <button className="primary-btn" type="submit">
              {isAdmin ? "Continue as Admin" : "Sign In"}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account?{" "}
            <Link to={isAdmin ? "/admin-register" : "/register"}>
              Create account
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
