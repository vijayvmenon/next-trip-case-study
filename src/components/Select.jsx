/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { colors } from '../constants';
import Dropdown from '../assets/dropdown.svg';

const useStyles = createUseStyles({
  root: {
    position: 'relative',
    marginTop: 24,
  },
  selected: {
    padding: '12px 10px 0px 8px',
    '&:focus': {
      borderColor: colors.BACKGROUND_2,
      borderWidth: 2,
      backgroundPosition: 'top 5px right 3px',
      padding: '12px 10px 0px 7px',
      extend: 'selectFocus',
    },
  },
  notSelected: {
    padding: '2px 10px 0px 5px',
    '&:focus': {
      borderColor: colors.BACKGROUND_2,
      borderWidth: 2,
      backgroundPosition: 'top 5px right 3px',
      padding: '2px 10px 0px 4px',
      extend: 'selectFocus',
    },
  },
  selectFocus: {
    outline: 'none',
    borderRadius: 10,
  },
  select: {
    fontSize: 18,
    borderRadius: 10,
    appearance: 'none',
    backgroundImage: `url(${Dropdown})`,
    background: 'transparent',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top 6px right 4px',
    display: 'block',
    width: '100%',
    color: colors.TEXT_COLOR,
    height: 56,
    border: '1px solid #757575',
    '&:focus ~ label': {
      top: 5,
      left: 9,
      fontSize: '0.8rem',
      color: '#4285f4',
    },
    // "& option[value=''][disabled]": {
    //   display: 'none',
    // },
  },
  label: {
    color: '#999',
    paddingBottom: 10,
    fontSize: '0.8rem',
    fontWeight: 'normal',
    position: 'absolute',
    pointerEvents: 'none',
    left: 9,
    top: 5,
    transition: '0.2s ease all',
  },
});
export default function Select({
  onSearch,
  label,
  labelSelected,
  options = [],
  idField,
  valueField,
  selectedValue,
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <select
        className={`${classes.select} ${
          selectedValue !== '' ? classes.selected : classes.notSelected
        }`}
        onChange={(e) => {
          onSearch(
            options.find(
              (val) => val[idField].toString() === e.target.value.toString(),
            ),
            labelSelected,
            idField,
          );
        }}
        value={selectedValue}
      >
        <option value={label} disabled hidden>
          {label}
        </option>
        {options.map((val, key) => (
          <option key={val[idField]} value={val[idField]}>
            {val[valueField]}
          </option>
        ))}
      </select>
      {selectedValue !== '' && (
        <label htmlFor={label} className={classes.label}>
          {labelSelected}
        </label>
      )}
    </div>
  );
}

Select.propTypes = {
  onSearch: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  labelSelected: PropTypes.string.isRequired,
  idField: PropTypes.string.isRequired,
  valueField: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.any),
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
