import React from 'react';
import DueTableCell from './components/DueTableCell';

const constants = {
  HEADER_TEXT: 'Minneapolis Metro Transit',
  FOOTER_TEXT_1: 'Metro Transit is a service of the Metropolitan Council.',
  FOOTER_TEXT_2: 'Minneapolis/St. Paul, MN',
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
        <DueTableCell value={val} row={row} textAlign="right" />
      ),
    },
  ],
  get SELECT_FIELDS() {
    return [
      {
        label: 'Select route',
        labelSelected: this.ROUTE,
        options: undefined,
        idField: 'route_id',
        valueField: 'route_label',
      },
      {
        label: 'Select direction',
        labelSelected: this.DIRECTION,
        options: undefined,
        idField: 'direction_id',
        valueField: 'direction_name',
      },
      {
        label: 'Select stop',
        labelSelected: this.STOP,
        options: undefined,
        idField: 'place_code',
        valueField: 'description',
      },
    ];
  },
  INTERVAL_FREQUENCY: 1000000,
  SHOW_MORE: 'Show more',
  SHOW_LESS: 'Show less',
  http: {
    BASE_URL: 'https://svc.metrotransit.org/nextripv2',
    BASE_URL_LOCAL: 'http://localhost:3001',
    ROUTE: 'routes',
    DIRECTIONS: 'directions',
    STOPS: 'stops',
    VEHICLES: 'vehicles',
  },
};

const colors = {
  GREY: '#626462',
  WHITE: '#ffffff',
  BACKGROUND_1: '#f5f5f5',
  LINK_COLOR: '#39b4ed',
  BACKGROUND_2: '#0071DE',
  BACKGROUND_3: '#c5d7e8',
  TEXT_COLOR: '#807e7e',
};

export default constants;
export { colors };
