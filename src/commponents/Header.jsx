import React, { useState } from "react";
import { Navbar, Nav, Container, Dropdown, Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profiles";
import logo from "../assets/logo.png"

const Header = ({ insideDashboard }) => {
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Fetch user details from sessionStorage
  const user = JSON.parse(localStorage.getItem('user'))
  const role = localStorage.getItem('role')

  // Logout Function
  const handleLogout = () => {
    localStorage.clear()
    navigate("/");
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          {/* Left: Logo & Brand */}
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo} // Insert your logo URL
              alt="CRM Logo"
              width="40"
              height="40"
              className="d-inline-block align-top me-2"
            />
            <span className="fw-bold">LeadMorph</span>
          </Navbar.Brand>

          {/* Toggle Button for Mobile */}
          {!insideDashboard && <Navbar.Toggle aria-controls="basic-navbar-nav" />}

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {insideDashboard ? (
                // Inside Dashboard: Show Profile Dropdown & Logout
                user ? (
                  <Dropdown>
                    <Dropdown.Toggle variant="warning" className="text-dark px-3">
                      {user.username} ({role})
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end">
                      {/* <Dropdown.Item onClick={() => setShowProfileModal(true)}>
                        Profile
                      </Dropdown.Item> */}
                      {/* <Dropdown.Divider /> */}
                      <Dropdown.Item onClick={handleLogout}>
                        Logout <i className="fa-solid fa-right-from-bracket ms-1"></i>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  // If no user found (fallback)
                  <Nav.Link as={Link} to="/login" className="text-white px-3">
                    Login
                  </Nav.Link>
                )
              ) : (
                // Normal Public Navigation (Outside Dashboard)
                <>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/features-pricing">Features & Pricing</Nav.Link>
                  <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Profile Modal */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
        <Modal.Header closeButton>
        
        </Modal.Header>
        <Modal.Body>
          <Profile />
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
