import { User} from 'next-auth';
import { useSession as originalUseSession } from 'next-auth/react';
import { render } from '@testing-library/react';
import Dashboard from 'pages/dashboard';
import { expect } from '@jest/globals';
import { useUserData } from 'hooks/useUserData';

jest.mock('hooks/useUserData');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: jest.fn()
}));
jest.mock('components/SolarForecastChart/solarForecastChart', () => {
  return function MockSolarForecastChart() {
    return <div data-testid='solar-forecast-chart'></div>;
  };
});

describe('Dashboard', () => {
  const user: User = { name: 'John Doe', email: 'jd@test.com',  userId: 1, id:'' };

  beforeEach(() => {
    (useUserData as jest.Mock).mockReturnValue(user);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render a chart on the dashboard ', async () => {
    const user: User = { name: 'John Doe', email: 'jd@test.com',  userId: 1, id:'' };
    (originalUseSession as jest.Mock).mockReturnValue({ status: 'authenticated', data: user });
    
    const { container } = render(<Dashboard />);
    expect(container).toMatchSnapshot();
  });
});
