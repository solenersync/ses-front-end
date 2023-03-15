import { render } from '@testing-library/react';
import Home from 'pages';
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn()
}));

describe('Home', () => {

  const routerPushMock = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock});

  test('should render the home page', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});