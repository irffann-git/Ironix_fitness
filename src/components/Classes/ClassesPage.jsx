import { useState } from "react";
import { Link } from "react-router-dom";
import "./ClassesPage.css";

function ClassesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const classes = [
    {
      id: 1,
      name: "HIIT",
      category: "cardio",
      duration: "45 min",
      intensity: "High",
      calories: "500-700",
      image: "/hitt.jpg",
      description: "High-intensity interval training that alternates between intense bursts of activity and fixed periods of less-intense activity. Perfect for burning maximum calories in minimum time.",
      schedule: ["Mon 7:00 AM", "Wed 6:00 PM", "Fri 8:00 AM"],
      trainer: "Sarah Johnson",
      spots: 12,
      available: true
    },
    {
      id: 2,
      name: "CrossFit",
      category: "strength",
      duration: "60 min",
      intensity: "Very High",
      calories: "600-800",
      image: "/crossfit.jpg",
      description: "Functional fitness program combining weightlifting, gymnastics, and cardiovascular training. Push your limits and build elite-level fitness.",
      schedule: ["Tue 6:00 AM", "Thu 5:00 PM", "Sat 9:00 AM"],
      trainer: "Mike Thompson",
      spots: 8,
      available: true
    },
    {
      id: 3,
      name: "Kickboxing",
      category: "cardio",
      duration: "50 min",
      intensity: "High",
      calories: "550-750",
      image: "/kickboxing.jpg",
      description: "Cardio-intensive workout combining martial arts techniques with fast-paced cardio. Release stress while getting in the best shape of your life.",
      schedule: ["Mon 5:30 PM", "Wed 7:00 AM", "Fri 6:30 PM"],
      trainer: "David Chen",
      spots: 15,
      available: true
    },
    {
      id: 4,
      name: "Yoga",
      category: "flexibility",
      duration: "60 min",
      intensity: "Low-Medium",
      calories: "200-350",
      image: "/yoga.jpg",
      description: "Mind-body practice combining physical postures, breathing exercises, and meditation. Improve flexibility, reduce stress, and find inner peace.",
      schedule: ["Tue 9:00 AM", "Thu 6:00 PM", "Sat 8:00 AM", "Sun 10:00 AM"],
      trainer: "Olivia Parker",
      spots: 20,
      available: true
    },
    {
      id: 5,
      name: "Strength Training",
      category: "strength",
      duration: "55 min",
      intensity: "High",
      calories: "400-600",
      image: "/strenght.jpg",
      description: "Build muscle and increase strength with targeted resistance training exercises. Perfect for beginners and advanced lifters alike.",
      schedule: ["Mon 10:00 AM", "Wed 4:00 PM", "Fri 12:00 PM"],
      trainer: "Jackson Mitchell",
      spots: 10,
      available: true
    },
    {
      id: 6,
      name: "Cardio Dance",
      category: "cardio",
      duration: "45 min",
      intensity: "Medium-High",
      calories: "450-650",
      image: "/cardio.jpg",
      description: "Fun, energetic dance workout that gets your heart pumping and body moving. Burn calories while having a blast with upbeat music.",
      schedule: ["Tue 7:00 PM", "Thu 10:00 AM", "Sat 11:00 AM"],
      trainer: "Amanda Lee",
      spots: 25,
      available: true
    },
    {
      id: 7,
      name: "Pilates",
      category: "flexibility",
      duration: "50 min",
      intensity: "Medium",
      calories: "250-400",
      image: "/Pilates.jpg",
      description: "Core-strengthening workout focusing on controlled movements and breathing. Improve posture, flexibility, and overall body awareness.",
      schedule: ["Mon 9:00 AM", "Wed 11:00 AM", "Fri 4:00 PM"],
      trainer: "Jessica Martin",
      spots: 15,
      available: true
    },
    {
      id: 8,
      name: "Zumba",
      category: "cardio",
      duration: "60 min",
      intensity: "High",
      calories: "500-700",
      image: "/zumba.jpg",
      description: "Latin-inspired dance fitness party that burns calories while having fun. No dance experience needed - just bring your energy!",
      schedule: ["Tue 8:00 AM", "Thu 7:00 PM", "Sat 10:00 AM"],
      trainer: "Maria Garcia",
      spots: 30,
      available: true
    },
    {
      id: 9,
      name: "Boxing",
      category: "strength",
      duration: "Coming Soon",
      intensity: "Coming Soon",
      calories: "Coming Soon",
      image: "/boxing.jpg",
      description: "Full-body workout combining boxing techniques with conditioning drills. Coming to Ironix very soon!",
      schedule: ["Starting Next Month"],
      trainer: "Coming Soon",
      spots: 0,
      available: false,
      comingSoon: true
    },
    {
      id: 10,
      name: "Spinning",
      category: "cardio",
      duration: "Coming Soon",
      intensity: "Coming Soon",
      calories: "Coming Soon",
      image: "/spinning.jpg",
      description: "Indoor cycling workout that builds endurance and burns fat. Get ready for an energetic cycling experience!",
      schedule: ["Starting Next Month"],
      trainer: "Coming Soon",
      spots: 0,
      available: false,
      comingSoon: true
    },
    {
      id: 11,
      name: "Calisthenics",
      category: "strength",
      duration: "Coming Soon",
      intensity: "Coming Soon",
      calories: "Coming Soon",
      image: "/calisthenics.jpg",
      description: "Bodyweight training focusing on functional strength and control. Master your bodyweight with expert guidance.",
      schedule: ["Starting Next Month"],
      trainer: "Coming Soon",
      spots: 0,
      available: false,
      comingSoon: true
    },
    {
      id: 12,
      name: "Mindfulness Meditation",
      category: "flexibility",
      duration: "Coming Soon",
      intensity: "Coming Soon",
      calories: "Coming Soon",
      image: "/meditation.jpg",
      description: "Guided meditation sessions for stress relief and mental clarity. Find your inner peace at Ironix.",
      schedule: ["Starting Next Month"],
      trainer: "Coming Soon",
      spots: 0,
      available: false,
      comingSoon: true
    }
  ];

  const categories = [
    { id: "all", name: "All Classes", icon: "fas fa-th-large" },
    { id: "strength", name: "Strength", icon: "fas fa-dumbbell" },
    { id: "cardio", name: "Cardio", icon: "fas fa-heartbeat" },
    { id: "flexibility", name: "Flexibility", icon: "fas fa-hand-peace" }
  ];

  const getIntensityBadge = (intensity) => {
    const colors = {
      "Low": "#A89A8A",
      "Low-Medium": "#DFA84B",
      "Medium": "#D4AF37",
      "Medium-High": "#C4913A",
      "High": "#884919",
      "Very High": "#6B3A14",
      "Coming Soon": "#A89A8A"
    };
    return colors[intensity] || "#884919";
  };

  const filteredClasses = classes.filter(classItem => {
    const matchesCategory = selectedCategory === "all" || classItem.category === selectedCategory;
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (classItem.trainer && classItem.trainer.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="trainee-page-wrapper">
      {/* Hero Section */}
      <section className="trainee-hero-section">
        <img src="/about-1.jpg" alt="Classes" className="trainee-hero-bg" />
        <div className="trainee-hero-overlay"></div>
        <div className="trainee-hero-content">
          <h1>
            <span className="trainee-hero-primary">Find Your Perfect</span>
            <span className="trainee-hero-secondary">Workout Class</span>
          </h1>
          <p className="trainee-hero-description">Choose from 8 expert-led classes + 4 exciting new classes coming soon!</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="trainee-main-container">
        {/* Stats Section */}
        <div className="trainee-stats-grid">
          <div className="trainee-stat-card">
            <i className="fas fa-dumbbell trainee-stat-icon"></i>
            <div>
              <h4 className="trainee-stat-number">{classes.filter(c => c.available).length}+</h4>
              <p className="trainee-stat-label">Active Classes</p>
            </div>
          </div>
          <div className="trainee-stat-card">
            <i className="fas fa-clock trainee-stat-icon"></i>
            <div>
              <h4 className="trainee-stat-number">4+</h4>
              <p className="trainee-stat-label">Coming Soon</p>
            </div>
          </div>
          <div className="trainee-stat-card">
            <i className="fas fa-users trainee-stat-icon"></i>
            <div>
              <h4 className="trainee-stat-number">8+</h4>
              <p className="trainee-stat-label">Expert Trainers</p>
            </div>
          </div>
          <div className="trainee-stat-card">
            <i className="fas fa-smile trainee-stat-icon"></i>
            <div>
              <h4 className="trainee-stat-number">1000+</h4>
              <p className="trainee-stat-label">Active Members</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="trainee-filters-wrapper">
          <div className="trainee-search-container">
            <i className="fas fa-search trainee-search-icon"></i>
            <input
              type="text"
              className="trainee-search-input"
              placeholder="Search by class name or trainer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="trainee-categories-container">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`trainee-category-btn ${selectedCategory === cat.id ? "trainee-active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <i className={cat.icon}></i>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Classes Grid */}
        <div className="trainee-classes-grid">
          {filteredClasses.map(classItem => (
            <div 
              className={`trainee-class-card ${!classItem.available ? "trainee-coming-soon" : ""}`} 
              key={classItem.id}
            >
              <div className="trainee-class-image-wrapper">
                <img src={classItem.image} alt={classItem.name} className="trainee-class-img" />
                {!classItem.available && (
                  <div className="trainee-coming-soon-overlay">
                    <div className="trainee-coming-soon-badge">
                      <i className="fas fa-calendar-star"></i>
                      <span>Opening Soon</span>
                    </div>
                  </div>
                )}
                {classItem.available && (
                  <span className="trainee-intensity-badge" style={{ backgroundColor: getIntensityBadge(classItem.intensity) }}>
                    {classItem.intensity}
                  </span>
                )}
              </div>
              <div className={`trainee-class-details ${!classItem.available ? "trainee-blurred" : ""}`}>
                <h3 className="trainee-class-name">{classItem.name}</h3>
                <p className="trainee-class-description">{classItem.description}</p>
                
                {classItem.available ? (
                  <>
                    <div className="trainee-class-meta">
                      <div className="trainee-meta-item">
                        <i className="fas fa-clock"></i>
                        <span>{classItem.duration}</span>
                      </div>
                      <div className="trainee-meta-item">
                        <i className="fas fa-fire"></i>
                        <span>{classItem.calories} cal</span>
                      </div>
                      <div className="trainee-meta-item">
                        <i className="fas fa-user-check"></i>
                        <span>{classItem.spots} spots left</span>
                      </div>
                    </div>

                    <div className="trainee-trainer-info">
                      <i className="fas fa-chalkboard-user"></i>
                      <span>{classItem.trainer}</span>
                    </div>

                    <div className="trainee-schedule-info">
                      <i className="fas fa-calendar-week"></i>
                      <div className="trainee-schedule-list">
                        {classItem.schedule.map((time, idx) => (
                          <span key={idx} className="trainee-schedule-badge">{time}</span>
                        ))}
                      </div>
                    </div>

                    <Link to={`/class-details/${classItem.id}`} className="trainee-booking-btn">
                      Book This Class <i className="fas fa-arrow-right"></i>
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="trainee-coming-soon-meta">
                      <div className="trainee-meta-item">
                        <i className="fas fa-hourglass-half"></i>
                        <span>Launching Soon</span>
                      </div>
                      <div className="trainee-meta-item">
                        <i className="fas fa-bell"></i>
                        <span>Get Notified</span>
                      </div>
                    </div>
                    <button className="trainee-notify-btn">
                      <i className="fas fa-envelope"></i> Notify Me When Available
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredClasses.length === 0 && (
          <div className="trainee-empty-state">
            <i className="fas fa-search trainee-empty-icon"></i>
            <h3 className="trainee-empty-title">No classes found</h3>
            <p className="trainee-empty-message">Try adjusting your search or filter criteria</p>
            <button className="trainee-clear-btn" onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default ClassesPage;