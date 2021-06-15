import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import TableHeader from '../components/TableHeader';
import Table from '../components/Table';
import constants from '../constants';

const useStyles = createUseStyles({
  tablePadding: {
    padding: '32px 60px',
  },
});
function TableWrapper({
  tableData = '',
  rowField,
  tableHeaderField,
  interval,
  getTableData,
}) {
  const classes = useStyles();
  const { TABLE_COLUMNS: columns } = constants;
  const rows = tableData?.[rowField] ?? null;
  const { description: headerText, stop_id: stopId } =
    tableData?.[tableHeaderField]?.[0] ?? {};
  const refreshTableEveryMinute = useRef(null);

  useEffect(() => {
    // make the table more extensible and usable without interval setup, if interval props are not passed
    if (interval !== null) {
      console.log('useEffect running', tableData, interval);
      /* set the interval after tableData is set from parent component - this avoids setting interval on initial load 
      when tableData is null and also avoids setting subsequent intervals when tableData changes for the same search criteria,
      as this would keep on adding more interval's which is not required. We ony need the initial interval that was set .
      This also prevents setting Interval when the API returns error */
      if (
        tableData !== null &&
        // interval !== 'error' &&
        interval === 'on-search'
        // && interval !== 'from-interval' &&
        // interval !== 'dropdown-changed'
      ) {
        /* We need to call setInrvl in Parent before the Interval starts so that if the user updates search parameters
         before the first interval starts, the interval is cleared in the useEffect below */
        console.log('before setting intrval', tableData, interval);
        refreshTableEveryMinute.current = setInterval(() => {
          console.log('interval run', tableData, interval);
          getTableData('from-interval');
        }, constants.INTERVAL_FREQUENCY);
      }
      /* clear interval when a new value is searched . This avoids clearing interval on initial load as well and also clears interval 
      when there is API error or when the dropdown is changed */
      if (
        tableData === null &&
        (interval === 'on-search' ||
          interval === 'dropdown-changed' ||
          interval === 'error')
      ) {
        if (refreshTableEveryMinute?.current) {
          console.log('clearing Interval', tableData, interval);
          clearInterval(refreshTableEveryMinute.current);
        }
        refreshTableEveryMinute.current = null;
      }
    }
    return undefined; // for eslint consistent-return rule fix
  }, [tableData, interval]);

  // clearing the interval on component unmount as well
  useEffect(
    () => () => {
      console.log('clearing Interval on unmount');
      clearInterval(refreshTableEveryMinute.current);
      refreshTableEveryMinute.current = null;
    },
    [],
  );
  return (
    <div className={classes.tablePadding}>
      {rows && (
        <>
          {tableHeaderField !== null && (
            <TableHeader headerText={headerText} stopId={stopId} />
          )}
          <Table rows={rows} columns={columns} />
        </>
      )}
    </div>
  );
}

TableWrapper.defaultProps = {
  tableData: '',
  tableHeaderField: null,
  interval: null,
  getTableData: () => {},
};

TableWrapper.propTypes = {
  tableData: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.string,
  ]),
  rowField: PropTypes.string.isRequired,
  tableHeaderField: PropTypes.string,
  interval: PropTypes.string,
  getTableData: PropTypes.func,
};

export default React.memo(TableWrapper);
