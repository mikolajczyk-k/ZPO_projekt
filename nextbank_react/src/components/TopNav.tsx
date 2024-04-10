import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TopNav: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#333", color: "#fff" }}>
      <Container>
        <Navbar.Brand href="/home" style={{ color: "#fff" }}>
          NextBank
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home" style={{ color: "#fff" }}>
              Home
            </Nav.Link>
            <Nav.Link href="/about" style={{ color: "#fff" }}>
              About
            </Nav.Link>
          </Nav>
          <div className="d-flex">
            <Button
              variant="success"
              className="me-2"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              variant="outline-success"
              
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNav;
