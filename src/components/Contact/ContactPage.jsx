import { useState , useEffect } from "react";
import axios from "axios";
import "./ContactPage.css";

// Use environment variable for API base URL
const API_BASE = import.meta.env.VITE_API_URL;

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setResponseMessage("Please fill in all required fields");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE}/api/contact/submit`,
        formData
      );

      if (response.data.success) {
        setResponseMessage("Thank you for reaching out! We'll get back to you soon.");
        setMessageType("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setResponseMessage(error.response?.data?.message || "Failed to send message. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setResponseMessage("");
        setMessageType("");
      }, 5000);
    }
  };




// Inside ContactPage component, add:
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.20, rootMargin: '0px 0px -50px 0px' }
  );

  const elements = document.querySelectorAll('.cnt-container, .cnt-form-col, .cnt-info-col');
  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);

  return (
    <div className="cnt-page-wrapper">
      {/* Hero Section */}
      <div className="cnt-hero-section">
        <img
          src="/contact.jpg"
          alt="Contact Us"
          className="cnt-hero-image"
        />
        <div className="cnt-hero-overlay"></div>
        <div className="cnt-hero-container">
          <div className="cnt-hero-text">
            <h1>
              <span className="cnt-hero-first">Let's Talk</span>
              <span className="cnt-hero-last">About Fitness</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="cnt-main-section">
        <div className="cnt-container">
          <h1 className="cnt-heading">
            Connect with Us 
            <span className="cnt-heading-block">Let's Build Together</span>
          </h1>
          <p className="cnt-description">
            Have questions about memberships, classes, or fitness programs? 
            We're here to help! Reach out to our team and start your fitness 
            journey with Ironix today.
          </p>

          <div className="cnt-grid">
            {/* Form Column */}
            <div className="cnt-form-col">
              <form onSubmit={handleSubmit} className="cnt-form">
                <div className="cnt-form-group">
                  <label htmlFor="cnt-name">Your Name *</label>
                  <input
                    type="text"
                    id="cnt-name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="cnt-form-group">
                  <label htmlFor="cnt-email">Your Email *</label>
                  <input
                    type="email"
                    id="cnt-email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="cnt-form-group">
                  <label htmlFor="cnt-phone">Phone Number</label>
                  <input
                    type="tel"
                    id="cnt-phone"
                    name="phone"
                    placeholder="Enter your phone number (optional)"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="cnt-form-group">
                  <label htmlFor="cnt-message">Your Message *</label>
                  <textarea
                    id="cnt-message"
                    name="message"
                    rows="5"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="cnt-submit-btn" disabled={loading}>
                  {loading ? (
                    <span className="cnt-loading-spinner"></span>
                  ) : (
                    <>
                      Send Message <i className="fas fa-paper-plane" style={{ marginLeft: "8px" }}></i>
                    </>
                  )}
                </button>
              </form>
              
              {responseMessage && (
                <div className={`cnt-form-message ${messageType}`}>
                  <i className={`fas ${messageType === "success" ? "fa-check-circle" : "fa-exclamation-circle"}`}></i>
                  {responseMessage}
                </div>
              )}
            </div>

            {/* Contact Info Column */}
            <div className="cnt-info-col">
              <div className="cnt-info-item">
                <i className="fas fa-envelope"></i>
                <a href="mailto:ironix@gmail.com">ironix@gmail.com</a>
              </div>
              <div className="cnt-info-item">
                <i className="fas fa-phone-alt"></i>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </div>
              <div className="cnt-info-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>MG Road, Ernakulam, Kochi, Kerala 682016, India</span>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="cnt-hours">
            <h4><i className="far fa-clock" style={{ marginRight: "8px" }}></i> Working Hours</h4>
            <p>Monday - Friday: <span>5:00 AM - 11:00 PM</span></p>
            <p>Saturday - Sunday: <span>6:00 AM - 9:00 PM</span></p>
          </div>

          {/* Map Section */}
          <div className="cnt-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.847157255365!2d76.2988485!3d10.019645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d0f5a5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sMG%20Road%2C%20Ernakulam%2C%20Kochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ironix Location Map"
            ></iframe>
          </div>

          {/* Social Links */}
          <div className="cnt-social">
            <h3>Follow Us</h3>
            <div className="cnt-social-icons">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;