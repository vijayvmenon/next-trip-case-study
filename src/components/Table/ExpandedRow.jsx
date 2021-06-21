import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import uuid from 'react-uuid';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';
import { ReactComponent as Collapse } from '../../assets/minus-circle.svg';
import NormalRow from './NormalRow';
import RowStacked from './RowStacked';
import { Context } from '../../context';

const useStyles = createUseStyles({
  tableRow: {
    borderTop: '1px solid black',
  },
  icon: {
    widht: 32,
    height: 32,
    color: colors.TEXT_COLOR_2,
  },
  collapseIcon: {
    extend: 'icon',
  },
  clickable: {
    cursor: 'pointer',
  },
  iconWithText: {
    paddingLeft: 8,
    display: 'flex',
    alignItems: 'center',
  },
  iconText: {
    paddingLeft: 8,
    fontWeight: 500,
    fontSize: '1rem',
    color: colors.TEXT_COLOR,
  },
});

export default function ExpandedRow({
  tableExpanded,
  rowsToHide,
  columns,
  click,
  normalTable,
}) {
  const classes = useStyles();
  const { state: { translations = {} } = {} } = useContext(Context);

  return (
    <>
      {tableExpanded && rowsToHide.length > 0 && (
        <>
          {rowsToHide.map((rowValue) => (
            <tr key={uuid()} className={classes.tableRow}>
              {normalTable ? (
                <NormalRow columns={columns} rowValue={rowValue} />
              ) : (
                <RowStacked columns={columns} rowValue={rowValue} />
              )}
            </tr>
          ))}
        </>
      )}
      {tableExpanded && rowsToHide.length > 0 && (
        <tr className={clsx(classes.tableRow, classes.clickable)}>
          <td colSpan={columns.length}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <div
              role="button"
              tabIndex="0"
              className={classes.iconWithText}
              onClick={click}
            >
              <Collapse className={classes.collapseIcon} />
              <p className={classes.iconText}>{translations.SHOW_LESS}</p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

ExpandedRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
  tableExpanded: PropTypes.bool.isRequired,
  rowsToHide: PropTypes.arrayOf(PropTypes.any).isRequired,
  click: PropTypes.func.isRequired,
  normalTable: PropTypes.bool.isRequired,
};
