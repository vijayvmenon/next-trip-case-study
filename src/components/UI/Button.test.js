import { render, fireEvent, screen } from '@testing-library/react';
import Button from './Button';
import renderer from 'react-test-renderer';

const props = {
  text: 'test',
  click: jest.fn(),
};

describe('Component:Button.jsx', () => {
  test('Button.jsx renders correctly', () => {
    const button = renderer.create(<Button {...props} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  test('Buttons click prop is called onClick', () => {
    const { getByTestId } = render(<Button {...props} />);
    fireEvent.click(getByTestId('custom-button'));
    expect(props.click).toHaveBeenCalledTimes(1);
  });
});
