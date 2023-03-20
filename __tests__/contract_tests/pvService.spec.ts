import path from 'path';
import { PactV3 } from '@pact-foundation/pact';
import { ISolarForecastRequest } from '../../types/ISolarForecastRequest';
import { ISolarForecastData } from 'types/ISolarForecastData';
import { like } from '@pact-foundation/pact/src/dsl/matchers';
import { getSolarForecast } from 'api/solarForecastApi';

const provider = new PactV3({
  consumer: 'ses-front-end',
  provider: 'solar-array-store',
  logLevel: 'error',
  dir: path.resolve(process.cwd(), 'pacts'),
});

describe('pv-service contract tests', () => {

  const solarForecastRequest: ISolarForecastRequest = { userId:"1", lat: 52.207306, lon: -6.52026, peakPower: 8.2, loss: 0.145, angle: 35.0, aspect: 2.0, mounting: "FREE", month: 1};
  const forecast: ISolarForecastData = {
      time: "2023-02-24T00:00:00",
      month: 1,
      peakGlobalOutput: 1,
      "G(i)": 1,
      "Gb(i)": 1,
      "Gd(i)": 1,
      "Gcs(i)": 1,
    };

  test('get solar forecast', async () => {

    provider.addInteraction({
      states: [{description: 'should return a solar forecast'}],
      uponReceiving: 'a request to get a solar forecast',
      withRequest: {
        method: 'POST',
        path: '/api/v1/pv/daily',
        body: like(solarForecastRequest),
      },
      willRespondWith: {
        status: 200,
        body: like(forecast),
      },
    });

    await provider.executeTest(async (mockService) => {
      process.env.API_BASE_URL = mockService.url;
      const resp = await getSolarForecast(solarForecastRequest);
      expect(resp.time).toEqual(forecast.time);
      expect(resp.month).toEqual(forecast.month);
      expect(resp.peakGlobalOutput).toEqual(forecast.peakGlobalOutput);
      expect(resp["G(i)"]).toEqual(forecast["G(i)"]);
      expect(resp["Gb(i)"]).toEqual(forecast["Gb(i)"]);
      expect(resp["Gd(i)"]).toEqual(forecast["Gd(i)"]);
      expect(resp["Gcs(i)"]).toEqual(forecast["Gcs(i)"]);
      });
  });

});