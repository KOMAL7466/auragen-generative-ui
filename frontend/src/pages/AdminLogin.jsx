import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary frontend navigation.
    // Real authentication will be connected with the backend later.
    navigate("/admin/dashboard");
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-warning-icon">!</div>

          <h1>AuraGen</h1>
          <h2>Admin Portal</h2>

          <p>Authorized access only</p>
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

          <div className="admin-form-group">
            <label htmlFor="code">2FA Code</label>
            <input
              id="code"
              type="text"
              placeholder="Enter 2FA code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength="6"
              required
            />
          </div>

          <button type="submit" className="admin-login-button">
            Access Dashboard
          </button>
        </form>

        <p className="admin-login-note">
          Secure administrator authentication
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;