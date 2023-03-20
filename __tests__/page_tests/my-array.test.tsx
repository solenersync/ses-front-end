import { render, screen, fireEvent, act } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useSession as originalUseSession } from 'next-auth/react';
import { createArray, updateArray } from 'api/solarArrayApi';
import { useUserData } from 'hooks/useUserData';
import MyArray from 'pages/my-array';
import { User } from 'next-auth';
import { ISolarArray } from 'types/ISolarArray';
import '@testing-library/jest-dom';
import { AxiosResponse } from 'axios';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: jest.fn(),
}));
jest.mock('api/solarArrayApi');
jest.mock('api/userApi');
jest.mock('hooks/useUserData', () => ({
  useUserData: jest.fn(() => '1'),
}));

describe('MyArray', () => {
  const user: User = {
    name: 'John Doe',
    email: 'jd@test.com',
    userId: '1',
    id: '',
  };
  const solarArray: ISolarArray = {
    solarArrayId: 1,
    lon: -6.519937,
    lat: 52.207480,
    peakPower: 7,
    loss: 0.1,
    angle: 35,
    aspect: 2,
    mounting: 'Free Standing',
    userId: '1',
  };
  const mockUseSession = originalUseSession as jest.Mock;
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
  const axiosResponse: AxiosResponse = {
    data: solarArray,
    status: 200,
    statusText: '',
    headers: undefined,
    config: undefined
  };

  beforeEach(() => {
    mockUseSession.mockReturnValue({
      status: 'authenticated',
      data: { user },
    });
    (useUserData as jest.Mock).mockReturnValue(user);
    (createArray as jest.Mock).mockResolvedValue(axiosResponse);
    (updateArray as jest.Mock).mockResolvedValue(solarArray);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders the form', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: query,
      push: jest.fn(),
    });
    act(() => {
      render(<MyArray />);
    });
    expect(screen.getByText('Update Array')).toBeInTheDocument();
    expect(screen.getByTestId('mounting')).toBeInTheDocument();
    expect(screen.getByTestId('latitude')).toBeInTheDocument();
    expect(screen.getByTestId('longitude')).toBeInTheDocument();
    expect(screen.getByTestId('peakPower')).toBeInTheDocument();
    expect(screen.getByTestId('loss')).toBeInTheDocument();
    expect(screen.getByTestId('angle')).toBeInTheDocument();
    expect(screen.getByTestId('aspect')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  test('handles form submission for creating a new array', async () => {
    const routerPushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: routerPushMock,
    });
    render(<MyArray />);

    fireEvent.change(screen.getByTestId('mounting'), {
      target: { value: 'Free Standing' },
    });
    fireEvent.change(screen.getByTestId('latitude'), {
      target: { value: '52.207480' },
    });
    fireEvent.change(screen.getByTestId('longitude'), {
      target: { value: '-6.519937' },
    });
    fireEvent.change(screen.getByTestId('peakPower'), {
      target: { value: '7.2' },
    });
    fireEvent.change(screen.getByTestId('loss'), {
      target: { value: '0.1' },
    });
    fireEvent.change(screen.getByTestId('angle'), { target: { value: '45' } });
    fireEvent.change(screen.getByTestId('aspect'), {
      target: { value: '15' },
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('save-button'));
    });

    expect(createArray).toHaveBeenCalledWith({
      solarArrayId: 0,
      lat: 52.207480,
      lon: -6.519937,
      peakPower: 7.2,
      loss: 0.1,
      angle: 45,
      aspect: 15,
      mounting: 'Free Standing',
      userId: '1',
    });

    expect(routerPushMock).toHaveBeenCalledWith('/solar-array');
  });
});
