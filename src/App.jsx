import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/404/NotFount";
import About from "./pages/About";
import Trainers from "./pages/Trainers";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Article from "./pages/Article";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermAndConditions from "./pages/TermAndCondition";
import AuthCallback from "./pages/AuthCallback";
import Profile from "./components/Profile/profilePage";
import Classes from "./pages/Classes";  
import ClassDetailsPage from "./components/ClassDetails/ClassDetailsPage";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import TrainersProfile from "./pages/TrainersProfile";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const location = useLocation();
  const { isAuthLoading } = useAuth();
  const [isAppReady, setIsAppReady] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Wait until auth check finishes (or until we know we're offline)
  useEffect(() => {
    if (!isAuthLoading) {
      // Give a tiny delay to let anything else settle, then mark ready
      setTimeout(() => setIsAppReady(true), 100);
    }
  }, [isAuthLoading]);

  // If offline, show a friendly message (no spinner loop)
  if (isOffline) {
    return (
      <div className="offline-container">
  <div className="offline-card">
    <div className="offline-icon-wrapper">
      <svg className="offline-wifi-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 18.5C12.8284 18.5 13.5 19.1716 13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5Z" fill="#DFA84B"/>
        <path d="M5 10C5 10 9 4 12 4C15 4 19 10 19 10" stroke="#DFA84B" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 13.5C8 13.5 10.5 10 12 10C13.5 10 16 13.5 16 13.5" stroke="#DFA84B" strokeWidth="2" strokeLinecap="round"/>
        <path d="M2 6C2 6 6 1 12 1C18 1 22 6 22 6" stroke="#DFA84B" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
      </svg>
      <div className="offline-signal-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
    <h2>Connection Lost</h2>
    <p>Your internet connection appears to be offline.</p>
    <div className="offline-message-detail">
      <i className="fas fa-sync-alt"></i> <span>Try checking your Wi‑Fi or cellular data</span>
    </div>
    <button className="offline-retry-btn" onClick={() => window.location.reload()}>
      <i className="fas fa-rotate-right"></i> Retry Connection
    </button>
  </div>
</div>
    );
  }

  // Show loading spinner while auth is resolving
  if (!isAppReady) {
    return <LoadingSpinner />;
  }

  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <div>
      {!isAdminRoute && <Navbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="About" element={<About />} />
        <Route path="/Trainers" element={<Trainers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Signin" element={<SignIn />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/TermAndConditions" element={<TermAndConditions />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Classes" element={<Classes />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/blog/:id" element={<Article />} />
        <Route path="/class-details/:id" element={<ClassDetailsPage />} />
        <Route path="/trainer/:id" element={<TrainersProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;