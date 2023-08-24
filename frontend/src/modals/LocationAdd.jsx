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

export default function LocationAdd({ appUser, setAppUser }) {
  const [show, setShow] = useState(false);
  const [provider_id, setProvider_id] = useState(1);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

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

  const addLocation = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let response = await api
      .post(`api/locations/`, {
        provider_id: provider_id,
        name: name,
        address: address,
      })
      .catch((err) => {
        console.log(err);
        alert("incorrect location update");
      });
    getUser(e);
    setShow(false);
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Location
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Location Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addLocation}>
            <Form.Group
              className="mb-3"
              controlId="changeLocation.ControlInput0"
            >
              <Form.Label>Provider id</Form.Label>
              <Form.Control
                type="text"
                value={provider_id}
                placeholder=""
                onChange={(e) => setProvider_id(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="changeLocation.ControlInput1"
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
              controlId="changeLocation.ControlInput2"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                placeholder=""
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Button type="submit">Add</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
