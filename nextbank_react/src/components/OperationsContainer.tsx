import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import {
  MdTransferWithinAStation,
  MdAccountBalanceWallet,
  MdRemoveCircleOutline,
} from "react-icons/md";

interface Props {
  selectedAccountId: number | null;
}

const OperationsContainer: React.FC<Props> = ({ selectedAccountId }) => {
  // State to control the visibility of each modal
  const [showTransfer, setShowTransfer] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);

  // Handlers to show/hide the modals
  const handleTransferClose = () => setShowTransfer(false);
  const handleTransferShow = () => setShowTransfer(true);

  const handleDepositClose = () => setShowDeposit(false);
  const handleDepositShow = () => setShowDeposit(true);

  const handleWithdrawalClose = () => setShowWithdrawal(false);
  const handleWithdrawalShow = () => setShowWithdrawal(true);

  // Placeholder form submission handler
  const handleSubmit =
    (operation: string) => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(`${operation} form submitted`);
    };

  return (
    <Row>
      <Col xs={12}>
        <Button
          variant="primary"
          className="w-100 my-2"
          onClick={handleTransferShow}
        >
          Transfer <MdTransferWithinAStation className="ml-2" />
        </Button>
      </Col>
      <Col xs={12}>
        <Button
          variant="success"
          className="w-100 my-2"
          onClick={handleDepositShow}
        >
          Deposit <MdAccountBalanceWallet className="ml-2" />
        </Button>
      </Col>
      <Col xs={12}>
        <Button
          variant="danger"
          className="w-100 my-2"
          onClick={handleWithdrawalShow}
        >
          Withdrawal <MdRemoveCircleOutline className="ml-2" />
        </Button>
      </Col>

      {/* Transfer Modal */}
      <Modal show={showTransfer} onHide={handleTransferClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make a Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit("Transfer")}>
            <Form.Group controlId="formTransferRecipient">
              <Form.Label>Recipient Account</Form.Label>
              <Form.Control type="text" placeholder="Enter recipient account" />
            </Form.Group>
            <Form.Group controlId="formTransferAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" placeholder="Enter amount" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Deposit Modal */}
      <Modal show={showDeposit} onHide={handleDepositClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make a Deposit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit("Deposit")}>
            <Form.Group controlId="formDepositAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" placeholder="Enter amount" />
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Withdrawal Modal */}
      <Modal show={showWithdrawal} onHide={handleWithdrawalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make a Withdrawal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit("Withdrawal")}>
            <Form.Group controlId="formWithdrawalAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" placeholder="Enter amount" />
            </Form.Group>
            <Button variant="danger" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Row>
  );
};

export default OperationsContainer;
