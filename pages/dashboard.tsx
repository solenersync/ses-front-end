import { AppLayout } from "components/Layouts/AppLayout";
import { NextPageWithLayout } from "types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { getUser } from "api/userApi";
import SolarForecastChart from 'components/solarForecastChart';

const Dashboard: NextPageWithLayout = () => {
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
      {userId && month ? (<SolarForecastChart userId={userId} month={month}></SolarForecastChart>) : null}
    </>
  );
};

Dashboard.getLayout = (page) => {
  return <AppLayout pageTitle="Dashboard">{page}</AppLayout>;
};

export default Dashboard;
