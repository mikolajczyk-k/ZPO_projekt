import React, { JSXElementConstructor } from "react";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";

import { useNavigate, NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

interface Props {
  icon: JSX.Element;
  label: string;
  path: string;
}

const SideNavItem: React.FC<Props> = ({ icon, label, path }) => {
  const sizedIcon = React.cloneElement(icon, { size: "1.5em" });
  const navigate = useNavigate();

  return (
    <NavLink
      className="container-fluid d-flex align-items-center side-nav-item"
      to={path}
    >
      {sizedIcon}
      <span
        style={{
          marginLeft: "40px",
          fontSize: "1.2em",
          alignContent: "center",
        }}
      >
        {label}
      </span>
    </NavLink>
  );
};

export default SideNavItem;
