import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./Header.css";
import ruckuslogo from "../assets/Ruckus-Logo.jpg";
function Header() {
  return (
    <div>
      <Navbar
        expand="lg"
        style={{ backgroundColor: " #6358dc" }}
        variant="dark"
      >
        <Navbar.Brand as={Link} to="/" style={{ marginLeft: "10%" }}>
          {/* <h3 style={{ color: "#ffffff" }}>Ruckus</h3> */}
          <img
            src={ruckuslogo}
            alt="Loading"
            style={{ width: "130px", height: "50px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto" style={{ marginRight: "10%" }}>
            <Nav.Link as={Link} to="/Home">
              <h6 style={{ color: "#ffffff" }}>Home</h6>
            </Nav.Link>
            <Nav.Link as={Link} to="/Topology">
              <h6 style={{ color: "#ffffff" }}>Topology</h6>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
