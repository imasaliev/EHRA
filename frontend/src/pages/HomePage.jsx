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
import { api } from "../utilities";
import { useOutletContext } from "react-router-dom";
import LocationCard from "../components/LocationCard";
import EquipmentCard from "../components/EquipmentCard";

export default function HomePage() {
  const { appUser, setAppUser } = useOutletContext();
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
    // const apiUrl = "http://127.0.0.1:8000/comedapi";

    api
      .get("api/comedapi")
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

  return appUser ? (
    <Container>
      <h1>{err}</h1>
      <Row xs={1} md={2} className="g-4">
        {appUser.locations.length ? (
          appUser.locations.map((location) => (
            <>
              <LocationCard key={location.id} loc={location} />
              <LocationCard key={location.id} loc={location} />
            </>
          ))
        ) : (
          <h3>No Locations Yet</h3>
        )}
      </Row>
      <Row xs={1} md={2} className="g-4">
        {appUser.locations[0].equipments.length ? (
          appUser.locations[0].equipments.map((equipment) => (
            <EquipmentCard key={equipment.id} equip={equipment} />
          ))
        ) : (
          <h3>No Equpment Yet</h3>
        )}
      </Row>
      <h4> {JSON.stringify(appUser.locations[0].equipments)}</h4>

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
            start` or `yarn start`. To create a production bundle, use `npm run
            build` or `yarn build`.
          </p>
          <Button variant="outline-danger">❌</Button>
        </Col>
      </Row>
    </Container>
  ) : null;
}
