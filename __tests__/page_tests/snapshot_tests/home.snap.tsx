import { render } from '@testing-library/react';
import Home from 'pages';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Home', () => {
  const query = {
    email: 'jd@test.com',
  };

  (useRouter as jest.Mock).mockReturnValue({
    query: query,
  });

  test('should render the home page', async() => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
