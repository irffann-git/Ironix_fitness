import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";


const API = import.meta.env.VITE_API_URL;

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();

  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const authModalRef = useRef(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  const isLoggedIn = !!user;

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700) setIsMobileMenuOpen(false);
    };

    const handleOutsideClick = (e) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setIsMobileMenuOpen(false);
      }

      if (authModalRef.current && !authModalRef.current.contains(e.target)) {
        setShowAuthModal(false);
      }

      if (!e.target.closest(".nav-profile-container")) {
        setShowProfileMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showAuthModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showAuthModal]);

  // Get profile image URL
  const getProfileImage = () => {
    if (user?.profileImage) {
      if (user.profileImage.startsWith("data:image") || user.profileImage.startsWith("http")) {
        return user.profileImage;
      }
      return `${API}${user.profileImage}`;
    }
    return "https://i.pravatar.cc/40";
  };

  return (
    <>
      <div className="nav-wrapper">
        <div className="nav-bar">
          <div className="nav-logo">
            <Link to="/">
              <img src="/ironix.png" alt="logo" />
            </Link>
          </div>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/classes">Classes</Link>
            <Link to="/Trainers">Trainers</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="nav-actions-wrapper">
            {isLoggedIn ? (
              <div className="nav-profile-container">
                <img
                  src={getProfileImage()}
                  alt="profile"
                  className="nav-profile-img"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  onError={(e) => {
                    e.target.src = "https://i.pravatar.cc/40";
                  }}
                />
                {showProfileMenu && (
                  <div className="nav-profile-dropdown">
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <button className="nav-signin-btn" onClick={openAuthModal}>
                Sign In
              </button>
            )}
          </div>

          <div className="nav-hamburger" ref={hamburgerRef} onClick={toggleMobileMenu}>
            <i className="fas fa-bars"></i>
          </div>
        </div>

        <div
          ref={mobileMenuRef}
          className={`nav-mobile-menu ${isMobileMenuOpen ? "nav-show" : ""}`}
        >
          <div className="nav-mobile-header">
            <div className="nav-mobile-actions">
              {isLoggedIn ? (
                <img
                  src={getProfileImage()}
                  alt="profile"
                  className="nav-profile-img"
                  onError={(e) => {
                    e.target.src = "https://i.pravatar.cc/40";
                  }}
                />
              ) : (
                <button
                  className="nav-signin-btn"
                  onClick={() => {
                    closeMobileMenu();
                    openAuthModal();
                  }}
                >
                  Sign In
                </button>
              )}
            </div>
            <div className="nav-mobile-close" onClick={closeMobileMenu}>
              <i className="fas fa-close"></i>
            </div>
          </div>

          <hr className="nav-divider" />

          <div className="nav-mobile-links">
            <Link to="/" onClick={closeMobileMenu}>Home</Link>
            <Link to="/about" onClick={closeMobileMenu}>About</Link>
            <Link to="/classes" onClick={closeMobileMenu}>Classes</Link>
            <Link to="/Trainers" onClick={closeMobileMenu}>Trainers</Link>
            <Link to="/blog" onClick={closeMobileMenu}>Blog</Link>
            <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
          </div>
        </div>
      </div>

      <div className={`nav-auth-modal ${showAuthModal ? "nav-show" : ""}`}>
        <div className="nav-auth-card" ref={authModalRef}>
          <button className="nav-auth-close" onClick={closeAuthModal}>
            <i className="fas fa-times"></i>
          </button>
          <h2 className="nav-auth-title">WELCOME TO Ironix</h2>
          <p className="nav-auth-subtitle">Choose an option to continue</p>
          <div className="nav-auth-buttons">
            <Link to="/signin" onClick={closeAuthModal} className="nav-auth-btn nav-auth-primary">
              Login
            </Link>
            <Link to="/signup" onClick={closeAuthModal} className="nav-auth-btn nav-auth-secondary">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;