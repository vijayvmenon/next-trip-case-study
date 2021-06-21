import { render, fireEvent, screen } from '@testing-library/react';
import Input from './Input';
import renderer from 'react-test-renderer';

const props = {
  onSearch: jest.fn(),
  label: 'test',
  inputType: 'text',
  value: 'test',
  setInput: jest.fn(),
  focusOnLoad: true,
};

describe('Component:Input.jsx', () => {
  test('Input.jsx renders correctly', () => {
    const input = renderer.create(<Input {...props} />).toJSON();
    expect(input).toMatchSnapshot();
  });

  test('Input onSearch prop is called on Click of Search Icon', () => {
    const { getByTestId } = render(<Input {...props} />);
    fireEvent.click(getByTestId('input-search-icon-button'));
    fireEvent.keyDown(getByTestId('input-search-icon-button'), {
      key: 'Enter',
      code: 'Enter',
    });
    expect(props.onSearch).toHaveBeenCalledTimes(1);
  });

  test('Input onSearch prop is called on clicking Enter', () => {
    const { getByTestId } = render(<Input {...props} />);
    fireEvent.keyDown(getByTestId('custom-input'), {
      key: 'Enter',
      code: 'Enter',
    });
    expect(props.onSearch).toHaveBeenCalledTimes(1);
  });
});
