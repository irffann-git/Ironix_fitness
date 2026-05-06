import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { classesData } from "../../Data/class_details";
import axios from "axios";
import "./ClassDetailsPage.css";


const API_BASE = import.meta.env.VITE_API_URL;

function ClassDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: ""
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Get user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (storedUser && token) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsLoggedIn(true);
      setBookingData(prev => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
      }));
    } else {
      setIsLoggedIn(false);
    }
    
    console.log("User logged in:", !!token);
  }, []);

  const classId = parseInt(id);
  const classItem = classesData[classId];

  if (!classItem) {
    return (
      <div className="cd-not-found-container">
        <div className="cd-not-found-content">
          <i className="fas fa-dumbbell"></i>
          <h2>Class Not Found</h2>
          <p>Oops! The class you're looking for doesn't exist.</p>
          <Link to="/classes" className="cd-back-to-classes-btn">
            <i className="fas fa-arrow-left"></i> Back to Classes
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
    setBookingError("");
  };

const handleBookNowClick = () => {
  if (!isLoggedIn) {
    const confirmLogin = window.confirm("Please login to book a class. Click OK to go to login page.");
    if (confirmLogin) {
      navigate("/signin", { state: { from: `/class-details/${id}` } });
    }
  } else {
    setShowBookingModal(true);
  }
};

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    // Double check login status before proceeding
    const token = localStorage.getItem("token");
    if (!token) {
      setBookingError("Please login to book a class");
      setLoading(false);
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
      return;
    }
    
    if (bookingStep === 1) {
      // Validate form
      if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.date || !bookingData.timeSlot) {
        setBookingError("Please fill in all fields");
        return;
      }
      setBookingStep(2);
    } else {
      setLoading(true);
      setBookingError("");
      
      try {
        const selectedSlot = classItem.schedule.find(slot => `${slot.day} ${slot.time}` === bookingData.timeSlot);
        
        // Clean the price - extract only numbers
        const cleanPrice = classItem.price.replace(/[^0-9]/g, '');
        
        // Create proper JSON object
        const requestData = {
          classId: classId,
          className: classItem.name,
          trainerName: selectedSlot?.trainer || classItem.trainer.name,
          date: bookingData.date,
          timeSlot: bookingData.timeSlot,
          price: cleanPrice,
          userName: bookingData.name,
          userEmail: bookingData.email,
          userPhone: bookingData.phone
        };
        
        console.log("Sending request:", JSON.stringify(requestData, null, 2));
        
        const response = await axios({
          method: 'post',
          url: `${API_BASE}/api/bookings/create`, 
          data: requestData,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        console.log("Response:", response.data);

        if (response.data.success) {
          setBookingSuccess(true);
          setTimeout(() => {
            setShowBookingModal(false);
            setBookingStep(1);
            setBookingSuccess(false);
            setBookingData({
              name: user?.name || "",
              email: user?.email || "",
              phone: user?.phone || "",
              date: "",
              timeSlot: ""
            });
          }, 2000);
        }
      } catch (error) {
        console.error("Booking error:", error);
        console.error("Error response:", error.response?.data);
        
        if (error.response?.status === 401) {
          setBookingError("Session expired. Please login again.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsLoggedIn(false);
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else {
          setBookingError(error.response?.data?.message || "Failed to create booking. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const closeModal = () => {
    setShowBookingModal(false);
    setBookingStep(1);
    setBookingSuccess(false);
    setBookingError("");
  };

  const getIntensityColor = (intensity) => {
    const colors = {
      "Low": "#A89A8A",
      "Low-Medium": "#DFA84B",
      "Medium": "#D4AF37",
      "Medium-High": "#C4913A",
      "High": "#884919",
      "Very High": "#6B3A14"
    };
    return colors[intensity] || "#884919";
  };


  // Scroll reveal animations for content cards
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

  const elements = document.querySelectorAll(
    '.cd-gallery, .cd-info-card, .cd-price-card, .cd-schedule-card, .cd-trainer-card'
  );
  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);

  return (
    <div className="cd-page-wrapper">
      {/* Hero Section */}
      <section className="cd-hero-section">
        <img src={classItem.image} alt={classItem.name} className="cd-hero-bg" />
        <div className="cd-hero-overlay"></div>
        <div className="cd-hero-container">
          <Link to="/classes" className="cd-back-link">
            <i className="fas fa-arrow-left"></i> Back to Classes
          </Link>
          <h1 className="cd-hero-title">{classItem.name}</h1>
          <div className="cd-hero-tags">
            <span className="cd-tag">
              <i className="fas fa-clock"></i> {classItem.duration}
            </span>
            <span className="cd-tag" style={{ backgroundColor: getIntensityColor(classItem.intensity) }}>
              <i className="fas fa-fire"></i> {classItem.intensity}
            </span>
            <span className="cd-tag">
              <i className="fas fa-bolt"></i> {classItem.calories} cal
            </span>
            <span className="cd-tag">
              <i className="fas fa-chart-line"></i> {classItem.level}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="cd-main-wrapper">
        <div className="cd-container">
          <div className="cd-grid">
            {/* Left Column - Class Info */}
            <div className="cd-left-column">
              {/* Gallery */}
              <div className="cd-gallery">
                <div className="cd-main-image">
                  <img src={classItem.gallery[selectedImage]} alt={classItem.name} />
                </div>
                <div className="cd-thumbnail-grid">
                  {classItem.gallery.map((img, idx) => (
                    <div 
                      key={idx} 
                      className={`cd-thumbnail ${selectedImage === idx ? "cd-active" : ""}`}
                      onClick={() => setSelectedImage(idx)}
                    >
                      <img src={img} alt={`${classItem.name} ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="cd-info-card">
                <h2 className="cd-section-title">About This Class</h2>
                <p className="cd-description-text">{classItem.longDescription}</p>
              </div>

              {/* Benefits */}
              <div className="cd-info-card">
                <h2 className="cd-section-title">Key Benefits</h2>
                <div className="cd-benefits-grid">
                  {classItem.benefits.map((benefit, idx) => (
                    <div className="cd-benefit-item" key={idx}>
                      <i className="fas fa-check-circle"></i>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div className="cd-info-card">
                <h2 className="cd-section-title">What You'll Need</h2>
                <div className="cd-equipment-list">
                  {classItem.equipment.map((item, idx) => (
                    <span className="cd-equipment-badge" key={idx}>
                      <i className="fas fa-check"></i> {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Info */}
            <div className="cd-right-column">
              {/* Price Card */}
              <div className="cd-price-card">
                <h3 className="cd-price-title">Class Price</h3>
                <div className="cd-price-amount">{classItem.price}</div>
                <p className="cd-price-duration">per month</p>
                <div className="cd-spots-info">
                  <i className="fas fa-users"></i>
                  <span>{classItem.spotsLeft} spots left</span>
                </div>
                <button 
                  className="cd-book-now-btn"
                  onClick={handleBookNowClick}
                >
                  <i className="fas fa-calendar-check"></i> Book This Class
                </button>
                
              </div>

              {/* Schedule Card */}
              <div className="cd-schedule-card">
                <h3 className="cd-card-title">
                  <i className="fas fa-calendar-week"></i> Class Schedule
                </h3>
                {classItem.schedule.map((slot, idx) => (
                  <div className="cd-schedule-item" key={idx}>
                    <div className="cd-schedule-day">
                      <i className="fas fa-calendar-day"></i> {slot.day}
                    </div>
                    <div className="cd-schedule-time">
                      <i className="fas fa-clock"></i> {slot.time}
                    </div>
                    <div className="cd-schedule-trainer">
                      <i className="fas fa-chalkboard-user"></i> {slot.trainer}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trainer Card */}
              <div className="cd-trainer-card">
                <h3 className="cd-card-title">
                  <i className="fas fa-chalkboard-user"></i> Your Trainer
                </h3>
                <div className="cd-trainer-info">
                  <img src={classItem.trainer.image} alt={classItem.trainer.name} className="cd-trainer-avatar" />
                  <div className="cd-trainer-details">
                    <h4 className="cd-trainer-name">{classItem.trainer.name}</h4>
                    <p className="cd-trainer-role">{classItem.trainer.role}</p>
                    <p className="cd-trainer-experience">
                      <i className="fas fa-star"></i> {classItem.trainer.experience} experience
                    </p>
                  </div>
                </div>
                <p className="cd-trainer-bio">{classItem.trainer.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="cd-modal-overlay" onClick={closeModal}>
          <div className="cd-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="cd-modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            
            {!bookingSuccess ? (
              <>
                <div className="cd-modal-header">
                  <div className="cd-modal-steps">
                    <div className={`cd-step ${bookingStep >= 1 ? "cd-active" : ""}`}>
                      <span className="cd-step-number">1</span>
                      <span className="cd-step-label">Your Info</span>
                    </div>
                    <div className="cd-step-line"></div>
                    <div className={`cd-step ${bookingStep >= 2 ? "cd-active" : ""}`}>
                      <span className="cd-step-number">2</span>
                      <span className="cd-step-label">Confirm</span>
                    </div>
                  </div>
                  <h3 className="cd-modal-title">
                    Book {classItem.name} Class
                  </h3>
                </div>

                {bookingError && (
                  <div className="cd-booking-error">
                    <i className="fas fa-exclamation-circle"></i> {bookingError}
                  </div>
                )}

                <form onSubmit={handleBookingSubmit} className="cd-booking-form">
                  {bookingStep === 1 ? (
                    <>
                      <div className="cd-form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={bookingData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="cd-form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={bookingData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="cd-form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={bookingData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="cd-form-group">
                        <label>Preferred Date</label>
                        <input
                          type="date"
                          name="date"
                          value={bookingData.date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="cd-form-group">
                        <label>Time Slot</label>
                        <select
                          name="timeSlot"
                          value={bookingData.timeSlot}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select a time slot</option>
                          {classItem.schedule.map((slot, idx) => (
                            <option key={idx} value={`${slot.day} ${slot.time}`}>
                              {slot.day} - {slot.time} (Trainer: {slot.trainer})
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    <div className="cd-booking-summary">
                      <div className="cd-summary-item">
                        <span className="cd-summary-label">Class:</span>
                        <span className="cd-summary-value">{classItem.name}</span>
                      </div>
                      <div className="cd-summary-item">
                        <span className="cd-summary-label">Name:</span>
                        <span className="cd-summary-value">{bookingData.name}</span>
                      </div>
                      <div className="cd-summary-item">
                        <span className="cd-summary-label">Email:</span>
                        <span className="cd-summary-value">{bookingData.email}</span>
                      </div>
                      <div className="cd-summary-item">
                        <span className="cd-summary-label">Phone:</span>
                        <span className="cd-summary-value">{bookingData.phone}</span>
                      </div>
                      <div className="cd-summary-item">
                        <span className="cd-summary-label">Date:</span>
                        <span className="cd-summary-value">{bookingData.date}</span>
                      </div>
                      <div className="cd-summary-item">
                        <span className="cd-summary-label">Time:</span>
                        <span className="cd-summary-value">{bookingData.timeSlot}</span>
                      </div>
                      <div className="cd-summary-item cd-total">
                        <span className="cd-summary-label">Total Price:</span>
                        <span className="cd-summary-value">{classItem.price}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="cd-modal-buttons">
                    {bookingStep === 2 && (
                      <button type="button" onClick={() => setBookingStep(1)} className="cd-back-btn">
                        <i className="fas fa-arrow-left"></i> Back
                      </button>
                    )}
                    <button type="submit" className="cd-submit-btn" disabled={loading}>
                      {loading ? (
                        <span className="cd-loading-spinner"></span>
                      ) : bookingStep === 1 ? (
                        "Continue"
                      ) : (
                        "Confirm Booking"
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="cd-success-message">
                <i className="fas fa-check-circle"></i>
                <h3>Booking Confirmed!</h3>
                <p>Your spot has been reserved. Check your email for confirmation details.</p>
                <button onClick={closeModal} className="cd-close-success-btn">Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassDetailsPage;