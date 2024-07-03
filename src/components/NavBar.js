import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavBar = ({ onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <LinkContainer to="/my-page">
          <Navbar.Brand>Cloud Management</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/cloud-providers">
              <Nav.Link>Cloud Providers</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/data-centers">
              <Nav.Link>Data Centers</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cloud-pools">
              <Nav.Link>Cloud Pools</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/virtual-machines">
              <Nav.Link>Virtual Machines</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/users">
              <Nav.Link>Users</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/units">
              <Nav.Link>Units</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/storage-devices">
              <Nav.Link>Storage Devices</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/operating-systems">
              <Nav.Link>Operating Systems</Nav.Link>
            </LinkContainer>
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
