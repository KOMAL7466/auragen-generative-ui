import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, saveAuthData } from "../services/authService";
import { trackEvent } from "../services/interactionService";

const SIDE_IMG = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      saveAuthData(data);
      navigate("/dashboard");
    } catch (err) {
      trackEvent("validation_error", "login", "credentials");
      setError(
        err.response?.data?.detail || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* LEFT — Image Panel */}
      <div className="auth-side">
        <div className="auth-side-bg">
          <img src={SIDE_IMG} alt="Luxury property" />
        </div>

        <Link to="/" className="auth-side-brand">
          <span className="brand-mark">🏛</span>
          <span>AuraGen</span>
        </Link>

        <div className="auth-side-quote">
          <h2>
            Where <span className="italic">intelligence</span> <br />
            meets luxury real estate.
          </h2>
          <p>
            AuraGen understands you. It adapts. It guides. It simplifies.
            Join thousands discovering property like never before.
          </p>
        </div>

        <div className="auth-side-stats">
          <div className="auth-side-stat">
            <div className="num">128+</div>
            <div className="lbl">Properties</div>
          </div>
          <div className="auth-side-stat">
            <div className="num">2.4K+</div>
            <div className="lbl">Users</div>
          </div>
          <div className="auth-side-stat">
            <div className="num">98%</div>
            <div className="lbl">Satisfaction</div>
          </div>
        </div>
      </div>

      {/* RIGHT — Form */}
      <div className="auth-form-side">
        <div className="auth-card">
          <h1>Welcome back.</h1>
          <p className="auth-sub">Sign in to continue your journey.</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary btn-block"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="auth-switch">
            New here? <Link to="/register">Create an account</Link>
          </p>
          <p className="auth-switch" style={{ marginTop: "12px", fontSize: "12.5px", opacity: 0.7 }}>
            <Link to="/admin/login">Admin Login →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;