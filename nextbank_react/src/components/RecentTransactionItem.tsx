import React from "react";
import "../styles/Dashboard.css";
import { ListGroupItem } from "react-bootstrap";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  donorId: number | null;
  recipientId: number | null;
  date: string;
}

interface Props {
  selectedAccountId: number | null;
  transaction: Transaction;
}

const RecentTransactionItem: React.FC<Props> = ({
  transaction,
  selectedAccountId,
}) => {
  let amountText;
  let transactionDetails = "";
  let colorClass = "";

  switch (transaction.type) {
    case "TRANSFER":
      if (transaction.donorId == selectedAccountId) {
        amountText = `- ${transaction.amount.toFixed(2)}PLN`;
        colorClass = "text-danger";
        transactionDetails = `To recipient ${transaction.recipientId}`;
      } else {
        amountText = `+ ${transaction.amount.toFixed(2)}PLN`;
        colorClass = "text-success";
        transactionDetails = `From donor ${transaction.donorId}`;
      }
      break;
    case "DEPOSIT":
      amountText = ` + ${transaction.amount.toFixed(2)}PLN`;
      colorClass = "text-success";
      transactionDetails = "";
      break;
    case "WITHDRAWAL":
      amountText = `- ${transaction.amount.toFixed(2)}PLN`;
      colorClass = "text-danger";
      transactionDetails = "";
      break;
    default:
      amountText = `$${transaction.amount.toFixed(2)}`;
      break;
  }
  return (
    <ListGroupItem>
      <span className={colorClass}>{amountText}</span> {transaction.type}
      {transactionDetails && <span> {transactionDetails}</span>}
      <span> on {transaction.date}</span>
    </ListGroupItem>
  );
};

export default RecentTransactionItem;
