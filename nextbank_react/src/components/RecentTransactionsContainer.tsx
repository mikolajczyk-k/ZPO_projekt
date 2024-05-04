import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

interface Props {
  selectedAccountId: number | null;
}

interface Transaction {
  id: number;
  type: string;
  donorId: number | null;
  recipientId: number | null;
  date: string;
}

const RecentTransactionsContainer: React.FC<Props> = ({
  selectedAccountId,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/transactions/account/${selectedAccountId}?fromDate=2023-01-01`
      )
      .then((response) => {
        setTransactions(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("failed to load transactions");
        setError(err);
        setIsLoading(false);
      });
  }, []);
  return <></>;
};

export default RecentTransactionsContainer;
