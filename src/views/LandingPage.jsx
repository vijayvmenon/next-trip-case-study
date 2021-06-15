import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import constants, { colors } from '../constants';
import SearchOptions from './SearchOptions';
import RouteSearch from './RouteDirectionStopSearch';
import StopSearch from './StopNumberSearch';

const useStyles = createUseStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appHeaderText: {
    color: colors.GREY,
  },
});

export default function LandingPage() {
  const classes = useStyles();
  const [options, setOptions] = useState([
    {
      name: constants.BY_ROUTE,
      hrefLink: '/byRoute',
      active:
        window.location.pathname === '/' ||
        window.location.pathname === '/byRoute',
      component: <RouteSearch />,
    },
    {
      name: constants.BY_STOP,
      hrefLink: '/byStop',
      active: window.location.pathname === '/byStop',
      component: <StopSearch />,
    },
  ]);

  useEffect(() => {
    if (window.location.pathname === '/') {
      window.location.href = '/byRoute';
    }
  }, []);

  const setActiveOption = (activeVal) => {
    setOptions(
      options.map((val) => ({
        ...val,
        active: val.name === activeVal,
      })),
    );
  };

  return (
    <div className={classes.root}>
      <header>
        <h2 className={classes.appHeaderText}>{constants.APP_HEADER}</h2>
      </header>
      <SearchOptions options={options} click={setActiveOption} />
      {options.find((val) => val.active).component}
    </div>
  );
}
