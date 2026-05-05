import { Link } from "react-router-dom";
import "./HomePage.css";
import { useState } from "react";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function HomePage() {
  const [billingPeriod, setBillingPeriod] = useState('yearly');
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);

  const pricingData = {
    starter: {
      yearly: { price: 4999, text: 'Billed annually' },
      monthly: { price: 499, text: 'Billed monthly' }
    },
    premium: {
      yearly: { price: 7999, text: 'Billed annually' },
      monthly: { price: 799, text: 'Billed monthly' }
    },
    elite: {
      yearly: { price: 10999, text: 'Billed annually' },
      monthly: { price: 999, text: 'Billed monthly' }
    }
  };

  useEffect(() => {
    const initSwiper = () => {
      if (window.innerWidth <= 768) {
        if (!swiperInstance.current) {
          swiperInstance.current = new Swiper(swiperRef.current, {
            modules: [Pagination],
            slidesPerView: 1.15,
            centeredSlides: true,
            spaceBetween: 16,
            pagination: { el: ".home-swiper-pagination", clickable: true },
            breakpoints: {
              480: { slidesPerView: 1.3, spaceBetween: 20 },
            },
          });
        }
      } else {
        if (swiperInstance.current) {
          swiperInstance.current.destroy(true, true);
          swiperInstance.current = null;
        }
      }
    };

    initSwiper();
    window.addEventListener("resize", initSwiper);
    return () => {
      window.removeEventListener("resize", initSwiper);
      swiperInstance.current?.destroy(true, true);
    };
  }, []);

  return (
    <div className="homepage-wrapper">
      {/* Hero Section */}
      <section className="home-hero">
        <video autoPlay muted loop playsInline className="home-hero-bg">
          <source src="/5319101-uhd_3840_2160_25fps.mp4" type="video/mp4" />
        </video>
        <div className="home-hero-overlay"></div>
        <div className="home-hero-content">
          <h1 className="home-hero-title">
            <span className="home-hero-title-line-1">TRY HARD.</span>
            <span className="home-hero-title-line-2">STRONG TOMORROW.</span>
          </h1>
          <p className="home-hero-subtitle">Transform your body, elevate your mind, unleash your potential</p>
          <div className="home-hero-buttons">
            <Link to="/classes"><button className="home-btn-outline">Start Journey</button></Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features">
        <div className="home-container">
          <div className="home-section-header">
            <h2 className="home-section-title">Why Choose Us</h2>
            <p className="home-section-subtitle">Experience the difference with our world-class facilities and expert guidance</p>
          </div>
          <div className="home-features-grid">
            <div className="home-feature-card">
              <div className="home-feature-icon"><i className="fa fa-check"></i></div>
              <h3>Certified Trainers</h3>
              <p>Expert guidance from internationally certified professionals dedicated to your success.</p>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-icon"><i className="fas fa-fire-alt"></i></div>
              <h3>Motivation</h3>
              <p>Stay inspired with our energetic environment and supportive community.</p>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-icon"><i className="far fa-smile"></i></div>
              <h3>Friendly Staff</h3>
              <p>Our welcoming team makes every visit enjoyable and productive.</p>
            </div>
            <div className="home-feature-card">
              <div className="home-feature-icon"><i className="fas fa-heart"></i></div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock assistance to keep you on track with your fitness goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="home-classes">
        <div className="home-container">
          <div className="home-section-header">
            <h2 className="home-section-title home-classes-title">Discover Our Classes</h2>
            <p className="home-section-subtitle home-classes-subtitle">Find the perfect workout that matches your goals</p>
          </div>
          <div className="home-classes-grid">
            <div className="home-class-card">
              <img src="/hitt.jpg" alt="HIIT" />
              <div className="home-class-overlay">
                <h3>HIIT</h3>
                <Link to="/Class-details/1"><button className="home-class-btn">Learn More</button></Link>
              </div>
            </div>
            <div className="home-class-card">
              <img src="/crossfit.jpg" alt="CrossFit" />
              <div className="home-class-overlay">
                <h3>CrossFit</h3>
                <Link to="/Class-details/2"><button className="home-class-btn">Learn More</button></Link>
              </div>
            </div>
            <div className="home-class-card">
              <img src="/kickboxing.jpg" alt="Kickboxing" />
              <div className="home-class-overlay">
                <h3>Kickboxing</h3>
                <Link to="/Class-details/3"><button className="home-class-btn">Learn More</button></Link>
              </div>
            </div>
            <div className="home-class-card">
              <img src="/yoga.jpg" alt="Yoga" />
              <div className="home-class-overlay">
                <h3>Yoga</h3>
                <Link to="/Class-details/4"><button className="home-class-btn">Learn More</button></Link>
              </div>
            </div>
          </div>
          <div className="home-classes-footer">
            <Link to="/classes"><button className="home-btn-outline">View All Classes</button></Link>
          </div>
        </div>
      </section>

      {/* Trainers Section - Updated with 4 cards */}
      <section className="home-trainers">
        <div className="home-container">
          <div className="home-section-header">
            <h2 className="home-section-title home-trainers-title">Expert Trainers</h2>
            <p className="home-section-subtitle">Meet our team of certified fitness professionals</p>
          </div>
          <div className="home-trainers-grid">
            {/* Trainer 1 - Olivia Parker */}
            <div className="home-trainer-card">
              <div className="home-trainer-image">
                <img src="/olivia.jpg" alt="Olivia Parker" />
                <div className="home-trainer-social">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
              <h3>Olivia Parker</h3>
              <p>Yoga Trainer</p>
            </div>

            {/* Trainer 2 - Jackson Mitchell */}
            <div className="home-trainer-card">
              <div className="home-trainer-image">
                <img src="/jackson.jpg" alt="Jackson Mitchell" />
                <div className="home-trainer-social">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
              <h3>Jackson Mitchell</h3>
              <p>Gym Trainer</p>
            </div>

            {/* Trainer 3 - Ethan Reynolds */}
            <div className="home-trainer-card">
              <div className="home-trainer-image">
                <img src="/ethan.jpg" alt="Ethan Reynolds" />
                <div className="home-trainer-social">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
              <h3>Ethan Reynolds</h3>
              <p>Gym Trainer</p>
            </div>

            {/* Trainer 4 - View All Trainers Card */}
            <Link to="/Trainers" className="home-trainer-card-link">
              <div className="home-trainer-card view-all-card">
                <div className="view-all-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>View All</h3>
                <p>Meet Our Full Team</p>
                <div className="view-all-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;