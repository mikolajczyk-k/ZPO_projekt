import React from "react";
import "../styles/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

interface Props {
  selectedAccountId: number | null;
}

const RecentTransactionsContainer: React.FC<Props> = ({
  selectedAccountId,
}) => {
  return <span>{selectedAccountId}</span>;
};

export default RecentTransactionsContainer;
