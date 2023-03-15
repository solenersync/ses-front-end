import { useRouter } from "next/router";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../index";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Home page", () => {
  const routerPushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders email input and submit button", () => {
    render(<Home />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    expect(emailInput).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: "Sign up" });
    expect(submitButton).toBeInTheDocument();
  });

  test("submits email and redirects to signup page", () => {
    render(<Home />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const submitButton = screen.getByRole("button", { name: "Sign up" });

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.click(submitButton);

    expect(routerPushMock).toHaveBeenCalledWith({
      pathname: "/signup",
      query: { email: "test@test.com" },
    });
  });

  test("renders login link with correct href", () => {
    render(<Home />);

    const loginLink = screen.getByRole("link", { name: "Log in" });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
