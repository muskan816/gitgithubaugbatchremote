import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { FaBell, FaHamburger } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

export default function LoginNav() {
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const threshold = 50;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    handleScroll(); // check immediately
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Replace with your API endpoint
        // const response = await fetch("/api/notifications/count");
        // const data = await response.json();
        // setNotifications(data.count);
        setNotifications(0);
      } catch (error) {
        console.error("Failed to load notifications:", error);
        setNotifications(0);
      }
    };

    fetchNotifications();
  }, []);

  const navigate = useNavigate();

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "scrolled bg-black/60 backdrop-blur-md shadow-lg"
          : "at-top bg-transparent"
      }`}
      style={{ height: 64 }}
    >
      <div className="mx-auto h-full px-6 sm:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
        >
          <img
            src="/athithya-logo.png"
            alt="Athithya Logo"
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="flex items-center space-x-6">
          {/* Notifications Icon with Count */}
          <Link
            to="/notifications"
            className={`relative flex items-center justify-center transition-colors duration-300 ${
              scrolled ? "text-[#C59A2F]" : "text-white/90"
            } hover:text-[#C59A2F]`}
            aria-label="Notifications"
          >
            <FaBell size={22} />
            <span
              className={`absolute -top-2 -right-1 text-[10px] font-bold rounded-full px-1 py-[0.5px] ${
                notifications > 0
                  ? "bg-[#C59A2F] text-white border"
                  : "bg-gray-400 text-white"
              }`}
            >
              {notifications ?? 0}
            </span>
          </Link>
          <Link
            to="/post"
            className={`relative inline-flex items-center gap-2 px-2.5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-sm ${
              scrolled
                ? "bg-[#C59A2F] text-white hover:scale-105 hover:shadow-md"
                : "bg-transparent border border-white/80 text-white hover:bg-[#C59A2F] hover:text-white"
            }`}
          >
            <MdAdd size={20} className="transition-transform duration-300" />
          </Link>

          {/* Profile Dropdown */}
          <div className="relative profile-dropdown">
            {/* Profile Icon Button */}
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${
                scrolled &&
                "bg-[#C59A2F] text-white/90 hover:bg-[#C59A2F] hover:text-white"
              } shadow-sm cursor-pointer`}
              aria-label="Profile"
            >
              <RxHamburgerMenu size={20} />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 w-44 rounded-md shadow-lg overflow-hidden border border-[#C59A2F]/60 backdrop-blur-md transition-all duration-300 ${
                dropdownOpen
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible"
              } ${scrolled ? "bg-black/80" : "bg-black/60"}`}
            >
              <Link
                to="/explore"
                className="block px-4 py-2 text-sm text-white hover:bg-[#C59A2F] hover:text-white transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                Explore
              </Link>
              <Link
                to="/connect"
                className="block px-4 py-2 text-sm text-white hover:bg-[#C59A2F] hover:text-white transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                Connect
              </Link>
              <Link
                to="/chat"
                className="block px-4 py-2 text-sm text-white hover:bg-[#C59A2F] hover:text-white transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                Messages
              </Link>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-white hover:bg-[#C59A2F] hover:text-white transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>

              {/* Logout Option */}
              <button
                onClick={() => {
                  localStorage.removeItem("auth_token"); // clear token
                  setDropdownOpen(false);
                  navigate("/");
                }}
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-red-500 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
