import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";

interface Account {
  id: number;
  accountNumber: string;
  type: string;
  balance: number;
  ownerId: number;
}

const DashboardAccountsPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [show, setShow] = useState(false);
  const [newAccountType, setNewAccountType] = useState<string>("CHECKING");
  const [refresh, setRefresh] = useState<boolean>(false);

  const { userId } = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/clients/${userId}/accounts`)
      .then((response) => setAccounts(response.data))
      .catch((error) => console.error("Failed to fetch accounts", error));
  }, [refresh]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleCreateAccount = () => {
    axios
      .post(`http://localhost:8080/accounts`, {
        clientId: userId,
        type: newAccountType,
        initialBalance: 0.0,
      })
      .then((response) => {
        setRefresh(!refresh);
        handleClose();
      })
      .catch((error) => console.error("Failed to create account", error));
  };

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h2>Your Accounts</h2>
        </Col>
        <Col className="text-right">
          <Button onClick={handleShow}>Open New Account</Button>
        </Col>
      </Row>
      <Row>
        {accounts.map((account) => (
          <Col key={account.id} md={4} className="my-2">
            <div className="account-card">
              <h5>{account.type} Account</h5>
              <p>Account Number: {account.accountNumber}</p>
              <p>Balance: {account.balance.toFixed(2)} zł</p>
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Open New Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAccountType">
              <Form.Label>Account Type</Form.Label>
              <Form.Control
                as="select"
                value={newAccountType}
                onChange={(e) => setNewAccountType(e.target.value)}
              >
                <option value="CHECKING">CHECKING</option>
                <option value="SAVINGS">SAVINGS</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateAccount}>
            Create Account
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DashboardAccountsPage;
