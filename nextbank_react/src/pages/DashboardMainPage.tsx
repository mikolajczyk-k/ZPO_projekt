import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";

import axios from "axios";

import AccountTileContainer from "../components/AccountTileContainer";
import OperationsContainer from "../components/OperationsContainer";
import RecentTransactionsContainer from "../components/RecentTransactionsContainer";
import { useAuth } from "../AuthContext";

interface Account {
  id: number;
  accountNumber: string;
  type: string;
  balance: number;
  ownerId: number;
}

const DashboardMain = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null
  );

  const [refresh, setRefresh] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    // Replace with the actual user ID
    axios
      .get(`http://localhost:8080/clients/${userId}/accounts`)
      .then((response) => setAccounts(response.data))
      .catch((error) => console.error("Failed to fetch accounts", error));
  }, [refresh]);

  return (
    <Container className="dashboard-main-page">
      <Row className="dashboard-main-accounts">
        <Row>
          <Container>
            <span>Accounts: </span>
          </Container>
        </Row>
        <Row>
          <AccountTileContainer
            setSelectedAccountId={setSelectedAccountId}
            selectedAccountId={selectedAccountId}
            refresh={refresh}
          />
        </Row>
      </Row>
      <Row>
        <Col className="dashboard-main-operations">
          <Container>
            <span>Operations: </span>
            <OperationsContainer
              selectedAccountId={selectedAccountId}
              setRefresh={setRefresh}
            />
          </Container>
        </Col>
        <Col className="dashboard-main-transactions">
          <Container>
            <span>Recent Transactions: </span>
            <RecentTransactionsContainer
              selectedAccountId={selectedAccountId}
              refresh={refresh}
              accounts={accounts}
            />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardMain;
