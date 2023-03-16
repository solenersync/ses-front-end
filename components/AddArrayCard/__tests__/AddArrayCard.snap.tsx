import { render } from '@testing-library/react';
import AddArrayCard from 'components/AddArrayCard/addArrayCard';

describe('AddArrayCard', () => {
  it('should render the AddArrayCard', () => {
    const { container } = render(<AddArrayCard />);
    expect(container).toMatchSnapshot();
  });
});
