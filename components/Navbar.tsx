"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="text-2xl font-bold">
            Riven
          </Link>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>

          <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            <Link href="/" className={pathname === "/" ? "active" : ""}>
              Home
            </Link>
            <Link
              href="/blogs"
              className={pathname === "/blogs" ? "active" : ""}
            >
              Blogs
            </Link>
            <Link
              href="/about"
              className={pathname === "/about" ? "active" : ""}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={pathname === "/contact" ? "active" : ""}
            >
              Contact Us
            </Link>
            <Link href="/create-blog" className="btn btn-primary">
              Create Blog
            </Link>
            <Link href="#" className="download-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Our App
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
