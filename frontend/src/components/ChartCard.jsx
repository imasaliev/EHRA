import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { api } from "../utilities";

export default function ChartCard({ provider, currentPrice, setCurrentPrice }) {
  const [loading, setLoading] = useState(true); // Loading state flag
  const [chartData, setChartData] = useState([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`api/providers/${provider.id}/24`);
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
  }, []);

  return (
    <Chart
      className="bg-secondary"
      options={{
        chart: { type: "line" },
        dataLabels: { enabled: false },
        xaxis: { type: "datetime" },
        tooltip: { x: { format: "dd MMM yyyy" } },
        title: {
          text:
            provider.name.toUpperCase() +
            " CURRENT RATE: " +
            currentPrice +
            "C  PER KWH. LAST UPDATE (CST):  " +
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
  );
}
