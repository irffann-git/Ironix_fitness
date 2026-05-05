import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./signup.css";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Password strength logic (keep your existing functions)
  const checkStrength = (val) => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    setPasswordStrength(score);
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthClass = ["", "auth-strength-weak", "auth-strength-fair", "auth-strength-good", "auth-strength-strong"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (res.data.success) {
        login(res.data.user, res.data.token);
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card-container">
        <div className="auth-form-side">
          <h1 className="auth-page-title">Create Account</h1>
          <p className="auth-page-subtitle">Join us to get exclusive drops and offers.</p>

          {error && <div className="auth-error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="auth-form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="auth-form-group">
              <label htmlFor="password">Password</label>
              <div className="auth-input-wrapper">
                <input type={showPassword ? "text" : "password"} id="password" placeholder="Min 8 characters" value={password} onChange={(e) => { setPassword(e.target.value); checkStrength(e.target.value); }} required />
                <span className="auth-eye-icon" onClick={() => setShowPassword(!showPassword)}>
                  <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
                </span>
              </div>
              {password.length > 0 && (
                <div className="auth-strength-wrap">
                  <div className={`auth-strength-bar ${strengthClass[passwordStrength]}`}>
                    {[1, 2, 3, 4].map((i) => (<span key={i} className={`auth-strength-seg ${i <= passwordStrength ? "auth-filled" : ""}`} />))}
                  </div>
                  <span className={`auth-strength-label ${strengthClass[passwordStrength]}`}>{strengthLabel[passwordStrength]}</span>
                </div>
              )}
            </div>

            <div className="auth-form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <div className="auth-input-wrapper">
                <input type={showConfirm ? "text" : "password"} id="confirm" placeholder="Repeat password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
                <span className="auth-eye-icon" onClick={() => setShowConfirm(!showConfirm)}>
                  <i className={showConfirm ? "fas fa-eye-slash" : "fas fa-eye"} />
                </span>
              </div>
              {confirm.length > 0 && (
                <p className={`auth-match-hint ${password === confirm ? "auth-match-ok" : "auth-match-fail"}`}>
                  {password === confirm ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <span className="auth-btn-loading"><span className="auth-spinner" /> Creating…</span> : "Create Account"}
            </button>
          </form>

          <p className="auth-switch-link">Already have an account? <Link to="/signin">Log in</Link></p>
        </div>

        <div className="auth-image-side">
          <img src="/ironix.png" alt="Ironix Logo" />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;