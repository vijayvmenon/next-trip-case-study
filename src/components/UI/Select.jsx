import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { useMediaPredicate } from 'react-media-hook';
import { colors } from '../../constants';
import Dropdown from '../../assets/dropdown.svg';
import { Context } from '../../context';

const useStyles = createUseStyles({
  root: {
    position: 'relative',
    marginTop: 24,
    '@media(max-width:640px)': {
      margin: '24px 3rem 0px 3rem',
    },
  },
  rootLanguage: {
    position: 'relative',
    width: 150,
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
  languageSelected: {
    padding: '0px 10px 0px 8px',
    '&:focus': {
      outline: 'none',
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
  selectRoot: {
    fontSize: 18,
    borderRadius: 10,
    appearance: 'none',
    backgroundImage: `url(${Dropdown})`,
    background: 'transparent',
    backgroundRepeat: 'no-repeat',
    display: 'block',
    width: '100%',
    color: colors.TEXT_COLOR,

    border: '1px solid #757575',
    '&:focus ~ label': {
      top: 5,
      left: 9,
      fontSize: '0.8rem',
      color: '#4285f4',
    },
  },
  select: {
    extend: 'selectRoot',
    backgroundPosition: 'top 6px right 4px',
    height: 56,
    // "& option[value=''][disabled]": {
    //   display: 'none',
    // },
  },
  languageSelect: {
    extend: 'selectRoot',
    backgroundPosition: 'top 0px right 4px',
    height: 40,
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
  selectedOption: {
    background: colors.BACKGROUND_1,
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
  languageDropdown,
}) {
  const classes = useStyles();
  const { state: { translations = {} } = {} } = useContext(Context);
  const normalTable = useMediaPredicate('(min-width: 768px)');

  return (
    <div className={languageDropdown ? classes.rootLanguage : classes.root}>
      <select
        className={`${
          languageDropdown && !normalTable
            ? classes.languageSelect
            : classes.select
        } ${
          // eslint-disable-next-line no-nested-ternary
          selectedValue !== label && languageDropdown && !normalTable
            ? classes.languageSelected
            : selectedValue !== label
            ? classes.selected
            : classes.notSelected
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
        data-testid={`custom-select-${idField}`}
      >
        <option
          data-testid={`option-default-${idField}`}
          value={label}
          disabled
          hidden={options.length > 0}
        >
          {translations[label]}
        </option>
        {options.map((val) => (
          <option
            key={val[idField]}
            value={val[idField]}
            className={
              val[idField] === selectedValue
                ? classes.selectedOption
                : undefined
            }
            data-testid={`option-${val[idField]}-${idField}`}
          >
            {val[valueField]}
          </option>
        ))}
      </select>
      {(selectedValue !== label && !languageDropdown) ||
      (languageDropdown && normalTable) ? (
        <label htmlFor={label} className={classes.label}>
          {translations[labelSelected]}
        </label>
      ) : null}
    </div>
  );
}

Select.defaultProps = {
  languageDropdown: false,
};

Select.propTypes = {
  onSearch: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  labelSelected: PropTypes.string.isRequired,
  idField: PropTypes.string.isRequired,
  valueField: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  languageDropdown: PropTypes.bool,
};
