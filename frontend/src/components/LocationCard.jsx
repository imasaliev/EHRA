import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import logo from "../img/logo192.png";

export default function LocationCard({ loc }) {
  return (
    <Card style={{ width: "18rem" }} className="bg-danger text-white">
      <Card.Img variant="top" src={logo} />
      <Card.Body>
        <Card.Title>{loc.name}</Card.Title>
        <Card.Text>{loc.id}</Card.Text>
        <Card.Text>{loc.address}</Card.Text>
        <Card.Text>{loc.provider}</Card.Text>
        <Card.Text>{loc.active}</Card.Text>
      </Card.Body>
    </Card>
  );
}
