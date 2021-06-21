import Footer from './Footer';
import renderer from 'react-test-renderer';
import { Context } from '../../context';

const dispatch = jest.fn(); // mock dispatch

describe('Component:Footer.jsx', () => {
  test('Footer.jsx renders correctly', () => {
    const footerTree = renderer
      .create(
        <Context.Provider value={{ dispatch }}>
          <Footer />
        </Context.Provider>,
      )
      .toJSON();
    expect(footerTree).toMatchSnapshot();
  });
});
