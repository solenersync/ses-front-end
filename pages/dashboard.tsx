import { AppLayout } from 'components/Layouts/AppLayout';
import { NextPageWithLayout } from 'types';
import React, { useEffect, useState } from 'react';
import SolarForecastChart from 'components/SolarForecastChart/solarForecastChart';
import { useUserData } from 'hooks/useUserData';

const Dashboard: NextPageWithLayout = () => {
  const [month, setMonth] = useState<number | null>(null);
  const user = useUserData();

  useEffect(() => {
    setMonth(new Date().getMonth() + 1);
  }, []);

  const getDate = () => {
    const date = new Date();
    date.setDate(date.getDate());
    return date.toISOString().substring(0, 16);
  };

  return (
    <>
      {user && month ? (
        <SolarForecastChart userId={user.userId} month={month} date={getDate()} displayCloudCover={false}></SolarForecastChart>
      ) : null}
    </>
  );
};

Dashboard.getLayout = (page) => {
  return <AppLayout pageTitle='Dashboard'>{page}</AppLayout>;
};

export default Dashboard;
