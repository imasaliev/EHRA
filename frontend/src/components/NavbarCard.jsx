import React from "react";
import logo from "../img/logo192.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
// import Chart from "react-apexcharts";
import Col from "react-bootstrap/Col";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NavbarCard({ appUser }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
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
            <Nav.Link href="#link">FAQ</Nav.Link>
            <Nav.Link href="#link">Contact Us</Nav.Link>
          </Nav>

          {/* <Navbar.Text>
                {mib_uname ? `Signed in as: ${mib_uname}` : null}
              </Navbar.Text> */}

          <Button>
            {appUser ? `${appUser.first_name} - Logout` : `Enroll/Login`}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
