import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import LinkButton from '../../components/UI/LinkButton';
import { Context } from '../../context';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
});

export default function SearchOptions({ options }) {
  const classes = useStyles();
  const { state: { translations = {} } = {} } = useContext(Context);

  return (
    <nav className={classes.root}>
      {options.map((val) => (
        <LinkButton
          name={translations[val.name]}
          hrefLink={val.hrefLink}
          key={val.name}
        />
      ))}
    </nav>
  );
}

SearchOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
};
