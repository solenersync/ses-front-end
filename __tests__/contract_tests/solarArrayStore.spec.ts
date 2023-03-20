import path from 'path';
import { PactV3 } from '@pact-foundation/pact';
import { like } from '@pact-foundation/pact/src/dsl/matchers';
import { User } from 'next-auth';
import { ISolarArray } from 'types/ISolarArray';
import { getArrayData, createArray, updateArray } from 'api/solarArrayApi';
import { ICreateSolarArray } from 'types/ICreateSolarArray';

const provider = new PactV3({
  consumer: 'ses-front-end',
  provider: 'solar-array-store',
  logLevel: 'error',
  dir: path.resolve(process.cwd(), 'pacts'),
});

describe('solar-array-store contract tests', () => {

  const user: User = { name: 'John Doe', email: 'jd@test.com',  userId: '1', id:'' };
  const solarArray: ISolarArray = { solarArrayId:1, userId:"1", lat: 52.207306, lon: -6.52026, peakPower: 8.2, loss: 0.145, angle: 35.0, aspect: 2.0, mounting: "FREE"};
  const solarArrayPayload: ICreateSolarArray = { userId:"1", lat: 52.207306, lon: -6.52026, peakPower: 8.2, loss: 0.145, angle: 35.0, aspect: 2.0, mounting: "FREE"};

  test('get user solar array', async () => {

    provider.addInteraction({
      states: [{description: 'should return user solar array'}],
      uponReceiving: 'a request to get a user solar array',
      withRequest: {
        method: 'GET',
        path: '/api/v1/solar-arrays/array/user/1',
      },
      willRespondWith: {
        status: 200,
        body: like(solarArray),
      },
    });

    await provider.executeTest(async (mockService) => {
      process.env.API_BASE_URL = mockService.url;
      const resp = await getArrayData(user.userId);
      expect(resp.lat).toEqual(solarArray.lat);
      expect(resp.lon).toEqual(solarArray.lon);
      expect(resp.peakPower).toEqual(solarArray.peakPower);
      expect(resp.loss).toEqual(solarArray.loss);
      expect(resp.angle).toEqual(solarArray.angle);
      expect(resp.aspect).toEqual(solarArray.aspect);
      expect(resp.mounting).toEqual(solarArray.mounting);
      });
    
  });
  test('create solar array', async () => {

    provider.addInteraction({
      states: [{description: 'should create solar array and return array details'}],
      uponReceiving: 'a valid payload for create solar array',
      withRequest: {
        method: 'POST',
        path: '/api/v1/solar-arrays/create',
        body: {
          userId: solarArrayPayload.userId,
          lat: solarArrayPayload.lat,
          lon: solarArrayPayload.lon,
          peakPower: solarArrayPayload.peakPower,
          loss: solarArrayPayload.loss,
          angle: solarArrayPayload.angle,
          aspect: solarArrayPayload.aspect,
          mounting: solarArrayPayload.mounting,
        },
      },
      willRespondWith: {
        status: 200,
      },
    });

    await provider.executeTest(async (mockService) => {
      process.env.API_BASE_URL = mockService.url;
      const resp = await createArray(solarArrayPayload);
      expect(resp.status).toEqual(200);
      });
    
  });

  test('update solar array', async () => {

    provider.addInteraction({
      states: [{description: 'should update user and return status 200'}],
      uponReceiving: 'a valid payload for update user',
      withRequest: {
        method: 'POST',
        path: '/api/v1/solar-arrays/update',
        body: {
          solarArrayId: solarArray.solarArrayId,
          userId: solarArray.userId,
          lat: solarArray.lat,
          lon: solarArray.lon,
          peakPower: solarArray.peakPower,
          loss: solarArray.loss,
          angle: solarArray.angle,
          aspect: solarArray.aspect,
          mounting: solarArray.mounting,
        },
      },
      willRespondWith: {
        status: 200
      },
    });

    await provider.executeTest(async (mockService) => {
      process.env.API_BASE_URL = mockService.url;
      const resp = await updateArray(solarArray);
      expect(resp.status).toEqual(200);
    });
    
  });

});
