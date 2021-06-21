import { useContext } from 'react';
import AppContext, { Context } from './context';

export default AppContext;
export { Context };
export const useMyContext = () => useContext(Context);
