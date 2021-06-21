import React from 'react';
import DueTableCell from './components/DueTableCell/DueTableCell';
import ENTranslations from './locales/en.json';
import ESTranslations from './locales/es.json';

const constants = {
  HEADER_TEXT: 'Minneapolis Metro Transit',
  FOOTER_TEXT_3: `© ${new Date().getFullYear()} Metro Transit`,
  APP_HEADER: 'Real-time Departures',
  BY_ROUTE: 'By route',
  BY_STOP: 'By stop #',
  DUE: 'Due',
  ENTER_STOP_NUMBER: 'Enter stop number',
  SELECT_ROUTE: 'Select route',
  SELECT_DIRECTION: 'Select direction',
  SELECT_STOP: 'Select stop',
  STOP_HASH: 'Stop # : ',
  STOP_CLOSED: 'Stop closed',
  NOT_VALID_STOP: 'is not a valid stop number',
  ROUTE: 'Route',
  DIRECTION: 'Direction',
  STOP: 'Stop',
  TABLE_COLUMNS: [
    { id: 'route_short_name', value: 'ROUTE', textAlign: 'left' },
    { id: 'description', value: 'DESTINATION', textAlign: 'left' },
    {
      id: 'departure_text',
      value: 'DEPARTS',
      textAlign: 'right',
      formatter: (val, row) => (
        // eslint-disable-next-line react/jsx-filename-extension
        <DueTableCell value={val} row={row} />
      ),
    },
  ],
  get SELECT_FIELDS() {
    return [
      {
        label: 'SELECT_ROUTE',
        labelSelected: 'ROUTE',
        options: [],
        idField: 'route_id',
        valueField: 'route_label',
      },
      {
        label: 'SELECT_DIRECTION',
        labelSelected: 'DIRECTION',
        options: undefined,
        idField: 'direction_id',
        valueField: 'direction_name',
      },
      {
        label: 'SELECT_STOP',
        labelSelected: 'STOP',
        options: undefined,
        idField: 'place_code',
        valueField: 'description',
      },
    ];
  },
  LANGUAGE_SELECT: {
    label: 'Select Language',
    labelSelected: 'LANGUAGE',
    options: [
      { id: 'en', label: 'English' },
      { id: 'es', label: 'Spanish' },
    ],
    idField: 'id',
    valueField: 'label',
  },
  INTERVAL_FREQUENCY: 45000,
  SHOW_MORE: 'Show more',
  SHOW_LESS: 'Show less',
  SEARCH_STOPS: 'Search stops',
  http: {
    BASE_URL: 'https://svc.metrotransit.org/nextripv2',
    BASE_URL_LOCAL: 'http://localhost:3002',
    ROUTE: 'routes',
    DIRECTIONS: 'directions',
    STOPS: 'stops',
    VEHICLES: 'vehicles',
  },
  PAGE_NOT_FOUND_1: 'The page you requested could not be found.',
  PAGE_NOT_FOUND_2:
    'Please go back or press the button below to go to the homepage',
  BASE_PATH: '/next-trip-case-study',
  BASE_PATH_2: '/next-trip-case-study/',
  get NAVIGATION_OPTIONS() {
    return [
      {
        name: 'BY_ROUTE',
        hrefLink: `${this.BASE_PATH}/byRoute`,
      },
      {
        name: 'BY_STOP',
        hrefLink: `${this.BASE_PATH}/byStop`,
      },
    ];
  },
  GO_HOME: 'Go home',
  SNACKBAR_TIMEOUT: 5000,
  LANGUAGE_MAPPING: {
    en: ENTranslations,
    es: ESTranslations,
  },
};

const colors = {
  GREY: '#626462',
  WHITE: '#ffffff',
  BACKGROUND_1: '#f5f5f5',
  LINK_COLOR: '#39b4ed',
  BACKGROUND_2: '#0071DE',
  BACKGROUND_3: '#c5d7e8',
  TEXT_COLOR: '#8B728E',
  TABLE_BACKGROUND: '#FFF4E4',
  TABLE_ROW_HOVER: '#FDFFFC',
  TEXT_COLOR_2: '#3D52D5',
  BACKGROUND_5: '#07A0C3',
};

export default constants;
export { colors };
