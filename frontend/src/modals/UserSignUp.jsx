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

export default function UserSignUp({ appUser, setAppUser }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signUpUser = async (e) => {
    api.defaults.headers.common["Authorization"] = "";
    e.preventDefault();
    e.stopPropagation();
    let response = await api
      .post(`api/users/signup/`, {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
      })
      .catch((err) => {
        console.log(err);
        alert("incorrect user sign up");
      });
    let user = response.data.user;
    let token = response.data.token;
    setAppUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("appUser", JSON.stringify(user));
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        SIGNUP
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>User Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={signUpUser}>
            <Form.Group className="mb-3" controlId="userSignUp.ControlInput1">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                placeholder="John"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userSignUp.ControlInput2">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                placeholder="Doe"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userSignUp.ControlInput3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userSignUp.ControlInput4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Sign Up</Button>
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
