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

export default function LocationChange({ location, appUser, setAppUser }) {
  const [show, setShow] = useState(false);
  const [provider_id, setProvider_id] = useState(location.provider_id.id);
  const [name, setName] = useState(location.name);
  const [address, setAddress] = useState(location.address);

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

  const changeLocation = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let response = await api
      .put(`api/locations/${location.id}/`, {
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
  const deleteLocation = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let response = await api
      .delete(`api/locations/${location.id}/`, {})
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
        {location.name.toUpperCase() + ": " + location.address.toUpperCase()}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Location Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={changeLocation}>
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

            <Button type="submit">Update</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteLocation}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
