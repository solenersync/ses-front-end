import { render } from '@testing-library/react';
import Profile from 'pages/profile';
import { useSession as originalUseSession } from 'next-auth/react';
import { User } from 'next-auth';


jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: jest.fn()
}));

describe('Profile page', () => {
  const user: User = { name: 'John Doe', email: 'jd@test.com',  userId: '1', id:'' };
  (originalUseSession as jest.Mock).mockReturnValue({ status: 'authenticated', data: {user}});

  test('renders the profile page', () => {
    const { container } = render(<Profile />);
    expect(container).toMatchSnapshot();
  });
  
});
