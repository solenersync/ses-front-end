import path from 'path';
import { PactV3 } from '@pact-foundation/pact';
import { like } from '@pact-foundation/pact/src/dsl/matchers';
import { User } from 'next-auth';
import { IUserResponse } from 'types/IUserResponse';
import { getUser, createUser, updateUser, authenticate } from '../../api/userApi';
import { ICreateUser } from '../../types/ICreateUser';
import { IBasicAuthUser } from '../../types/IBasicAuthUser';

const provider = new PactV3({
  consumer: 'ses-front-end',
  provider: 'user-store',
  logLevel: 'error',
  dir: path.resolve(process.cwd(), 'pacts'),
});

describe('userstore contract tests', () => {

  const user: User = { name: 'John Doe', email: 'jd@test.com',  userId: 1, id:'' };
  const userResp: IUserResponse = { name: 'John Doe', email: 'jd@test.com',  userId: 1, registeredDate:'2023-03-16T10:40:30' }
  const userPayload: ICreateUser = { email: 'jd@test.com',  password:'secret26', name: 'John Doe' };
  const basicAuthUser: IBasicAuthUser = { email: 'jd@test.com',  password:'secret26' };

  test('a user exists', async () => {

    provider.addInteraction({
      states: [{description: 'a user exists'}],
      uponReceiving: 'a valid request to get user by email',
      withRequest: {
        method: 'POST',
        path: '/api/v1/users/user',
        body: {email: user.email},
      },
      willRespondWith: {
        status: 301,
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
      // expect(resp.status).toEqual(301);
      // expect(resp.data.email).toEqual(userResp.email);
      // expect(resp.data.name).toEqual(userResp.name);
      // expect(resp.data.userId).toEqual(userResp.userId);
      });
    
  });

  test('a user doesnt exist', async () => {

    provider.addInteraction({
      states: [{description: 'a user doesnt exist'}],
      uponReceiving: 'an invalid request to get user by email',
      withRequest: {
        method: 'POST',
        path: '/api/v1/users/user',
        body: {email: user.email},
      },
      willRespondWith: {
        status: 404,
      },
    });

    await provider.executeTest(async (mockService) => {
      process.env.API_BASE_URL = mockService.url;
      const resp = await getUser(user.email);
      expect(resp).toBeNull();
      });
    
  });

  test('a user is created', async () => {

    provider.addInteraction({
      states: [{description: 'a user is created'}],
      uponReceiving: 'a valid payload to create user',
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

  test('a user fails to be created', async () => {

    provider.addInteraction({
      states: [{description: 'a user fails to be created'}],
      uponReceiving: 'an invalid payload to create user',
      withRequest: {
        method: 'POST',
        path: '/api/v1/users/user/create',
        body: {
          email: null,
          name: userPayload.name,
          password: userPayload.password,
        },
      },
      willRespondWith: {
        status: 500,
      },
    });

    await provider.executeTest(async (mockService) => {
      process.env.API_BASE_URL = mockService.url;
      const resp = await createUser({email: null, password: userPayload.password, name:userPayload.name});
      expect(resp).toBeNull();
    });
  });

  test('a user is updated', async () => {

    provider.addInteraction({
      states: [{description: 'a user is updated'}],
      uponReceiving: 'a valid payload to update user',
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

  test('a user fails to be updated', async () => {

    provider.addInteraction({
      states: [{description: 'a user fails to be updated'}],
      uponReceiving: 'an invalid payload to update user',
      withRequest: {
        method: 'PUT',
        path: '/api/v1/users/user/update',
        body: {
          email: null,
          name: userPayload.name,
        },
      },
      willRespondWith: {
        status: 500
      },
    });

    await provider.executeTest(async (mockService) => {
      process.env.API_BASE_URL = mockService.url;
      const resp = await updateUser({email: null, name: userPayload.name});
      expect(resp).toBeNull();
    });
    
  });

  test('user credentials match', async () => {

    provider.addInteraction({
      states: [{description: 'user credentials match'}],
      uponReceiving: 'a valid email and password to authenticate',
      withRequest: {
        method: 'POST',
        path: '/api/v1/users/user/authenticate',
        body: {
          email: basicAuthUser.email,
          password: basicAuthUser.password
        }
      },
      willRespondWith: {
        body: like(userResp),
        status: 200
      },
    });

    await provider.executeTest(async (mockService) => {
      process.env.API_BASE_URL = mockService.url;
      const resp = await authenticate(basicAuthUser);
      expect(resp.status).toEqual(200);
      expect(resp.data.email).toEqual(userResp.email);
      expect(resp.data.name).toEqual(userResp.name);
      expect(resp.data.userId).toEqual(userResp.userId);
    });
  });

  test('user credentials dont match', async () => {

    provider.addInteraction({
      states: [{description: 'user credentials dont match'}],
      uponReceiving: 'an invalid email and password to authenticate',
      withRequest: {
        method: 'POST',
        path: '/api/v1/users/user/authenticate',
        body: {
          email: null,
          password: basicAuthUser.password
        }
      },
      willRespondWith: {
        status: 500
      },
    });

    await provider.executeTest(async (mockService) => {
      process.env.API_BASE_URL = mockService.url;
      const resp = await authenticate({email: null, password: basicAuthUser.password});
      expect(resp).toBeNull();
    });
  });
});
