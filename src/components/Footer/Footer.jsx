import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import constants, { colors } from '../../constants';
import { Context } from '../../context';

const useStyles = createUseStyles({
  footerRoot: {
    background: colors.BACKGROUND_1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.875rem 1.6rem',
  },
  footerText: {
    fontSize: '0.875rem',
    color: colors.GREY,
    lineHeight: '20px',
    // textAlign: 'center',
    '@media(max-width:600px)': {
      fontSize: '0.7rem',
    },
    marginRight: '2rem',
  },
  copyRightText: {
    fontSize: '0.875rem',
    color: colors.GREY,
    lineHeight: '20px',
    textAlign: 'center',
    '@media(max-width:600px)': {
      fontSize: '0.7rem',
    },
  },
});
export default function Footer() {
  const classes = useStyles();
  const { state: { translations = {} } = {} } = useContext(Context);

  return (
    <footer className={classes.footerRoot}>
      <div className={classes.footerText}>
        {translations.FOOTER_TEXT_1}
        {translations.FOOTER_TEXT_2}
      </div>
      <div className={classes.copyRightText}>{constants.FOOTER_TEXT_3}</div>
    </footer>
  );
}
