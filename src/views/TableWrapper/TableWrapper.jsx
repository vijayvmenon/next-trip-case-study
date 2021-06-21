import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import TableHeader from '../../components/Table/HeaderSection';
import Table from '../../components/Table/Table';
import constants from '../../constants';
import Loader from '../../components/UI/Loader';

const useStyles = createUseStyles({
  tablePadding: {
    padding: '32px 8px',
    position: 'relative',
    '@media(min-width: 768px)': {
      padding: '32px 60px',
    },
  },
});
function TableWrapper({
  tableData = '',
  rowField,
  tableHeaderField,
  interval,
  getTableData,
  loader,
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
      /* set the interval after tableData is set from parent component - this avoids setting interval on initial load 
      when tableData is null and also avoids setting subsequent intervals when tableData changes for the same search criteria,
      as this would keep on adding more interval's which is not required. We ony need the initial interval that was set .
      This also prevents setting Interval when the API returns error */
      if (tableData !== null && interval === 'on-search') {
        /* We need to call setInrvl in Parent before the Interval starts so that if the user updates search parameters
         before the first interval starts, the interval is cleared in the useEffect below */
        refreshTableEveryMinute.current = setInterval(() => {
          getTableData('from-interval');
        }, constants.INTERVAL_FREQUENCY);
      }
      /* clear interval when a new value is searched . This avoids clearing interval on initial load as well and also clears interval 
      when there is API error or when the dropdown is changed */
      if (
        tableData === null &&
        (interval === 'on-search' ||
          interval === 'dropdown-changed' ||
          interval === 'error' ||
          interval === 'reset')
      ) {
        if (refreshTableEveryMinute?.current) {
          clearInterval(refreshTableEveryMinute.current);
        }
        refreshTableEveryMinute.current = null;
      }
    }
    return undefined; // for eslint consistent-return rule fix
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData, interval]);

  // clearing the interval on component unmount as well
  useEffect(
    () => () => {
      clearInterval(refreshTableEveryMinute.current);
      refreshTableEveryMinute.current = null;
    },
    [],
  );

  return (
    <>
      {loader && <Loader top="20%" />}
      {rows && (
        <div className={classes.tablePadding}>
          {tableHeaderField !== null && (
            <TableHeader headerText={headerText} stopId={stopId} />
          )}
          <Table rows={rows} columns={columns} />
        </div>
      )}
    </>
  );
}

TableWrapper.defaultProps = {
  tableData: '',
  tableHeaderField: null,
  interval: null,
  getTableData: () => {},
  loader: false,
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
  loader: PropTypes.bool,
};

export default React.memo(TableWrapper);
