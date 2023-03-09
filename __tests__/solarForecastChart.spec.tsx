import React from "react";
import { render, screen } from "@testing-library/react";
import SolarForecastChart from "components/solarForecastChart";
import { getSolarForecast } from "api/solarForecastApi";
import { getArrayData } from "api/solarArrayApi";
import { getUser } from "api/userApi";
import { expect, it, jest, test } from "@jest/globals";

jest.mock("api/solarForecastApi");
jest.mock("api/solarArrayApi");
jest.mock("api/userApi");

describe("SolarForecastChart", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("displays the chart when data is fetched", async () => {
    const forecastResult = [{ peakGlobalOutput: 10 }, { peakGlobalOutput: 20 }];
    const arrayResult = { userId: "1" };
    const userData = { email: "test@example.com" };
    // const getSolarForecastMock = jest.fn().mockResolvedValue(forecastResult);
    // const getArrayDataMock = jest.fn().mockResolvedValue(arrayResult);
    // const getUser = jest.fn().mockResolvedValue(userData);

    // render(<SolarForecastChart />);
    // const chart = await screen.findByTestId("solar-forecast-chart");
    // expect().toBeInTheDocument();
    // expect(chart).toBeInTheDocument();
    // expect(chart).toBeInTheDocument();
    // expect(chart).toBeNull();
  });

  it("displays an error message when there is an API error", async () => {
    // Set up the mock API responses to return errors
    // getSolarForecast.mockRejectedValue(new Error("API error"));
    // getArrayData.mockRejectedValue(new Error("API error"));
    // getUser.mockRejectedValue(new Error("API error"));

    // // Render the component
    // render(<SolarForecastChart />);

    // // Wait for the error message to be displayed
    // const errorMessage = await screen.findByText("Error fetching data");

    // // Check that the error message is displayed
    // expect(errorMessage).toBeInTheDocument();
  });
});
