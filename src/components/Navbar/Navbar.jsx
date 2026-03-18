
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Badge } from "../ui/Components";
import { roleLabels } from "../../data/users";
import "./Navbar.css";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/risk-map", label: "Risk Map" },
  { path: "/data-insights", label: "Data Insights" },
  { path: "/awareness", label: "Awareness" },
  { path: "/data-sources", label: "Data Sources" },
  { path: "/leaderboard", label: "Leaderboard" },
];

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [scrollY, setScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <header
      className="navbar"
      style={{
        background:
          scrollY > 60 ? "rgba(5,13,26,.76)" : "transparent",
        backdropFilter:
          scrollY > 60 ? "blur(24px) saturate(1.5)" : "none",
        borderBottom:
          scrollY > 60 ? "1px solid rgba(201,168,76,.1)" : "none",
        transform: headerVisible
          ? "translateY(0)"
          : "translateY(-100%)",
      }}
    >
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <div className="logo-icon">♀</div>
          <div>
            <div className="brand-title">SHIELD</div>
            <div className="brand-sub">Bridging The Gap</div>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="nav-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${
                location.pathname === link.path ? "active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Section */}
        <div className="navbar-auth">
          {isAuthenticated ? (
            <div className="user-menu">
              <button
                className="user-menu-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="avatar">
                  {user?.name?.charAt(0)}
                </div>
                <div className="user-info-mini">
                  <span className="user-name">{user?.name}</span>
                  <Badge
                    variant={
                      user?.role === "gov_admin"
                        ? "primary"
                        : user?.role === "ngo_user"
                        ? "accent"
                        : "secondary"
                    }
                    size="sm"
                  >
                    {roleLabels[user?.role]}
                  </Badge>
                </div>
              </button>

              {dropdownOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <strong>{user?.name}</strong>
                    <span>{user?.email}</span>
                    {user?.department && (
                      <p className="org-text">{user.department}</p>
                    )}
                    {user?.organization && (
                      <p className="org-text">{user.organization}</p>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item text-danger"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-login">
              Sign In
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}

export default Navbar;