import React from "react";
//styles
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";

//components
import { Outlet } from "react-router-dom";
import DashboardSideNav from "../components/DashboardSideNav";
import { Col, Container, Row } from "react-bootstrap";

const DashboardLayout = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={2} lg={2} className="p-0">
          <DashboardSideNav />
        </Col>
        <Col className="main-dashboard">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;
