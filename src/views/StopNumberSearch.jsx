/* eslint-disable */
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation } from 'wouter';
import Input from '../components/Input';
import constants from '../constants';
import { httpGet } from '../utils';
import TableWrapper from './TableWrapper';

const useStyles = createUseStyles({
  root: {
    marginTop: 24,
    width: '60%',
  },
});

export default function StopNumberSearch() {
  const classes = useStyles();
  const [inpValue, setInpValue] = useState('');
  const [tableData, setTableData] = useState(null);
  const [intrvel, setIntrvl] = useState('initial');
  const [error, setError] = useState(false);
  const [location, setLocation] = useLocation();
  console.log(location);
  const onSearch = async (value, e) => {
    if (e) {
      e.preventDefault();
    }
    if (!value) {
      return;
    }
    setLocation(`/byStop/${value}`);
    getTableData('on-search');
  };

  async function getTableData(interval) {
    setError(false);
    /* set tableData to null only if a new search is made. 
    This is to handle the useEffect run for clearing interval in <Table/> component */
    interval === 'on-search' && setTableData(null);
    setIntrvl(interval);
    const [response, error] = await httpGet(inpValue);
    if (response) {
      setTableData(response);
    }
    if (error) {
      setIntrvl('error');
      setError(true);
    }
  }

  return (
    <>
      <form className={classes.root} action="">
        <Input
          type="number"
          label={constants.ENTER_STOP_NUMBER}
          onSearch={onSearch}
          value={inpValue}
          setInput={(value) => setInpValue(value)}
        />
      </form>
      <TableWrapper
        tableData={tableData}
        rowField="departures"
        tableHeaderField="stops"
        interval={intrvel}
        getTableData={getTableData}
      />
    </>
  );
}
