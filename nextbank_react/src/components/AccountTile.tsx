import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col } from "react-bootstrap";

interface Props {
  label: string;
  Icon: React.ReactNode;
  balance: string | number;
}

const AccountTile: React.FC<Props> = ({ label, Icon, balance }) => {
  return (
    <Col>
      <Card className="text-center" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{label}</Card.Title>
          <Card.Text className="d-flex justify-content-between align-items-center">
            <div className="icon">{Icon}</div>
            <div className="balance">{balance}</div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AccountTile;
