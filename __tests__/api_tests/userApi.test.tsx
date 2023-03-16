import { getUser, updateUser, createUser } from 'api/userApi';
import { User } from 'next-auth';
import { IUserResponse } from 'types/IUserResponse';

jest.mock('api/userApi');

describe('User Api', () => {
  const user: User = { name: 'John Doe', email: 'jd@test.com',  userId: '1', id:'' };
  const createUserResp: IUserResponse = { name: 'John Doe', email: 'jd@test.com',  userId: '1', registeredDate:'2023-03-16T10:40:30' }


  beforeEach(() => {
    (getUser as jest.Mock).mockResolvedValue(user);
    (updateUser as jest.Mock).mockResolvedValue(user);
    (createUser as jest.Mock).mockResolvedValue(createUserResp);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return a user', async () => {
    const userResp  = await getUser(user.email);
    expect(userResp).toEqual(user);
  });

  test('should update a user', async () => {
    const updateUserResp  = await updateUser(user);
    expect(updateUserResp).toEqual(user);
  });

  test('should create a user', async () => {
    const updateUserResp  = await updateUser(user);
    expect(updateUserResp).toEqual(user);
  });

});