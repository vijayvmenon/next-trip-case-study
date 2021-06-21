import { render, fireEvent, screen } from '@testing-library/react';
import Select from './Select';
import renderer from 'react-test-renderer';
import { Context } from '../../context';
import userEvent from '@testing-library/user-event';

const dispatch = jest.fn(); // mock dispatch

const props = {
  onSearch: jest.fn(),
  label: 'test',
  labelSelected: 'test',
  options: [
    {
      test_id: '1',
      test_value: 'value 1',
    },
    {
      test_id: '2',
      test_value: 'value 2',
    },
  ],
  idField: 'test_id',
  valueField: 'test_value',
  selectedValue: '',
  languageDropdown: false,
};

describe('Component:Select.jsx', () => {
  test('Select.jsx renders correctly', () => {
    const select = renderer
      .create(
        <Context.Provider value={{ dispatch }}>
          <Select {...props} />
        </Context.Provider>,
      )
      .toJSON();
    expect(select).toMatchSnapshot();
  });

  test('Select onSearch prop is called on changing select options', () => {
    const { getByTestId, getAllByTestId } = render(
      <Context.Provider value={{ dispatch }}>
        <Select {...props} />
      </Context.Provider>,
    );
    userEvent.selectOptions(getByTestId('custom-select-test_id'), ['value 2']);
    expect(props.onSearch).toHaveBeenCalledTimes(1);
  });
});
