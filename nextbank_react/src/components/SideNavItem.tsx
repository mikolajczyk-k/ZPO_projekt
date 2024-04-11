import React, { JSXElementConstructor } from "react";
import { Nav } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

interface Props {
  icon: JSX.Element;
  label: string;
  path: string;
}

const SideNavItem: React.FC<Props> = ({ icon, label, path }) => {
  const navigate = useNavigate();

  return (
    <Nav.Link
      className="d-flex align-items-center"
      onClick={() => {
        navigate(path);
      }}
    >
      {icon} <span>{label}</span>
    </Nav.Link>
  );
};

export default SideNavItem;
