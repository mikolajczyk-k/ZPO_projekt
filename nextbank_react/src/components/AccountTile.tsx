import React from "react";
import "../styles/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col } from "react-bootstrap";

interface Props {
  label: string;
  Icon: JSX.Element;
  balance: string | number;
}

const AccountTile: React.FC<Props> = ({ label, Icon, balance }) => {
  const sizedIcon = React.cloneElement(Icon, { size: "1.5em" });
  return (
    <Col>
      <Card className="text-center account-tile">
        <Card.Header className="account-tile-header">{label}</Card.Header>
        <Card.Body>
          <Card.Text className="d-flex justify-content-between align-items-center">
            <div className="icon">{sizedIcon}</div>
            <div className="balance">{balance + "zł"}</div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AccountTile;
