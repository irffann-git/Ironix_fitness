import { Link } from 'react-router-dom';
import './AboutPage.css';
import { useEffect, useRef, useState } from 'react';
import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function AboutPage() {
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);
  const contentRef = useRef(null);


// Add this inside your AboutPage component
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target); // only once
        }
      });
    },
    { threshold: 0.20, rootMargin: '0px 0px -50px 0px' }
  );

  const cards = document.querySelectorAll('.about-feature-card, .about-testimonial-card, .about-trainer-card, .view-all-card');
  cards.forEach((card) => observer.observe(card));

  return () => observer.disconnect();
}, []);


  // Simplified parallax effect - removed buggy transform
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const section = document.querySelector('.about-fixed-parallax');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Simple fade-in effect instead of transform
      if (rect.top < windowHeight - 100 && rect.bottom > 100) {
        section.classList.add('in-view');
      } else {
        section.classList.remove('in-view');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardStep, setCardStep] = useState(0);
  const trackRef = useRef(null);
  const totalCards = 7;
  const visibleCards = 2.5;
  const maxIndex = totalCards - Math.ceil(visibleCards);

  useEffect(() => {
    const initSwiper = () => {
      if (window.innerWidth <= 768) {
        if (!swiperInstance.current) {
          swiperInstance.current = new Swiper(swiperRef.current, {
            modules: [Pagination],
            slidesPerView: 1.15,
            centeredSlides: true,
            spaceBetween: 16,
            pagination: { el: ".about-swiper-pagination", clickable: true },
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

  useEffect(() => {
    const computeStep = () => {
      if (trackRef.current && trackRef.current.children.length > 1) {
        const first = trackRef.current.children[0];
        const second = trackRef.current.children[1];
        const step = second.offsetLeft - first.offsetLeft;
        setCardStep(step);
      }
    };
    computeStep();
    window.addEventListener('resize', computeStep);
    return () => window.removeEventListener('resize', computeStep);
  }, []);

  const goPrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const goNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const testimonials = [
    {
      text: "Ironix has transformed my workouts! The personalized plans and supportive community make every session enjoyable. Thanks to Ironix I'm achieving my fitness goals faster than ever.",
      name: "Sarah Anderson",
      role: "Fitness Enthusiast"
    },
    {
      text: "As a fitness professional, I highly recommend Ironix to my clients. The platform's versatility and expert guidance ensure effective and enjoyable workouts, making it an invaluable tool for achieving optimal results.",
      name: "David Mitchell",
      role: "Personal Trainer"
    },
    {
      text: "I've never felt stronger. The trainers at Ironix push you to your limits while keeping it fun. Highly recommended!",
      name: "Jessica Lee",
      role: "Yoga Instructor"
    },
    {
      text: "Ironix helped me recover from injury and build strength safely. The community support is unmatched.",
      name: "Michael Chen",
      role: "Marathon Runner"
    },
    {
      text: "The classes are diverse and challenging. I love the energy and the results I'm seeing.",
      name: "Emily Davis",
      role: "CrossFit Athlete"
    },
    {
      text: "Ironix's nutrition guidance combined with workouts changed my life. I'm healthier than ever.",
      name: "Robert Wilson",
      role: "Weightlifter"
    },
    {
      text: "As a busy mom, Ironix's flexible schedule and online resources let me stay fit on my own time.",
      name: "Amanda Taylor",
      role: "Fitness Mom"
    }
  ];

  return (
    <div className="about-page-wrapper">
      {/* Hero Section */}
      <div className="about-hero-section">
        <img 
          src="/about.jpg" 
          alt="About Us" 
          className="about-hero-bg" 
        />
        <div className="about-hero-overlay"></div>
        <div className="about-hero-container">
          <div className="about-hero-text">
            <h1 className="about-hero-first">ABOUT</h1>
            <h1 className="about-hero-last">IRONIX</h1>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="about-story-section">
        <div className="about-container">
          <div className="about-story-content">
            <p>
              At Ironix, our story is one of passion, commitment, and community. 
              Founded with the vision of creating a fitness space where individuals could thrive, 
              we've cultivated an environment that goes beyond workouts. Our journey is built on 
              the belief that wellness is a holistic endeavor, deeply rooted in community.
            </p>
            <p>
              From the dedication of our certified trainers to the warmth of our members, 
              we invite you to join us in this empowering narrative, where your story of 
              transformation becomes an integral part of ours. Welcome to Ironix, where the 
              journey to a healthier, stronger you is a shared and celebrated experience!
            </p>
          </div>
          <div className="about-story-images">
            <img src="/about-1.jpg" alt="Ironix community" className="about-story-img" />
            <img src="/about-2.jpg" alt="Ironix trainers" className="about-story-img" />
          </div>
          <div className="about-story-btn-wrapper">
            <Link to="/" className="about-story-btn">Join Us</Link>
          </div>
        </div>
      </div>

      {/* Parallax Section - Fixed version */}
      <div className="about-fixed-parallax">
        <div className="about-parallax-bg"></div>
        <div className="about-parallax-overlay"></div>
        <div className="about-parallax-content" ref={contentRef}>
          <h2 className="about-parallax-title">STRENGTH GROWS HERE</h2>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="about-features">
        <div className="about-container-why">
          <div className="about-section-header">
            <h2 className="about-section-title">Why Choose Us</h2>
            <p className="about-section-subtitle">Experience the difference with our world-class facilities and expert guidance</p>
          </div>
          <div className="about-features-grid">
            <div className="about-feature-card">
              <div className="about-feature-icon"><i className="fa fa-check"></i></div>
              <h3>Certified Trainers</h3>
              <p>Expert guidance from internationally certified professionals dedicated to your success.</p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon"><i className="fas fa-fire-alt"></i></div>
              <h3>Motivation</h3>
              <p>Stay inspired with our energetic environment and supportive community.</p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon"><i className="far fa-smile"></i></div>
              <h3>Friendly Staff</h3>
              <p>Our welcoming team makes every visit enjoyable and productive.</p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon"><i className="fas fa-heart"></i></div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock assistance to keep you on track with your fitness goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <div className="about-testimonials">
        <div className="about-container">
          <h2 className="about-testimonials-title">What They Say</h2>
          <div className="about-testimonials-viewport">
            <div
              className="about-testimonials-track"
              ref={trackRef}
              style={{ transform: `translateX(-${currentIndex * cardStep}px)` }}
            >
              {testimonials.map((t, i) => (
                <div className="about-testimonial-card" key={i}>
                  <i className="fas fa-quote-left about-quote-icon"></i>
                  <p className="about-testimonial-text">{t.text}</p>
                  <div className="about-testimonial-author">
                    <h4>{t.name}</h4>
                    <p>{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-testimonials-controls">
            <button
              className="about-carousel-btn about-prev-btn"
              onClick={goPrev}
              disabled={currentIndex === 0}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              className="about-carousel-btn about-next-btn"
              onClick={goNext}
              disabled={currentIndex === maxIndex}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Trainer Section - 4 cards with View All */}
      <section className="about-trainers">
        <div className="about-container">
          <div className="about-section-header">
            <h2 className="about-section-title">Expert Trainers</h2>
            <p className="about-section-subtitle">Meet our team of certified fitness professionals</p>
          </div>
          <div className="about-trainers-grid">
            {/* Trainer 1 - Olivia Parker */}
            <div className="about-trainer-card">
              <div className="about-trainer-image">
                <img src="/olivia.jpg" alt="Olivia Parker" />
                <div className="about-trainer-social">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
              <h3>Olivia Parker</h3>
              <p>Yoga Trainer</p>
            </div>

            {/* Trainer 2 - Jackson Mitchell */}
            <div className="about-trainer-card">
              <div className="about-trainer-image">
                <img src="/jackson.jpg" alt="Jackson Mitchell" />
                <div className="about-trainer-social">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
              <h3>Jackson Mitchell</h3>
              <p>Gym Trainer</p>
            </div>

            {/* Trainer 3 - Ethan Reynolds */}
            <div className="about-trainer-card">
              <div className="about-trainer-image">
                <img src="/ethan.jpg" alt="Ethan Reynolds" />
                <div className="about-trainer-social">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
              <h3>Ethan Reynolds</h3>
              <p>Gym Trainer</p>
            </div>

            {/* Trainer 4 - View All Trainers Card */}
            <Link to="/Trainers" className="about-trainer-card-link">
              <div className="about-trainer-card view-all-card">
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

export default AboutPage;