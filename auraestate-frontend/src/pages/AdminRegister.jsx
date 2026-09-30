import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("auraestate_users") || "[]"
    );

    const normalizedEmail = email.trim().toLowerCase();

    const exists = users.some(
      (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (exists) {
      setError("An account with this email already exists.");
      return;
    }

    const admin = {
      id: Date.now().toString(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: "admin",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "auraestate_users",
      JSON.stringify([...users, admin])
    );

    navigate("/admin-login");
  };

  return (
    <>
      <Navbar />

      <main className="page-container">
        <div className="auth-card admin-register-card">
          <div className="auth-heading">
            <p className="small-label">ADMINISTRATION</p>
            <h2>Create Admin Account</h2>
            <p>Register your administrator account.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label>Full name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Email address</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />

            <label>Confirm password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />

            {error && (
              <div className="error-message">{error}</div>
            )}

            <button className="primary-btn" type="submit">
              Create Admin Account
            </button>
          </form>

          <p className="auth-footer">
            Already registered?{" "}
            <Link to="/admin-login">Admin Login</Link>
          </p>

          <p className="auth-footer">
            <Link to="/login">Back to main login</Link>
          </p>
        </div>
      </main>
    </>
  );
}