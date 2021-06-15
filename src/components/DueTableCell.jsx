import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { ReactComponent as BroadCastIcon } from '../assets/broadcast.svg';

const useStyles = createUseStyles({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  blinker: {
    paddingRight: 3,
    animationName: '$blinker',
    animationDuration: '1s',
    animationTimingFunction: 'cubic-bezier(.5, 0, 1, 1)',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
  },
  '@keyframes blinker': {
    to: { opacity: 0 },
  },
});
export default function DueTableCell({ value, row }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {row.actual && <BroadCastIcon className={classes.blinker} />}
      <div>{value}</div>
    </div>
  );
}

DueTableCell.propTypes = {
  value: PropTypes.string.isRequired,
  row: PropTypes.objectOf(PropTypes.any).isRequired,
};
