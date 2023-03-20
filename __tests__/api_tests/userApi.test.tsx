import { getUser, updateUser, createUser, authenticate } from 'api/userApi';
import { AxiosResponse } from 'axios';
import { User } from 'next-auth';
import { IBasicAuthUser } from 'types/IBasicAuthUser';
import { IUserResponse } from 'types/IUserResponse';

jest.mock('api/userApi');

describe('User Api', () => {
  const user: User = { name: 'John Doe', email: 'jd@test.com',  userId: '1', id:'' };
  const userRespBody: IUserResponse = { name: 'John Doe', email: 'jd@test.com',  userId: 1, registeredDate:'2023-03-16T10:40:30' }
  const basicAuthUser: IBasicAuthUser = { email: 'jd@test.com', password: 'secret26' }
  const axiosResponse: AxiosResponse = {
    data: userRespBody,
    status: 200,
    statusText: '',
    headers: undefined,
    config: undefined
  };


  beforeEach(() => {
    (getUser as jest.Mock).mockResolvedValue(axiosResponse);
    (updateUser as jest.Mock).mockResolvedValue(axiosResponse);
    (createUser as jest.Mock).mockResolvedValue(axiosResponse);
    (authenticate as jest.Mock).mockResolvedValue(axiosResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return a user', async () => {
    const userResp = await getUser(user.email);
    expect(userResp).toEqual(axiosResponse);
  });

  test('should update a user', async () => {
    const updateUserResp  = await updateUser(user);
    expect(updateUserResp).toEqual(axiosResponse);
  });

  test('should create a user', async () => {
    const updateUserResp  = await updateUser(user);
    expect(updateUserResp).toEqual(axiosResponse);
  });

  test('should authenticate and return a user', async () => {
    const authResp  = await authenticate(basicAuthUser);
    expect(authResp).toEqual(axiosResponse);
  });


});