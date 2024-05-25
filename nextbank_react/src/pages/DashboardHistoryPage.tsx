import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";

interface Account {
  id: number;
  accountNumber: string;
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
  const [selectedAccount, setSelectedAccount] = useState<number | "all">("all");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [type, setType] = useState<string>("");
  const { userId } = useAuth();

  //fetching accounts
  useEffect(() => {
    axios
      .get(`http://localhost:8080/clients/${userId}/accounts`)
      .then((response) =>
        setAccounts(response.data.map((account: any) => account.id))
      )
      .catch((error) => console.error("Failed to fetch accounts", error));
  }, []);

  const fetchTransactions = () => {
    const params: any = {
      accountId: selectedAccount !== "all" ? selectedAccount : undefined,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
      type: type || undefined,
    };
    axios
      .get(`http://localhost:8080/transactions/client/${userId}`, { params })
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error("Failed to fetch transactions", error));
  };

  // Fetch transactions on initial load and when filters change
  useEffect(() => {
    fetchTransactions();
  }, [selectedAccount, fromDate, toDate, type]);

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
              onChange={(e) => setSelectedAccount(e.target.value as any)}
            >
              <option value="all">All</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  Account {account.accountNumber}
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
      <Row>
        <Col>
          <Button onClick={fetchTransactions}>Apply Filters</Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Donor ID</th>
                <th>Recipient ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount}PLN</td>
                  <td>{transaction.donorId}</td>
                  <td>{transaction.recipientId}</td>
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
