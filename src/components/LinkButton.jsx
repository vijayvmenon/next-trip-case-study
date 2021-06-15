import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { colors } from '../constants';

const useStyles = createUseStyles({
  linkButtonRoot: {
    textDecoration: 'none',
    padding: 16,
    background: colors.BACKGROUND_1,
    color: colors.LINK_COLOR,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: 500,
    position: 'relative',
    // "&:hover": {
    //   background: colors.BACKGROUND_3,
    //   color: colors.WHITE,
    // },
  },
  linkActive: {
    background: colors.BACKGROUND_2,
    color: colors.WHITE,
    borderRadius: 5,
    zIndex: 1,
    boxShadow: `0px -2px 5px -3px #0E0E0E, 
    -2px 0px 5px -3px #0E0E0E, 
    2px 0px 5px -3px #0E0E0E, 
    0px 2px 5px -3px #0E0E0E`,
  },
});

export default function LinkButton({ name, hrefLink, active, click }) {
  const classes = useStyles();

  const clickFn = (e) => {
    // e.preventDefault();
    console.log(e.target);
    click(name);
  };

  return (
    <a
      href={hrefLink}
      className={`${classes.linkButtonRoot} ${
        active ? classes.linkActive : undefined
      }`}
      onClick={clickFn}
    >
      {name}
    </a>
  );
}

LinkButton.propTypes = {
  name: PropTypes.string.isRequired,
  hrefLink: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  click: PropTypes.func.isRequired,
};
