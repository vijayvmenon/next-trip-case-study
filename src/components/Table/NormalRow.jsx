import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';

const useStyles = createUseStyles({
  tableCell: {
    padding: 16,
    color: colors.TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: '1.1rem',
    // borderBottom: '1px solid black',
  },
  tableCellDescription: {
    padding: 16,
    color: colors.TEXT_COLOR,
    fontSize: '1.1rem',
    // borderBottom: '1px solid black',
  },
});

export default function ExpandedRow({ columns, rowValue }) {
  const classes = useStyles();

  return columns.map((columnValue) => (
    <td
      key={uuid()}
      className={
        columnValue.id === 'description'
          ? classes.tableCellDescription
          : classes.tableCell
      }
      style={{ textAlign: columnValue.textAlign }}
    >
      {columnValue?.formatter
        ? columnValue.formatter(rowValue?.[columnValue.id], rowValue)
        : rowValue[columnValue?.id]}
    </td>
  ));
}

ExpandedRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
  rowValue: PropTypes.objectOf(PropTypes.any),
};
