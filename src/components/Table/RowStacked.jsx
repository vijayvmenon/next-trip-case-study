import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';
import { Context } from '../../context';

const useStyles = createUseStyles({
  stackedRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'space-between',
    marginTop: -10,
    marginBottom: -10,
    '@media(max-width: 500px)': {
      flexWrap: 'wrap',
      padding: '12px 8px',
    },
  },
  label: {
    color: colors.TEXT_COLOR,
    lineHeight: '1.5rem',
    letterSpacing: 3,
    marginRight: '1rem',
    flexShrink: 0,
    '@media(max-width: 500px)': {
      marginRight: '100rem', // this is to wrap all the labels and text at width < 500px
    },
    width: '35%',
  },
  tableCellText: {
    color: colors.TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: '1.1rem',
    margin: 0,
    flexGrow: 1,
  },
  tableTd: {
    padding: '0.875rem',
    width: '100%',
  },
});

export default function RowStacked({ columns, rowValue }) {
  const classes = useStyles();
  const { state: { translations = {} } = {} } = useContext(Context);
  return (
    <td className={classes.tableTd}>
      {columns.map((columnValue) => (
        <div className={classes.stackedRoot} key={uuid()}>
          <label className={classes.label} htmlFor={columnValue?.id}>
            {translations[columnValue.value]}
          </label>
          <p className={classes.tableCellText} id={columnValue?.id}>
            {columnValue?.formatter
              ? columnValue.formatter(rowValue?.[columnValue.id], rowValue)
              : rowValue[columnValue?.id]}
          </p>
        </div>
      ))}
    </td>
  );
}

RowStacked.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
  rowValue: PropTypes.objectOf(PropTypes.any).isRequired,
};
