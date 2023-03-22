import { getSolarForecast } from "api/solarForecastApi";
import { ISolarForecastData } from "../../types/ISolarForecastData";
import { ISolarForecastRequest } from "../../types/ISolarForecastRequest";

jest.mock("api/solarForecastApi");

describe("Solar Forecast Api", () => {
  const forecast: ISolarForecastData = {
    time: "2023-02-24T00:00:00",
    month: 1,
    peakGlobalOutput: 1,
    "G(i)": 1,
    "Gb(i)": 1,
    "Gd(i)": 1,
    "Gcs(i)": 1,
  };
  const solarForecastRequest: ISolarForecastRequest = {
    lon: 1,
    lat: 1,
    peakPower: 1,
    loss: 1,
    angle: 1,
    aspect: 1,
    mounting: "test",
    userId: 1,
    month: 1,
  };

  beforeEach(() => {
    (getSolarForecast as jest.Mock).mockResolvedValue(forecast);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return solar forecast data", async () => {
    const solarForecastData = await getSolarForecast(solarForecastRequest);
    expect(solarForecastData).toEqual(forecast);
  });
});
