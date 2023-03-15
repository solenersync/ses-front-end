import { StarIcon } from "@heroicons/react/20/solid";
import Footer from "components/Footer/footer";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Home: NextPage = (props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push({ pathname: "/signup", query: { email: email } });
  };

  return (
    <div className="bg-white">
      <main>
        {/* Hero section */}
        <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
          <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div>
              <div>
                <img
                  className="h-32 w-auto"
                  src="logo-shape.png"
                  alt="Solenersync"
                />
              </div>
              <div className="mt-10">
                <div className="mt-6 sm:max-w-xl">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Solenersync
                  </h1>
                  <p className="mt-6 text-xl text-gray-500">
                    Synchronise your home energy with our solar irradiance
                    forecasting service
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="mt-12 sm:flex sm:w-full sm:max-w-lg"
                >
                  <div className="min-w-0 flex-1">
                    <label htmlFor="hero-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      id="hero-email"
                      type="email"
                      className="block w-full rounded-md border border-gray-300 px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-3">
                    <button
                      type="submit"
                      className="block w-full rounded-md border border-transparent bg-rose-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
                <div className="mt-4">
                  Already have an account?{" "}
                  <Link
                    className="text-rose-600 hover:text-rose-700"
                    href="/login"
                  >
                    Log in
                  </Link>
                </div>
                <div className="mt-10">
                  <div className="inline-flex items-center divide-x divide-gray-300">
                    <div className="flex flex-shrink-0 pr-5">
                      <StarIcon
                        className="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                      />
                      <StarIcon
                        className="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                      />
                      <StarIcon
                        className="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                      />
                      <StarIcon
                        className="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                      />
                      <StarIcon
                        className="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="min-w-0 flex-1 py-1 pl-5 text-sm text-gray-500 sm:py-3">
                      <span className="font-medium text-gray-900">
                        Rated 5 stars
                      </span>{" "}
                      by over{" "}
                      <span className="font-medium text-rose-500">
                        500 beta users
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="hidden sm:block">
                <div className="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl bg-gray-50 lg:left-80 lg:right-0 lg:w-full" />
                <svg
                  className="absolute top-8 right-1/2 -mr-3 lg:left-0 lg:m-0"
                  width={404}
                  height={392}
                  fill="none"
                  viewBox="0 0 404 392"
                >
                  <defs>
                    <pattern
                      id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-gray-200"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={392}
                    fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                  />
                </svg>
              </div>
              <div className="relative -mr-40 pl-6 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
                <img
                  className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                  src="dashboard.png"
                  alt="dashboard"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
