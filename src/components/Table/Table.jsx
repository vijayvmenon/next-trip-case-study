import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { useMediaPredicate } from 'react-media-hook';
import { colors } from '../../constants';
import { Context } from '../../context';
import TableHead from './TableHead';
import ExpandedRow from './ExpandedRow';
import CollapsedRow from './CollapsedRow';
import NoDataRow from './NoDataRow';

const useStyles = createUseStyles({
  tableContainer: {
    '@media(min-width:1200px)': {
      width: 1140,
    },
    '@media(max-width:1200px)': {
      width: 800,
    },
    '@media(max-width:900px)': {
      width: 'auto',
    },
    '@media(max-width:768px)': {
      width: 'auto',
    },
  },
  root: {
    tableLayout: 'fixed',
    width: '100%',
    borderSpacing: 0,
    boxSizing: 'border-box',
    borderCollapse: 'collapse',
    background: colors.TABLE_BACKGROUND,
  },
});

export default function Table({ rows, columns }) {
  const classes = useStyles();
  // this will show normal table at screen width > 768 px and responsive table at screen width < 768px
  const normalTable = useMediaPredicate('(min-width: 768px)');
  const { state: { tableExpanded = false } = {}, dispatch } =
    useContext(Context);

  const rowsToShow = rows.length > 5 ? rows.slice(0, 5) : rows;
  const rowsToHide = rows.length > 5 ? rows.slice(5) : [];

  return (
    <div className={classes.tableContainer}>
      <table className={classes.root}>
        <TableHead columns={columns} normalTable={normalTable} />
        <tbody>
          <NoDataRow rows={rows} columns={columns} />
          <CollapsedRow
            rowsToShow={rowsToShow}
            columns={columns}
            click={() => dispatch({ type: 'TABLE_EXPAND' })}
            rowsToHide={rowsToHide}
            tableExpanded={tableExpanded}
            normalTable={normalTable}
          />
          <ExpandedRow
            tableExpanded={tableExpanded}
            rowsToHide={rowsToHide}
            columns={columns}
            click={() => dispatch({ type: 'TABLE_COLLAPSE' })}
            normalTable={normalTable}
          />
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.any).isRequired,
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
};
