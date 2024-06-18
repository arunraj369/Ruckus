import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import {useLocation,useNavigate } from 'react-router-dom'
import "./Header.css";
import ruckuslogo from "../assets/Ruckus-Logo.jpg";
import userIcon from "../assets/user_icon.png";

function Header({data}) {
  const navigate = useNavigate();
  const location = useLocation();
  const usernames=location.state.data;
  const handleNavigate = () => {
    navigate('/Topology', {state:{name:usernames} });
  };

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
            {/* <Nav.Link as={Link} to="/Home">
              <h6 style={{ color: "#ffffff" }}>Home</h6>
            </Nav.Link> */}
            {/* <Nav.Link as={Link} onClick={handleNavigate}>
              <h6 style={{ color: "#ffffff" }}>Topology</h6>
            </Nav.Link> */}
            {/* <Nav.Link as={Link} to="/Diagram">
              <h6 style={{ color: "#ffffff" }}>Diagram</h6>
            </Nav.Link>
            <Nav.Link as={Link} to="/AppInfo">
              <h6 style={{ color: "#ffffff" }}>AppInfo</h6>
            </Nav.Link>
            */}
             {/* <Nav.Link as={Link} to="/UserData">
               <h6 style={{ color: "#ffffff" }}>UserData</h6>
             </Nav.Link>  */}
          </Nav>
        </Navbar.Collapse>
        <Nav.Item style={{ marginRight: "10%" ,color:'white'}} >
        <img
            src={userIcon}
            alt="User"
            style={{ width: "30px", height: "30px",marginRight:10 }}
          /> Welcome {data}
        </Nav.Item>
      </Navbar>
    </div>
  );
}

export default Header;
