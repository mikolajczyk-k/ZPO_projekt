import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Outlet } from "react-router-dom";
import DashboardSideNav from "../components/DashboardSideNav";
import { Col, Container, Row } from "react-bootstrap";

const DashboardLayout = () => {
  return(
  <Container>
    <Row>
      <Col md={3} lg={3} className="p-0">
        <DashboardSideNav/>
      </Col>
      <Col>
        <Outlet/>
      </Col>
    </Row>
  </Container>
  );
};

export default DashboardLayout;
