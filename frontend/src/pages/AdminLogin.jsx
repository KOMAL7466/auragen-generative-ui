import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/admin/dashboard");
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-login-content">

          <div className="admin-login-header">
            <h1>AuraEstate</h1>
            <p className="admin-welcome">Welcome Back!</p>
            <h2>Admin Portal</h2>
            <p>Sign in to manage your platform</p>
          </div>

          <form onSubmit={handleLogin}>

            <div className="admin-form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="admin-login-options">
              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  alert("Password reset will be connected later.")
                }
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="admin-login-button"
            >
              Sign In →
            </button>

          </form>

          <p className="admin-login-note">
            Secure administrator access
          </p>

        </div>

        <div className="admin-login-visual">
          <div className="admin-visual-content">
            <h2>Smarter Real Estate.</h2>

            <p>
              Manage properties, users and
              <br />
              AI-powered insights from one place.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;