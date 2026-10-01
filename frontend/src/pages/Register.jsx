import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, saveAuthData } from "../services/authService";
import { trackEvent } from "../services/interactionService";

const SIDE_IMG = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      trackEvent("validation_error", "register", "confirm_password");
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      trackEvent("validation_error", "register", "password");
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser(name, email, password);
      saveAuthData(data);
      navigate("/dashboard");
    } catch (err) {
      trackEvent("validation_error", "register", "form");
      setError(
        err.response?.data?.detail || "Registration failed. Please try again."
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
            Begin your <span className="italic">journey</span> <br />
            into exceptional real estate.
          </h2>
          <p>
            Create your free account and unlock AI-powered insights,
            personalized recommendations, and adaptive guidance.
          </p>
        </div>

        <div className="auth-side-stats">
          <div className="auth-side-stat">
            <div className="num">Free</div>
            <div className="lbl">Forever</div>
          </div>
          <div className="auth-side-stat">
            <div className="num">AI</div>
            <div className="lbl">Powered</div>
          </div>
          <div className="auth-side-stat">
            <div className="num">24/7</div>
            <div className="lbl">Guidance</div>
          </div>
        </div>
      </div>

      {/* RIGHT — Form */}
      <div className="auth-form-side">
        <div className="auth-card">
          <h1>Create your account.</h1>
          <p className="auth-sub">Join AuraGen in less than a minute.</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary btn-block"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;