import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SolarForecast from 'pages/solar-forecast';
import { useUserData } from 'hooks/useUserData';
import '@testing-library/jest-dom';

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
  const mockUserId = '1'

  beforeEach(() => {
    (useUserData as jest.Mock).mockReturnValue(mockUserId);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the forecast selector', () => {
    render(<SolarForecast />);
    expect(screen.getByTestId('forecast-select')).toBeInTheDocument();
    expect(screen.getByText('Select forecast:')).toBeInTheDocument();
  });

  it('should render the SolarForecastChart component when userId and month are available', () => {
    render(<SolarForecast />);
    expect(screen.getByTestId('solar-forecast-chart')).toBeInTheDocument();
  });

  it('should update the forecast selection', () => {
    render(<SolarForecast />);
    fireEvent.change(screen.getByTestId('forecast-select'), {
      target: { value: '2' },
    });
    expect(screen.getByTestId('forecast-select')).toHaveValue('2');
  });
});
