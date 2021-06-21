/* eslint-disable */
import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation } from 'wouter';
import { Context } from '../../context';
import constants, { colors } from '../../constants';
import Select from '../UI/Select';
import { localStorageExists } from '../../utils';

const { LANGUAGE_SELECT } = constants;

const useStyles = createUseStyles({
  root: {
    background: 'white',
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: '1rem',
  },
});
export default function SelectLanguage() {
  const classes = useStyles();
  const { dispatch, state: { language = 'en' } = {} } = useContext(Context);
  const [, setLocation] = useLocation();

  const onSearch = (selected, label, id) => {
    // set localstorage LANGUAGE variable to persist the selection for browser reload
    if (localStorageExists) {
      localStorage.setItem('LANGUAGE', selected[id]);
    }
    dispatch({ type: 'SET_LANGUAGE', value: selected[id] });
  };

  return (
    <div className={classes.root}>
      <Select
        label={LANGUAGE_SELECT.label}
        onSearch={onSearch}
        options={LANGUAGE_SELECT.options}
        labelSelected={LANGUAGE_SELECT.labelSelected}
        idField={LANGUAGE_SELECT.idField}
        valueField={LANGUAGE_SELECT.valueField}
        selectedValue={language}
        languageDropdown={true}
      />
    </div>
  );
}
