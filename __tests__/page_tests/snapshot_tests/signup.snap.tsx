import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import Signup from '../../../pages/signup';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Signup page', () => {
  const query = {
    lat: '52.207480',
    lon: '-6.519937',
    peakPower: '7',
    loss: '0.1',
    angle: '35',
    aspect: '2',
    mounting: 'Free Standing',
    solarArrayId: '2',
  };
  test('renders the signup page', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: query,
      push: jest.fn(),
    });
    const { container } = render(<Signup />);
    expect(container).toMatchSnapshot();
  });
});
