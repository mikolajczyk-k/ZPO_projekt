import React from 'react'
import { Form, Container, Col, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css"
import styles from "../styles/PeselInput.module.css"

const SignUpForm: React.FC = () => {
                const navigate = useNavigate();

  return (
    <Container style={{ marginTop: '10vh', marginBottom: '10vh', borderRadius: '0.5rem' }}>
    <Row className="justify-content-md-center">
      <Col md={6}>
        <Form style={{ padding: '2rem', backgroundColor: '#333', borderRadius: '.25rem', color: '#fff' }}>
            <Row>
            <Col>
            <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last name" />
            </Form.Group>
            </Col>

            <Col>
            <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First name" />
            </Form.Group>
            </Col>
            </Row>

            <Row>
            <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            </Col>

            <Col>
            <Form.Group className="mb-3" controlId="formverifyPassword">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control type="password" placeholder="Repeat password" />
            </Form.Group>
            </Col>
            </Row>
            

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" placeholder="E-mail" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPesel">
                <Form.Label>Pesel</Form.Label>
                <Form.Control type="number" placeholder="PESEL" className={styles.numberInput}/>
            </Form.Group>

            <div className="d-grid gap-2">
                <Button variant="success" type="submit">
                Sign Up
                </Button>
            </div>

            <Row className="mt-3 align-items-center justify-content-between">
                <Col className="text-left" style={{ color: '#ccc' }}>
                Already have an account?
                </Col>
                <Col xs="auto">
                <Button variant="outline-success" onClick={() => navigate('/home/login')}>Login</Button>
                </Col>
            </Row>
        </Form>
      </Col>
    </Row>
  </Container>
  )
            }

export default SignUpForm
