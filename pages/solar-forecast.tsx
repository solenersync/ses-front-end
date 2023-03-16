import { AppLayout } from 'components/Layouts/AppLayout';
import { NextPageWithLayout } from 'types';
import React, { useEffect, useState } from 'react';
import SolarForecastChart from 'components/SolarForecastChart/solarForecastChart';
import { useUserData } from 'hooks/useUserData';

const SolarForecast: NextPageWithLayout = () => {
  const [month, setMonth] = useState<number | null>(null);
  const userId = useUserData();

  useEffect(() => {
    setMonth(new Date().getMonth() + 1);
  }, []);

  return (
    <>
      <div className='flex items-center space-x-4'>
        <label htmlFor='forecast-select'>Select forecast:</label>
        <select
          id='forecast-select'
          data-testid = 'forecast-select'
          onChange={(event) => {
            // const day = parseInt(event.target.value);
          }}
        >
          <option value='1'>Current Month</option>
          <option value='2'>Next Month</option>
        </select>
      </div>
      {userId && month ? (
        <SolarForecastChart userId={userId} month={month}></SolarForecastChart>
      ) : null}
    </>
  );
};

SolarForecast.getLayout = (page) => {
  return <AppLayout pageTitle='Solar Forecast'>{page}</AppLayout>;
};

export default SolarForecast;
