import { useState } from 'react';

export default function Toggle({ onChange }) {
  const [toggleOn, setToggleOn] = useState(false);

  const handleToggle = () => {
    setToggleOn(!toggleOn);
    onChange(!toggleOn);
  };

  return (
    <div className='flex items-center justify-end'>
      <div className='flex flex-col items-center'>
        <div
          data-testid='toggle'
          data-checked={toggleOn}
          className={`relative w-14 h-7 flex items-center rounded-full cursor-pointer bg-gray-300 ${
            toggleOn ? '' : 'opacity-50'
          }`}
          onClick={handleToggle}
        >
          <div
            className={`bg-gray-700 absolute w-6 h-6 rounded-full shadow-md transition-transform duration-300 ease-in-out ${
              toggleOn ? 'right-1' : 'left-1'
            } ${toggleOn ? 'right-1 bg-blue-500' : 'left-1 bg-gray-700'}`}
          ></div>
        </div>
      </div>
      <label className='text-gray-700 font-medium pl-2'>{`Display Cloud Cover`}</label>
    </div>
  );
}
