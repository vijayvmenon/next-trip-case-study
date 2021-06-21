import React, { useEffect, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation } from 'wouter';
import constants, { colors } from '../../constants';
import { ReactComponent as CloseIcon } from '../../assets/close-icon-snackbar.svg';
import { Context } from '../../context';

const useStyles = createUseStyles({
  hidden: {
    display: 'none',
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: 8,
    position: 'fixed',
    right: 0,
    left: 0,
    zIndex: 1,
    transition: 'opacity .15s,transform .15s',
    pointerEvents: 'none',
    justifyContent: 'center',
    bottom: 8,
  },
  wrapper: {
    color: 'rgb(255, 255, 255)',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 4,
    minWidth: 334,
    maxWidth: 672,
    boxShadow:
      '0 3px 5px -1px rgb(0 0 0 / 20%), 0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%)',
    fontWeight: 400,
    letterSpacing: '1px',
    lineHeight: '20px',
    textAlign: 'left',
  },
  error: {
    extend: 'wrapper',
    backgroundColor: 'rgb(244, 67, 54)',
  },

  warning: { extend: 'wrapper', backgroundColor: 'rgb(255, 152, 0)' },
  snackbarText: {
    flexGrow: 1,
    padding: '14px 16px',
    margin: 0,
    pointerEvents: 'auto',
  },
  button: {
    color: 'rgb(255, 255, 255)',
    fontSize: '1rem',
    flexShrink: 0,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    padding: 8,
    margin: '0 8px 0 0',
    cursor: 'pointer',
    position: 'relative',
    pointerEvents: 'auto',
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
    backgroundColor: 'transparent',
    border: 'none',
  },
  icon: {
    width: '1rem',
    height: '1rem',
    color: colors.WHITE,
  },
});

export default function Snackbar() {
  const classes = useStyles();
  const {
    dispatch,
    state: { snackbar: { value: snackbarType = '', text = '' } = {} } = {},
  } = useContext(Context);
  const [location] = useLocation();
  useEffect(() => {
    if (snackbarType) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'SET_SNACKBAR', value: '', text: '' });
      }, constants.SNACKBAR_TIMEOUT);

      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [dispatch, snackbarType]);

  // Reset snackbar on location change, i.e on any redirection to another url within app
  useEffect(() => {
    dispatch({ type: 'SET_SNACKBAR', value: '', text: '' });
  }, [dispatch, location]);

  return (
    snackbarType && (
      <div className={classes.root}>
        <div
          data-testid="custom-snackbar"
          className={snackbarType === 'error' ? classes.error : classes.warning}
        >
          <div className={classes.snackbarText}>{text}</div>
          <button
            type="button"
            onClick={() => dispatch({ type: 'SET_SNACKBAR', value: '' })}
            className={classes.button}
          >
            <CloseIcon className={classes.icon} />
          </button>
        </div>
      </div>
    )
  );
}
