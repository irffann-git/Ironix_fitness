import { Link } from "react-router-dom";
import "./Footer.css";

function FooterStyleTwo() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      alert(`Subscribed with ${email}`);
      e.target.reset();
    }
  };

  return (
    <footer className="ftr-wrapper">
      <div className="ftr-accent-bar"></div>
      
      <div className="ftr-container">
        <div className="ftr-grid">
          
          {/* Brand Column */}
          <div className="ftr-brand-col">
            <img src="/ironix.png" alt="Ironix" className="ftr-logo" />
            <p className="ftr-description">
              Ironix – where strength meets community. Transform your fitness journey with expert coaches and world-class facilities.
            </p>
            <p className="ftr-tagline">#FORGEYOURSTRENGTH</p>
          </div>
          
          {/* Quick Links */}
          <div className="ftr-links-col">
            <h3>EXPLORE</h3>
            <ul className="ftr-links-list">
              <li><Link to="/"><i className="fas fa-angle-right"></i> Home</Link></li>
              <li><Link to="/about"><i className="fas fa-angle-right"></i> About</Link></li>
              <li><Link to="/classes"><i className="fas fa-angle-right"></i> Classes</Link></li>
              <li><Link to="/Trainers"><i className="fas fa-angle-right"></i> Trainers</Link></li>
              <li><Link to="/blog"><i className="fas fa-angle-right"></i> Blog</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="ftr-links-col">
            <h3>SUPPORT</h3>
            <ul className="ftr-links-list">
              <li><Link to="/contact"><i className="fas fa-angle-right"></i> Contact</Link></li>
              <li><Link to="/PrivacyPolicy"><i className="fas fa-angle-right"></i> Privacy</Link></li>
              <li><Link to="/TermAndConditions"><i className="fas fa-angle-right"></i> Terms</Link></li>
            </ul>
          </div>
          
          {/* Contact & Newsletter */}
          <div className="ftr-contact-col">
            <h3>CONNECT</h3>
            <ul className="ftr-contact-list">
              <li><i className="fas fa-map-pin"></i> 123 Fitness Ave, NY</li>
              <li><i className="fas fa-phone-alt"></i> +1 (555) 123-4567</li>
              <li><i className="fas fa-envelope"></i> hello@ironix.com</li>
            </ul>
            
            <div className="ftr-newsletter">
              <p>Get workout tips & offers</p>
              <form className="ftr-newsletter-form" onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Your email" required />
                <button type="submit">Subscribe</button>
              </form>
            </div>
            
            <div className="ftr-social">
              <Link to="/"><i className="fab fa-facebook-f"></i></Link>
              <Link to="/"><i className="fab fa-instagram"></i></Link>
              <Link to="/"><i className="fab fa-x-twitter"></i></Link>
              <Link to="/"><i className="fab fa-youtube"></i></Link>
            </div>
          </div>
        </div>
        
        <div className="ftr-bottom">
          <div className="ftr-copyright">&copy; {new Date().getFullYear()} Ironix Fitness. All rights reserved.</div>
          <div className="ftr-bottom-links">
            <Link to="/PrivacyPolicy">Privacy Policy</Link>
            <Link to="/TermAndConditions">Terms of Service</Link>
            <Link to="#">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterStyleTwo;