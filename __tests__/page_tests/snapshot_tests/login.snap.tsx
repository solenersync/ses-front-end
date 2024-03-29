import { render } from '@testing-library/react';
import Login from '../../../pages/login';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Login component', () => {
  test('renders the login form', () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });
});
