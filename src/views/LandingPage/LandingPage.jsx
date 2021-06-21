import React, { useEffect, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { Switch, Route, useLocation } from 'wouter';
import constants, { colors } from '../../constants';
import SearchOptions from '../SearchOptions/SearchOptions';
// import RouteSearch from './RouteDirectionStopSearch copy';
import RouteSearch from '../ByRouteSearch/RouteDirectionStopSearch';
import StopSearch from '../ByStopSearch/StopNumberSearch';
import PageNotFound from '../../components/PageNotFound/PageNotFound';
import { Context } from '../../context';

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
  const [location, setLocation] = useLocation();
  const { state: { hideHeader, translations = {} } = {} } = useContext(Context);
  useEffect(() => {
    if (location === '/') {
      setLocation('/byRoute');
    }
  }, [location, setLocation]);

  return (
    <div className={classes.root}>
      {!hideHeader && (
        <>
          <header>
            <h2 className={classes.appHeaderText}>{translations.APP_HEADER}</h2>
          </header>
          <SearchOptions options={constants.NAVIGATION_OPTIONS} />{' '}
        </>
      )}
      <Switch>
        <Route path="/byRoute" component={RouteSearch} />
        <Route path="/byStop" component={StopSearch} />
        <Route
          path="/byRoute/:routeId/:directionId/:stopId"
          component={RouteSearch}
        />
        <Route path="/byStop/:stopId" component={StopSearch} />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}
