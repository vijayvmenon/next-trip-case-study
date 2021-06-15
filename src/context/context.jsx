import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';
import reducer, { initialState } from './reducer';

export const Context = createContext();

export default function AppContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

AppContext.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};
