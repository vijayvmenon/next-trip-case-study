import { render, fireEvent, screen } from '@testing-library/react';
import Table from './Table';
import renderer from 'react-test-renderer';
import { Context } from '../../context';
import Rows from '../../mockData/rows.json';

const dispatch = jest.fn(); // mock dispatch

const columns = [
  { id: 'route_short_name', value: 'ROUTE', textAlign: 'left', key: '1' },
  { id: 'description', value: 'DESTINATION', textAlign: 'left', key: '2' },
  {
    id: 'departure_text',
    value: 'DEPARTS',
    textAlign: 'right',
    key: '3',
  },
];

const lessRows = Rows.departures;
const noRows = [];
const moreRows = Rows.departures2;

describe('Component:Table.jsx', () => {
  test('Table.jsx renders correctly', () => {
    const table = renderer
      .create(
        <Context.Provider value={{ dispatch }}>
          <Table columns={columns} rows={lessRows} />,
        </Context.Provider>,
      )
      .toJSON();
    expect(table).toMatchSnapshot();
  });

  test('table displays passed rows', () => {
    render(
      <Context.Provider value={{ dispatch }}>
        <Table rows={lessRows} columns={columns} />,
      </Context.Provider>,
    );
  });

  test('table is not displayed if rows are empty', () => {
    const { getByTestId } = render(
      <Context.Provider value={{ dispatch }}>
        <Table rows={noRows} columns={columns} />,
      </Context.Provider>,
    );
    expect(getByTestId('no-data-in-table')).toBeTruthy();
  });

  test('Expand Icon is showed when there are more than 5 rows', () => {
    const { getByTestId } = render(
      <Context.Provider value={{ dispatch }}>
        <Table rows={moreRows} columns={columns} />,
      </Context.Provider>,
    );
    expect(getByTestId('table-expand-icon')).toBeTruthy();
  });
});
