import Header from './Header';
import renderer from 'react-test-renderer';
import { Context } from '../../context';

const dispatch = jest.fn(); // mock dispatch

describe('Component:Header.jsx', () => {
  test('Header renders correctly', () => {
    const headerTree = renderer
      .create(
        // Pass Context as SelectLanguage uses Context
        <Context.Provider value={{ dispatch }}>
          <Header />,
        </Context.Provider>,
      )
      .toJSON();
    expect(headerTree).toMatchSnapshot();
  });
});
