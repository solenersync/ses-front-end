import { getSolarForecast } from 'api/solarForecastApi';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { getArrayData } from 'api/solarArrayApi';
import { ISolarForecastData } from '../../types/ISolarForecastData';
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

type ChartProps = {
  userId: number;
  month: number;
  date: string;
  displayCloudCover: boolean;
};

type Dataset = {
  label?: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
};

type Labels = string[];

const SolarForecastChart = ({
  userId,
  month,
  date,
  displayCloudCover,
}: ChartProps) => {
  const { status, data: sessionData } = useSession();
  const [, setForecastData] = useState<ISolarForecastData[] | null>(null);
  const [chartData, setChartData] = useState({
    datasets: [] as Dataset[],
    labels: [] as Labels,
  });
  const [cloudCoverData, setCloudCoverData] = useState({
    datasets: [] as Dataset[],
    labels: [] as Labels,
  });
  const [chartOptions, setChartOptions] = useState({});
  const [cloudCoverOptions, setCloudCoverOptions] = useState({});
  const [totalPowerOutput, setTotalPowerOutput] = useState('    .    ');

  const chartDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };
  const localDate = chartDate.toLocaleDateString('en-US', options);

  useEffect(() => {
    ChartJs.register(
      CategoryScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
      LinearScale,
      PointElement,
      LineElement,
      LineElement,
      LineElement
    );

    async function fetchData() {
      const arrayResult = await getArrayData(userId);
      if (!arrayResult) {
        return;
      }
      arrayResult.month = month;
      arrayResult.date = date;

      const forecastResult = await getSolarForecast(arrayResult);
      if (forecastResult?.status !== 200) {
        return;
      }
      setForecastData(forecastResult.data);
      setTotalPowerOutput(forecastResult.data[forecastResult.data.length -1].totalPowerOutput.toFixed(2))
      
      const cloudCoverDatasets = displayCloudCover
      ? [
          {
            label: 'Low Cloud Cover',
            data: forecastResult.data?.map((x: any) => x.lowCloudCover) || [],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
          },
          {
            label: 'Mid Cloud Cover',
            data: forecastResult.data?.map((x: any) => x.midCloudCover) || [],
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
          },
          {
            label: 'High Cloud Cover',
            data: forecastResult.data?.map((x: any) => x.highCloudCover) || [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ]
      : [];
      

      setChartData({
        labels: [
          '00:00',
          '01:00',
          '02:00',
          '03:00',
          '04:00',
          '05:00',
          '06:00',
          '07:00',
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
        ],
        datasets: [
          {
            label: 'Kwh',
            data:
              forecastResult.data?.map((x: any) => x.peakGlobalOutput) || [],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      });

      setCloudCoverData({
        labels: [
          '00:00',
          '01:00',
          '02:00',
          '03:00',
          '04:00',
          '05:00',
          '06:00',
          '07:00',
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
        ],
        datasets: [
          {
            label: 'Cloud Cover',
            data: forecastResult.data?.map((x: any) => x.maxCloudCover) || [],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
          },
          // {
          //   label: 'Low Cloud Cover',
          //   data: forecastResult.data?.map((x: any) => x.lowCloud) || [],
          //   borderColor: 'rgba(128, 0, 128, 1)',
          //   backgroundColor: 'rgba(128, 0, 128, 0.2)',
          // },
          // {
          //   label: 'Mid Cloud Cover',
          //   data: forecastResult.data?.map((x: any) => x.midCloud) || [],
          //   borderColor: 'rgba(255, 206, 86, 1)',
          //   backgroundColor: 'rgba(255, 206, 86, 0.2)',
          // },
          // {
          //   label: 'High Cloud Cover',
          //   data: forecastResult.data?.map((x: any) => x.highCloud) || [],
          //   borderColor: 'rgba(75, 192, 192, 1)',
          //   backgroundColor: 'rgba(75, 192, 192, 0.2)',
          // },
        ],
      });
    }
    fetchData();
  }, [status, sessionData]);

  useEffect(() => {
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Solar Output Forecast for ${localDate}   -   Total: ${totalPowerOutput} kwh`,
        },
      },
    });
    setCloudCoverOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Cloud Cover Forecast for ${localDate}`,
        },
      },
    });
  }, [totalPowerOutput, localDate, displayCloudCover]);

  return (
    <>
      <div className='space-y-6 pt-8 sm:space-y-5 sm:pt-10'>
        <Line
          options={chartOptions}
          data={chartData}
          data-testid='solar-forecast-chart'
        />
      </div>
      <div className='sm:pt-16'>
        {displayCloudCover && (
          <Line
            options={cloudCoverOptions}
            data={cloudCoverData}
            data-testid='cloud-cover-chart'
          />
        )}
      </div>
    </>
  );
};
export default SolarForecastChart;
