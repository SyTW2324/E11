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
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
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
