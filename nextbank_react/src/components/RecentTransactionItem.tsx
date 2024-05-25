import React from "react";
import "../styles/Dashboard.css";
import { ListGroupItem } from "react-bootstrap";
import { format } from "date-fns";

interface Account {
  id: number;
  accountNumber: string;
}

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
  accounts: Account[];
}

const RecentTransactionItem: React.FC<Props> = ({
  transaction,
  selectedAccountId,
  accounts,
}) => {
  const getAccountNumber = (accountId: number | null) => {
    const account = accounts.find((account) => account.id === accountId);
    return account ? account.accountNumber : "N/A";
  };

  let amountText;
  let transactionDetails = "";
  let colorClass = "";

  switch (transaction.type) {
    case "TRANSFER":
      if (transaction.donorId == selectedAccountId) {
        amountText = `- ${transaction.amount.toFixed(2)}PLN`;
        colorClass = "text-danger";
        transactionDetails = `To recipient ${getAccountNumber(
          transaction.recipientId
        )}`;
      } else {
        amountText = `+ ${transaction.amount.toFixed(2)}PLN`;
        colorClass = "text-success";
        transactionDetails = `From donor ${getAccountNumber(
          transaction.donorId
        )}`;
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

  const formattedDate = format(new Date(transaction.date), "dd-MM-yyyy HH:mm"); //formatting Date

  return (
    <ListGroupItem>
      <span className={colorClass}>{amountText}</span> {transaction.type}
      {transactionDetails && <span> {transactionDetails}</span>}
      <span> on {formattedDate}</span>
    </ListGroupItem>
  );
};

export default RecentTransactionItem;
