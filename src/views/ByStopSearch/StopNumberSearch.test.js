import { render, fireEvent, screen } from '@testing-library/react';
import StopNumberSearch from './StopNumberSearch';
import renderer from 'react-test-renderer';
import { Context } from '../../context';

const dispatch = jest.fn(); // mock dispatch

describe('Component:StopNumberSearch.jsx', () => {
  test('StopNumberSearch.jsx renders correctly', () => {
    const stopNumberSearch = renderer
      .create(
        <Context.Provider value={{ dispatch }}>
          <StopNumberSearch />
        </Context.Provider>,
      )
      .toJSON();
    expect(stopNumberSearch).toMatchSnapshot();
  });
});
