import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg';
import { ReactComponent as CloseIcon } from '../../assets/close-icon-snackbar.svg';

const useStyles = createUseStyles({
  root: {
    position: 'relative',
    marginTop: 24,
    display: 'flex',
    '@media(max-width:640px)': {
      margin: '24px 3rem 0px 3rem',
    },
  },
  inputFocus: {
    outline: 'none',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  input: {
    fontSize: 18,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: '14px 10px 0px 8px',
    display: 'block',
    width: '100%',
    color: colors.TEXT_COLOR,
    height: 56,
    boxSizing: 'border-box',
    borderLeft: '1px solid #757575',
    borderTop: '1px solid #757575',
    borderBottom: '1px solid #757575',
    borderRight: 'none',
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
    // position: 'absolute',
    // bottom: 12,
    // right: 12,
    color: colors.TEXT_COLOR,
    '&:hover': {
      color: colors.BACKGROUND_2,
      height: '2rem',
      width: '2rem',
      transition: '0.2s ease all',
    },
  },
  closeIcon: {
    cursor: 'pointer',
    height: '1.4rem',
    width: '1.4rem',
    // position: 'absolute',
    // bottom: 15,
    // right: 48,
    color: colors.TEXT_COLOR,
    '&:hover': {
      color: colors.BACKGROUND_2,
    },
  },
  inputAdornments: {
    borderRight: '1px solid #757575',
    borderTop: '1px solid #757575',
    borderBottom: '1px solid #757575',
    marginLeft: -2,
    display: 'flex',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  inputAdornmentsFocus: {
    borderRight: `2px solid ${colors.BACKGROUND_2}`,
    borderTop: `2px solid ${colors.BACKGROUND_2}`,
    borderBottom: `2px solid ${colors.BACKGROUND_2}`,
    marginLeft: -2,
    display: 'flex',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: colors.BACKGROUND_2,
  },
  removeButtonStyle: {
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
    paddingRight: '0.8rem',
    paddingTop: '0.5rem',
  },
  searchButton: {
    extend: 'removeButtonStyle',
  },
  closeButton: {
    extend: 'removeButtonStyle',
  },
});
export default function Input({
  onSearch,
  label,
  inputType = 'text',
  value,
  setInput,
  focusOnLoad,
}) {
  const classes = useStyles();
  const inputRef = useRef(null);
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  // focus input on load
  useEffect(() => {
    if (focusOnLoad && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusOnLoad]);

  return (
    <div className={classes.root}>
      <input
        ref={inputRef}
        data-testid="custom-input"
        onFocus={onFocus}
        onBlur={onBlur}
        type="text"
        className={classes.input}
        required
        value={value}
        onChange={(e) => {
          if (inputType === 'number') {
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
      <div
        className={
          focused ? classes.inputAdornmentsFocus : classes.inputAdornments
        }
      >
        {value && (
          <button
            type="button"
            className={classes.closeButton}
            onClick={() => setInput('')}
          >
            <CloseIcon className={classes.closeIcon} />
          </button>
        )}
        <button
          type="button"
          className={classes.searchButton}
          onClick={() => onSearch(value)}
          data-testid="input-search-icon-button"
        >
          {' '}
          <SearchIcon className={classes.searchIcon} />
        </button>
      </div>
    </div>
  );
}

Input.defaultProps = {
  inputType: 'text',
  focusOnLoad: true,
  label: '',
};

Input.propTypes = {
  onSearch: PropTypes.func.isRequired,
  label: PropTypes.string,
  inputType: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setInput: PropTypes.func.isRequired,
  focusOnLoad: PropTypes.bool,
};
