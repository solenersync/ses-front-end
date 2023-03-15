import React from "react";
import { render, fireEvent, screen, act } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { useRouter } from "next/router";
import { AppLayout } from 'components/Layouts/AppLayout';

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));


class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver as any;

describe("AppLayout", () => {
  const mockTitle = "Test Title";
  const mockChildren = <div>Test Content</div>;

  test("renders the layout with the given title and content", async () => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: "/dashboard" });

    render(<AppLayout pageTitle={mockTitle}>{mockChildren}</AppLayout>);

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("toggles the mobile sidebar when the button is clicked", async () => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: "/dashboard" });

    render(<AppLayout pageTitle={mockTitle}>{mockChildren}</AppLayout>);
    const sidebarButton = screen.getByRole("button", { name: /open sidebar/i });
    await act( async () => {
      fireEvent.click(sidebarButton);
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("navigates to pages from the sidebar", async () => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: "/dashboard" });

    render(<AppLayout pageTitle={mockTitle}>{mockChildren}</AppLayout>);

    const dashboardLink = screen.getByRole("link", { name: "Dashboard" });
    expect(dashboardLink).toHaveAttribute("href", "dashboard");
  });
});
