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

export default function EquipmentChange({ equipment, appUser, setAppUser }) {
  const [show, setShow] = useState(false);
  const [location_id, setLocation_id] = useState(equipment.location_id);
  const [name, setName] = useState(equipment.name);
  const [buy_price, setBuy_price] = useState(equipment.buy_price);
  const [sell_price, setSell_price] = useState(equipment.sell_price);

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

  const changeEquipment = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let response = await api
      .put(`api/locations/${location_id}/equipments/${equipment.id}/`, {
        name: name,
        buy_price: buy_price,
        sell_price: sell_price,
      })
      .catch((err) => {
        console.log(err);
        alert("incorrect equipment update");
      });
    getUser(e);
    setShow(false);
  };
  const deleteEquipment = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let response = await api
      .delete(`api/locations/${location_id}/equipments/${equipment.id}/`, {})
      .catch((err) => {
        console.log(err);
        alert("incorrect equipment update");
      });
    getUser(e);
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {equipment.name.toUpperCase()}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Equipment Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={changeEquipment}>
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
            <Button type="submit">Update</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteEquipment}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
