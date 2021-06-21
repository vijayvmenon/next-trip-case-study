import { render } from '@testing-library/react';
import DueTableCell from './DueTableCell';
import renderer from 'react-test-renderer';

const props = {
  value: '',
  row: { actual: true },
};

describe('Component:DueTableCell.jsx', () => {
  test('DueTableCell.jsx renders correctly', () => {
    const dueTableCell = renderer.create(<DueTableCell {...props} />).toJSON();
    expect(dueTableCell).toMatchSnapshot();
  });

  test('BroadCast Icon is shown when actual prop is true', () => {
    const { getByTestId } = render(<DueTableCell {...props} />);
    expect(getByTestId('broadcast-svg')).toBeTruthy();
  });
});
