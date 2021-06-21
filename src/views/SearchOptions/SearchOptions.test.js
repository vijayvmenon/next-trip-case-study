import { render, fireEvent, screen } from '@testing-library/react';
import SearchOptions from './SearchOptions';
import renderer from 'react-test-renderer';
import { Context } from '../../context';

const dispatch = jest.fn(); // mock dispatch

const props = {
  options: [
    {
      name: 'BY ROUTE',
      hrefLink: '/byRoute',
    },
    {
      name: 'BY STOP',
      hrefLink: '/byStop',
    },
  ],
};

describe('Component:SearchOptions.jsx', () => {
  test('SearchOptions.jsx renders correctly', () => {
    const searchOptions = renderer
      .create(
        <Context.Provider value={{ dispatch }}>
          <SearchOptions {...props} />
        </Context.Provider>,
      )
      .toJSON();
    expect(searchOptions).toMatchSnapshot();
  });
});
