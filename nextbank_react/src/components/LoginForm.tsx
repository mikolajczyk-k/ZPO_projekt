import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

interface Props {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<Props> = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
}) => {
  const navigate = useNavigate();

  return (
    <Container
      style={{
        marginTop: "10vh",
        marginBottom: "10vh",
        borderRadius: "0.5rem",
      }}
    >
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form
            style={{
              padding: "2rem",
              backgroundColor: "#333",
              borderRadius: ".25rem",
              color: "#fff",
            }}
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="success" type="submit">
                Login
              </Button>
            </div>

            <Row className="mt-3 align-items-center justify-content-between">
              <Col className="text-left" style={{ color: "#ccc" }}>
                Don't have an account yet?
              </Col>
              <Col xs="auto">
                <Button
                  variant="outline-success"
                  onClick={() => navigate("/home/signup")}
                >
                  Sign Up
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
