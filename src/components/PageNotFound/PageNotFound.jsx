import React, { useContext, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation } from 'wouter';
import { ReactComponent as AppIcon } from '../../assets/app-logo.svg';
import Button from '../UI/Button';
import { Context } from '../../context';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  firstLine: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    paddingRight: 8,
  },
  notFound404: {
    fontSize: '3rem',
    paddingRight: 20,
  },
  buttonDiv: {
    padding: 16,
  },
  secondLine: {
    padding: 12,
  },
  thirdLine: {
    padding: 12,
  },
});
export default function PageNotFound() {
  const classes = useStyles();
  const { state: { translations = {} } = {}, dispatch } = useContext(Context);
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useLocation();

  useEffect(() => {
    dispatch({ type: 'HIDE_HEADER' });
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.firstLine}>
        {' '}
        <AppIcon className={classes.icon} />
        <span className={classes.notFound404}>404</span>
      </div>
      <div className={classes.secondLine}>{translations.PAGE_NOT_FOUND_1}</div>
      <div className={classes.thirdLine}>{translations.PAGE_NOT_FOUND_2}</div>
      <div className={classes.buttonDiv} data-testid="go-home-button">
        <Button click={() => setLocation('/')} text={translations.GO_HOME} />
      </div>
    </div>
  );
}
