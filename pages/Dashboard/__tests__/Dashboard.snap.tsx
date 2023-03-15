import { getSolarForecast } from "api/solarForecastApi";
import { getUser } from "api/userApi";
import { User} from "next-auth";
import { getArrayData } from "../../../api/solarArrayApi";
import { ISolarArray } from "../../../types/ISolarArray";
import { Irradiance } from "../../../types/Irradiance";
import { SessionProvider, useSession as originalUseSession } from "next-auth/react";
import { render } from '@testing-library/react';
import Dashboard from 'pages/Dashboard/dashboard';
import { expect } from '@jest/globals';

jest.mock("api/userApi");
jest.mock("api/solarArrayApi");
jest.mock("api/solarForecastApi");
jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(),
}));
jest.mock("next/router", () => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
}));

describe("Dashboard", () => {
  const user: User = {
    name: "John Doe",
    email: "jd@test.com",
    userId: "1",
    id: "",
  };
  const solarArray: ISolarArray = {
    solarArrayId: 1,
    lon: 1,
    lat: 1,
    peakPower: 1,
    systemLoss: 1,
    angle: 1,
    aspect: 1,
    mounting: "test",
    userId: "1",
  };
  const forecast: Irradiance = {
    time: "2023-02-24T00:00:00",
    month: 1,
    peakGlobalOutput: 1,
    "G(i)": 1,
    "Gb(i)": 1,
    "Gd(i)": 1,
    "Gcs(i)": 1,
  };

  const session = { user: { name: 'John Doe', email: "", userId: "", id:"" }, expires: "" };
  const mockUseSession = originalUseSession as jest.Mock;

  beforeEach(() => {
    (getUser as jest.Mock).mockResolvedValue(user);
    (getArrayData as jest.Mock).mockResolvedValue(solarArray);
    (getSolarForecast as jest.Mock).mockResolvedValue(forecast);
    mockUseSession.mockReturnValue({
      status: "unauthenticated",
      data: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the dashboard", async () => {
    global.ResizeObserver = class {
      observe() {""}
      unobserve() {""}
      disconnect() {""}
    };

    const { container } = render(
      <SessionProvider session={session}>
        <Dashboard />
      </SessionProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
