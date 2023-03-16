import { authenticate } from 'api/authApi';
import { IUserResponse } from '../../types/IUserResponse';

jest.mock('api/authApi');

describe('Auth Api', () => {
  const email: string = 'jd@test.com';
  const password: string = 'secret26'
  const userResp: IUserResponse = { name: 'John Doe', email: 'jd@test.com',  userId: '1', registeredDate:'2023-03-16T10:40:30' }

  beforeEach(() => {
    (authenticate as jest.Mock).mockResolvedValue(userResp);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should authenticate and return a user', async () => {
    const authResp  = await authenticate({ email:email, password:password});
    expect(authResp).toEqual(userResp);
  });

});