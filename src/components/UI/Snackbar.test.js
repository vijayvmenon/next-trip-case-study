import { render, fireEvent, screen } from '@testing-library/react';
import Snackbar from './Snackbar';
import renderer from 'react-test-renderer';
import { Context } from '../../context';

const dispatch = jest.fn(); // mock dispatch

const props = {
  hrefLink: '/test',
  name: 'test',
};

describe('Component:Snackbar.jsx', () => {
  test('Snackbar.jsx renders correctly', () => {
    const snackbar = renderer
      .create(
        <Context.Provider value={{ dispatch }}>
          <Snackbar {...props} />
        </Context.Provider>,
      )
      .toJSON();
    expect(snackbar).toMatchSnapshot();
  });

  test('Snackbar is displayed only when snackbar value is set from context', () => {
    const { container, getByTestId } = render(
      <Context.Provider
        value={{ dispatch, state: { snackbar: { value: 'error' } } }}
      >
        <Snackbar {...props} />
      </Context.Provider>,
    );
    expect(getByTestId('custom-snackbar')).toBeTruthy();
  });
});
