import { render } from '@testing-library/react';
import SelectLanguage from './SelectLanguage';
import renderer from 'react-test-renderer';
import { Context } from '../../context';

const dispatch = jest.fn(); // mock dispatch

describe('Component:SelectLanguage.jsx', () => {
  test('SelectLanguage.jsx renders correctly', () => {
    const selectLanguage = renderer
      .create(
        <Context.Provider value={{ dispatch }}>
          <SelectLanguage />
        </Context.Provider>,
      )
      .toJSON();
    expect(selectLanguage).toMatchSnapshot();
  });
});
