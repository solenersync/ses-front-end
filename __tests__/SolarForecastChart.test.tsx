import React from "react";
import { render, screen, act } from '@testing-library/react';
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import { getSolarForecast } from "api/solarForecastApi";
import SolarForecastChart from 'components/solarForecastChart';
import { getArrayData } from 'api/solarArrayApi';

jest.mock("next-auth/react");
jest.mock("api/solarForecastApi");
jest.mock("api/solarArrayApi");

class MockResizeObserver {
  observe() {""}
  unobserve() {""}
  disconnect() {""}
}

global.ResizeObserver = MockResizeObserver as any;

describe("SolarForecastChart", () => {
  const mockUserId = "1";
  const mockMonth = 1;
  const mockArrayData = { month: mockMonth };
  const mockForecastData = [
    { peakGlobalOutput: 10 },
    { peakGlobalOutput: 20 },
    { peakGlobalOutput: 30 },
  ];

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: { user: { id: mockUserId } },
    });
    (getSolarForecast as jest.Mock).mockReturnValue(mockForecastData);
  });

  afterEach(() => { jest.clearAllMocks(); });

  it("renders the chart with the provided data", async () => {
    (getArrayData as jest.Mock).mockReturnValue(mockArrayData);
    await act(async () => {
      render(<SolarForecastChart userId={mockUserId} month={mockMonth} />);
    });
    expect(screen.getByTestId("solar-forecast-chart")).toBeInTheDocument();
  });

  test("will render an empty chart if no array data returned", async () => {
    (getArrayData as jest.Mock).mockResolvedValue(null);

    await act( async () => {
      render(<SolarForecastChart userId={mockUserId} month={mockMonth} />);
    });
    expect(screen.getByTestId("solar-forecast-chart")).toBeInTheDocument();
    expect(getArrayData).toHaveBeenCalledWith("1");
    expect(getSolarForecast).not.toHaveBeenCalled();
  });

  test("fetches the correct data for the chart", async () => {
    (getArrayData as jest.Mock).mockReturnValue(mockArrayData);
    await act( async () => {
      render(<SolarForecastChart userId={mockUserId} month={mockMonth} />);
    });
    await screen.findAllByTestId("solar-forecast-chart");
    expect(getArrayData).toHaveBeenCalledWith(mockUserId);
    expect(getSolarForecast).toHaveBeenCalledWith(mockArrayData);
  });

  test("will render an empty chart if no forecast result data returned", async () => {
    (getSolarForecast as jest.Mock).mockReturnValue(null);
    await act( async () => {
      render(<SolarForecastChart userId={mockUserId} month={mockMonth} />);
    });
    await screen.findAllByTestId("solar-forecast-chart");
    expect(getArrayData).toHaveBeenCalledWith(mockUserId);
    expect(getSolarForecast).toHaveBeenCalledWith(mockArrayData);
  });
});
