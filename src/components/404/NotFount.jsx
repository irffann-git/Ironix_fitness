import { Link } from 'react-router-dom';
import './NotFount.css';

function NotFound() {
  return (
    <div className="nf-page-wrapper">
      <div className="nf-overlay"></div>
      
      <div className="nf-content-card">
        <h1 className="nf-error-code">404</h1>
        <h2 className="nf-error-title">Page Not Found</h2>
        
        <p className="nf-error-message">
          It looks like you've ventured into uncharted territory – this page is currently
          resting between sets. But don't let that stop your momentum! While we get this
          page back on track, why not head back to our homepage and explore the classes,
          trainers, and community that make Ironix the ultimate place to crush your goals.
        </p>
        
        <Link to="/" className="nf-home-button">
          <i className="fas fa-dumbbell"></i> Back to Home
        </Link>
        
        <div className="nf-suggestions">
          <p className="nf-suggestions-title">Quick links you might find helpful:</p>
          <div className="nf-suggestions-links">
            <Link to="/classes">
              <i className="fas fa-chevron-right"></i> Our Classes
            </Link>
            <Link to="/pricing">
              <i className="fas fa-chevron-right"></i> Membership Plans
            </Link>
            <Link to="/trainers">
              <i className="fas fa-chevron-right"></i> Meet Trainers
            </Link>
            <Link to="/contact">
              <i className="fas fa-chevron-right"></i> Contact Us
            </Link>
          </div>
        </div>
      </div>
      
      <div className="nf-floating-icon">
        <i className="fas fa-dumbbell"></i>
      </div>
    </div>
  );
}

export default NotFound;