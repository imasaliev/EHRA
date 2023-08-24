import Card from "react-bootstrap/Card";
import EquipmentChange from "../modals/EquipmentChange";

export default function EquipmentCard({
  equipment,
  currentPrice,
  appUser,
  setAppUser,
}) {
  return (
    <Card
      style={{
        padding: 0,
        width: "10rem",
        height: "10rem",
      }}
      className="bg-primary text-white text-center text-nowrap rounded-5"
    >
      <Card.Body>
        <Card.Text
          className={
            equipment.sell_price === null
              ? "bg-secondary"
              : parseFloat(currentPrice) >= parseFloat(equipment.sell_price)
              ? "bg-success"
              : "bg-danger"
          }
        >
          {equipment.sell_price ? "SELL " + equipment.sell_price + "⬆️" : "NA"}
        </Card.Text>
        <EquipmentChange
          equipment={equipment}
          appUser={appUser}
          setAppUser={setAppUser}
        />

        <Card.Text
          className={
            equipment.buy_price === null
              ? "bg-secondary"
              : parseFloat(currentPrice) <= parseFloat(equipment.buy_price)
              ? "bg-success"
              : "bg-danger"
          }
        >
          {equipment.buy_price ? "BUY " + equipment.buy_price + "⬇️" : "NA"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
