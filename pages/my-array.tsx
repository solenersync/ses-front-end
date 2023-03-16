import { AppLayout } from 'components/Layouts/AppLayout';
import Link from 'next/link';
import { NextPageWithLayout } from '../types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createArray, updateArray } from 'api/solarArrayApi';
import { ISolarArray } from '../types/ISolarArray';
import { useUserData } from 'hooks/useUserData';

const MyArray: NextPageWithLayout = () => {
  const router = useRouter();
  const { lat, lon, peakPower, loss, angle, aspect, mounting, solarArrayId } =
    router.query;

  const [mountingUpdate, setMountingUpdate] = useState('');
  const [latUpdate, setLatUpdate] = useState('');
  const [lonUpdate, setLonUpdate] = useState('');
  const [peakPowerUpdate, setPeakPowerUpdate] = useState('');
  const [lossUpdate, setLossUpdate] = useState('');
  const [angleUpdate, setAngleUpdate] = useState('');
  const [aspectUpdate, setAspectUpdate] = useState('');
  const user = useUserData();

  useEffect(() => {
    setMountingUpdate(mounting?.toString() ?? '');
    setLatUpdate(lat?.toString() ?? '0');
    setLonUpdate(lon?.toString() ?? '0');
    setPeakPowerUpdate(peakPower?.toString() ?? '0');
    setLossUpdate(loss?.toString() ?? '0');
    setAngleUpdate(angle?.toString() ?? '0');
    setAspectUpdate(aspect?.toString() ?? '0');
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!user) return;

    const mySolarArray: ISolarArray = {
      solarArrayId: parseInt(solarArrayId?.toString() ?? '0'),
      lat: parseFloat(latUpdate),
      lon: parseFloat(lonUpdate),
      peakPower: parseFloat(peakPowerUpdate),
      loss: parseFloat(lossUpdate),
      angle: parseFloat(angleUpdate),
      aspect: parseFloat(aspectUpdate),
      mounting: mountingUpdate,
      userId: user.userId,
    };

    let res = null;
    if (!solarArrayId) {
      res = await createArray(mySolarArray);
    } else {
      console.log(mySolarArray)
      res = await updateArray(mySolarArray);
    }
    if (res) {
      router.push('/solar-array');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='mt-12 px-6 lg:px-8'
        action='#'
        method='POST'
      >
        <div className='bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6'>
          <div className='md:grid md:grid-cols-2 md:gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Update Array
              </h3>
            </div>
            <div className='mt-5 md:col-span-2 md:mt-0'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='mounting'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Mounting
                  </label>
                  <select
                    id='mounting'
                    data-testid='mounting'
                    name='mounting'
                    autoComplete='mounting'
                    value={mountingUpdate}
                    onChange={(e) => setMountingUpdate(e.target.value)}
                    className='mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm'
                  >
                    <option>Free Standing</option>
                    <option>Roof Mounted</option>
                  </select>
                </div>

                <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                  <label
                    htmlFor='latitude'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Latitude
                  </label>
                  <input
                    type='number'
                    name='latitude'
                    id='latitude'
                    data-testid='latitude'
                    value={latUpdate}
                    onChange={(e) => setLatUpdate(e.target.value)}
                    autoComplete='latitude'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm'
                  />
                </div>

                <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                  <label
                    htmlFor='longitude'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Longitude
                  </label>
                  <input
                    type='number'
                    name='longitude'
                    id='longitude'
                    data-testid='longitude'
                    value={lonUpdate}
                    onChange={(e) => setLonUpdate(e.target.value)}
                    autoComplete='longitude'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                  <label
                    htmlFor='peakPower'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Peak Power (kW)
                  </label>
                  <input
                    type='number'
                    name='peakPower'
                    id='peakPower'
                    data-testid='peakPower'
                    value={peakPowerUpdate}
                    onChange={(e) => setPeakPowerUpdate(e.target.value)}
                    autoComplete='peakPower'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm'
                  />
                </div>

                <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                  <label
                    htmlFor='city'
                    className='block text-sm font-medium text-gray-700'
                  >
                    System loss (%)
                  </label>
                  <input
                    type='number'
                    name='loss'
                    id='loss'
                    data-testid='loss'
                    value={lossUpdate}
                    onChange={(e) => setLossUpdate(e.target.value)}
                    autoComplete='address-level2'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                  <label
                    htmlFor='region'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Angle (°)
                  </label>
                  <input
                    type='number'
                    name='angle'
                    id='angle'
                    data-testid='angle'
                    value={angleUpdate}
                    onChange={(e) => setAngleUpdate(e.target.value)}
                    autoComplete='address-level1'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                  <label
                    htmlFor='postal-code'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Aspect (0°)
                  </label>
                  <input
                    type='number'
                    name='aspect'
                    id='aspect'
                    data-testid='aspect'
                    autoComplete='aspect'
                    value={aspectUpdate}
                    onChange={(e) => setAspectUpdate(e.target.value)}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-3 flex justify-end'>
          <Link href='/solar-array'>
            <button
              type='button'
              data-testid='cancel-button'
              className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'
            >
              Cancel
            </button>
          </Link>
          <button
            type='submit'
            data-testid='save-button'
            className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-rose-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

MyArray.getLayout = (page) => {
  return <AppLayout pageTitle='My Solar Array'>{page}</AppLayout>;
};

export default MyArray;
