import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiLogout } from "react-icons/ci";

import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const LogOutButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Button
      className="btn btn-danger w-100"
      style={{ marginTop: "15px", padding: "10px" }}
      onClick={() => {
        navigate("/home");
      }}
    >
      <CiLogout /> Log Out
    </Button>
  );
};
export default LogOutButton;
