import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { BsCreditCard2Back } from "react-icons/bs";
import axios from "axios";

import AccountTile from "./AccountTile";

const accountTiles = [
  { label: "Checking", Icon: <BsCreditCard2Back />, balance: "10.000" },
  { label: "Savings", Icon: <BsCreditCard2Back />, balance: "20.000" },
  { label: "Investment", Icon: <BsCreditCard2Back />, balance: "15.000" },
  { label: "Joint Account", Icon: <BsCreditCard2Back />, balance: "5.000" },
  { label: "Checking", Icon: <BsCreditCard2Back />, balance: "10.000" },
  { label: "Savings", Icon: <BsCreditCard2Back />, balance: "20.000" },
  { label: "Investment", Icon: <BsCreditCard2Back />, balance: "15.000" },
  { label: "Joint Account", Icon: <BsCreditCard2Back />, balance: "5.000" },
  { label: "Checking", Icon: <BsCreditCard2Back />, balance: "10.000" },
  { label: "Savings", Icon: <BsCreditCard2Back />, balance: "20.000" },
  { label: "Investment", Icon: <BsCreditCard2Back />, balance: "15.000" },
  { label: "Joint Account", Icon: <BsCreditCard2Back />, balance: "5.000" },
  // Add more AccountTile data as needed
];

const AccountTileContainer: React.FC = () => {
  const [accounts, setAccounts] = useState([]);
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
        console.error("Failed to load accounts", err);
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Lodaing...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }
  return (
    <div>
      <pre>{JSON.stringify(accounts, null, 2)}</pre>
    </div>
  );

  /*<Container>
      <Row>
        {accountTiles.map((tile, index) => (
          // Adjust the Col size props as needed for your design
          // This example uses 4 tiles per row on medium screens, 6 on large screens, etc.
          <Col key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
            <AccountTile
              label={tile.label}
              Icon={tile.Icon}
              balance={tile.balance}
              onClick={() => {}}
              isSelected={false}
            />
          </Col>
        ))}
      </Row>
    </Container>*/
};

export default AccountTileContainer;
