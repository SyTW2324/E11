import React from "react";
import "../styles/Header.css";
import medal from "../images/medal.png";
import login from "../images/login.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header-container">
      <div className="login-icon">
        <Link to="/login">
          <img src={login} alt="loginRegister-icon" />
        </Link>
      </div>
      <div className="title-icon">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Wildle</h1>
        </Link>
      </div>
      <div className="ranking-icon">
        <Link to="/ranking">
          <img src={medal} alt="ranking-icon" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
