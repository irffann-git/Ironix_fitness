import { useState } from "react";
import { Link } from "react-router-dom";
import { trainersData, categoriesData } from "../../data/trainers_data";
import "./TrainersPage.css";

function TrainersPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showVacancyModal, setShowVacancyModal] = useState(false);

  const trainers = trainersData;
  const categories = categoriesData;

  const filteredTrainers = trainers.filter(trainer => {
    const matchesCategory = selectedCategory === "all" || trainer.category === selectedCategory;
    const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          trainer.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          trainer.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="trainers-page-wrapper">
      {/* Hero Section */}
      <section className="trainers-hero-section">
        <img src="/trainers.png" alt="Our Trainers" className="trainers-hero-bg" />
        <div className="trainers-hero-overlay"></div>
        <div className="trainers-hero-content">
          <h1>
            <span className="trainers-hero-primary">Meet Our</span>
            <span className="trainers-hero-secondary">Expert Trainers</span>
          </h1>
          <p className="trainers-hero-description">
            Our certified professionals are here to guide you every step of the way
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="trainers-main-container">
        {/* Stats Section */}
        <div className="trainers-stats-grid">
          <div className="trainers-stat-card">
            <i className="fas fa-chalkboard-user trainers-stat-icon"></i>
            <div>
              <h4 className="trainers-stat-number">{trainers.length}+</h4>
              <p className="trainers-stat-label">Expert Trainers</p>
            </div>
          </div>
          <div className="trainers-stat-card">
            <i className="fas fa-award trainers-stat-icon"></i>
            <div>
              <h4 className="trainers-stat-number">50+</h4>
              <p className="trainers-stat-label">Certifications</p>
            </div>
          </div>
          <div className="trainers-stat-card">
            <i className="fas fa-users trainers-stat-icon"></i>
            <div>
              <h4 className="trainers-stat-number">5000+</h4>
              <p className="trainers-stat-label">Happy Clients</p>
            </div>
          </div>
          <div className="trainers-stat-card">
            <i className="fas fa-star trainers-stat-icon"></i>
            <div>
              <h4 className="trainers-stat-number">4.8</h4>
              <p className="trainers-stat-label">Avg Rating</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="trainers-filters-wrapper">
          <div className="trainers-search-container">
            <i className="fas fa-search trainers-search-icon"></i>
            <input
              type="text"
              className="trainers-search-input"
              placeholder="Search by name, role, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="trainers-categories-container">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`trainers-category-btn ${selectedCategory === cat.id ? "trainers-active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <i className={cat.icon}></i>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Trainers Grid */}
        <div className="trainers-grid">
          {filteredTrainers.map(trainer => (
            <div className="trainers-card" key={trainer.id}>
              <div className="trainers-card-image">
                <img src={trainer.image} alt={trainer.name} />
                <div className="trainers-card-overlay">
                  <div className="trainers-social-links">
                    <a href={trainer.social.instagram} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href={trainer.social.facebook} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href={trainer.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="trainers-card-content">
                <div className="trainers-rating">
                  <i className="fas fa-star"></i>
                  <span>{trainer.rating}</span>
                  <span className="trainers-students">({trainer.students}+ students)</span>
                </div>
                <h3 className="trainers-name">{trainer.name}</h3>
                <p className="trainers-role">{trainer.role}</p>
                <p className="trainers-experience">
                  <i className="fas fa-clock"></i> {trainer.experience} experience
                </p>
                <div className="trainers-specialties">
                  {trainer.specialties.slice(0, 3).map((specialty, idx) => (
                    <span key={idx} className="trainers-specialty-badge">{specialty}</span>
                  ))}
                </div>
                <p className="trainers-bio">{trainer.bio.substring(0, 100)}...</p>
                <Link to={`/trainer/${trainer.id}`} className="trainers-view-btn">
                  View Profile <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredTrainers.length === 0 && (
          <div className="trainers-empty-state">
            <i className="fas fa-search trainers-empty-icon"></i>
            <h3 className="trainers-empty-title">No trainers found</h3>
            <p className="trainers-empty-message">Try adjusting your search or filter criteria</p>
            <button className="trainers-clear-btn" onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Join Our Team Section */}
      <section className="trainers-join-section">
        <div className="trainers-join-container">
          <div className="trainers-join-content">
            <h2>Join Our Team</h2>
            <p>Are you passionate about fitness and helping others? We're always looking for talented trainers to join our community.</p>
            <button 
              className="trainers-join-btn"
              onClick={() => setShowVacancyModal(true)}
            >
              Become a Trainer <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Vacancy Modal */}
      {showVacancyModal && (
        <div className="vacancy-modal-overlay" onClick={() => setShowVacancyModal(false)}>
          <div className="vacancy-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="vacancy-modal-close" onClick={() => setShowVacancyModal(false)}>
              <i className="fas fa-times"></i>
            </button>
            <div className="vacancy-modal-icon">
              <i className="fas fa-briefcase"></i>
            </div>
            <h3 className="vacancy-modal-title">No Vacancies Available</h3>
            <p className="vacancy-modal-text">
              We currently don't have any open positions for trainers. 
              Please check back later or send us your resume at <strong>careers@ironix.com</strong> 
              and we'll keep it on file for future opportunities.
            </p>
            <div className="vacancy-modal-email">
              <i className="fas fa-envelope"></i>
              <span>careers@ironix.com</span>
            </div>
            <button 
              className="vacancy-modal-btn"
              onClick={() => setShowVacancyModal(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainersPage;