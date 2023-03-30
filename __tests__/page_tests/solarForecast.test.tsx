import React from 'react';
import { render, screen, fireEvent, waitFor, getByTestId } from '@testing-library/react';
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

  test('should render the SolarForecastChart component when userId and month are available', () => {
    render(<SolarForecast />);
    expect(screen.getByTestId('solar-forecast-chart')).toBeInTheDocument();
  });

  it('should update the number of rendered graphs when SelectMenu is changed', async () => {
    const { getByTestId, getAllByTestId } = render(<SolarForecast />);
    const selectMenu = getByTestId('select-menu');
  
    fireEvent.change(selectMenu, { target: { value: '1' } });
  
    await waitFor(() => {
      const renderedGraphs = getAllByTestId('solar-forecast-chart');
      expect(renderedGraphs.length).toBe(1);
    });
  });
  

  it('should update the displayCloudCover state when the toggle is clicked', async () => {
    const { getByTestId } = render(<SolarForecast />);
    const toggle = getByTestId('toggle');

    expect(toggle.getAttribute('data-checked')).toBe('false');
    fireEvent.click(toggle);
    expect(toggle.getAttribute('data-checked')).toBe('true');
  });
});
