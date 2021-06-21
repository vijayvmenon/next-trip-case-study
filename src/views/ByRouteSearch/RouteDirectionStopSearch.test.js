import { render, fireEvent, screen } from '@testing-library/react';
import RouteDirectionStopSearch from './RouteDirectionStopSearch';
import renderer from 'react-test-renderer';
import { Context } from '../../context';

const dispatch = jest.fn(); // mock dispatch

describe('Component:RouteDirectionStopSearch.jsx', () => {
  test('RouteDirectionStopSearch.jsx renders correctly', () => {
    const routeDirectionStop = renderer
      .create(
        <Context.Provider value={{ dispatch }}>
          <RouteDirectionStopSearch />
        </Context.Provider>,
      )
      .toJSON();
    expect(routeDirectionStop).toMatchSnapshot();
  });
});
