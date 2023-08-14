import logo from "./img/logo.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Chart from "react-apexcharts";
import Col from "react-bootstrap/Col";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  let dates = [
    { millisUTC: "1691987400000", price: "2.6" },
    { millisUTC: "1691987100000", price: "3.1" },
    { millisUTC: "1691986800000", price: "3.0" },
    { millisUTC: "1691986500000", price: "4.9" },
    { millisUTC: "1691986200000", price: "2.6" },
    { millisUTC: "1691985900000", price: "2.9" },
    { millisUTC: "1691985600000", price: "2.4" },
    { millisUTC: "1691985300000", price: "4.0" },
    { millisUTC: "1691985000000", price: "2.4" },
    { millisUTC: "1691984700000", price: "3.1" },
    { millisUTC: "1691984400000", price: "2.0" },
    { millisUTC: "1691984100000", price: "2.4" },
    { millisUTC: "1691983800000", price: "2.4" },
    { millisUTC: "1691983500000", price: "3.9" },
    { millisUTC: "1691983200000", price: "3.4" },
    { millisUTC: "1691982900000", price: "4.9" },
    { millisUTC: "1691982600000", price: "2.2" },
    { millisUTC: "1691982300000", price: "2.9" },
    { millisUTC: "1691982000000", price: "2.2" },
    { millisUTC: "1691981700000", price: "2.0" },
    { millisUTC: "1691981400000", price: "2.3" },
    { millisUTC: "1691981100000", price: "2.4" },
    { millisUTC: "1691980800000", price: "2.0" },
    { millisUTC: "1691980500000", price: "2.7" },
    { millisUTC: "1691980200000", price: "2.1" },
    { millisUTC: "1691979900000", price: "2.3" },
    { millisUTC: "1691979600000", price: "2.5" },
    { millisUTC: "1691979300000", price: "2.9" },
    { millisUTC: "1691979000000", price: "3.5" },
    { millisUTC: "1691978700000", price: "3.6" },
    { millisUTC: "1691978400000", price: "2.5" },
    { millisUTC: "1691978100000", price: "2.7" },
    { millisUTC: "1691977800000", price: "2.2" },
    { millisUTC: "1691977500000", price: "2.7" },
    { millisUTC: "1691977200000", price: "3.3" },
    { millisUTC: "1691976900000", price: "3.3" },
    { millisUTC: "1691976600000", price: "2.7" },
    { millisUTC: "1691976300000", price: "2.7" },
    { millisUTC: "1691976000000", price: "3.6" },
    { millisUTC: "1691975700000", price: "4.3" },
    { millisUTC: "1691975400000", price: "3.4" },
    { millisUTC: "1691975100000", price: "3.7" },
    { millisUTC: "1691974800000", price: "3.7" },
    { millisUTC: "1691974500000", price: "3.6" },
    { millisUTC: "1691974200000", price: "3.9" },
    { millisUTC: "1691973900000", price: "3.7" },
    { millisUTC: "1691973600000", price: "3.4" },
    { millisUTC: "1691973300000", price: "4.2" },
    { millisUTC: "1691973000000", price: "3.4" },
    { millisUTC: "1691972700000", price: "3.7" },
    { millisUTC: "1691972400000", price: "3.8" },
    { millisUTC: "1691972100000", price: "4.0" },
    { millisUTC: "1691971800000", price: "3.3" },
    { millisUTC: "1691971500000", price: "4.7" },
    { millisUTC: "1691971200000", price: "3.2" },
    { millisUTC: "1691970900000", price: "4.4" },
    { millisUTC: "1691970600000", price: "4.4" },
    { millisUTC: "1691970300000", price: "4.6" },
    { millisUTC: "1691970000000", price: "4.4" },
    { millisUTC: "1691969700000", price: "4.1" },
    { millisUTC: "1691969400000", price: "4.6" },
    { millisUTC: "1691969100000", price: "4.4" },
    { millisUTC: "1691968800000", price: "4.6" },
    { millisUTC: "1691968500000", price: "5.0" },
    { millisUTC: "1691968200000", price: "5.2" },
    { millisUTC: "1691967900000", price: "6.9" },
    { millisUTC: "1691967600000", price: "9.1" },
    { millisUTC: "1691967300000", price: "6.9" },
    { millisUTC: "1691967000000", price: "9.2" },
    { millisUTC: "1691966700000", price: "6.3" },
    { millisUTC: "1691966400000", price: "4.7" },
    { millisUTC: "1691966100000", price: "7.4" },
    { millisUTC: "1691965800000", price: "4.7" },
    { millisUTC: "1691965500000", price: "4.6" },
    { millisUTC: "1691965200000", price: "4.1" },
    { millisUTC: "1691964900000", price: "4.4" },
    { millisUTC: "1691964600000", price: "4.4" },
    { millisUTC: "1691964300000", price: "4.3" },
    { millisUTC: "1691964000000", price: "4.7" },
    { millisUTC: "1691963700000", price: "4.7" },
    { millisUTC: "1691963400000", price: "4.7" },
    { millisUTC: "1691963100000", price: "5.1" },
    { millisUTC: "1691962800000", price: "6.3" },
    { millisUTC: "1691962500000", price: "6.7" },
    { millisUTC: "1691962200000", price: "5.3" },
    { millisUTC: "1691961900000", price: "6.9" },
    { millisUTC: "1691961600000", price: "7.9" },
    { millisUTC: "1691961300000", price: "7.5" },
    { millisUTC: "1691961000000", price: "3.5" },
    { millisUTC: "1691960700000", price: "7.9" },
    { millisUTC: "1691960400000", price: "4.5" },
    { millisUTC: "1691960100000", price: "6.6" },
    { millisUTC: "1691959800000", price: "5.4" },
    { millisUTC: "1691959500000", price: "5.1" },
    { millisUTC: "1691959200000", price: "5.2" },
    { millisUTC: "1691958900000", price: "6.1" },
    { millisUTC: "1691958600000", price: "5.9" },
    { millisUTC: "1691958300000", price: "5.0" },
    { millisUTC: "1691958000000", price: "5.0" },
    { millisUTC: "1691957700000", price: "4.6" },
    { millisUTC: "1691957400000", price: "15.1" },
    { millisUTC: "1691957100000", price: "5.0" },
    { millisUTC: "1691956800000", price: "4.5" },
    { millisUTC: "1691956500000", price: "4.8" },
    { millisUTC: "1691956200000", price: "5.1" },
    { millisUTC: "1691955900000", price: "5.2" },
    { millisUTC: "1691955600000", price: "4.5" },
    { millisUTC: "1691955300000", price: "4.5" },
    { millisUTC: "1691955000000", price: "4.7" },
    { millisUTC: "1691954700000", price: "4.7" },
    { millisUTC: "1691954400000", price: "5.0" },
    { millisUTC: "1691954100000", price: "5.1" },
    { millisUTC: "1691953800000", price: "4.7" },
    { millisUTC: "1691953500000", price: "3.2" },
    { millisUTC: "1691953200000", price: "3.8" },
    { millisUTC: "1691952900000", price: "5.0" },
    { millisUTC: "1691952600000", price: "12.9" },
    { millisUTC: "1691952300000", price: "6.8" },
    { millisUTC: "1691952000000", price: "4.1" },
    { millisUTC: "1691951700000", price: "4.6" },
    { millisUTC: "1691951400000", price: "4.4" },
    { millisUTC: "1691951100000", price: "4.5" },
    { millisUTC: "1691950800000", price: "3.2" },
    { millisUTC: "1691950500000", price: "4.1" },
    { millisUTC: "1691950200000", price: "3.7" },
    { millisUTC: "1691949900000", price: "4.8" },
    { millisUTC: "1691949600000", price: "4.6" },
    { millisUTC: "1691949300000", price: "3.9" },
    { millisUTC: "1691949000000", price: "4.3" },
    { millisUTC: "1691948700000", price: "4.1" },
    { millisUTC: "1691948400000", price: "3.6" },
    { millisUTC: "1691948100000", price: "4.4" },
    { millisUTC: "1691947800000", price: "4.1" },
    { millisUTC: "1691947500000", price: "4.7" },
    { millisUTC: "1691947200000", price: "4.1" },
    { millisUTC: "1691946900000", price: "5.0" },
    { millisUTC: "1691946600000", price: "2.9" },
    { millisUTC: "1691946300000", price: "3.3" },
    { millisUTC: "1691946000000", price: "4.3" },
    { millisUTC: "1691945700000", price: "3.6" },
    { millisUTC: "1691945400000", price: "4.5" },
    { millisUTC: "1691945100000", price: "3.8" },
    { millisUTC: "1691944800000", price: "5.1" },
    { millisUTC: "1691944500000", price: "4.8" },
    { millisUTC: "1691944200000", price: "4.7" },
    { millisUTC: "1691943900000", price: "4.2" },
    { millisUTC: "1691943600000", price: "4.8" },
    { millisUTC: "1691943300000", price: "3.3" },
    { millisUTC: "1691943000000", price: "3.3" },
    { millisUTC: "1691942700000", price: "2.6" },
    { millisUTC: "1691942400000", price: "2.7" },
    { millisUTC: "1691942100000", price: "3.6" },
    { millisUTC: "1691941800000", price: "3.1" },
    { millisUTC: "1691941500000", price: "5.3" },
    { millisUTC: "1691941200000", price: "3.9" },
    { millisUTC: "1691940900000", price: "5.1" },
    { millisUTC: "1691940600000", price: "5.4" },
    { millisUTC: "1691940300000", price: "5.0" },
    { millisUTC: "1691940000000", price: "3.4" },
    { millisUTC: "1691939700000", price: "3.6" },
    { millisUTC: "1691939400000", price: "3.2" },
    { millisUTC: "1691939100000", price: "2.7" },
    { millisUTC: "1691938800000", price: "2.6" },
    { millisUTC: "1691938500000", price: "2.6" },
    { millisUTC: "1691938200000", price: "2.6" },
    { millisUTC: "1691937900000", price: "2.3" },
    { millisUTC: "1691937600000", price: "2.2" },
    { millisUTC: "1691937300000", price: "2.5" },
    { millisUTC: "1691937000000", price: "3.1" },
    { millisUTC: "1691936700000", price: "2.7" },
    { millisUTC: "1691936400000", price: "2.2" },
    { millisUTC: "1691936100000", price: "2.1" },
    { millisUTC: "1691935800000", price: "2.1" },
    { millisUTC: "1691935500000", price: "2.3" },
    { millisUTC: "1691935200000", price: "2.3" },
    { millisUTC: "1691934900000", price: "2.5" },
    { millisUTC: "1691934600000", price: "2.6" },
    { millisUTC: "1691934300000", price: "2.9" },
    { millisUTC: "1691934000000", price: "2.6" },
    { millisUTC: "1691933700000", price: "3.4" },
    { millisUTC: "1691933400000", price: "3.2" },
    { millisUTC: "1691933100000", price: "5.4" },
    { millisUTC: "1691932800000", price: "4.9" },
    { millisUTC: "1691932500000", price: "2.5" },
    { millisUTC: "1691932200000", price: "2.5" },
    { millisUTC: "1691931900000", price: "2.5" },
    { millisUTC: "1691931600000", price: "2.5" },
    { millisUTC: "1691931300000", price: "2.2" },
    { millisUTC: "1691931000000", price: "2.2" },
    { millisUTC: "1691930700000", price: "2.3" },
    { millisUTC: "1691930400000", price: "2.2" },
    { millisUTC: "1691930100000", price: "2.2" },
    { millisUTC: "1691929800000", price: "2.3" },
    { millisUTC: "1691929500000", price: "2.0" },
    { millisUTC: "1691929200000", price: "2.2" },
    { millisUTC: "1691928900000", price: "2.0" },
    { millisUTC: "1691928600000", price: "1.7" },
    { millisUTC: "1691928300000", price: "1.8" },
    { millisUTC: "1691928000000", price: "1.6" },
    { millisUTC: "1691927700000", price: "1.5" },
    { millisUTC: "1691927400000", price: "1.7" },
    { millisUTC: "1691927100000", price: "1.7" },
    { millisUTC: "1691926800000", price: "1.7" },
    { millisUTC: "1691926500000", price: "1.7" },
    { millisUTC: "1691926200000", price: "1.7" },
    { millisUTC: "1691925900000", price: "1.7" },
    { millisUTC: "1691925600000", price: "1.7" },
    { millisUTC: "1691925300000", price: "1.6" },
    { millisUTC: "1691925000000", price: "1.6" },
    { millisUTC: "1691924700000", price: "1.7" },
    { millisUTC: "1691924400000", price: "1.7" },
    { millisUTC: "1691924100000", price: "1.7" },
    { millisUTC: "1691923800000", price: "1.8" },
    { millisUTC: "1691923500000", price: "1.8" },
    { millisUTC: "1691923200000", price: "1.8" },
    { millisUTC: "1691922900000", price: "1.7" },
    { millisUTC: "1691922600000", price: "1.7" },
    { millisUTC: "1691922300000", price: "1.6" },
    { millisUTC: "1691922000000", price: "1.8" },
    { millisUTC: "1691921700000", price: "1.8" },
    { millisUTC: "1691921400000", price: "1.6" },
    { millisUTC: "1691921100000", price: "1.8" },
    { millisUTC: "1691920800000", price: "1.8" },
    { millisUTC: "1691920500000", price: "1.9" },
    { millisUTC: "1691920200000", price: "1.8" },
    { millisUTC: "1691919900000", price: "1.7" },
    { millisUTC: "1691919600000", price: "1.8" },
    { millisUTC: "1691919300000", price: "1.8" },
    { millisUTC: "1691919000000", price: "1.8" },
    { millisUTC: "1691918700000", price: "1.8" },
    { millisUTC: "1691918400000", price: "1.9" },
    { millisUTC: "1691918100000", price: "1.8" },
    { millisUTC: "1691917800000", price: "1.8" },
    { millisUTC: "1691917500000", price: "1.9" },
    { millisUTC: "1691917200000", price: "1.8" },
    { millisUTC: "1691916900000", price: "2.0" },
    { millisUTC: "1691916600000", price: "1.9" },
    { millisUTC: "1691916300000", price: "2.0" },
    { millisUTC: "1691916000000", price: "2.0" },
    { millisUTC: "1691915700000", price: "2.0" },
    { millisUTC: "1691915400000", price: "2.0" },
    { millisUTC: "1691915100000", price: "2.0" },
    { millisUTC: "1691914800000", price: "1.9" },
    { millisUTC: "1691914500000", price: "1.8" },
    { millisUTC: "1691914200000", price: "2.0" },
    { millisUTC: "1691913900000", price: "2.0" },
    { millisUTC: "1691913600000", price: "1.9" },
    { millisUTC: "1691913300000", price: "1.8" },
    { millisUTC: "1691913000000", price: "1.9" },
    { millisUTC: "1691912700000", price: "2.1" },
    { millisUTC: "1691912400000", price: "2.1" },
    { millisUTC: "1691912100000", price: "2.1" },
    { millisUTC: "1691911800000", price: "2.3" },
    { millisUTC: "1691911500000", price: "2.4" },
    { millisUTC: "1691911200000", price: "2.1" },
    { millisUTC: "1691910900000", price: "2.1" },
    { millisUTC: "1691910600000", price: "2.1" },
    { millisUTC: "1691910300000", price: "2.1" },
    { millisUTC: "1691910000000", price: "2.5" },
    { millisUTC: "1691909700000", price: "2.1" },
    { millisUTC: "1691909400000", price: "2.0" },
    { millisUTC: "1691909100000", price: "1.7" },
    { millisUTC: "1691908800000", price: "2.0" },
    { millisUTC: "1691908500000", price: "2.0" },
    { millisUTC: "1691908200000", price: "2.4" },
    { millisUTC: "1691907900000", price: "2.0" },
    { millisUTC: "1691907600000", price: "2.0" },
    { millisUTC: "1691907300000", price: "2.2" },
    { millisUTC: "1691907000000", price: "2.4" },
    { millisUTC: "1691906700000", price: "2.0" },
    { millisUTC: "1691906400000", price: "2.5" },
    { millisUTC: "1691906100000", price: "2.1" },
    { millisUTC: "1691905800000", price: "1.9" },
    { millisUTC: "1691905500000", price: "2.1" },
    { millisUTC: "1691905200000", price: "2.5" },
    { millisUTC: "1691904900000", price: "2.0" },
    { millisUTC: "1691904600000", price: "2.5" },
    { millisUTC: "1691904300000", price: "2.6" },
    { millisUTC: "1691904000000", price: "2.6" },
    { millisUTC: "1691903700000", price: "2.6" },
    { millisUTC: "1691903400000", price: "2.6" },
    { millisUTC: "1691903100000", price: "2.8" },
    { millisUTC: "1691902800000", price: "2.8" },
    { millisUTC: "1691902500000", price: "2.6" },
    { millisUTC: "1691902200000", price: "2.2" },
    { millisUTC: "1691901900000", price: "2.0" },
    { millisUTC: "1691901600000", price: "2.3" },
  ];
  dates = dates.reverse().map((x) => [x.millisUTC - 18000000, x.price]);
  let mib_uname = "Islomjon";
  const [chartState, setChartState] = useState({
    options: {
      chart: {
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
    series: [
      {
        name: "series1",
        data: dates,
      },
    ],
  });

  return (
    <div className="App">
      <header>
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
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav className="me-auto">
                <Nav.Link href="#link">FAQ</Nav.Link>
                <Nav.Link href="#link">Contact Us</Nav.Link>
              </Nav>

              {/* <Navbar.Text>
                {mib_uname ? `Signed in as: ${mib_uname}` : null}
              </Navbar.Text> */}

              <Button>
                {mib_uname ? `${mib_uname} - Logout` : `Enroll/Login`}
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Row>
            <Col>
              <Chart
                options={chartState.options}
                series={chartState.series}
                type="line"
              />
            </Col>
          </Row>
          <Row className="px-4 my-5">
            <Col sm={2}>
              <Image src="https://picsum.photos/700/400" fluid rounded />
            </Col>
            <Col sm={10}>
              <h1 className="font-weight-light">Tagline</h1>
              <p className="mt-4">
                This HTML file is a template. If you open it directly in the
                browser, you will see an empty page. You can add webfonts, meta
                tags, or analytics to this file. The build step will place the
                bundled scripts into the tag. To begin the development, run `npm
                start` or `yarn start`. To create a production bundle, use `npm
                run build` or `yarn build`.
              </p>
              <Button variant="outline-danger">CLICK ME</Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="https://picsum.photos/700/400" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="https://picsum.photos/700/400" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>{" "}
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="https://picsum.photos/700/400" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>{" "}
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="https://picsum.photos/700/400" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>{" "}
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="https://picsum.photos/700/400" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>{" "}
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="https://picsum.photos/700/400" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>{" "}
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="https://picsum.photos/700/400" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>{" "}
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="https://picsum.photos/700/400" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>{" "}
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="https://picsum.photos/700/400" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>{" "}
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="https://picsum.photos/700/400" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>{" "}
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="https://picsum.photos/700/400" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>{" "}
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="https://picsum.photos/700/400" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>{" "}
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="https://picsum.photos/700/400" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>{" "}
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="https://picsum.photos/700/400" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;

// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
