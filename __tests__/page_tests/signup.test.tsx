import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import { createUser } from 'api/userApi';
import { useRouter } from 'next/router';
import Signup from 'pages/signup';

jest.mock('next-auth/react');
jest.mock('api/userApi');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Signup page', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn(), query: {} });
    (createUser as jest.Mock).mockResolvedValue({ status: 200 });
    (signIn as jest.Mock).mockResolvedValue({ status: 200 });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render the signup form', () => {
    render(<Signup />);

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('signup-button')).toBeInTheDocument();
  });

  test('should submit signup form', async () => {
    render(<Signup />);

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'jd@test.com' },
    });
    fireEvent.change(screen.getByTestId('name'), {
      target: { value: 'john doe' },
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'secret26' },
    });
    fireEvent.click(screen.getByTestId('signup-button'));

    await waitFor(() => expect(signIn).toHaveBeenCalled());
    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: 'jd@test.com',
      password: 'secret26',
      redirect: false,
    });
  });

  test('should redirect to dashboard on successful signup', async () => {
    const routerPushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
      query: {email: 'jd@test.com'},
    });

    render(<Signup />);

    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'jd@test.com' },
    });
    fireEvent.change(screen.getByTestId('name'), {
      target: { value: 'john doe' },
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'secret26' },
    });
    fireEvent.click(screen.getByTestId('signup-button'));

    await waitFor(() => expect(routerPushMock).toHaveBeenCalled());
    expect(routerPushMock).toHaveBeenCalledWith('/dashboard');
  });

  test('should set the email from query param', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {email: 'jd@test.com'},
    });
    render(<Signup />);
    expect(screen.getByTestId('email')).toHaveValue('jd@test.com');
    expect(screen.getByTestId('email')).toBeDisabled();
  });
});
