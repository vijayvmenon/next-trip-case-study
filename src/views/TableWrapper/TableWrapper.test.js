import { render, fireEvent, screen } from '@testing-library/react';
import TableWrapper from './TableWrapper';
import renderer from 'react-test-renderer';
import Rows from '../../mockData/rows.json';
import { Context } from '../../context';

const dispatch = jest.fn(); // mock dispatch

const props = {
  tableData: Rows,
  rowField: 'departures',
  tableHeaderField: 'test',
  interval: '',
  getTableData: jest.fn(),
  loader: false,
};

describe('Component:TableWrapper.jsx', () => {
  test('TableWrapper.jsx renders correctly', () => {
    const tableWrapper = renderer
      .create(
        <Context.Provider value={{ dispatch }}>
          <TableWrapper {...props} />
        </Context.Provider>,
      )
      .toJSON();
    expect(tableWrapper).toMatchSnapshot();
  });
});
