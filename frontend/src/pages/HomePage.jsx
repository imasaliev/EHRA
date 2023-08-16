import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Chart from "react-apexcharts";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { api } from "../utilities";
import { useOutletContext } from "react-router-dom";
import LocationCard from "../components/LocationCard";
import EquipmentCard from "../components/EquipmentCard";
import LocationCarousel from "../components/LocationCarousel";

export default function HomePage() {
  const {
    appUser,
    setAppUser,
    currentPrice,
    setCurrentPrice,
    loading,
    setLoading,
  } = useOutletContext();
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

    api
      .get("api/comedapi")
      .then((response) => {
        setChartData(response.data);
        setCurrentPrice(response.data[0].price);
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
      <Carousel interval={null}>
        {appUser.locations.length
          ? appUser.locations.map((location) => (
              <Carousel.Item>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp"
                  alt="Canyon at Nigh"
                />
                <Carousel.Caption>
                  <Row className="justify-content-center">
                    {location.equipments.length ? (
                      location.equipments.map((equipment) => (
                        <EquipmentCard key={equipment.id} equip={equipment} />
                      ))
                    ) : (
                      <h3>No Equpment Yet</h3>
                    )}
                  </Row>
                  <h3>
                    {location.name} {location.address} {location.provider_id}{" "}
                  </h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          : null}
      </Carousel>

      <h1>{err}</h1>

      <Row aria-disabled={loading}>
        <Col>
          <Chart
            className="bg-light"
            options={{
              ...chartState.options,

              title: {
                text: "COMED CURRENT RATE: " + currentPrice + " cents per kwh",
                align: "CENTER",
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                  fontSize: "40 PX",
                  fontWeight: "bold",
                  fontFamily: undefined,
                  color: "dark",
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
