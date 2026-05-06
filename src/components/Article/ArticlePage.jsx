import { useState, useEffect } from "react"; 
import { useParams, Link } from "react-router-dom";
import blogs from "../../Data/BlogData";
import "./ArticlePage.css";

function ArticlePage() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  // Newsletter state
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");


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
    '.article-content-heading, .article-content-paragraph, .article-image-wrapper, .article-newsletter, .article-more-card'
  );
  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);
  

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }
    setMessage("Thank you for subscribing! You'll receive our latest updates.");
    setMessageType("success");
    setEmail("");
  };

  if (!blog) {
    return (
      <div className="article-not-found">
        <h2>Article not found</h2>
        <Link to="/blog" className="article-back-btn-simple">Back to Blogs</Link>
      </div>
    );
  }

  

  const otherBlogs = blogs.filter((b) => b.id !== blog.id).slice(0, 3);

  return (
    <div className="article-page-wrapper">
      {/* Hero Section */}
      <div className="article-hero-section">
        <img src={blog.image} alt={blog.title} className="article-hero-bg" />
        <div className="article-hero-overlay"></div>
        <div className="article-hero-container">
          <h1 className="article-hero-title">{blog.title}</h1>
          <p className="article-hero-subtitle">{blog.description}</p>
          <div className="article-hero-meta">
            <span className="article-meta-date">
              <i className="far fa-calendar-alt" style={{ marginRight: "6px" }}></i>
              {blog.date}
            </span>
            <span className="article-meta-readtime">
              <i className="far fa-clock" style={{ marginRight: "6px" }}></i>
              5 min read
            </span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="article-content-section">
        {blog.content?.map((item, index) => {
          if (item.type === "heading") {
            return <h2 key={index} className="article-content-heading">{item.text}</h2>;
          } else if (item.type === "paragraph") {
            return <p key={index} className="article-content-paragraph">{item.text}</p>;
          } else if (item.type === "image") {
            return (
              <div key={index} className="article-image-wrapper">
                <img src={item.src} alt={item.alt} className="article-content-image" />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Newsletter Signup */}
      <div className="article-newsletter">
        <h2>Stay Updated</h2>
        <p>Get the latest fitness tips, workout guides, and exclusive offers delivered to your inbox.</p>
        <form onSubmit={handleSubscribe} className="article-newsletter-form">
          <input
            type="email"
            name="email"
            id="newsletter"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Subscribe Now</button>
        </form>
        {message && (
          <div className={`article-newsletter-message ${messageType}`}>
            <i className={`fas ${messageType === "success" ? "fa-check-circle" : "fa-exclamation-circle"}`} style={{ marginRight: "8px" }}></i>
            {message}
          </div>
        )}
      </div>

      {/* More Blogs Section */}
      {otherBlogs.length > 0 && (
        <div className="article-more-blogs">
          <h3 className="article-more-title">More from our blog</h3>
          <div className="article-more-grid">
            {otherBlogs.map((other) => (
              <Link to={`/blog/${other.id}`} key={other.id} className="article-more-card">
                <div className="article-more-image-wrapper">
                  <img src={other.image} alt={other.title} className="article-more-image" />
                </div>
                <div className="article-more-content">
                  <p className="article-more-date">
                    <i className="far fa-calendar-alt"></i> {other.date}
                  </p>
                  <h4 className="article-more-title-text">{other.title}</h4>
                </div>
              </Link>
            ))}
          </div>
          <div className="article-back-wrapper">
            <Link to="/blog" className="article-back-button">
              <i className="fas fa-arrow-left"></i> Back to All Blogs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticlePage;