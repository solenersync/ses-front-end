import { AppLayout } from 'components/Layouts/AppLayout';
import { NextPageWithLayout } from 'types';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { getArrayData } from 'api/solarArrayApi';
import { ISolarArray } from 'types/ISolarArray';
import { useUserData } from 'hooks/useUserData';


const SolarArray: NextPageWithLayout = () => {
  const [solarArray, setSolarArray] = useState<ISolarArray | null>();
  const user = useUserData();

  useEffect(() => {
    async function fetchData() {
      if (!user.userId) return;
      const arrayResult = await getArrayData(user.userId);
      if (!arrayResult) {
        Router.replace('/my-array');
      }
      setSolarArray(arrayResult);
    }
    fetchData();
  }, [user.userId]);

  return (
    <>
      <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            My Solar Array
          </h3>
        </div>
        <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
          <dl className='sm:divide-y sm:divide-gray-200'>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Latitude</dt>
              {solarArray && (
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {solarArray.lat}
                </dd>
              )}
            </div>

            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Longitude</dt>
              {solarArray && (
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {solarArray.lon}
                </dd>
              )}
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Peak Power</dt>
              {solarArray && (
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {solarArray.peakPower} kw
                </dd>
              )}
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>System Loss</dt>
              {solarArray && (
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {solarArray.systemLoss} %
                </dd>
              )}
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Angle</dt>
              {solarArray && (
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {solarArray.angle} °
                </dd>
              )}
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Aspect</dt>
              {solarArray && (
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {solarArray.aspect} °
                </dd>
              )}
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Mounting</dt>
              {solarArray && (
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {solarArray.mounting}
                </dd>
              )}
            </div>
          </dl>
        </div>
      </div>
      <div className='mt-3 flex justify-left'>
        {solarArray && (
          <Link href={{ pathname: '/my-array', query: { ...solarArray } }}>
            <button className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-rose-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'>
              Edit
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

SolarArray.getLayout = (page) => {
  return <AppLayout pageTitle='Solar Array'>{page}</AppLayout>;
};

export default SolarArray;
