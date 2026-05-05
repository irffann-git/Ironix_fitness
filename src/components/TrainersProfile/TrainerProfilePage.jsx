import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { trainerProfileData } from "../../data/TrainerProfileData";
import "./TrainerProfilePage.css";

function TrainerProfilePage() {
  const { id } = useParams();

  const trainer = trainerProfileData[id];

  if (!trainer) {
    return (
      <div className="tp-not-found-container">
        <div className="tp-not-found-content">
          <i className="fas fa-user-slash"></i>
          <h2>Trainer Not Found</h2>
          <p>Oops! The trainer you're looking for doesn't exist.</p>
          <Link to="/Trainers" className="tp-back-btn">
            <i className="fas fa-arrow-left"></i> Back to Trainers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="tp-profile-wrapper">
      {/* Hero Section */}
      <div className="tp-hero-section">
        <div className="tp-hero-bg"></div>
        <div className="tp-hero-content">
          <Link to="/Trainers" className="tp-back-link">
            <i className="fas fa-arrow-left"></i> Back to Trainers
          </Link>
          <div className="tp-trainer-header">
            <img src={trainer.image} alt={trainer.name} className="tp-trainer-avatar" />
            <div className="tp-trainer-info">
              <h1>{trainer.name}</h1>
              <p className="tp-trainer-role">{trainer.role}</p>
              <div className="tp-rating">
                <i className="fas fa-star"></i>
                <span>{trainer.rating}</span>
                <span className="tp-students">({trainer.students}+ students trained)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="tp-main-container">
        <div className="tp-grid">
          {/* Left Column */}
          <div className="tp-left-column">
            {/* About Section */}
            <div className="tp-about-content">
              <div className="tp-bio-section">
                <h3>Biography</h3>
                <p>{trainer.longBio || trainer.bio}</p>
              </div>
              <div className="tp-certifications">
                <h3>Certifications</h3>
                <div className="tp-cert-list">
                  {trainer.certifications && trainer.certifications.map((cert, idx) => (
                    <div key={idx} className="tp-cert-item">
                      <i className="fas fa-certificate"></i>
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="tp-specialties">
                <h3>Specialties</h3>
                <div className="tp-specialties-list">
                  {trainer.specialties && trainer.specialties.map((spec, idx) => (
                    <span key={idx} className="tp-specialty-badge">{spec}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="tp-right-column">
            <div className="tp-info-card">
              <h3>Contact Info</h3>
              <div className="tp-contact-item">
                <i className="fas fa-envelope"></i>
                <a href="mailto:trainer@ironix.com">trainer@ironix.com</a>
              </div>
              <div className="tp-contact-item">
                <i className="fas fa-phone-alt"></i>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </div>
            </div>

            <div className="tp-info-card">
              <h3>Social Media</h3>
              <div className="tp-social-links">
                <a href={trainer.social?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="tp-social-link instagram">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
                <a href={trainer.social?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="tp-social-link facebook">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
                <a href={trainer.social?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="tp-social-link linkedin">
                  <i className="fab fa-linkedin-in"></i> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerProfilePage;