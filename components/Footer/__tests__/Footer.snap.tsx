import { render } from "@testing-library/react";
import Footer from "components/Footer/footer";

describe("Footer", () => {
  test("should render the footer", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
