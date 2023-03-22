import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SolarForecast from 'pages/solar-forecast';
import { useUserData } from 'hooks/useUserData';
import '@testing-library/jest-dom';
import { User } from 'next-auth';

jest.mock('hooks/useUserData');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('components/SolarForecastChart/solarForecastChart', () => {
  return function MockSolarForecastChart() {
    return <div data-testid='solar-forecast-chart'></div>;
  };
});

describe('SolarForecast page', () => {
  const user: User = { name: 'John Doe', email: 'jd@test.com',  userId: 1, id:'' };

  beforeEach(() => {
    (useUserData as jest.Mock).mockReturnValue(user);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render the forecast selector', () => {
    render(<SolarForecast />);
    expect(screen.getByTestId('forecast-select')).toBeInTheDocument();
    expect(screen.getByText('Select forecast:')).toBeInTheDocument();
  });

  test('should render the SolarForecastChart component when userId and month are available', () => {
    render(<SolarForecast />);
    expect(screen.getByTestId('solar-forecast-chart')).toBeInTheDocument();
  });

  test('should update the forecast selection', () => {
    render(<SolarForecast />);
    fireEvent.change(screen.getByTestId('forecast-select'), {
      target: { value: '2' },
    });
    expect(screen.getByTestId('forecast-select')).toHaveValue('2');
  });
});
