import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SolarForecast from "pages/SolarForecast/solar-forecast";
import { useUserData } from "hooks/useUserData";

jest.mock("hooks/useUserData");
jest.mock("components/SolarForecastChart/solarForecastChart", () => {
  return function MockSolarForecastChart() {
    return <div data-testid="solar-forecast-chart"></div>;
  };
});
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("SolarForecast", () => {
  beforeEach(() => {
    (useUserData as jest.Mock).mockReturnValue("mockUserId");
  });

  it("renders the forecast selection", () => {
    render(<SolarForecast />);
    expect(screen.getByText("Select forecast:")).toBeInTheDocument();
    expect(screen.getByLabelText("Select forecast:")).toBeInTheDocument();
  });

  it("renders the SolarForecastChart component when userId and month are available", () => {
    render(<SolarForecast />);
    expect(screen.getByTestId("solar-forecast-chart")).toBeInTheDocument();
  });

  it("updates the forecast selection", () => {
    render(<SolarForecast />);
    fireEvent.change(screen.getByLabelText("Select forecast:"), {
      target: { value: "2" },
    });
    expect(screen.getByLabelText("Select forecast:")).toHaveValue("2");
  });
});
