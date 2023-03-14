import { getSolarForecast } from "api/solarForecastApi";
import { AppLayout } from "components/Layouts/AppLayout";
import { NextPageWithLayout } from "types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { getArrayData } from "api/solarArrayApi";
import { Irradiance } from "../types/Irradiance";
import DataDisplay from "../components/solarForecastTable";
import {
  Chart as ChartJs,
  CategoryScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getUser } from "api/userApi";

const SolarForecast: NextPageWithLayout = () => {
  type Dataset = {
    label?: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  };

  type Labels = string[];

  const { status, data: sessionData } = useSession();
  const [forecastData, setForecastData] = useState<Irradiance[] | null>(null);
  const [chartData, setChartData] = useState({
    datasets: [] as Dataset[],
    labels: [] as Labels,
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    ChartJs.register(
      CategoryScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
      LinearScale,
      PointElement,
      LineElement
    );
    if (status === "loading") {
      return;
    }

    if (!sessionData) {
      Router.replace("/login");
      return;
    }
    const { user } = sessionData;

    const now = new Date();
    const currentMonth = now.getMonth() + 1;

    async function fetchData() {
      var userData = await getUser(user.email);
      const arrayResult = await getArrayData(userData.userId);
      if (!arrayResult) {
        return <div>Failed to load solar array data.</div>;
      }
      arrayResult.month = currentMonth;
      const forecastResult = await getSolarForecast(arrayResult);
      if (!forecastResult) {
        return <div>Failed to load forecast data.</div>;
      }
      setForecastData(forecastResult);

      setChartData({
        labels: [
          "00:00",
          "01:00",
          "02:00",
          "03:00",
          "04:00",
          "05:00",
          "06:00",
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00",
        ],
        datasets: [
          {
            label: "Kwh",
            data: forecastResult?.map((x: any) => x.peakGlobalOutput) || [],
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      });
    }
    fetchData();
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Todays Solar Output Forecast",
        },
      },
    });
  }, [status, sessionData]);

  return (
    <>
      <div className="flex items-center space-x-4">
        <label htmlFor="forecast-select">Select forecast:</label>
        <select
          id="forecast-select"
          onChange={(event) => {
            const day = parseInt(event.target.value);
          }}
        >
          <option value="1">Today</option>
          <option value="2">Tomorrow</option>
        </select>
      </div>
      <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
        <Line options={chartOptions} data={chartData} />
      </div>
    </>
  );
};

SolarForecast.getLayout = (page) => {
  return <AppLayout pageTitle="Solar Forecast">{page}</AppLayout>;
};

export default SolarForecast;
