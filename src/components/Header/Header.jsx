/* eslint-disable */
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation } from 'wouter';
import constants, { colors } from '../../constants';
import { ReactComponent as AppIcon } from '../../assets/app-logo.svg';
import SelectLanguage from '../LanguageSelector/SelectLanguage';

const useStyles = createUseStyles({
  headerRoot: {
    background: colors.BACKGROUND_2,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: [[16, 0, 16, 12]],
  },
  headerText: {
    color: colors.WHITE,
    '@media(max-width:460px)': {
      fontSize: '1.2rem',
    },
  },
  appLogo: {
    width: 40,
    height: 40,
    paddingRight: 8,
    cursor: 'pointer',
    '@media(max-width:460px)': {
      width: 30,
      height: 30,
    },
  },
});
export default function Header() {
  const classes = useStyles();
  const [, setLocation] = useLocation();

  return (
    <header className={classes.headerRoot}>
      <AppIcon onClick={() => setLocation('/')} className={classes.appLogo} />
      <h1 className={classes.headerText}>{constants.HEADER_TEXT}</h1>
      <SelectLanguage />
    </header>
  );
}
