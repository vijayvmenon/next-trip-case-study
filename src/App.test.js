import App from './App';
import renderer from 'react-test-renderer';

describe('Component:App.jsx', () => {
  test('App.jsx renders correctly', () => {
    const appTree = renderer.create(<App />).toJSON();
    expect(appTree).toMatchSnapshot();
  });
});
