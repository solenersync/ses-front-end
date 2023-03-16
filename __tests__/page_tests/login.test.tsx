import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Login from '../../pages/login';

jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Login page', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    (signIn as jest.Mock).mockResolvedValue({ status: 200 });
  });

  test('should render the login form', () => {
    render(<Login />);

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
  });

  test('should submit login form', async () => {
    render(<Login />);

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'jd@test.com' },
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'secret26' },
    });
    fireEvent.click(screen.getByTestId('sign-in-button'));

    await waitFor(() => expect(signIn).toHaveBeenCalled());
    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: 'jd@test.com',
      password: 'secret26',
      redirect: false,
    });
  });

  test('should redirect to dashboard on successful login', async () => {
    const routerPushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
    });

    render(<Login />);

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'jd@test.com' },
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'secret26' },
    });
    fireEvent.click(screen.getByTestId('sign-in-button'));

    await waitFor(() => expect(routerPushMock).toHaveBeenCalled());
    expect(routerPushMock).toHaveBeenCalledWith('/dashboard');
  });
});
