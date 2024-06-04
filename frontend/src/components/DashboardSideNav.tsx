import React from "react";

//styles
import "../styles/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Row } from "react-bootstrap";
import { FiHome, FiSettings, FiUser } from "react-icons/fi";
import { LuBanknote } from "react-icons/lu";
import { BiHistory } from "react-icons/bi";

import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import SideNavItem from "./SideNavItem";
import LogOutButton from "./LogOutButton";

const DashboardSideNav: React.FC = () => {
  return (
    <Nav className="flex-column side-nav" style={{ height: "100vh" }}>
      <Container>
        <Row className="brand-tab">
          <span style={{ fontSize: 24, textAlign: "center" }}>NextBank</span>
          <span style={{ fontSize: 12, textAlign: "center" }}>Dashboard</span>
        </Row>
        <SideNavItem icon={<FiHome />} label="Home" path="/dashboard" />
        <SideNavItem icon={<FiUser />} label="Profile" path="profile" />
        <SideNavItem icon={<LuBanknote />} label="Accounts" path="accounts" />
        <SideNavItem icon={<BiHistory />} label="History" path="history" />
        <SideNavItem icon={<FiSettings />} label="Settings" path="settings" />
        <LogOutButton />
      </Container>
    </Nav>
  );
};

export default DashboardSideNav;
