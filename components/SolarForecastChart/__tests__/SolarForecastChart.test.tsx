import React, { useState } from 'react';
import { render, screen, act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSession } from 'next-auth/react';
import { getSolarForecast } from 'api/solarForecastApi';
import SolarForecastChart from 'components/SolarForecastChart/solarForecastChart';
import { getArrayData } from 'api/solarArrayApi';

jest.mock('next-auth/react');
jest.mock('api/solarForecastApi');
jest.mock('api/solarArrayApi');

class MockResizeObserver {
  observe() {
    ('');
  }
  unobserve() {
    ('');
  }
  disconnect() {
    ('');
  }
}

global.ResizeObserver = MockResizeObserver as any;

describe('SolarForecastChart', () => {
  const mockUserId = 1;
  const mockMonth = 1;
  const mockArrayData = { month: mockMonth };
  const mockForecastData = [
    { peakGlobalOutput: 8.2 },
    { peakGlobalOutput: 9.2 },
    { peakGlobalOutput: 10.2 },
  ];

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      data: { user: { id: mockUserId } },
    });
    (getSolarForecast as jest.Mock).mockReturnValue(mockForecastData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the chart with the provided data', async () => {
    (getArrayData as jest.Mock).mockReturnValue(mockArrayData);
    await act(async () => {
      render(<SolarForecastChart userId={mockUserId} month={mockMonth} />);
    });
    expect(screen.getByTestId('solar-forecast-chart')).toBeInTheDocument();
  });

  test('will render an empty chart if no array data returned', async () => {
    (getArrayData as jest.Mock).mockResolvedValue(null);

    await act(async () => {
      render(<SolarForecastChart userId={mockUserId} month={mockMonth} />);
    });
    await screen.findAllByTestId('solar-forecast-chart');
    expect(getArrayData).toHaveBeenCalledWith(1);
    expect(getSolarForecast).not.toHaveBeenCalled();
  });

  test('fetches the correct data for the chart', async () => {
    (getArrayData as jest.Mock).mockReturnValue(mockArrayData);
    await act(async () => {
      render(<SolarForecastChart userId={mockUserId} month={mockMonth} />);
    });
    await screen.findAllByTestId('solar-forecast-chart');
    expect(getArrayData).toHaveBeenCalledWith(mockUserId);
    expect(getSolarForecast).toHaveBeenCalledWith(mockArrayData);
  });

  test('will render an empty chart if no forecast result data returned', async () => {
    (getSolarForecast as jest.Mock).mockReturnValue(null);
    await act(async () => {
      render(<SolarForecastChart userId={mockUserId} month={mockMonth} />);
    });
    await screen.findAllByTestId('solar-forecast-chart');
    expect(getArrayData).toHaveBeenCalledWith(mockUserId);
    expect(getSolarForecast).toHaveBeenCalledWith(mockArrayData);
  });

  test('updates the forecast data state', () => {
    const { result } = renderHook(() => useState(null));
    const [, setForecastData] = result.current;
  
    act(() => {
      setForecastData([{ date: '01-01-2023', peakGlobalOutput: 8.2 }]);
    });
  
    expect(result.current[0]).toEqual([{ date: '01-01-2023', peakGlobalOutput: 8.2 }]);
  });

  test('updates the chart data state', () => {
    const { result } = renderHook(() => useState({ datasets: [], labels: [] }));
    const [, setChartData] = result.current;
  
    act(() => {
      setChartData({
        labels: ['00:00', '01:00'],
        datasets: [{ data: [8.2, 8.2] }]
      });
    });
  
    expect(result.current[0]).toEqual({
      labels: ['00:00', '01:00'],
      datasets: [{ data: [8.2, 8.2] }]
    });
  });
});
