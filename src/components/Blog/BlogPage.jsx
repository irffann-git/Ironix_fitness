import { Link } from "react-router-dom";
import "./BlogPage.css";

function BlogPage() {
  const blogs = [
    {
      id: 1,
      date: "April 8, 2023",
      title: "Unleash Your Inner Strength",
      description:
        "Dive into a world of relentless determination and transforming workouts at IronPulse, where every rep brings you closer to unlocking your full potential.",
      image: "/blog1.png",
    },
    {
      id: 2,
      date: "April 8, 2023",
      title: "Stories of Power, Progress, and Peak Performance",
      description:
        "Explore the narrative of strength through our Gym Guides at FlexFables, where each tale is a lesson in resilience, showcasing the incredible feats achieved through dedication and hard work.",
      image: "/blog2.jpg",
    },
    {
      id: 3,
      date: "April 8, 2023",
      title: "Revitalize Your Fitness Lifestyle",
      description:
        "Discover the panoramic view of health and wellness at Vitality Vista. Dive into articles covering nutrition, workouts, and lifestyle tips, guiding you to a peak state of vitality.",
      image: "/blog3.jpg",
    },
    {
      id: 4,
      date: "April 8, 2023",
      title: "Your Journey to Herculean Fitness",
      description:
        "Join the EpicLift community for inspiring stories, expert advice, and workout wisdom. Embark on a fitness journey that transcends the ordinary and conquers the extraordinary.",
      image: "/blog4.jpg",
    },
    {
      id: 5,
      date: "April 8, 2023",
      title: "Breaking the Mold, Redefining Fitness",
      description:
        "RogueReps is your guide to breaking free from conventional fitness norms. Embrace unconventional workouts, nutrition hacks, and revolutionary ideas that redefine what it means to be fit.",
      image: "/blog5.jpg",
    },
    {
      id: 6,
      date: "April 8, 2023",
      title: "Wisdom for a Sculpted Physique",
      description:
        "Navigate the path to a sculpted body with insights from the SculptedSage Fitness Files. Uncover the secrets of balanced fitness, blending both physical and mental well-being.",
      image: "/blog6.jpg",
    },
  ];

  return (
    <div className="blog-page-wrapper">
      {/* Hero Section */}
      <div className="blog-hero-section">
        <img
          src="/Blog.jpg"
          alt="Blog"
          className="blog-hero-image"
        />
        <div className="blog-hero-overlay"></div>
        <div className="blog-hero-container">
          <div className="blog-hero-text">
            <h1>
              <span className="blog-hero-first">Discover our.</span>
              <span className="blog-hero-last">Health and Gym tips</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="blog-posts-section">
        <div className="blog-container">
          <div className="blog-header">
            <h2 className="blog-header-title">Latest Articles</h2>
            <p className="blog-header-description">
              Explore expert fitness tips, nutrition advice, and inspiring stories to fuel your wellness journey
            </p>
          </div>

          <div className="blog-posts-grid">
            {blogs.map((blog) => (
              <Link
                to={`/blog/${blog.id}`}
                key={blog.id}
                className="blog-post-card-link"
              >
                <div className="blog-post-card">
                  <div className="blog-post-image-wrapper">
                    <img src={blog.image} alt={blog.title} className="blog-post-image" />
                  </div>
                  <span className="blog-post-date">
                    <i className="far fa-calendar-alt" style={{ marginRight: "6px" }}></i>
                    {blog.date}
                  </span>
                  <h3 className="blog-post-title">{blog.title}</h3>
                  <p className="blog-post-description">{blog.description}</p>
                  <span className="blog-post-readmore">
                    Read More <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;