import { NextPageWithLayout } from '../types';

const AddArrayCard: NextPageWithLayout = () => {
  return (
    <>
      <form className="mt-12 px-6 lg:px-8" action="#" method="POST">
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-2 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Add Array</h3>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="array-name" className="block text-sm font-medium text-gray-700">
                    Array Name
                  </label>
                  <input
                    type="text"
                    name="array-name"
                    id="array-name"
                    autoComplete="array-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="mounting" className="block text-sm font-medium text-gray-700">
                    Mounting
                  </label>
                  <select
                    id="mounting"
                    name="mounting"
                    autoComplete="mounting"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                  >
                    <option>Free Standing</option>
                    <option>Roof Mounted</option>
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                    Latitude
                  </label>
                  <input
                    type="number"
                    name="latitude"
                    id="latitude"
                    autoComplete="latitude"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                    Longitude
                  </label>
                  <input
                    type="number"
                    name="longitude"
                    id="longitude"
                    autoComplete="longitude"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="peak-power" className="block text-sm font-medium text-gray-700">
                    Peak Power (kW)
                  </label>
                  <input
                    type="number"
                    name="peak-power"
                    id="peak-power"
                    autoComplete="peak-power"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                  /> 
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    System loss (%)
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                    Slope (°)
                  </label>
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                    Aspect (0°)
                  </label>
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-rose-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </form>
    </>
  )
}

export default AddArrayCard