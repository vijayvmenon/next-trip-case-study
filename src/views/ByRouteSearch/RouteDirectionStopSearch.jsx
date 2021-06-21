import React, { useEffect, useState, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation } from 'wouter';
import { Context } from '../../context';
import Select from '../../components/UI/Select';
import constants from '../../constants';
import { httpGet, urlBuilder, checkIfUrlIsInByRouteFormat } from '../../utils';
import TableWrapper from '../TableWrapper/TableWrapper';
import Loader from '../../components/UI/Loader';
import Snackbar from '../../components/UI/Snackbar';

const useStyles = createUseStyles({
  root: {
    marginTop: 24,
    width: '100%',
    position: 'relative',
    maxWidth: 570,
  },
  tablePadding: {
    padding: '32px 60px',
  },
});

export default function RouteDirectionStopSearch() {
  const classes = useStyles();
  const {
    dispatch,
    state: {
      snackbar: { value: snackbarType = '', text = '' } = {},
      translations = {},
    } = {},
  } = useContext(Context);

  const { http, SELECT_FIELDS } = constants;

  const [dropdowns, setDropDowns] = useState(SELECT_FIELDS);
  const [location, setLocation] = useLocation();
  const [loader, setLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  const [routeOnReload, setRouteOnReload] = useState('');
  const [selectProperties, setSelectProperties] = useState([
    { id: 'ROUTE', param: null, selected: '', active: false },
    { id: 'DIRECTION', param: null, selected: '', active: false },
    { id: 'STOP', param: null, selected: '', active: false },
  ]);
  const [tableData, setTableData] = useState(null);
  const [intrvel, setIntrvl] = useState('initial');
  const [backButtonClicked, setBackButtonClicked] = useState(false);

  const onSearch = (value, source, idField) => {
    // Reset params in url when user searches through the dropdowns again
    setRouteOnReload('');
    setSelectProperties(
      selectProperties.map((val) => {
        // logic to reset selected value on route or direction dropdown change accordingly. Also sets the url param
        let selectedValue = val.selected;
        if (val.id === source) {
          selectedValue = value[idField];
        }
        if (
          source === 'ROUTE' &&
          (val.id === 'DIRECTION' || val.id === 'STOP')
        ) {
          selectedValue = '';
        }
        if (source === 'DIRECTION' && val.id === 'STOP') {
          selectedValue = '';
        }
        return {
          ...val,
          param: val.id === source ? value[idField] : val.param,
          selected: selectedValue,
          active: val.id === source,
        };
      }),
    );
  };

  function setDropdownData(data, source) {
    function getOptions(val) {
      if (val.labelSelected === source) {
        return data;
      }
      if (val.labelSelected === 'STOP' && source === 'DIRECTION') {
        return undefined;
      }
      return val.options;
    }
    setDropDowns(
      dropdowns.map((val) => ({
        ...val,
        /* set the dropdowndata based on the source passed from getDropDownData function. When the source is DIRECTION,
       i.e when Routes dropdown is changed, then we need to hide the stops dropdown. Below logic handles that */
        options: getOptions(val),
      })),
    );
  }

  async function getData(param, source) {
    if (source === 'table') {
      setTableLoader(true);
    } else {
      setLoader(true);
    }

    const [fetchResponse, fetchError] = await httpGet(param);
    if (fetchResponse) {
      if (source === 'table') {
        setTableData(fetchResponse);
      } else {
        setDropdownData(fetchResponse, source);
      }
    }
    if (fetchError) {
      setIntrvl('error');
      if (source !== 'table') {
        setDropdownData([], source); // set next dropdown to empty options when error, but not for table as its not required
      }
      // Open snackbar based on warning or error from the API call
      if (fetchError === 'warning') {
        dispatch({
          type: 'SET_SNACKBAR',
          value: 'warning',
          text: translations.NO_DEPARTURE_ROUTE,
        });
      } else {
        dispatch({
          type: 'SET_SNACKBAR',
          value: 'error',
          text: `${translations.ERROR_FETCHING}${
            source === 'table' ? translations.DEPARTURES : source
          }. ${translations.PLEASE_TRY_AGAIN}`,
        });
      }
    }
    setLoader(false);
    setTableLoader(false);
  }

  function getTableData(interval, passedUrl) {
    /* set tableData to null only if a new search is made. 
    This is to handle the useEffect run for clearing interval in <Table/> component */
    if (interval === 'on-search') {
      setTableData(null);
    }
    setIntrvl(interval);
    // call the departures API on interval from tableWrapper, on dropdown change or on initial load
    const tableUrl = passedUrl || routeOnReload || urlBuilder(selectProperties);
    //  setLocation(`/byRoute/${tableUrl}`);
    getData(tableUrl, 'table');
  }

  /* Load departures (if url has required parameters) on Initial Load . This useEffect also loads the departures data when
  user searches something by changing the stops dropdown. Since location is passed in the array of dependencies and 
  we are setting location in line 198, this useEffect will run and get the TableData. 
  It is written like this to handle situation when the user clicks browser back button */
  useEffect(() => {
    async function fetchData() {
      dispatch({ type: 'SHOW_HEADER' }); // show Header component again when redirecting from a page not found
      const activeProperty = selectProperties.find((val) => val.active);
      const urlToLoad = checkIfUrlIsInByRouteFormat(location);

      // Load routes only on initial load
      if (!activeProperty) {
        await getData(http.ROUTE, 'ROUTE');
      }
      if (urlToLoad) {
        setRouteOnReload(urlToLoad);
        getTableData('on-search', urlToLoad);
      } else {
        /* Handle situation where user presses browser back button and comes to the root /byRoute page. We need to reset
      the interval if any are set */
        setTableData(null);
        setIntrvl('reset');
        // Show warning snackbar if the URL parameters are not valid and only when not in the rool url
        if (location !== '/byRoute') {
          dispatch({
            type: 'SET_SNACKBAR',
            value: 'warning',
            text: translations.NOT_VALID_SEARCH,
          });
        }
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location]);

  // Moving the data fetching logic for dropdowns and table to the useeffect once selectProperties state is changed.
  // Add logic to not run this on initial load as well
  useEffect(() => {
    const notInitialLoad = selectProperties.find((val) => val.param !== null);
    if (notInitialLoad) {
      const { id: activeDropDown, param: activeParam } = selectProperties.find(
        (val) => val.active,
      );
      // Reset table on change of route or directions dropdown . Also clear Interval if set. Does not run on initial load
      if (tableData !== null) {
        setTableData(null);
        setIntrvl('dropdown-changed');
      }
      if (activeDropDown === 'ROUTE') {
        getData(`${http.DIRECTIONS}/${activeParam}`, 'DIRECTION'); // get directions data again based on route selected
      } else if (activeDropDown === 'DIRECTION') {
        const routeParam = selectProperties.find(
          (val) => val.id === 'ROUTE',
        ).param;
        getData(`${http.STOPS}/${routeParam}/${activeParam}`, 'STOP'); // get stops data again based on direction selected
      } else {
        const tableUrl = urlBuilder(selectProperties);
        setLocation(`/byRoute/${tableUrl}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectProperties]);

  function getSelectedValue(val) {
    const result = selectProperties.find(
      (innerVal) => innerVal.id === val.labelSelected,
    ).selected;
    if (result === '') {
      return val.label;
    }
    return result;
  }

  /* This useEffect is to handle browser back button click situation. The 'popstate" event listener will run 
   on initial load and based on the backButtonclicked state, when the user presses back button and the URL is a
   valid URL to show departures, it will reload the table based on the URL params , but hide th other dropdowns 
   except route dropdown, in order to give the same experience as a browser refresh  */
  useEffect(() => {
    window.addEventListener('popstate', async () => {
      // set the state only if its not set to true. This is an optimization
      if (!backButtonClicked) {
        setBackButtonClicked(true);
      }
    });
    if (backButtonClicked) {
      setDropDowns(
        dropdowns.map((val) => ({
          ...val,
          options: val.labelSelected !== 'ROUTE' ? undefined : val.options,
        })),
      );
      setBackButtonClicked(false);
    }
    return () => window.removeEventListener('popstate', {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backButtonClicked]);

  return (
    <>
      <Snackbar type={snackbarType} text={text} />
      <form className={classes.root} action="">
        {loader && <Loader top="20%" />}
        {dropdowns
          .filter((val) => val.options !== undefined)
          .map((val) => (
            <Select
              key={val.label}
              label={val.label}
              onSearch={onSearch}
              options={val.options}
              labelSelected={val.labelSelected}
              idField={val.idField}
              valueField={val.valueField}
              selectedValue={getSelectedValue(val)}
            />
          ))}
      </form>
      <TableWrapper
        tableData={tableData}
        rowField="departures"
        tableHeaderField="stops"
        interval={intrvel}
        getTableData={getTableData}
        setIntrvl={(val) => setIntrvl(val)}
        loader={tableLoader}
      />
    </>
  );
}
