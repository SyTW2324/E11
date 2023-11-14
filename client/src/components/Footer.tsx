import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div className="home-text">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2>Wildle</h2>
        </Link>
      </div>
      <div className="loginRegister-text">
        <Link to="/loginRegister" style={{ textDecoration: "none" }}>
          <h2>Register/Login</h2>
        </Link>
      </div>
      <div className="ranking-text">
        <Link to="/ranking" style={{ textDecoration: "none" }}>
          <h2>Ranking</h2>
        </Link>
      </div>
      <div className="user-text">
        <Link to="/user" style={{ textDecoration: "none" }}>
          <h2>User</h2>
        </Link>
      </div>
      <div className="about-text">
        <Link to="/about" style={{ textDecoration: "none" }}>
          <h2>About</h2>
        </Link>
      </div>
      <div className="copiright-text">
        <h2>© 2021 Wildle</h2>
      </div>
    </div>
  );
}

export default Footer;
