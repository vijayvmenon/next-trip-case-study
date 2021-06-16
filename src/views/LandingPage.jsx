/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Switch, Route, Redirect } from 'wouter';
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
    },
    {
      name: constants.BY_STOP,
      hrefLink: '/byStop',
    },
  ]);

  return (
    <div className={classes.root}>
      <header>
        <h2 className={classes.appHeaderText}>{constants.APP_HEADER}</h2>
      </header>
      <SearchOptions options={options} />
      <Switch>
        <Route path="/byRoute" component={RouteSearch} />
        <Route path="/byStop" component={StopSearch} />
        <Route
          path="/byRoute/:routeId/:directionId/:stopId"
          component={RouteSearch}
        />
        <Route path="/byStop/:stopId" component={StopSearch} />
        <Redirect to="/byRoute" />
      </Switch>
    </div>
  );
}
