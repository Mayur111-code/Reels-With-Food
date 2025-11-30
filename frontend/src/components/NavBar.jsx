import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    fetch("http://localhost:3000/api/auth/user/logout", {
      credentials: "include",
    }).finally(() => {
      localStorage.removeItem("token");
      navigate("/user/login");
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          
          {/* LOGO */}
          <div className="navbar-logo" onClick={() => navigate("/")}>
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
              </svg>
            </div>
            FoodView
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="navbar-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              <span className="nav-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </span>
              Home
            </NavLink>

            <NavLink
              to="/saved"
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              <span className="nav-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              </span>
              Saved
            </NavLink>

            <button className="nav-logout-btn" onClick={handleLogout}>
              <span className="nav-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </span>
              Logout
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* MOBILE MENU OVERLAY */}
          <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "mobile-menu-active" : ""}`}>
            <div className="mobile-menu-content">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "mobile-nav-link-active" : ""}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </span>
                Home
              </NavLink>

              <NavLink
                to="/saved"
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "mobile-nav-link-active" : ""}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                  </svg>
                </span>
                Saved
              </NavLink>

              <button 
                className="mobile-logout-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
              >
                <span className="mobile-nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                </span>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
        }

        /* LOGO STYLES */
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
          font-size: 24px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .navbar-logo:hover {
          transform: scale(1.05);
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          color: #ff6b6b;
        }

        /* DESKTOP NAVIGATION */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        @media (max-width: 768px) {
          .navbar-links {
            display: none;
          }
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-weight: 500;
          font-size: 16px;
          padding: 8px 16px;
          border-radius: 12px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .nav-link:hover::before {
          left: 100%;
        }

        .nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }

        .nav-link-active {
          color: white;
          background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 193, 7, 0.2));
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        }

        .nav-icon {
          width: 20px;
          height: 20px;
        }

        /* LOGOUT BUTTON */
        .nav-logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #ff6b6b, #ff3b3b);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
        }

        .nav-logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
          background: linear-gradient(135deg, #ff5252, #ff1744);
        }

        .nav-logout-btn:active {
          transform: translateY(0);
        }

        /* MOBILE MENU BUTTON */
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .mobile-menu-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .mobile-menu-btn span {
          width: 24px;
          height: 2px;
          background: white;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .mobile-menu-open span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .mobile-menu-open span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-open span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex;
          }
        }

        /* MOBILE MENU OVERLAY */
        .mobile-menu-overlay {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 999;
        }

        .mobile-menu-active {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-content {
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 16px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-weight: 500;
          font-size: 18px;
          padding: 16px 20px;
          border-radius: 12px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(8px);
        }

        .mobile-nav-link-active {
          color: white;
          background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 193, 7, 0.2));
          border-color: rgba(255, 107, 107, 0.3);
        }

        .mobile-nav-icon {
          width: 24px;
          height: 24px;
        }

        .mobile-logout-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          background: linear-gradient(135deg, #ff6b6b, #ff3b3b);
          color: white;
          border: none;
          padding: 16px 20px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
        }

        .mobile-logout-btn:hover {
          transform: translateX(8px);
          box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
        }

        /* SCROLL EFFECT */
        .navbar.scrolled {
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(30px) saturate(200%);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }

        /* ANIMATIONS */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-menu-content > * {
          animation: slideIn 0.3s ease forwards;
        }

        .mobile-menu-content > *:nth-child(1) { animation-delay: 0.1s; }
        .mobile-menu-content > *:nth-child(2) { animation-delay: 0.2s; }
        .mobile-menu-content > *:nth-child(3) { animation-delay: 0.3s; }
      `}</style>
    </>
  );
};

export default NavBar;