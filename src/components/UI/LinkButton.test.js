import { render, fireEvent, screen } from '@testing-library/react';
import LinkButton from './LinkButton';
import renderer from 'react-test-renderer';

const props = {
  hrefLink: '/test',
  name: 'test',
};

describe('Component:LinkButton.jsx', () => {
  test('LinkButton.jsx renders correctly', () => {
    const linkButton = renderer.create(<LinkButton {...props} />).toJSON();
    expect(linkButton).toMatchSnapshot();
  });

  test('LinkButton becomes active on triggering  a Click', () => {
    const { container, getByTestId } = render(<LinkButton {...props} />);
    fireEvent.click(getByTestId('custom-anchor-test'));
    expect(getByTestId('custom-anchor-test-active')).toBeTruthy();
  });
});
