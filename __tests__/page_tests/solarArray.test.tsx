import { render, screen, waitFor } from '@testing-library/react';
import Router from 'next/router';
import { User } from 'next-auth';
import { ISolarArray } from 'types/ISolarArray';
import SolarArray from 'pages/solar-array';
import { getArrayData } from '../../api/solarArrayApi';
import { useUserData } from 'hooks/useUserData';
import '@testing-library/jest-dom';

jest.mock('hooks/useUserData');
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  replace: jest.fn(),
}));
jest.mock('api/solarArrayApi');

describe('SolarArray page', () => {
  const user: User = { name: 'John Doe', email: 'jd@test.com',  userId: '1', id:'' };
  const mockSolarArray: ISolarArray = { solarArrayId: 1, lon: -6.519937, lat: 52.207480, peakPower: 7, loss: 0.1, angle: 35, aspect: 2, mounting: 'Free Standing', userId: '1'};

  beforeEach(() => {
    (useUserData as jest.Mock).mockReturnValue(user);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch solar array data and render the component', async () => {
    (getArrayData as jest.Mock).mockReturnValue(mockSolarArray);
    render(<SolarArray />);
    expect(screen.queryByText('My Solar Array')).toBeInTheDocument();
    await waitFor(() => expect(getArrayData).toHaveBeenCalledWith('1'));
    await waitFor(() => expect(screen.getByText('Latitude')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(mockSolarArray.lat.toString())).toBeInTheDocument());
  });

  it('should redirect to my-array page if solar array data is null', async () => {
    (getArrayData as jest.Mock).mockReturnValue(null);
    render(<SolarArray />);
    await waitFor(() => expect(Router.replace).toHaveBeenCalledWith('/my-array'));
  });

  it('should render the edit button if solar array data is available', async () => {
    (getArrayData as jest.Mock).mockReturnValue(mockSolarArray);
    render(<SolarArray />);
    await waitFor(() => expect(screen.getByText('Edit')).toBeInTheDocument());
  });
});
