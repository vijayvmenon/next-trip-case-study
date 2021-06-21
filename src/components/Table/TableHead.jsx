import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';
import { Context } from '../../context';

const useStyles = createUseStyles({
  header: {
    background: colors.BACKGROUND_5,
    color: colors.WHITE,
    padding: 12,
    lineHeight: '1.5rem',
    letterSpacing: 3,
  },
});

export default function TableHeader({ columns, normalTable }) {
  const classes = useStyles();
  const { state: { translations = {} } = {} } = useContext(Context);
  return normalTable ? (
    <thead className={classes.header}>
      <tr>
        {columns.map((val) => (
          <th
            key={val.id}
            className={classes.header}
            style={{ textAlign: val?.textAlign }}
          >
            {translations[val.value]}
          </th>
        ))}
      </tr>
    </thead>
  ) : null;
}

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
  normalTable: PropTypes.bool.isRequired,
};
