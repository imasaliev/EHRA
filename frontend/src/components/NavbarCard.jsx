import { useContext } from "react";
import logo from "../img/logo192.png";
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

export default function NavbarCard() {
  const { appUser, setAppUser } = useContext(AppContext);
  useEffect(() => {
    console.log("navbar");
    console.log(appUser);
  }, [appUser]);
  return (
    <Navbar className="bg-dark text-light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="150rem"
            height="150rem"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link className="bg-dark text-light" href="#link">
              FAQ
            </Nav.Link>
            <Nav.Link className="bg-dark text-light" href="#link">
              Contact Us
            </Nav.Link>
          </Nav>

          {/* <Navbar.Text>
                {mib_uname ? `Signed in as: ${mib_uname}` : null}
              </Navbar.Text> */}

          <Button>
            {appUser ? `Welcome ${appUser.first_name}!` : `SIGNUP`}
          </Button>
          <Button>{appUser ? `LOGOUT` : `LOGIN`}</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
