/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { colors } from '../constants';
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';

const useStyles = createUseStyles({
  root: {
    position: 'relative',
    marginTop: 24,
  },
  input: {
    fontSize: 18,
    padding: '14px 10px 0px 5px',
    display: 'block',
    width: 300,
    color: colors.TEXT_COLOR,
    height: 48,
    boxSizing: 'border-box',
    border: '1px solid #757575',
    '&:focus': {
      borderColor: colors.BACKGROUND_2,
      borderWidth: 2,
    },
    '&:focus ~ label': {
      top: 3,
      left: -5,
      fontSize: 14,
      color: '#4285f4',
      transform: 'scale(0.8)',
    },
    '&:valid ~ label': {
      top: 3,
      left: -5,
      fontSize: 14,
      transform: 'scale(0.8)',
    },
  },
  label: {
    textTransform: 'uppercase',
    color: '#999',
    fontSize: 18,
    fontWeight: 'normal',
    position: 'absolute',
    pointerEvents: 'none',
    left: 10,
    top: 13,
    transition: '0.2s ease all',
  },
  searchIcon: {
    cursor: 'pointer',
    height: '1.8rem',
    width: '1.8rem',
    position: 'absolute',
    right: 0,
    bottom: 9,
    right: 12,
    color: colors.TEXT_COLOR,
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
      <SearchIcon
        onClick={() => onSearch(value)}
        className={classes.searchIcon}
      />
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
