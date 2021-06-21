import { render, fireEvent, screen } from '@testing-library/react';
import LandingPage from './LandingPage';
import renderer from 'react-test-renderer';
import { Context } from '../../context';

const dispatch = jest.fn(); // mock dispatch

describe('Component:LandingPage.jsx', () => {
  test('LandingPage.jsx renders correctly', () => {
    const landingPage = renderer
      .create(
        <Context.Provider value={{ dispatch }}>
          <LandingPage />
        </Context.Provider>,
      )
      .toJSON();
    expect(landingPage).toMatchSnapshot();
  });
});
