import { getSolarForecast } from "api/solarForecastApi";
import { AppLayout } from "components/Layouts/AppLayout";
import { NextPageWithLayout } from "types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Router from "next/router";
import { getArrayData } from "api/solarArrayApi";
import { SolarArray } from "models/SolarArray";
import { Irradiance } from "../models/Irradiance";
import DataDisplay from '../components/solarForecastTable';

const Dashboard: NextPageWithLayout = () => {
  const { status, data: sessionData } = useSession();
  const [forecastData, setForecastData] = useState<Irradiance [] | null>(null);

  useEffect(() => {
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
      var arrayResult = await getArrayData(user.user_id);
      arrayResult.month = currentMonth;
      const forecastResult = await getSolarForecast(arrayResult);
      setForecastData(forecastResult);
    }

    fetchData();
  }, [status, sessionData]);

  return (
    <>
      <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Today's solar forecast
        </h3>
        <DataDisplay data={forecastData}></DataDisplay>
      </div>
    </>
  );
};

Dashboard.getLayout = (page) => {
  return <AppLayout pageTitle="Dashboard">{page}</AppLayout>;
};

export default Dashboard;
