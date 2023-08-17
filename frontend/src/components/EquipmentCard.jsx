import Card from "react-bootstrap/Card";
import logo from "../img/logo192.png";
import { useOutletContext } from "react-router-dom";

export default function EquipmentCard({ equip }) {
  const { currentPrice } = useOutletContext();

  return (
    <Card
      style={{
        padding: 0,
        width: "8rem",
        height: "8rem",
      }}
      className="bg-primary text-white text-center text-nowrap border-warning rounded-5
      "
    >
      {/* <Card.Img variant="top" src={logo} /> */}
      <Card.Body>
        {/* <Card.Text>{equip.sell_price === null ? "true" : "asdf"} </Card.Text> */}
        {/* <Card.Text>{currentPrice}</Card.Text> */}
        <Card.Text
          className={
            equip.sell_price === null
              ? "bg-secondary"
              : parseFloat(currentPrice) >= parseFloat(equip.sell_price)
              ? "bg-success"
              : "bg-danger"
          }
        >
          {equip.sell_price ? "SELL " + equip.sell_price + "⬆️" : "NA"}
        </Card.Text>
        <Card.Text className="text-uppercase">{equip.name} </Card.Text>
        <Card.Text
          className={
            equip.buy_price === null
              ? "bg-secondary"
              : parseFloat(currentPrice) <= parseFloat(equip.buy_price)
              ? "bg-success"
              : "bg-danger"
          }
        >
          {equip.buy_price ? "BUY " + equip.buy_price + "⬇️" : "NA"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
