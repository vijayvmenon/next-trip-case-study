import React from 'react';
import { createUseStyles } from 'react-jss';
import constants, { colors } from '../constants';

const useStyles = createUseStyles({
  footerRoot: {
    background: colors.BACKGROUND_1,
    height: 75,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: '0.875rem',
    color: colors.GREY,
    lineHeight: '20px',
    textAlign: 'center',
  },
});
export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footerRoot}>
      <div className={classes.footerText}>
        {constants.FOOTER_TEXT_1}
        <br />
        {constants.FOOTER_TEXT_2}
        <br />
        {constants.FOOTER_TEXT_3}
      </div>
    </footer>
  );
}
