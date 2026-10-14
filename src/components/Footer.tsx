
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand-column">
          <Link to="/" className="footer-brand" aria-label="NSeeRead Home">
            NSeeRead<span className="footer-brand-dot">.</span>
          </Link>

          <p className="footer-tagline">Learn More. Read Less.</p>

          <p className="footer-description">
            A simpler way to explore ideas, understand unfamiliar topics, and
            discover useful knowledge. Because learning should respect your
            time.
          </p>

          <Link to="/explore" className="footer-explore-link">
            Start exploring <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <Link to="/explore">All Topics</Link>
          <Link to="/explore?category=Technology">Technology</Link>
          <Link to="/explore?category=Business">Business</Link>
          <Link to="/explore?category=Science">Science</Link>
          <Link to="/resources">Learning Resources</Link>
        </div>

        <div className="footer-links">
          <h3>Discover</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About NSeeRead</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/profile">My Profile</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-contact-column">
          <h3>Stay Curious.</h3>
          <p>
            Have a topic suggestion, a question, or an idea to share? We would
            like to hear from you.
          </p>

          <Link to="/contact" className="footer-contact-link">
            Share your suggestions <span aria-hidden="true">→</span>
          </Link>

          <div className="footer-note">
            <span className="footer-note-symbol" aria-hidden="true">✳</span>
            <span>Curiosity opens new perspectives.</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} NSeeRead. All rights reserved.</p>

        <p className="footer-bottom-tagline">
          Made for curious minds.
        </p>

        <Link to="/contact" className="footer-bottom-link">
          Contact
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
