import { AppLayout } from 'components/Layouts/AppLayout';
import { NextPageWithLayout } from 'types';
import React, { useEffect, useState } from 'react';
import SolarForecastChart from 'components/SolarForecastChart/solarForecastChart';
import { useUserData } from 'hooks/useUserData';
import SelectMenu from 'components/SelectMenu/selectMenu';
import Toggle from 'components/Toggle/toggle';

const SolarForecast: NextPageWithLayout = () => {
  const [month, setMonth] = useState<number | null>(null);
  const [graphs, setGraphs] = useState(1);
  const [displayCloudCover, setDisplayCloudCover] = useState(false);

  const user = useUserData();

  useEffect(() => {
    setMonth(new Date().getMonth() + 1);
  }, []);

  const getDate = (index: number) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date.toISOString().substring(0, 16);
  };

  const getMonth = (index: number) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date.getMonth() + 1;
  };

  const renderGraphs = () => {
    const renderedGraphs = [];
    for (let i = 0; i < graphs; i++) {
      renderedGraphs.push(
        <div key={i}>
          <SolarForecastChart
            userId={user.userId}
            month={getMonth(i)}
            date={getDate(i)}
            displayCloudCover={displayCloudCover}
          ></SolarForecastChart>
          {i !== graphs - 1 && (
            <hr className='my-4 border-t border-gray-300 mt-20' />
          )}
        </div>
      );
    }
    return renderedGraphs;
  };

  const handleGraphsChange = (value: number) => {
    setGraphs(value);
  };

  const handleToggleChange = (value: boolean) => {
    setDisplayCloudCover(value);
  };

  return (
    <>
      <div className='flex items-center'>
        <div className='md:pl-8 flex-grow-0'>
          <SelectMenu onChange={handleGraphsChange} />
        </div>
        <div className='flex-grow flex md:pr-8 md:justify-end'>
          <Toggle onChange={handleToggleChange} />
        </div>
      </div>
      {user && month ? renderGraphs() : null}
    </>
  );
};

SolarForecast.getLayout = (page) => {
  return <AppLayout pageTitle='Solar Forecast'>{page}</AppLayout>;
};

export default SolarForecast;
