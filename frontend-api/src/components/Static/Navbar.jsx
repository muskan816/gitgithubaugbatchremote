import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiUser, FiMenu } from "react-icons/fi";
import { createPortal } from "react-dom";
import AuthModal from "../auth/AuthSection";
import "../styles/Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const location = useLocation();
  const threshold = 50;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = showAuth ? "hidden" : prev || "";
    return () => (document.body.style.overflow = prev || "");
  }, [showAuth]);

  const openAuth = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setShowAuth(true);
  };

  const closeAuth = () => setShowAuth(false);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out ${
        scrolled ? "scrolled" : "at-top"
      }`}
      style={{ height: 64 }}
    >
      <div className="mx-auto h-full px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/athithya-logo.png" alt="Athithya logo" className="h-13 w-auto object-contain" />
        </Link>

        {/* Links + CTA */}
        <div>
          <div className="flex items-center space-x-6">
            {/* <Link
              to="/host"
              className={`nav-link text-sm md:text-base font-medium ${
                scrolled ? "text-[#C59A2F]" : "text-white/90"
              }`}
            >
              For Host
            </Link> */}

            {/* <Link
              to="/creators"
              className={`nav-link text-sm md:text-base font-medium ${
                scrolled ? "text-[#C59A2F]" : "text-white/90"
              }`}
            >
              For Creators
            </Link> */}

            <button
              type="button"
              onClick={openAuth}
              className="gold-cta-x relative inline-flex items-center gap-2 px-5 py-2 rounded-sm font-medium transition-all duration-300 bg-[#C59A2F] text-white shadow-lg"
            >
              <FiUser className="transition-transform duration-300 text-white" />
              <span className="cta-text">Login / Sign</span>
            </button>
          </div>
        </div>
      </div>

      {showAuth && createPortal(<AuthModal onClose={closeAuth} />, document.body)}
    </nav>
  );
}
