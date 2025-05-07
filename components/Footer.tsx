import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3 className="footer-title">Riven</h3>
            <p className="text-muted mb-4">
              A center for all our resources & insights about technology,
              design, and business.
            </p>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Quick Links</h3>
            <div className="footer-links">
              <Link href="/">Home</Link>
              <Link href="/blogs">Blogs</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Categories</h3>
            <div className="footer-links">
              <Link href="/blogs?category=technology">Technology</Link>
              <Link href="/blogs?category=design">Design</Link>
              <Link href="/blogs?category=management">Management</Link>
              <Link href="/blogs?category=resources">Resources</Link>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Connect</h3>
            <div className="footer-links">
              <Link href="https://twitter.com" target="_blank">
                Twitter
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                LinkedIn
              </Link>
              <Link href="https://github.com" target="_blank">
                GitHub
              </Link>
              <Link href="https://instagram.com" target="_blank">
                Instagram
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Riven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
