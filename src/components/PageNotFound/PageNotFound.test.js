import PageNotFound from './PageNotFound';
import renderer from 'react-test-renderer';
import { Context } from '../../context';

const dispatch = jest.fn(); // mock dispatch

describe('Component:PageNotFound.jsx', () => {
  test('PageNotFound.jsx renders correctly', () => {
    const pageNotFound = renderer
      .create(
        <Context.Provider value={{ dispatch }}>
          <PageNotFound />,
        </Context.Provider>,
      )
      .toJSON();
    expect(pageNotFound).toMatchSnapshot();
  });
});
