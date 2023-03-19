import path from 'path';
import { PactV3 } from '@pact-foundation/pact';
import { like } from '@pact-foundation/pact/src/dsl/matchers';
import { User } from 'next-auth';
import { IUserResponse } from 'types/IUserResponse';
import { getUser, createUser, updateUser } from '../../api/userApi';
import { ICreateUser } from '../../types/ICreateUser';

const provider = new PactV3({
  consumer: 'ses-front-end',
  provider: 'user-store',
  logLevel: 'error',
  dir: path.resolve(process.cwd(), 'pacts'),
});

describe('userstore', () => {

  const user: User = { name: 'John Doe', email: 'jd@test.com',  userId: '1', id:'' };
  const userResp: IUserResponse = { name: 'John Doe', email: 'jd@test.com',  userId: 1, registeredDate:'2023-03-16T10:40:30' }
  const userPayload: ICreateUser = { email: 'jd@test.com',  password:'secret26', name: 'John Doe' };

  test('get user by email', async () => {

    provider.addInteraction({
      states: [{description: 'should return user details'}],
      uponReceiving: 'a valid payload for get user by email',
      withRequest: {
        method: 'POST',
        path: '/api/v1/users/user',
        body: {email: user.email},
      },
      willRespondWith: {
        status: 200,
        body: like({
          email: userResp.email,
          name: userResp.name,
          userId: userResp.userId,
        }),
      },
    });

    await provider.executeTest(async (mockService) => {
      process.env.API_BASE_URL = mockService.url;
      const resp = await getUser(user.email);
      expect(resp.email).toEqual(userResp.email);
      expect(resp.name).toEqual(userResp.name);
      expect(resp.userId).toEqual(userResp.userId);
      });
    
  });

  test('create user', async () => {

    provider.addInteraction({
      states: [{description: 'should create user and return user details'}],
      uponReceiving: 'a valid payload for create user',
      withRequest: {
        method: 'POST',
        path: '/api/v1/users/user/create',
        body: {
          email: userPayload.email,
          name: userPayload.name,
          password: userPayload.password,
        },
      },
      willRespondWith: {
        status: 200,
      },
    });

    await provider.executeTest(async (mockService) => {
      process.env.API_BASE_URL = mockService.url;
      const resp = await createUser({email: userPayload.email, password: userPayload.password, name:userPayload.name});
      expect(resp.status).toEqual(200);
      });
    
  });

  test('update user', async () => {

    provider.addInteraction({
      states: [{description: 'should update user and return status 200'}],
      uponReceiving: 'a valid payload for update user',
      withRequest: {
        method: 'PUT',
        path: '/api/v1/users/user/update',
        body: {
          email: userPayload.email,
          name: userPayload.name,
        },
      },
      willRespondWith: {
        status: 200
      },
    });

    await provider.executeTest(async (mockService) => {
      process.env.API_BASE_URL = mockService.url;
      const resp = await updateUser({email: userPayload.email, name: userPayload.name});
      expect(resp.status).toEqual(200);
    });
    
  });
});
