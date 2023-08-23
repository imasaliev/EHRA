// import "bootstrap/dist/css/bootstrap.min.css";
import NavbarCard from "./components/NavbarCard";
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
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { api } from "./utilities";
import { useOutletContext } from "react-router-dom";
import EquipmentCard from "./components/EquipmentCard";
import logo from "./img/logo.svg";

export default function App2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [appUser, setAppUser] = useState(
    JSON.parse(localStorage.getItem("appUser"))
  );
  const [modalChange, setModalChange] = useState({
    id: 0,
    name: "0",
    buy_price: 0,
    sell_price: 0,
    active: false,
  });
  const [currentPrice, setCurrentPrice] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state flag
  const [showLogIn, setShowLogIn] = useState(false);
  const [showECH, setShowECH] = useState(false);
  const [showLCH, setShowLCH] = useState(false);

  const [showLogOut, setShowLogOut] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [validatedSignUp, setValidatedSignUp] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [err, setErr] = useState("");
  const [chartState, setChartState] = useState({
    options: {
      // stroke: { width: 1, curve: "smooth" },
      chart: {
        title: "COMED",
        type: "line",
      },
      dataLabels: {
        enabled: false,
      },

      xaxis: {
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
    },
  });
  useEffect(() => {
    // const apiUrl = "http://127.0.0.1:8000/comedapi";
    const fetchData = async () => {
      try {
        const response = await api.get("api/providers/1/24");

        setChartData(response.data);
        setCurrentPrice(response.data[0].price);

        setLoading(false); // Set loading state to false on successful response
      } catch (error) {
        setErr(error);
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading state to false on error
      }
    };

    fetchData(); // Fetch data initially

    const interval = setInterval(fetchData, 10000); // Fetch data every 10 seconds

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [setLoading]);

  const logIn = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let response = await api
      .post("api/users/login/", {
        email: email,
        password: password,
      })
      .catch((err) => {
        alert("incorrect login");
      });

    let user = response.data.user;
    let token = response.data.token;
    setAppUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("appUser", JSON.stringify(user));
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    setEmail("");
    setPassword("");
    setShowLogIn(false);
  };
  const signUp = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidatedSignUp(false);
    }
    setValidatedSignUp(true);

    let response = await api
      .post("api/users/signup/", {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      })
      .catch((err) => {});

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
    setShowSignup(false);
  };
  const logOut = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAppUser("");
    localStorage.removeItem("token");
    localStorage.removeItem("appUser");
    api.defaults.headers.common["Authorization"] = ``;
  };

  return (
    <div className="container-fluid bg-secondary">
      <Navbar className="text-light" expand="lg">
        <Modal
          show={showLogIn}
          onHide={() => setShowLogIn(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className=""
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>LOGIN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="login.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  value={email}
                  placeholder="name@example.com"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="login.ControlInput2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={logIn}>
              LOG IN
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showSignup}
          onHide={() => setShowSignup(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className=""
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>SIGNUP</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={validatedSignUp} onSubmit={signUp}>
              <Form.Group className="mb-3" controlId="login.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={firstName}
                  placeholder="John"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide first name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="login.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={lastName}
                  placeholder="Doe"
                  autoFocus
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide last name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="login.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  value={email}
                  placeholder="name@example.com"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide email address.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="login.ControlInput2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide password.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>
              <Button type="submit">SIGN UP</Button>
            </Form>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="primary" onClick={signUp}>
              SIGN UP
            </Button>
          </Modal.Footer> */}
        </Modal>

        <Navbar.Brand href="#home" className="text-light">
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
            <Button onClick={() => setShowLogIn(false)}>
              Welcome {appUser.first_name}!
            </Button>
          ) : (
            <Button onClick={() => setShowSignup(true)}>SIGNUP</Button>
          )}
          {appUser ? (
            <Button onClick={logOut}>LOGOUT</Button>
          ) : (
            <Button onClick={() => setShowLogIn(true)}>LOGIN</Button>
          )}
        </Navbar.Collapse>
      </Navbar>

      <Modal
        show={showECH}
        onHide={() => setShowECH(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className=""
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>UPDATE EQUIPMENT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalChange.location_id}
          {"  "}
          {modalChange.id}
          <Form noValidate validated={validatedSignUp} onSubmit={signUp}>
            <Form.Group className="mb-3" controlId="login.ControlInput1">
              <Form.Label>Location</Form.Label>
              <Form.Control
                required
                type="text"
                value={modalChange.location_id}
                placeholder=" "
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide first name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="login.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="text"
                value={lastName}
                placeholder="Doe"
                autoFocus
                onChange={(e) => setLastName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide last name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="login.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                value={email}
                placeholder="name@example.com"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide email address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="login.ControlInput2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <Button type="submit">SIGN UP</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => alert("change")}>
            SIGN UP
          </Button>
        </Modal.Footer>
      </Modal>

      {appUser ? (
        <>
          {appUser.locations.length ? null : (
            <h3
              className="mb-3 d-flex justify-content-center"
              onDoubleClick={() => {
                alert(0);
              }}
            >
              Double Click to add location
            </h3>
          )}
          <Tabs
            id="fill-tab-example"
            className="mb-3 d-flex justify-content-center"
            fill
          >
            {appUser.locations.length ? (
              appUser.locations.map((location, indexL) => (
                <Tab
                  eventKey={location.name}
                  title={location.name}
                  onDoubleClick={() => {
                    setModalChange([indexL, 0]);
                    alert(location.name);
                  }}
                >
                  <Row className="mb-3 d-flex justify-content-center">
                    {location.equipments.length
                      ? location.equipments.map((equipment, indexE) => (
                          <Card
                            style={{
                              padding: 0,
                              width: "8rem",
                              height: "8rem",
                            }}
                            className="bg-primary text-white text-center text-nowrap border-warning rounded-5"
                            onDoubleClick={(e) => {
                              e.stopPropagation();
                              setModalChange(equipment);
                              setShowECH(true);
                            }}
                          >
                            <Card.Body>
                              <Card.Text
                                className={
                                  equipment.sell_price === null
                                    ? "bg-secondary"
                                    : parseFloat(currentPrice) >=
                                      parseFloat(equipment.sell_price)
                                    ? "bg-success"
                                    : "bg-danger"
                                }
                              >
                                {equipment.sell_price
                                  ? "SELL " + equipment.sell_price + "⬆️"
                                  : "NA"}
                              </Card.Text>
                              <Card.Text className="text-uppercase">
                                {equipment.name}{" "}
                              </Card.Text>
                              <Card.Text
                                className={
                                  equipment.buy_price === null
                                    ? "bg-secondary"
                                    : parseFloat(currentPrice) <=
                                      parseFloat(equipment.buy_price)
                                    ? "bg-success"
                                    : "bg-danger"
                                }
                              >
                                {equipment.buy_price
                                  ? "BUY " + equipment.buy_price + "⬇️"
                                  : "NA"}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        ))
                      : null}
                  </Row>
                  <Row className="mb-3 d-flex justify-content-center">
                    <h3
                      className="mb-3 d-flex justify-content-center"
                      onDoubleClick={() => {
                        alert(0);
                      }}
                    >
                      Double Click to add equipment
                    </h3>
                  </Row>
                  <Row>
                    <Chart
                      className="bg-secondary"
                      options={{
                        ...chartState.options,

                        title: {
                          text:
                            "COMED CURRENT RATE: " +
                            currentPrice +
                            "C  PER KWH. LAST UPDATE:  " +
                            new Date().toLocaleString(),
                          align: "CENTER",
                          margin: 10,
                          offsetX: 0,
                          offsetY: 0,
                          floating: true,
                          style: {
                            fontSize: "60 PX",
                            fontWeight: "bold",
                            fontFamily: undefined,
                            color: "DARK",
                          },
                        },
                      }}
                      series={[
                        {
                          name: "series1",
                          data: chartData
                            .reverse()
                            .map((x) => [x.millisUTC - 18000000, x.price]),
                        },
                      ]}
                      type="line"
                    />
                  </Row>
                </Tab>
              ))
            ) : (
              <h1>alsjdf;l</h1>
            )}
          </Tabs>
        </>
      ) : (
        <h1>alsjdf;l</h1>
      )}
    </div>
  );
}
