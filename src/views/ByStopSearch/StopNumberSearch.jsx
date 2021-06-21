import React, { useState, useEffect, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation } from 'wouter';
import Input from '../../components/UI/Input';
import { Context } from '../../context';
import { httpGet, checkIfUrlIsInByStopFormat } from '../../utils';
import TableWrapper from '../TableWrapper/TableWrapper';
import Snackbar from '../../components/UI/Snackbar';
import constants from '../../constants';

const useStyles = createUseStyles({
  root: {
    marginTop: 24,
    width: '100%',
    maxWidth: 570,
  },
});

export default function StopNumberSearch() {
  const classes = useStyles();
  const [inpValue, setInpValue] = useState('');
  const [tableData, setTableData] = useState(null);
  const {
    dispatch,
    state: {
      snackbar: { value: snackbarType = '', text = '' } = {},
      translations = {},
    } = {},
  } = useContext(Context);
  const [loader, setLoader] = useState(false);
  const [routeOnReload, setRouteOnReload] = useState('');
  const [intrvel, setIntrvl] = useState('initial');
  const [location, setLocation] = useLocation();

  async function getTableData(interval, passedValue) {
    setLoader(true);
    /* set tableData to null only if a new search is made. 
    This is to handle the useEffect run for clearing interval in <TableWrapper/> component */
    if (interval === 'on-search') {
      setTableData(null);
    }
    setIntrvl(interval);
    /* call the API on stop input being entered, when the url reloads and a 
    stop_id exists in the url or on interval call from TableWrapper */
    const [fetchResponse, fetchError] = await httpGet(
      passedValue || routeOnReload || inpValue,
    );
    if (fetchResponse) {
      setTableData(fetchResponse);
    }
    if (fetchError) {
      // do not set interval and clear previous intevals in error condition
      setIntrvl('error');
      // Open snackbar based on warning or error from the API call
      if (fetchError === 'warning') {
        dispatch({
          type: 'SET_SNACKBAR',
          value: 'warning',
          text: `${passedValue || inpValue} ${translations.NOT_VALID_STOP}`,
        });
      } else {
        dispatch({
          type: 'SET_SNACKBAR',
          value: 'error',
          text: translations.SNACKBAR_STOP_ERROR,
        });
      }
    }
    setLoader(false);
  }

  const onSearch = async (value, e) => {
    // Reset stop_id in url when user searches through the input
    setRouteOnReload('');
    if (e) {
      e.preventDefault();
    }
    if (!value) {
      return;
    }
    setLocation(`${constants.BASE_PATH}/byStop/${value}`);
  };

  /* Load departures (if url has required parameters) on Initial Load . This useEffect also loads the departures data when
  user searches something from the input. Since location is passed in the array of dependencies and we are setting 
  location in line 79, this useEffect will run and get the TableData. It is written like this to handle situation when the 
  user clicks browser back button */
  useEffect(() => {
    dispatch({ type: 'SHOW_HEADER' }); // show Header component again when redirecting from a page not found
    const url = checkIfUrlIsInByStopFormat(location);
    if (url) {
      setRouteOnReload(url);
      getTableData('on-search', url);
    } else {
      /* Handle situation where user presses browser back button and comes to the root /byStop page. We need to reset
      the interval if any are set */
      setTableData(null);
      setIntrvl('reset');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location]);

  return (
    <>
      <Snackbar type={snackbarType} text={text} />
      <form className={classes.root} action="">
        <Input
          inputType="number"
          label={translations.ENTER_STOP_NUMBER}
          onSearch={onSearch}
          value={inpValue}
          setInput={(value) => setInpValue(value)}
          focusOnLoad
        />
      </form>
      <TableWrapper
        tableData={tableData}
        rowField="departures"
        tableHeaderField="stops"
        interval={intrvel}
        getTableData={getTableData}
        loader={loader}
      />
    </>
  );
}
