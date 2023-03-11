import { render } from '@testing-library/react';
import AddArrayCard from '../components/AddArrayCard';

describe('AddArrayCard', () => {
  it('should render the AddArrayCard', () => {
    const { container } = render(<AddArrayCard />);
    expect(container).toMatchSnapshot();
  });
});