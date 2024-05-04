import { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { BsPiggyBank } from "react-icons/bs";
import axios from "axios";

import AccountTile from "./AccountTile";

interface Account {
  id: number;
  type: string;
  accountNumber: string | null;
  balance: number;
  ownerId: number;
}

interface Props {
  setSelectedAccountId: (id: number | null) => void;
  selectedAccountId: number | null;
}

const AccountTileContainer: React.FC<Props> = ({
  setSelectedAccountId,
  selectedAccountId,
}) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/clients/1/accounts")
      .then((response) => {
        setAccounts(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("failed to load accounts", err);
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading accounts</p>;

  const handleAccountClick = (accountId: number): void => {
    setSelectedAccountId(accountId);
  };

  return (
    <div className="container">
      <div className="row">
        {accounts.map((account) => (
          <AccountTile
            key={account.id}
            label={account.type + " Account"}
            Icon={<BsPiggyBank />} // Example icon for all tiles
            balance={account.balance ? account.balance.toFixed(2) : "N/A"}
            onClick={() => handleAccountClick(account.id)}
            isSelected={account.id === selectedAccountId}
          />
        ))}
      </div>
    </div>
  );
};

export default AccountTileContainer;
