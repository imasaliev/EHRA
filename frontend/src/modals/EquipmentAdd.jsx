import { useState } from "react";
import {
  Container,
  Button,
  Row,
  Image,
  Col,
  Carousel,
  Nav,
  Navbar,
  NavDropdown,
  Modal,
  Form,
  Card,
  Pagination,
  Tab,
  Tabs,
} from "react-bootstrap";
import { api } from "../utilities";

export default function EquipmentAdd({ location, appUser, setAppUser }) {
  const [show, setShow] = useState(false);
  const [location_id, setLocation_id] = useState(location.id);
  const [name, setName] = useState("");
  const [buy_price, setBuy_price] = useState("");
  const [sell_price, setSell_price] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUser = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    let response = await api.get("api/users/", {}).catch((err) => {
      alert("incorrect login");
    });

    let user = response.data;
    setAppUser(user);
    localStorage.setItem("appUser", JSON.stringify(user));
  };

  const addEquipment = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let response = await api
      .post(`api/locations/${location_id}/equipments/`, {
        location_id: location_id,
        name: name,
        buy_price: buy_price,
        sell_price: sell_price,
      })
      .catch((err) => {
        console.log(err);
        alert("incorrect equipment add");
      });
    getUser(e);
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Equipment
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Equipment Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addEquipment}>
            <Form.Group
              className="mb-3"
              controlId="changeEquipment.ControlInput2"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder=""
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="changeEquipment.ControlInput3"
            >
              <Form.Label>Buy price</Form.Label>
              <Form.Control
                type="text"
                value={buy_price}
                placeholder=""
                onChange={(e) => setBuy_price(e.target.value)}
              />
            </Form.Group>{" "}
            <Form.Group
              className="mb-3"
              controlId="changeEquipment.ControlInput4"
            >
              <Form.Label>Sell price</Form.Label>
              <Form.Control
                type="text"
                value={sell_price}
                placeholder=""
                onChange={(e) => setSell_price(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Add</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
