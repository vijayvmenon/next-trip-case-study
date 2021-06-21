import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';
import { ReactComponent as CloseIcon } from '../../assets/close-icon.svg';
import { Context } from '../../context';

const useStyles = createUseStyles({
  icon: {
    widht: 32,
    height: 32,
    color: colors.TEXT_COLOR_2,
  },
  closeIcon: { extend: 'icon', color: colors.TEXT_COLOR, cursor: 'default' },
  noDataRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTextNoData: {
    paddingLeft: 8,
    fontWeight: 500,
    fontSize: '1.2rem',
    letterSpacing: 2,
    color: colors.TEXT_COLOR,
  },
});

export default function NoDataRow({ rows, columns }) {
  const classes = useStyles();
  const { state: { translations = {} } = {} } = useContext(Context);

  return (
    rows.length === 0 && (
      <tr>
        <td colSpan={columns.length}>
          <div className={classes.noDataRow} data-testid="no-data-in-table">
            <CloseIcon className={classes.closeIcon} />
            <p className={classes.iconTextNoData}>{translations.STOP_CLOSED}</p>
          </div>
        </td>
      </tr>
    )
  );
}

NoDataRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
  rows: PropTypes.arrayOf(PropTypes.any).isRequired,
};
