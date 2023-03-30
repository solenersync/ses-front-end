import path from 'path';
import { PactV3 } from '@pact-foundation/pact';
import { ISolarForecastRequest } from '../../types/ISolarForecastRequest';
import { ISolarForecastData } from 'types/ISolarForecastData';
import { eachLike, like } from '@pact-foundation/pact/src/dsl/matchers';
import { getSolarForecast } from 'api/solarForecastApi';

const provider = new PactV3({
  consumer: 'ses-front-end',
  provider: 'pv-service',
  logLevel: 'error',
  dir: path.resolve(process.cwd(), 'pacts'),
});

describe('pv-service contract tests', () => {

  const solarForecastRequest: ISolarForecastRequest = { userId:1, lat: 52.207306, lon: -6.52026, peakPower: 8.2, loss: 0.145, angle: 35.0, aspect: 2.0, mounting: "FREE", month: 1, date: "2023-02-23"};
  //lat log for atlantic ocean
  const invalidSolarForecastRequest: ISolarForecastRequest = { userId:1, lat: 52.468979, lon: -19.730724, peakPower: 8.2, loss: 0.145, angle: 35.0, aspect: 2.0, mounting: "FREE", month: 1, date: "2023-02-23"};

  const forecast: ISolarForecastData = {
      time: "2023-02-24T00:00:00",
      month: 1,
      peakGlobalOutput: 1,
      "G(i)": 1,
      "Gb(i)": 1,
      "Gd(i)": 1,
      "Gcs(i)": 1,
      lowCloud: 1,
      midCloud: 1,
      highCloud: 1,
      maxCloudCover: 1,
      date: "2023-03-23",
      totalPowerOutput: 1,
    };

  test('a solar forecast is available', async () => {

    provider.addInteraction({
      states: [{description: 'a solar forecast is available'}],
      uponReceiving: 'a request to get a solar forecast',
      withRequest: {
        method: 'POST',
        path: '/api/v1/pv/daily',
        body: like(solarForecastRequest),
      },
      willRespondWith: {
        status: 200,
        body: eachLike(forecast),
      },
    });

    await provider.executeTest(async (mockService) => {
      process.env.API_BASE_URL = mockService.url;
      const resp = await getSolarForecast(solarForecastRequest);
      expect(resp.data[0].time).toEqual(forecast.time);
      expect(resp.data[0].month).toEqual(forecast.month);
      expect(resp.data[0].peakGlobalOutput).toEqual(forecast.peakGlobalOutput);
      expect(resp.data[0]["G(i)"]).toEqual(forecast["G(i)"]);
      expect(resp.data[0]["Gb(i)"]).toEqual(forecast["Gb(i)"]);
      expect(resp.data[0]["Gd(i)"]).toEqual(forecast["Gd(i)"]);
      expect(resp.data[0]["Gcs(i)"]).toEqual(forecast["Gcs(i)"]);
      expect(resp.data[0].lowCloud).toEqual(forecast.lowCloud);
      expect(resp.data[0].midCloud).toEqual(forecast.midCloud);
      expect(resp.data[0].highCloud).toEqual(forecast.highCloud);
      expect(resp.data[0].maxCloudCover).toEqual(forecast.maxCloudCover);
      expect(resp.data[0].date).toEqual(forecast.date);
      expect(resp.data[0].totalPowerOutput).toEqual(forecast.totalPowerOutput);
      });
  });

  test('a solar forecast is not available', async () => {

    provider.addInteraction({
      states: [{description: 'a solar forecast is not available'}],
      uponReceiving: 'a request to get a solar forecast for an invalid location',
      withRequest: {
        method: 'POST',
        path: '/api/v1/pv/daily',
        body: like(invalidSolarForecastRequest),
      },
      willRespondWith: {
        status: 400,
      },
    });

    await provider.executeTest(async (mockService) => {
      process.env.API_BASE_URL = mockService.url;
      const resp = await getSolarForecast(invalidSolarForecastRequest);
      expect(resp).toBeNull();
      });
  });

});
