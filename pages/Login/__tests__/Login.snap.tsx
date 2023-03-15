import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../login';

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe('Login component', () => {
  
  test('renders the login form', () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });

});

