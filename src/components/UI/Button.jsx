import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';

const useStyles = createUseStyles({
  root: {
    background: colors.BACKGROUND_2,
    color: colors.WHITE,
    borderRadius: 5,
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: '0px 16px',
    height: 40,
    cursor: 'pointer',
  },
});

export default function Button({ text, click }) {
  const classes = useStyles();
  return (
    <button
      type="button"
      className={classes.root}
      onClick={click}
      data-testid="custom-button"
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: '',
};

Button.propTypes = {
  text: PropTypes.string,
  click: PropTypes.func.isRequired,
};
