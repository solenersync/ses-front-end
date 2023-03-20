
import { authenticate } from 'api/userApi';
import  Credentials  from 'next-auth/providers/credentials';
import { IUserResponse } from 'types/IUserResponse';


jest.mock('api/userApi');

describe('authorize function', () => {
  const credentials = { email: 'jd@test.com', password: 'secret26' };
  const userResp: IUserResponse = { name: 'John Doe', email: 'jd@test.com',  userId: 1, registeredDate:'2023-03-16T10:40:30' }

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return user data if authenticated', async () => {
    (authenticate as jest.Mock).mockResolvedValue({ data: userResp, status: 200 });
    const result = await authenticate(credentials);
    expect(result.data).toEqual(userResp);
  });

  test('should throw error if user is not authenticated', async () => {
    (authenticate as jest.Mock).mockResolvedValue({ data: null, status: 500 });
    const result = await authenticate(credentials);
    expect(result.data).toBeNull();
    expect(result.status).toEqual(500);
  });
});
