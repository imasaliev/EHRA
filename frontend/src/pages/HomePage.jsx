import { Container, Button, Row, Image, Col, Carousel } from "react-bootstrap";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { api } from "../utilities";
import { useOutletContext } from "react-router-dom";
import EquipmentCard from "../components/EquipmentCard";

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
    const fetchData = async () => {
      try {
        const response = await api.get("api/comedapi");

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

  return true ? (
    <Container className="bg-secondary">
      {appUser ? (
        <Carousel interval={null}>
          {appUser?.locations?.length
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
                    <h3 className="text-uppercase">
                      {location.name} {location.address} {currentPrice}
                      {"C per kwh "}
                    </h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))
            : null}
        </Carousel>
      ) : null}
      <h1>{err}</h1>
      <Row aria-disabled={loading} className="bg-secondary">
        <Col>
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
        </Col>
      </Row>
      <Row hidden={!appUser} className="px-4 my-5 bg-secondary">
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
