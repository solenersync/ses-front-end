import { NextComponentType } from "next";

const Footer: NextComponentType = () => {
  return (
    <footer className="mt-24 sm:mt-6 text-center flex justify-center">
      <div className="mx-auto max-w-md overflow-hidden py-12 px-6 sm:max-w-3xl lg:max-w-7xl lg:px-8">
        <div className="mt-8 flex justify-center space-x-6">
          <a
            href="https://www.solenersync.net/dashboard"
            rel="noopener noreferrer"
          >
            <img
              className="md:h-20 h-16 w-auto"
              src="logo-small.png"
              alt="Solenersync"
            />
          </a>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2022 Solenersync. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
