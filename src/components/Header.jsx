import React from 'react';
import { createUseStyles } from 'react-jss';
import constants, { colors } from '../constants';

const useStyles = createUseStyles({
  headerRoot: {
    background: colors.BACKGROUND_2,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: [[8, 0, 8, 24]],
  },
  headerText: {
    color: colors.WHITE,
  },
});
export default function Header() {
  const classes = useStyles();
  return (
    <header className={classes.headerRoot}>
      <h1 className={classes.headerText}>{constants.HEADER_TEXT}</h1>
    </header>
  );
}
