import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectMenu from '../selectMenu';

describe('Select Menu', () => {
  it('should render the select menu with default 1 day', () => {
    render(<SelectMenu onChange={() => {}} />);
    const selectMenuButton = screen.getByTestId('select-menu');

    expect(selectMenuButton).toHaveTextContent('1 Day');
  });

  it('should call onChange with correct value when an option is selected', () => {
    const handleChange = jest.fn();
    render(<SelectMenu onChange={handleChange} />);
    const selectMenuButton = screen.getByTestId('select-menu');
    fireEvent.click(selectMenuButton);
    const option = screen.getByText('3 Day');
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('should update the selected value in the select menu when an option is selected', () => {
    render(<SelectMenu onChange={() => {}} />);
    const selectMenuButton = screen.getByTestId('select-menu');
    fireEvent.click(selectMenuButton);
    const option7 = screen.getByText('7 Day');
    fireEvent.click(option7);

    expect(selectMenuButton).toHaveTextContent('7 Day');
  });
});
