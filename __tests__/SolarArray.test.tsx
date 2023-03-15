import { render, screen, waitFor } from "@testing-library/react";
import Router from 'next/router';
import { useSession as originalUseSession } from 'next-auth/react';
import { getUser } from "api/userApi";
import { User } from 'next-auth';
import { ISolarArray } from 'types/ISolarArray';
import "@testing-library/jest-dom";
import SolarArray from 'pages/solar-array';
import { getArrayData } from '../api/solarArrayApi';

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  replace: jest.fn(),
}));
jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: jest.fn()
}));
jest.mock("api/solarArrayApi");
jest.mock("api/userApi");

describe('SolarArray', () => {
  const user: User = { name: 'John Doe', email: "jd@test.com",  userId: "1", id:"" };
  const mockSolarArray: ISolarArray = { solarArrayId: 1, lon: 0.1276, lat: 51.5072, peakPower: 100, systemLoss: 10, angle: 30, aspect: 180, mounting: "Free Standing", userId: "1"};
  const mockUseSession = originalUseSession as jest.Mock;;
  const query = {
    lat: "51.5072",
    lon: "0.1276",
    peakPower: "100",
    loss: "10",
    angle: "30",
    aspect: "180",
    mounting: "Free Standing",
    solarArrayId: "2",
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should redirect to login page if session data is not available', async () => {
    mockUseSession.mockReturnValue({ status: 'loading', data: null });
    render(<SolarArray />);
    expect(Router.replace).not.toHaveBeenCalled();
    // await waitFor(() => expect(screen.queryByText('My Solar Array')).toBeNull());

  });

  it('should redirect to login page if user is not authenticated', () => {
    const routerReplaceMock = jest.fn();
    mockUseSession.mockReturnValueOnce({ status: 'unauthenticated', data: null });
    render(<SolarArray />);
    // expect(screen.queryByText('My Solar Array')).toBeNull();
    expect(Router.replace).toHaveBeenCalledWith('/login');
  });

  it('should fetch solar array data and render the component', async () => {
    mockUseSession.mockReturnValue({ status: 'authenticated', data: {user}});
    (getUser as jest.Mock).mockReturnValue( user );
    (getArrayData as jest.Mock).mockReturnValue(mockSolarArray);
    render(<SolarArray />);
    expect(screen.queryByText('My Solar Array')).toBeInTheDocument();
    await waitFor(() => expect(getUser).toHaveBeenCalledWith('jd@test.com'));
    await waitFor(() => expect(getArrayData).toHaveBeenCalledWith('1'));
    await waitFor(() => expect(screen.getByText('Latitude')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(mockSolarArray.lat.toString())).toBeInTheDocument());
  });

  it('should redirect to my-array page if solar array data is not available', async () => {
    mockUseSession.mockReturnValue({ status: 'authenticated', data: {user}});
    (getUser as jest.Mock).mockReturnValue( user );
    (getArrayData as jest.Mock).mockReturnValue(null);
    render(<SolarArray />);
    await waitFor(() => expect(Router.replace).toHaveBeenCalledWith('/my-array'));
    // await waitFor(() => expect(screen.queryByText('My Solar Array')).toBeNull());
  });

  it('should render the Edit button if solar array data is available', async () => {
    (mockUseSession as jest.Mock).mockReturnValue({ status: 'authenticated', data: { user }});
    (getUser as jest.Mock).mockReturnValue({ userId: '1' });
    (getArrayData as jest.Mock).mockReturnValue(mockSolarArray);
    render(<SolarArray />);
    await waitFor(() => expect(screen.getByText('Edit')).toBeInTheDocument());
  });
});
