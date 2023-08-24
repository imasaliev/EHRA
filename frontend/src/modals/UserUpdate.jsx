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

export default function UserUpdate({ appUser, setAppUser }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState(appUser.email);
  const [firstName, setFirstName] = useState(appUser.first_name);
  const [lastName, setLastName] = useState(appUser.last_name);
  const [password, setPassword] = useState(appUser.password);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateUser = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let response = await api
      .put(`api/users/`, {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
      })
      .catch((err) => {
        console.log(err);
        alert("incorrect user update");
      });
    let user = response.data;
    setAppUser(user);
    localStorage.setItem("appUser", JSON.stringify(user));
    setShow(false);
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let flagErr = true;
    let response = await api.delete(`api/users/`, {}).catch((err) => {
      console.log(err);
      alert("incorrect user delete");
      flagErr = false;
    });
    if (flagErr) {
      setAppUser("");
      localStorage.removeItem("token");
      localStorage.removeItem("appUser");
      api.defaults.headers.common["Authorization"] = ``;
      setShow(false);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {"Welcome: " + appUser.first_name.toUpperCase()}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>User Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateUser}>
            <Form.Group className="mb-3" controlId="userUpdate.ControlInput1">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                placeholder="John"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userUpdate.ControlInput2">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                placeholder="Doe"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userUpdate.ControlInput3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userUpdate.ControlInput4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Update</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
