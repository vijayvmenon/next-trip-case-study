import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import constants, { colors } from '../constants';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    background: colors.BACKGROUND_1,
    padding: 8,
  },
  stopId: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default function TableHeader({ headerText, stopId }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h3>{headerText}</h3>
      <div className={classes.stopId}>
        <div>{constants.STOP_HASH}</div>
        <p>{stopId}</p>
      </div>
    </div>
  );
}

TableHeader.propTypes = {
  headerText: PropTypes.string.isRequired,
  stopId: PropTypes.number.isRequired,
};
