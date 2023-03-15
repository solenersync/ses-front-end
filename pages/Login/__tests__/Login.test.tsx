import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Login from '../login';

jest.mock('next-auth/react');
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe('Login component', () => {
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });

  test('renders the login form', () => {
    render(<Login />);

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
  });

  test('tests login form submission', async () => {
    (signIn as jest.Mock).mockResolvedValue({ status: 200 });

    render(<Login />);

    fireEvent.change(screen.getByTestId('email'), { target: { value: 'jd@test.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByTestId('sign-in-button'));

    await waitFor(() => expect(signIn).toHaveBeenCalled());
    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: 'jd@test.com',
      password: 'password',
      redirect: false,
    });
  });

  test('redirects to dashboard on successful login', async () => {
    (signIn as jest.Mock).mockResolvedValue({ status: 200 });
    const routerPushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
    });

    render(<Login />);

    fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByTestId('sign-in-button'));

    await waitFor(() => expect(routerPushMock).toHaveBeenCalled());
    expect(routerPushMock).toHaveBeenCalledWith('/dashboard');
  });
});
