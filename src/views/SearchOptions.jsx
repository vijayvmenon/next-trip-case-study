import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import LinkButton from '../components/LinkButton';
// import constants from '../constants';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
});

export default function SearchOptions({ options, click }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {options.map((val) => (
        <LinkButton
          name={val.name}
          hrefLink={val.hrefLink}
          active={val.active}
          key={val.name}
          click={click}
        />
      ))}
    </div>
  );
}

SearchOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  click: PropTypes.func.isRequired,
};
