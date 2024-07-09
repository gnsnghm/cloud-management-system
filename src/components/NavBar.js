import React from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import "../NavBar.css";

const NavBar = ({ onLogout }) => {
  const location = useLocation();

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="mb-4">
      <Container>
        <LinkContainer to="/my-page">
          <Navbar.Brand>
            <img
              src="/images/logo.png"
              height="50"
              alt="Cloud Management Logo"
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/cloud-providers">
              <Nav.Link
                className={
                  location.pathname === "/cloud-providers" ? "active" : ""
                }
              >
                Cloud Providers
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/data-centers">
              <Nav.Link
                className={
                  location.pathname === "/data-centers" ? "active" : ""
                }
              >
                Data Centers
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cloud-pools">
              <Nav.Link
                className={location.pathname === "/cloud-pools" ? "active" : ""}
              >
                Cloud Pools
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/storage-devices">
              <Nav.Link
                className={
                  location.pathname === "/storage-devices" ? "active" : ""
                }
              >
                Storage Devices
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/disks">
              <Nav.Link
                className={location.pathname === "/disks" ? "active" : ""}
              >
                Disks
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/virtual-machines">
              <Nav.Link
                className={
                  location.pathname === "/virtual-machines" ? "active" : ""
                }
              >
                Virtual Machines
              </Nav.Link>
            </LinkContainer>
            <NavDropdown title="Masters" id="basic-nav-dropdown">
              <LinkContainer to="/users">
                <NavDropdown.Item
                  className={location.pathname === "/users" ? "active" : ""}
                >
                  Users
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/units">
                <NavDropdown.Item
                  className={location.pathname === "/units" ? "active" : ""}
                >
                  Units
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/operating-systems">
                <NavDropdown.Item
                  className={
                    location.pathname === "/operating-systems" ? "active" : ""
                  }
                >
                  Operating Systems
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
          <Button variant="outline-light" onClick={onLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
