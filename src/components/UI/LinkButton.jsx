import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'wouter';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';

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
    '&:after': {
      content: '""',
      display: 'block',
      width: 0,
      height: 0,
      position: 'absolute',
      borderTop: '12px solid #0071DE',
      borderLeft: '12px solid transparent',
      borderRight: '12px solid transparent',
      left: '45%',
      bottom: '-8px',
      filter: 'drop-shadow(1px 3px 1px rgb(0,0,0,0.2))',
      zIndex: 1,
    },
  },
});

export default function LinkButton({ name, hrefLink }) {
  const classes = useStyles();
  // const [match, params] = useRoute(`${hrefLink}?/:route/:direction/:stop*`); // check if route is the current active route
  const [location] = useLocation();
  const active = location.indexOf(hrefLink) !== -1;
  return (
    <Link
      className={`${classes.linkButtonRoot} ${
        active ? classes.linkActive : undefined
      }`}
      href={hrefLink}
      data-testid={
        active ? `custom-anchor-${name}-active` : `custom-anchor-${name}`
      }
    >
      {name}
    </Link>
  );
}
LinkButton.defaultProps = {
  name: '',
};

LinkButton.propTypes = {
  name: PropTypes.string,
  hrefLink: PropTypes.string.isRequired,
};
