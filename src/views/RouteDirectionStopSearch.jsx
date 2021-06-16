/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation } from 'wouter';
import Select from '../components/Select';
import constants from '../constants';
import { httpGet, urlBuilder, checkIfUrlHasCorrectParams } from '../utils';
import TableWrapper from './TableWrapper';

const { ROUTE, DIRECTION, STOP, http, SELECT_FIELDS } = constants;

const useStyles = createUseStyles({
  root: {
    marginTop: 24,
    width: '60%',
  },
  tablePadding: {
    padding: '32px 60px',
  },
});

export default function RouteDirectionStopSearch() {
  const classes = useStyles();
  const [dropdowns, setDropDowns] = useState(SELECT_FIELDS);
  const [error, setError] = useState(false);
  const [location, setLocation] = useLocation();
  const [selectProperties, setSelectProperties] = useState([
    { id: ROUTE, param: null, selected: '', active: false },
    { id: DIRECTION, param: null, selected: '', active: false },
    { id: STOP, param: null, selected: '', active: false },
  ]);
  const [tableData, setTableData] = useState(null);
  const [intrvel, setIntrvl] = useState('initial');

  const onSearch = (value, source, idField) => {
    setSelectProperties(
      selectProperties.map((val) => {
        // logic to reset selected value on route or direction dropdown change accordingly. Also sets the url param
        let selectedValue = val.selected;
        if (val.id === source) {
          selectedValue = value[idField];
        }
        if (source === ROUTE && (val.id === DIRECTION || val.id === STOP)) {
          selectedValue = '';
        }
        if (source === DIRECTION && val.id === STOP) {
          selectedValue = '';
        }
        return {
          ...val,
          param: val.id === source ? value[idField] : val.param,
          selected: selectedValue,
          active: val.id === source ? true : false,
        };
      }),
    );
  };

  // Load routes on Initial Load
  useEffect(() => {
    getData(http.ROUTE, ROUTE);
    console.log(location, checkIfUrlHasCorrectParams(location));
    const urlToLoad = checkIfUrlHasCorrectParams(location);
    if (urlToLoad) {
      getTableData('on-search', urlToLoad);
    }
  }, []);

  // Moving the data fetching logic for dropdowns and table to the useeffect once selectProperties state is changed.
  // Add logic to not run this on initial load as well
  useEffect(() => {
    const notInitialLoad = selectProperties.find((val) => val.param !== null);
    if (notInitialLoad) {
      const { id: activeDropDown, param: activeParam } = selectProperties.find(
        (val) => val.active,
      );
      setError(false);
      // Reset table on change of route or directions dropdown . Also clear Interval if set. Does not run on initial load
      if (tableData !== null) {
        setTableData(null);
        setIntrvl('dropdown-changed');
      }
      if (activeDropDown === ROUTE) {
        getData(`${http.DIRECTIONS}/${activeParam}`, DIRECTION); //get directions data again based on route selected
      } else if (activeDropDown === DIRECTION) {
        const routeParam = selectProperties.find(
          (val) => val.id === ROUTE,
        ).param;
        getData(`${http.STOPS}/${routeParam}/${activeParam}`, STOP); //get stops data again based on direction selected
      } else {
        getTableData('on-search'); //get table data when stop is changed
      }
    }
  }, [selectProperties]);

  function getTableData(interval, passedUrl) {
    /* set tableData to null only if a new search is made. 
    This is to handle the useEffect run for clearing interval in <Table/> component */
    interval === 'on-search' && setTableData(null);
    setIntrvl(interval);
    const tableUrl = passedUrl || urlBuilder(selectProperties);
    setLocation(`/byRoute/${tableUrl}`);
    getData(tableUrl, 'table');
  }

  function setDropdownData(data, source) {
    setDropDowns(
      dropdowns.map((val) => ({
        ...val,
        /* set the dropdowndata based on the source passed from getDropDownData function. When the source is DIRECTION,
       i.e when Routes dropdown is changed, then we need to hide the stops dropdown. Below logic handles that */
        options:
          val.labelSelected === source
            ? data
            : val.labelSelected === STOP && source === DIRECTION
            ? undefined
            : val.options,
      })),
    );
  }

  async function getData(param, source) {
    const [response, error] = await httpGet(param);
    //  console.log(response, error);
    if (response) {
      if (source === 'table') {
        setTableData(response);
      } else {
        setDropdownData(response, source);
      }
    }
    if (error) {
      setIntrvl('error');
      setError(true);
    }
  }

  function getSelectedValue(val) {
    const result = selectProperties.find(
      (innerVal) => innerVal.id === val.labelSelected,
    ).selected;
    if (result === '') {
      return val.label;
    } else {
      return result;
    }
  }

  return (
    <>
      <form className={classes.root} action="">
        {dropdowns
          .filter((val) => val.options)
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
      />
    </>
  );
}
