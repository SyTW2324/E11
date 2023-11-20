import React from "react";
import "../styles/Header.css";
import medal from "../images/medal.png";
import login from "../images/login.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function Header() {
  const windowWidth = window.innerWidth;

  if (windowWidth < 768) {
    // drop down menu
    return (
      <div className="header-container">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Wildle</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <NavDropdown title="Menu" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="/ranking">Ranking</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  } else {
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
}

export default Header;
