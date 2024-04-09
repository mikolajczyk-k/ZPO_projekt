import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <footer
      style={{ backgroundColor: "#333", color: "#fff", marginTop: "auto" }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">
            2024 NextBank Kacper Mikołajczyk
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
