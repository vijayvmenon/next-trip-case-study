/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import constants, { colors } from '../constants';
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';

const useStyles = createUseStyles({
  root: {
    position: 'relative',
    marginTop: 24,
  },
  inputFocus: {
    outline: 'none',
    borderRadius: 10,
  },
  input: {
    fontSize: 18,
    borderRadius: 10,
    padding: '14px 10px 0px 8px',
    display: 'block',
    width: '100%',
    color: colors.TEXT_COLOR,
    height: 56,
    boxSizing: 'border-box',
    border: '1px solid #757575',
    '&:focus': {
      borderColor: colors.BACKGROUND_2,
      borderWidth: 2,
      extend: 'inputFocus',
    },
    '&:focus ~ label': {
      top: 4,
      left: 10,
      fontSize: '0.8rem',
      color: '#4285f4',
      // transform: 'scale(0.8)',
    },
    '&:valid ~ label': {
      top: 4,
      left: 10,
      fontSize: '0.8rem',
      // transform: 'scale(0.8)',
    },
  },
  label: {
    color: '#999',
    fontSize: 18,
    fontWeight: 'normal',
    position: 'absolute',
    pointerEvents: 'none',
    left: 10,
    top: 17,
    transition: '0.2s ease all',
  },
  searchIcon: {
    cursor: 'pointer',
    height: '1.8rem',
    width: '1.8rem',
    position: 'absolute',
    right: 0,
    bottom: 12,
    right: 12,
    color: colors.TEXT_COLOR,
    '&:hover': {
      color: colors.BACKGROUND_2,
      height: '2rem',
      width: '2rem',
      transition: '0.2s ease all',
    },
  },
});
export default function Input({
  onSearch,
  label,
  type = 'text',
  value,
  setInput,
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <input
        type="text"
        className={classes.input}
        required
        value={value}
        onChange={(e) => {
          if (type === 'number') {
            const re = /^[0-9\b]+$/;
            // if value is not blank, then test the regex
            if (e.target.value === '' || re.test(e.target.value)) {
              setInput(e.target.value);
            }
          } else {
            setInput(e.target.value);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch(value, e);
          }
        }}
      />
      <label htmlFor={label} className={classes.label}>
        {label}
      </label>
      <span title={constants.SEARCH_STOPS}>
        <SearchIcon
          onClick={() => onSearch(value)}
          className={classes.searchIcon}
        />
      </span>
    </div>
  );
}

Input.propTypes = {
  onSearch: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setInput: PropTypes.func.isRequired,
};
