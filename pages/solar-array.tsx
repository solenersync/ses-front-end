import { AppLayout } from "components/Layouts/AppLayout";
import { useSession } from "next-auth/react";
import { NextPageWithLayout } from "types";
import { useEffect } from "react";
import Router from "next/router";
import Link from "next/link";

const SolarArray: NextPageWithLayout = () => {
  const { status, data: sessionData } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!sessionData) {
    Router.replace("/login");
    return null;
  }
  const { user } = sessionData;
  
  return (
    <>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            My Solar Array
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Array Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {array.name}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Latitude</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {array.latitude}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Longitude</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {array.longitude}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Peak Power</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {array.peakPower} kw
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">System Loss</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {array.systemLoss} %
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Angle</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {array.angle} °
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Aspect</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {array.aspect} °
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Mounting</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {array.mounting}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-3 flex justify-left">
        <Link href="/update-array">
          <button className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-rose-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">
            Edit
          </button>
        </Link>
      </div>
    </>
  );
  return <div>loading</div>;
};

let user = {
  email: "test@test.com",
  password: "password1",
  name: "Frank",
  phone: 871234567,
};
let array = {
  name: "array1",
  mounting: "Free Standing",
  latitude: 51.5,
  longitude: 0.1,
  peakPower: 4,
  systemLoss: 10,
  angle: 20,
  aspect: 0,
};

SolarArray.getLayout = (page) => {
  return <AppLayout pageTitle="Solar Array">{page}</AppLayout>;
};

export default SolarArray;
