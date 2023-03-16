import { render, act } from '@testing-library/react';
import Profile from 'pages/profile';
import { useSession as originalUseSession } from 'next-auth/react';
import { User } from 'next-auth';
import { getUser } from 'api/userApi';
import '@testing-library/jest-dom';

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

  beforeEach(() => {
    (getUser as jest.Mock).mockResolvedValue(user);
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
