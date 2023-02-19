import { AppLayout } from 'components/Layouts/AppLayout';
import { NextPageWithLayout } from 'types';

const Profile: NextPageWithLayout = () => {
  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Name
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Email address
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Phone
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  autoComplete="phone number"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Country
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:max-w-xs sm:text-sm"
                >
                  <option>Ireland</option>
                  <option>UK</option>
                </select>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Street address
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                City
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                State / Province
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                ZIP / Postal code
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
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
      </div>
    </form>
  )
}

let user = {email: "test@test.com", password: "password1", name: "Frank", phone: 871234567}

Profile.getLayout = ( page ) => {
  return <AppLayout pageTitle="Profile" user={user}>{page}</AppLayout>
}


export default Profile
