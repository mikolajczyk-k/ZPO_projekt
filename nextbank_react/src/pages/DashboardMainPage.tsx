import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";
import { BsCreditCard2Back } from "react-icons/bs";

import AccountTile from "../components/AccountTile";
import AccountTileContainer from "../components/AccountTileContainer";

const DashboardMain = () => {
  return (
    <Container className="dashboard-main-page">
      <Row className="dashboard-main-accounts">
        <Row>
          <Container>
            <span>Accounts: </span>
          </Container>
        </Row>
        <Row>
          <AccountTileContainer />
        </Row>
      </Row>
    </Container>
  );
};

export default DashboardMain;
