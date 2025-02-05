import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>
        <ul className="nav-links">
          <li>Home</li>
          <li>About Us</li>
          <li>Work</li>
          <li>Info</li>
          <li>Contact Us</li>
        </ul>
      </nav>

      <main className="landing-main">
        <div className="content">
          <h1>Time Management</h1>
          <p>
            Organize your tasks efficiently and stay on top of your schedule. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Link to="/dashboard" className="cta-button">
            Start
          </Link>
        </div>
        <div className="image-container">
          <img
            src="/LP-image.png"
            alt="Task Management Illustration"
            className="landing-image"
          />
        </div>
      </main>
    </div>
  );
}

export default LandingPage;