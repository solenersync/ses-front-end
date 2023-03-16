import React from 'react';
import { render, screen} from '@testing-library/react';
import { useUserData } from 'hooks/useUserData';
import '@testing-library/jest-dom';
import Dashboard from 'pages/dashboard';

jest.mock('hooks/useUserData');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('components/SolarForecastChart/solarForecastChart', () => {
  return function MockSolarForecastChart() {
    return <div data-testid='solar-forecast-chart'></div>;
  };
});

describe('Dashboard page', () => {
  const mockUserId = '1'

  beforeEach(() => {
    (useUserData as jest.Mock).mockReturnValue(mockUserId);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render the SolarForecastChart component when userId and month are available', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('solar-forecast-chart')).toBeInTheDocument();
  });

});