/*eslint-disable */
import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import constants, { colors } from '../constants';
import { Context } from '../context';
import { ReactComponent as Expand } from '../assets/plus-circle.svg';
import { ReactComponent as Collapse } from '../assets/minus-circle.svg';
import { ReactComponent as CloseIcon } from '../assets/close-icon.svg';
const useStyles = createUseStyles({
  root: {
    tableLayout: 'fixed',
    border: '1px solid black',
    width: '100%',
    borderSpacing: 0,
    boxSizing: 'border-box',
  },
  header: {
    background: colors.BACKGROUND_2,
    color: colors.WHITE,
    padding: 12,
  },
  tableCell: {
    padding: 16,
    borderBottom: '1px solid black',
  },
  icon: {
    widht: 32,
    height: 32,
    color: colors.BACKGROUND_2,
    cursor: 'pointer',
  },
  expandIcon: {
    extend: 'icon',
  },
  collapseIcon: { extend: 'icon' },
  closeIcon: { extend: 'icon', cursor: 'default' },
  iconWithText: {
    paddingLeft: 8,
    display: 'flex',
    alignItems: 'center',
  },
  noDataRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    paddingLeft: 8,
    fontWeight: 500,
    fontSize: '1rem',
    color: colors.BACKGROUND_2,
  },
  iconTextNoData: {
    paddingLeft: 8,
    fontWeight: 500,
    fontSize: '1.2rem',
    letterSpacing: 2,
    color: colors.TEXT_COLOR,
  },
});
export default function Table({ rows, columns }) {
  const classes = useStyles();
  const { state: { tableExpanded = false } = {}, dispatch } =
    useContext(Context);

  const rowsToShow = rows.length > 5 ? rows.slice(0, 5) : rows;
  const rowsToHide = rows.length > 5 ? rows.slice(5) : [];
  console.log(rowsToShow, rowsToHide, tableExpanded);

  const TableHeader = () => (
    <thead className={classes.header}>
      <tr>
        {columns.map((val) => (
          <th
            key={val.id}
            className={classes.header}
            style={{ textAlign: val?.textAlign }}
          >
            {val.value}
          </th>
        ))}
      </tr>
    </thead>
  );

  const RowsIfCollapsed = () =>
    rowsToShow.map((rowValue, key) => (
      <tr key={key}>
        {columns.map((columnValue, columnKey) => (
          <td
            key={columnKey}
            className={classes.tableCell}
            style={{ textAlign: columnValue.textAlign }}
          >
            {columnValue?.formatter
              ? columnValue.formatter(rowValue?.[columnValue.id], rowValue)
              : rowValue[columnValue?.id]}
          </td>
        ))}
      </tr>
    ));

  const RowsIfExpanded = () =>
    tableExpanded &&
    rowsToHide.length > 0 && (
      <>
        {rowsToHide.map((rowValue, key) => (
          <tr key={key}>
            {columns.map((columnValue, columnKey) => (
              <td
                key={columnKey}
                className={classes.tableCell}
                style={{ textAlign: columnValue.textAlign }}
              >
                {columnValue?.formatter
                  ? columnValue.formatter(rowValue?.[columnValue.id], rowValue)
                  : rowValue[columnValue?.id]}
              </td>
            ))}
          </tr>
        ))}
      </>
    );

  const ExpandRow = () =>
    !tableExpanded &&
    rowsToHide.length > 0 && (
      <tr>
        <td>
          <div className={classes.iconWithText}>
            <Expand
              className={classes.expandIcon}
              onClick={() => dispatch({ type: 'TABLE_EXPAND' })}
            />
            <p className={classes.iconText}>{constants.SHOW_MORE}</p>
          </div>
        </td>
      </tr>
    );

  const CollapseRow = () =>
    tableExpanded &&
    rowsToHide.length > 0 && (
      <tr>
        <td>
          <div className={classes.iconWithText}>
            <Collapse
              className={classes.collapseIcon}
              onClick={() => dispatch({ type: 'TABLE_COLLAPSE' })}
            />
            <p className={classes.iconText}>{constants.SHOW_LESS}</p>
          </div>
        </td>
      </tr>
    );

  const NoDataRow = () =>
    rows.length === 0 && (
      <tr>
        <td colSpan={columns.length}>
          <div className={classes.noDataRow}>
            <CloseIcon className={classes.closeIcon} />
            <p className={classes.iconTextNoData}>{constants.STOP_CLOSED}</p>
          </div>
        </td>
      </tr>
    );

  return (
    <table className={classes.root}>
      <TableHeader />
      <tbody>
        <NoDataRow />
        <RowsIfCollapsed />
        <ExpandRow />
        <RowsIfExpanded />
        <CollapseRow />
      </tbody>
    </table>
  );
}

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.any).isRequired,
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
};
