import { render, act } from '@testing-library/react';
import Profile from 'pages/profile';
import { useSession as originalUseSession } from 'next-auth/react';
import { User } from 'next-auth';
import { getUser } from 'api/userApi';
import '@testing-library/jest-dom';
import { IUserResponse } from 'types/IUserResponse';
import { AxiosResponse } from 'axios';

jest.mock('api/userApi');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: jest.fn()
}));

describe('Profile page', () => {
  const user: User = { name: 'John Doe', email: 'jd@test.com',  userId: '1', id:'' };
  const userRespBody: IUserResponse = { name: 'John Doe', email: 'jd@test.com',  userId: 1, registeredDate:'2023-03-16T10:40:30' }

  const axiosResponse: AxiosResponse = {
    data: userRespBody,
    status: 200,
    statusText: '',
    headers: undefined,
    config: undefined
  };

  beforeEach(() => {
    (getUser as jest.Mock).mockResolvedValue(axiosResponse);
    (originalUseSession as jest.Mock).mockReturnValue({ status: 'authenticated', data: {user}});
  });

  test('renders the profile page', async () => {
    let container: HTMLElement;

    await act(async () => { 
      const result = render(<Profile />);
      container = result.container;
    });  

    expect(container).toMatchSnapshot();
  });
  
});
