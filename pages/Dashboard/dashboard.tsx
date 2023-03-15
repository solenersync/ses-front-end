import { AppLayout } from "components/Layouts/AppLayout";
import { NextPageWithLayout } from "types";
import React, { useEffect, useState } from "react";
import SolarForecastChart from "components/SolarForecastChart/solarForecastChart";
import { useUserData } from "hooks/useUserData";

const Dashboard: NextPageWithLayout = () => {
  const [month, setMonth] = useState<number | null>(null);
  const userId = useUserData();

  useEffect(() => {
    setMonth(new Date().getMonth() + 1);
  }, []);

  return (
    <>
      {userId && month ? (
        <SolarForecastChart userId={userId} month={month}></SolarForecastChart>
      ) : null}
    </>
  );
};

Dashboard.getLayout = (page) => {
  return <AppLayout pageTitle="Dashboard">{page}</AppLayout>;
};

export default Dashboard;
