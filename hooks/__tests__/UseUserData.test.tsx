import { User} from 'next-auth';
import { useSession as originalUseSession } from 'next-auth/react';
import { expect } from '@jest/globals';;
import Router from 'next/router';
import { renderHook, waitFor } from '@testing-library/react';
import { useUserData } from 'hooks/useUserData';
import { getUser } from 'api/userApi';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  replace: jest.fn(),
}));
jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: jest.fn()
}));
jest.mock('api/userApi');

describe('UseUserData Hook', () => {

  const user: User = { name: 'John Doe', email: 'jd@test.com',  userId: '1', id:'' };

  afterEach(() => {
    jest.resetAllMocks();
  });


  it('should return userId when session data is available', async () => {
    (getUser as jest.Mock).mockResolvedValue(user);
    (originalUseSession as jest.Mock).mockReturnValue({ status: 'authenticated', data: {user}});
    const { result } = renderHook(() => useUserData());
    await waitFor(() => expect(result.current).toBe(user.userId));
    expect(getUser).toHaveBeenCalledWith(user.email);
  });


  it('should redirect to login page if session data is not available', async () => {
    (originalUseSession as jest.Mock).mockReturnValue({ status: 'authenticated', data: null });
    renderHook(() => useUserData());
    await waitFor(() => expect(Router.replace).toHaveBeenCalledWith('/login'));
  
  });

  test('should return null when session status is loading ', async () => {
    (originalUseSession as jest.Mock).mockReturnValue({ status: 'loading', data: null });
    const { result } = renderHook(() => useUserData());
    await waitFor(() => expect(result.current).toBeNull());
    await waitFor(() => expect(Router.replace).not.toHaveBeenCalled());
  });

});

