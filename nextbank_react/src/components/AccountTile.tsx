import React from "react";
import "../styles/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col } from "react-bootstrap";

interface Props {
  label: string;
  Icon: JSX.Element;
  balance: string | number;
  onClick: () => void;
  isSelected: boolean;
}

const AccountTile: React.FC<Props> = ({
  label,
  Icon,
  balance,
  onClick,
  isSelected,
}) => {
  const sizedIcon = React.cloneElement(Icon, { size: "1.5em" });
  const cardClass = isSelected
    ? "account-tile selected text-center"
    : "account-tile text-center";
  return (
    <Col>
      <Card className={cardClass} onClick={onClick}>
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
