import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Check,
} from "lucide-react";
import { registerUser } from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      registerUser(form);

      alert(
        "Account created successfully. Please sign in."
      );

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left register-left">
        <div className="auth-brand">
          <span className="brand-mark"></span>
          <span>AURA<span>ESTATE</span></span>
        </div>

        <div className="auth-hero">
          <span className="eyebrow">
            <Check size={15} />
            SMARTER PROPERTY DISCOVERY
          </span>

          <h1>
            Your next
            <span> address starts here.</span>
          </h1>

          <p>
            Create your account and let AURAESTATE
            simplify your property search.
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card register-card">
          <div className="auth-heading">
            <p className="small-label">
              GET STARTED
            </p>

            <h2>Create your account</h2>

            <p>
              Tell us a little about yourself.
            </p>
          </div>

          <form onSubmit={submit}>
            <label>Full name</label>

            <input
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={change}
              required
            />

            <label>Email address</label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={change}
              required
            />

            <label>Phone number</label>

            <input
              name="phone"
              placeholder="+91 XXXXX XXXXX"
              value={form.phone}
              onChange={change}
            />

            <label>Password</label>

            <div className="password-box">
              <input
                type={
                  showPassword ? "text" : "password"
                }
                name="password"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={change}
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            <label>Confirm password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat password"
              value={form.confirmPassword}
              onChange={change}
              required
            />

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button className="primary-btn">
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}