import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./signin.css";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        login(res.data.user, res.data.token);
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
// Add this before your SignInPage component
function ForgotPasswordModal({ onClose }) {
  const [step, setStep] = useState("email");
  const [fpEmail, setFpEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("sent");
    }, 800);
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>×</button>
        {step === "email" ? (
          <>
            <div className="auth-modal-icon">🔑</div>
            <h2 className="auth-modal-title">Forgot Password?</h2>
            <p className="auth-modal-subtitle">Enter your email and we'll send you a link to reset your password.</p>
            <form onSubmit={handleSend} className="auth-form">
              <div className="auth-form-group">
                <label>Email Address</label>
                <input type="email" value={fpEmail} onChange={(e) => setFpEmail(e.target.value)} required autoFocus />
              </div>
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
            <p className="auth-switch-link" style={{ marginTop: "1rem" }}>
              Remember it? <button className="auth-link-btn" onClick={onClose}>Back to Sign In</button>
            </p>
          </>
        ) : (
          <>
            <div className="auth-modal-icon auth-success">✅</div>
            <h2 className="auth-modal-title">Check Your Email</h2>
            <p className="auth-modal-subtitle">We sent a password reset link to <strong>{fpEmail}</strong>.</p>
            <button className="auth-submit-btn" onClick={onClose}>Back to Sign In</button>
          </>
        )}
      </div>
    </div>
  );
}
  return (
    <>
      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}

      <div className="auth-page-wrapper">
        <div className="auth-card-container">
          <div className="auth-form-side">
            <h1 className="auth-page-title">Welcome Back</h1>
            <p className="auth-page-subtitle">Please enter your details to sign in.</p>

            {error && <div className="auth-error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="auth-form-group">
                <label htmlFor="password">Password</label>
                <div className="auth-input-wrapper">
                  <input type={showPassword ? "text" : "password"} id="password" placeholder="Min 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <span className="auth-eye-icon" onClick={() => setShowPassword(!showPassword)}>
                    <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
                  </span>
                </div>
              </div>

              <div className="auth-form-extras">
                <label className="auth-remember-label">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                  Remember me
                </label>
                <button type="button" className="auth-forgot-link" onClick={() => setShowForgot(true)}>Forgot Password?</button>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-btn-loading"><span className="auth-spinner" /> Signing in…</span> : "Sign In"}
              </button>
            </form>

            <p className="auth-switch-link">Don't have an account? <Link to="/signup">Sign up</Link></p>
          </div>

          <div className="auth-image-side">
            <img src="/ironix.png" alt="Ironix Logo" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInPage;