import { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { BsPiggyBank, BsCreditCard2Back } from "react-icons/bs";
import { AiOutlineBank } from "react-icons/ai";
import axios from "axios";

import { useAuth } from "../AuthContext";

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
  refresh: boolean;
  accounts: Account[];
}

const AccountTileContainer: React.FC<Props> = ({
  setSelectedAccountId,
  selectedAccountId,
  refresh,
}) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId } = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/clients/${userId}/accounts`)
      .then((response) => {
        setAccounts(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("failed to load accounts", err);
        setError(err);
        setIsLoading(false);
      });
  }, [refresh]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading accounts</p>;

  const handleAccountClick = (accountId: number): void => {
    setSelectedAccountId(accountId);
  };

  const getIconByAccountType = (type: string) => {
    switch (type) {
      case "CHECKING":
        return <BsCreditCard2Back />;
      case "SAVINGS":
        return <BsPiggyBank />;
      default:
        return <AiOutlineBank />;
    }
  };

  return (
    <div className="container">
      <div className="row">
        {accounts.map((account) => (
          <AccountTile
            key={account.id}
            label={`${account.type} Account (${account.accountNumber})`}
            Icon={getIconByAccountType(account.type)} // Example icon for all tiles
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
