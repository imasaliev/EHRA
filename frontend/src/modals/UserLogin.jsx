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

export default function UserLogin({ appUser, setAppUser }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logIn = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let flagErr = true;
    let response = await api
      .post("api/users/login/", {
        email: email,
        password: password,
      })
      .catch((err) => {
        alert("incorrect login");
        flagErr = false;
      });

    if (flagErr) {
      let user = response.data.user;
      let token = response.data.token;
      setAppUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("appUser", JSON.stringify(user));
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      setShow(false);
    } else {
      setAppUser("");
      setShow(true);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        LOGIN
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>User Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={logIn}>
            <Form.Group className="mb-3" controlId="userLogin.ControlInput3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userLogin.ControlInput4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Login</Button>
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
