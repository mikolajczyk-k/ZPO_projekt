import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";
import RecentTransactionItem from "./RecentTransactionItem";

interface Props {
  selectedAccountId: number | null;
  refresh: boolean;
  accounts: Account[];
}

interface Transaction {
  id: number;
  type: string;
  amount: number;
  donorId: number | null;
  recipientId: number | null;
  date: string;
}

interface Account {
  id: number;
  accountNumber: string;
  type: string;
  balance: number;
  ownerId: number;
}

const RecentTransactionsContainer: React.FC<Props> = ({
  selectedAccountId,
  accounts,
  refresh,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedAccountId !== null) {
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
    } else {
      setTransactions([]);
      setIsLoading(false);
    }
  }, [selectedAccountId, refresh]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const latestTransactions = transactions.slice(0, 5);

  return (
    <ListGroup>
      {latestTransactions.map((transaction) => (
        <RecentTransactionItem
          key={transaction.id}
          selectedAccountId={selectedAccountId}
          transaction={transaction}
          accounts={accounts}
        />
      ))}
    </ListGroup>
  );
};

export default RecentTransactionsContainer;
