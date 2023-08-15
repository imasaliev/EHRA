import Card from "react-bootstrap/Card";
import logo from "../img/logo192.png";

export default function EquipmentCard({ equip }) {
  return (
    <Card
      style={{ width: "10rem" }}
      className="bg-success text-white text-center "
    >
      <Card.Img variant="top" src={logo} />
      <Card.Body>
        <Card.Title>{equip.name}</Card.Title>
        <Card.Text>{equip.id}</Card.Text>
        <Card.Text>{equip.buy_price}</Card.Text>
        <Card.Text>{equip.sell_price}</Card.Text>
        <Card.Text>{equip.active}</Card.Text>
      </Card.Body>
    </Card>
  );
}
