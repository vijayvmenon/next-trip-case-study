import { shallow } from 'enzyme';
import App from './App';

test('App renders without crashing', () => {
  shallow(<App />);
});
