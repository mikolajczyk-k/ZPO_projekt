import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";
import { BsCreditCard2Back } from "react-icons/bs";

import AccountTile from "../components/AccountTile";

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
          <Container>
            <Row>
              <AccountTile
                label="Checking"
                Icon={<BsCreditCard2Back />}
                balance="10.000"
              />
              <AccountTile
                label="Checking"
                Icon={<BsCreditCard2Back />}
                balance="10.000"
              />
              <AccountTile
                label="Checking"
                Icon={<BsCreditCard2Back />}
                balance="10.000"
              />
              <AccountTile
                label="Checking"
                Icon={<BsCreditCard2Back />}
                balance="10.000"
              />
            </Row>
          </Container>
        </Row>
      </Row>
    </Container>
  );
};

export default DashboardMain;
