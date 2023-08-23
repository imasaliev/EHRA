import { useContext } from "react";
import logo from "../img/logo.svg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AppContext from "../contexts/AppContext";
import Modal from "react-bootstrap/Modal";
import { useOutletContext } from "react-router-dom";

export default function NavbarCard() {
  // const { appUser, setAppUser } = useOutletContext();
  let appUser = "";
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log("navbar");
    console.log(appUser);
  }, [appUser]);
  return (
    <Navbar className="bg-secondary text-light" expand="lg">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar.Brand href="#home" className="bg-secondary text-light">
        <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        EHRA
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="me-auto">
          <Nav.Link className="text-light" href="#link">
            FAQ
          </Nav.Link>
          <Nav.Link className="text-light" href="#link">
            Contact Us
          </Nav.Link>
        </Nav>

        {appUser ? (
          <Button onClick={handleShow}>Welcome {appUser.first_name}!</Button>
        ) : (
          <Button onClick={handleShow}>SIGNUP</Button>
        )}
        {appUser ? (
          <Button onClick={handleShow}>LOGOUT</Button>
        ) : (
          <Button onClick={handleShow}>LOGIN</Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
