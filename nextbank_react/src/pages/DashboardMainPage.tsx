import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";

import AccountTileContainer from "../components/AccountTileContainer";
import OperationsContainer from "../components/OperationsContainer";
import RecentTransactionsContainer from "../components/RecentTransactionsContainer";

const DashboardMain = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null
  );

  useEffect(() => {
    console.log("Selected Account ID:", selectedAccountId);
  }, [selectedAccountId]);

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
          />
        </Row>
      </Row>
      <Row>
        <Col className="dashboard-main-operations">
          <Container>
            <span>Operations: </span>
            <OperationsContainer selectedAccountId={selectedAccountId} />
          </Container>
        </Col>
        <Col className="dashboard-main-transactions">
          <Container>
            <span>Recent Transactions: </span>
            <RecentTransactionsContainer
              selectedAccountId={selectedAccountId}
            />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardMain;
