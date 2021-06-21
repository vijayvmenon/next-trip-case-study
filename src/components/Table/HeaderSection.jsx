import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';
import { Context } from '../../context';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 16px',
    '@media(min-width: 768px)': {
      flexDirection: 'row',
      background: colors.TABLE_BACKGROUND,
      color: colors.TEXT_COLOR,
    },
    flexWrap: 'wrap',
    background: colors.BACKGROUND_5,
    justifyContent: 'space-between',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    color: colors.WHITE,
  },
  stopId: {
    display: 'flex',
    alignItems: 'center',
  },
  headerText: {
    margin: '8px 0px',
    '@media(min-width: 768px)': {
      margin: '1rem 0rem',
    },
  },
  stopIdText: {
    fontWeight: 'bold',
  },
  stopText: {
    margin: '8px 0px',
    '@media(min-width: 768px)': {
      margin: '1rem',
    },
  },
});

export default function TableHeader({ headerText, stopId }) {
  const classes = useStyles();
  const { state: { translations = {} } = {} } = useContext(Context);
  return (
    <div className={classes.root}>
      <h3 className={classes.headerText}>{headerText}</h3>
      <div className={classes.stopId}>
        <div className={classes.stopIdText}>{translations.STOP_HASH}</div>
        <p className={classes.stopText}>{stopId}</p>
      </div>
    </div>
  );
}

TableHeader.defaultProps = {
  stopId: 0,
  headerText: '',
};

TableHeader.propTypes = {
  headerText: PropTypes.string,
  stopId: PropTypes.number,
};
