import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import {
  MdTransferWithinAStation,
  MdAccountBalanceWallet,
  MdRemoveCircleOutline,
} from "react-icons/md";

interface Props {
  selectedAccountId: number | null;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const OperationsContainer: React.FC<Props> = ({
  selectedAccountId,
  setRefresh,
}) => {
  // State to control the visibility of each modal
  const [showTransfer, setShowTransfer] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);

  const [transferData, setTransferData] = useState({
    recipientAccountNumber: "",
    amount: "",
  });
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");

  // Handlers to show/hide the modals
  const handleTransferClose = () => setShowTransfer(false);
  const handleTransferShow = () => setShowTransfer(true);

  const handleDepositClose = () => setShowDeposit(false);
  const handleDepositShow = () => setShowDeposit(true);

  const handleWithdrawalClose = () => setShowWithdrawal(false);
  const handleWithdrawalShow = () => setShowWithdrawal(true);

  const handleTransferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransferData({ ...transferData, [e.target.name]: e.target.value });
  };

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepositAmount(e.target.value);
  };

  const handleWithdrawalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawalAmount(e.target.value);
  };

  const handleTransferSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      // Get recipient ID from account number
      const recipientIdResponse = await axios.get(
        `http://localhost:8080/accounts/getIdByAccountNumber/${transferData.recipientAccountNumber}`
      );
      const recipientId = recipientIdResponse.data;

      // Perform the transfer
      const transferResponse = await axios.post(
        "http://localhost:8080/transactions",
        {
          type: "TRANSFER",
          amount: Number(transferData.amount),
          donorId: selectedAccountId,
          recipientId: recipientId,
        }
      );
      console.log("Transfer successful:", transferResponse.data);
      setRefresh((prev) => !prev);
      handleTransferClose();
    } catch (error) {
      console.error("Transfer failed:", error);
    }
  };

  const handleDepositSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/transactions", {
        type: "DEPOSIT",
        amount: Number(depositAmount),
        donorId: null,
        recipientId: selectedAccountId,
      });
      console.log("Deposit successful:", response.data);
      setRefresh((prev) => !prev);
      handleDepositClose();
    } catch (error) {
      console.error("Deposit failed:", error);
    }
  };

  const handleWithdrawalSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/transactions", {
        type: "WITHDRAWAL",
        amount: Number(withdrawalAmount),
        donorId: selectedAccountId,
        recipientId: null,
      });
      console.log("Withdrawal successful:", response.data);
      setRefresh((prev) => !prev);
      handleWithdrawalClose();
    } catch (error) {
      console.error("Withdrawal failed:", error);
    }
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
          <Form onSubmit={handleTransferSubmit}>
            <Form.Group controlId="formTransferRecipientAccountNumber">
              <Form.Label>Recipient Account</Form.Label>
              <Form.Control
                type="text"
                name="recipientAccountNumber"
                placeholder="Enter recipient account"
                value={transferData.recipientAccountNumber}
                onChange={handleTransferChange}
              />
            </Form.Group>
            <Form.Group controlId="formTransferAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                name="amount"
                value={transferData.amount}
                onChange={handleTransferChange}
              />
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
          <Form onSubmit={handleDepositSubmit}>
            <Form.Group controlId="formDepositAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={depositAmount}
                onChange={handleDepositChange}
              />
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
          <Form onSubmit={handleWithdrawalSubmit}>
            <Form.Group controlId="formWithdrawalAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={withdrawalAmount}
                onChange={handleWithdrawalChange}
              />
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
