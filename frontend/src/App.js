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
  const [appUser, setAppUser] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state flag
  const [err, setErr] = useState("");
  const [chartState, setChartState] = useState({
    options: {
      stroke: { width: 1, curve: "smooth" },
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
  });

  useEffect(() => {
    const apiUrl = "http://127.0.0.1:8000/comedapi";

    axios
      .get(apiUrl)
      .then((response) => {
        setChartData(response.data);
        setLoading(false); // Set loading state to false on successful response
      })
      .catch((error) => {
        setErr(error);
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading state to false on error
      });
  }, []);

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
                {appUser ? `${appUser.first_name} - Logout` : `Enroll/Login`}
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <h1>{err}</h1>
          <Row hidden={!appUser} className="px-4 my-5">
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
              <Button variant="outline-danger">❌</Button>
            </Col>
          </Row>

          <Row aria-disabled={loading}>
            <Col>
              <Chart
                options={chartState.options}
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
