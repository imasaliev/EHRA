import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { api } from "../utilities";
import logo from "../img/logo.svg";
import UserUpdate from "../modals/UserUpdate";
import UserLogin from "../modals/UserLogin";
import UserSignUp from "../modals/UserSignUp";
import FAQ from "../modals/FAQ";
import ContactUs from "../modals/ContactUs";

export default function NavbarCard({ appUser, setAppUser }) {
  const logOut = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAppUser("");
    localStorage.removeItem("token");
    localStorage.removeItem("appUser");
    api.defaults.headers.common["Authorization"] = ``;
  };
  return (
    <Navbar className="text-light" expand="lg">
      <Navbar.Brand href="#home" className="text-light">
        <img
          alt="logo"
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
          <FAQ />
          <ContactUs />
        </Nav>
        {appUser ? (
          <>
            <UserUpdate appUser={appUser} setAppUser={setAppUser} />
            <Button onClick={logOut}>LOGOUT</Button>
          </>
        ) : (
          <>
            <UserSignUp appUser={appUser} setAppUser={setAppUser} />
            <UserLogin appUser={appUser} setAppUser={setAppUser} />
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
