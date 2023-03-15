import { AppLayout } from "components/Layouts/AppLayout";
import { NextPageWithLayout } from "types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { getUser } from "api/userApi";
import SolarForecastChart from 'components/solarForecastChart';

const SolarForecast: NextPageWithLayout = () => {
  const { status, data: sessionData } = useSession();
  const [userId, setUserId] = useState<string | null>(null);
  const [month, setMonth] = useState<number | null>(null);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!sessionData) {
      Router.replace("/login");
      return;
    }
    const { user } = sessionData;
    setMonth(new Date().getMonth() + 1);

    async function fetchData() {
      var userData = await getUser(user.email);
      setUserId(userData.userId);
    }
    fetchData();
   
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
          <option value="1">Current Month</option>
          <option value="2">Next Month</option>
        </select>
      </div>
      {userId && month && <SolarForecastChart userId={userId} month={month}></SolarForecastChart>}
    </>
  );
};

SolarForecast.getLayout = (page) => {
  return <AppLayout pageTitle="Solar Forecast">{page}</AppLayout>;
};

export default SolarForecast;
