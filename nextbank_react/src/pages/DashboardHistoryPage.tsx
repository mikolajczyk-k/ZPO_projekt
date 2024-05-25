import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";

interface Account {
  id: number;
  type: string;
  accountNumber: string;
  balance: number;
  ownerId: number;
}

interface Transaction {
  id: number;
  type: string;
  amount: number;
  donorId: number | null;
  recipientId: number | null;
  date: string;
}

const DashboardHistoryPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]); // List of account IDs
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [selectedAccount, setSelectedAccount] = useState<number | "all">("all");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [type, setType] = useState<string>("");
  const { userId } = useAuth();

  // Fetch accounts and transactions for the logged-in user
  useEffect(() => {
    // Replace with the actual user ID

    axios
      .get(`http://localhost:8080/clients/${userId}/accounts`)
      .then((response) => setAccounts(response.data))
      .catch((error) => console.error("Failed to fetch accounts", error));

    axios
      .get(`http://localhost:8080/transactions/client/${userId}`)
      .then((response) => {
        setTransactions(response.data);
        setFilteredTransactions(response.data); // Initialize filtered transactions
      })
      .catch((error) => console.error("Failed to fetch transactions", error));
  }, []);

  // Filter transactions based on selected filters
  const filterTransactions = () => {
    let filtered = transactions;

    if (selectedAccount !== "all") {
      filtered = filtered.filter(
        (transaction) =>
          transaction.donorId === selectedAccount ||
          transaction.recipientId === selectedAccount
      );
    }

    if (fromDate) {
      filtered = filtered.filter(
        (transaction) => new Date(transaction.date) >= new Date(fromDate)
      );
    }

    if (toDate) {
      filtered = filtered.filter(
        (transaction) => new Date(transaction.date) <= new Date(toDate)
      );
    }

    if (type) {
      filtered = filtered.filter((transaction) => transaction.type === type);
    }

    setFilteredTransactions(filtered);
  };

  // Apply filters whenever any filter changes
  useEffect(() => {
    filterTransactions();
  }, [selectedAccount, fromDate, toDate, type, transactions]);

  const getAccountNumber = (accountId: number | null) => {
    const account = accounts.find((account) => account.id === accountId);
    return account ? account.accountNumber : "N/A";
  };

  const getTransactionColor = (transaction: Transaction) => {
    if (transaction.donorId && transaction.recipientId) {
      if (
        accounts.some((account) => account.id === transaction.donorId) &&
        accounts.some((account) => account.id === transaction.recipientId)
      ) {
        return "yellow";
      } else if (
        accounts.some((account) => account.id === transaction.recipientId)
      ) {
        return "green";
      } else {
        return "red";
      }
    } else if (transaction.recipientId) {
      return "green";
    } else {
      return "red";
    }
  };

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h2>Transaction History</h2>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={3}>
          <Form.Group controlId="formAccount">
            <Form.Label>Account</Form.Label>
            <Form.Control
              as="select"
              value={selectedAccount}
              onChange={(e) =>
                setSelectedAccount(
                  e.target.value === "all" ? "all" : parseInt(e.target.value)
                )
              }
            >
              <option value="all">All</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.accountNumber}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="formFromDate">
            <Form.Label>From Date</Form.Label>
            <Form.Control
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="formToDate">
            <Form.Label>To Date</Form.Label>
            <Form.Control
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="formType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All</option>
              <option value="TRANSFER">Transfer</option>
              <option value="DEPOSIT">Deposit</option>
              <option value="WITHDRAWAL">Withdrawal</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row></Row>
      <Row className="mt-3">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Donor Account</th>
                <th>Recipient Account</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.type}</td>
                  <td style={{ color: getTransactionColor(transaction) }}>
                    {transaction.amount}PLN
                  </td>
                  <td>{getAccountNumber(transaction.donorId)}</td>
                  <td>{getAccountNumber(transaction.recipientId)}</td>
                  <td>{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardHistoryPage;
