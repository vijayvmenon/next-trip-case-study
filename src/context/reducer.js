import constants from '../constants';
import ENTranslations from '../locales/en.json';
import { localStorageExists } from '../utils';

const localStorageLanguage =
  localStorageExists && localStorage.getItem('LANGUAGE');
const initialState = {
  tableExpanded: false,
  hideHeader: false,
  snackbar: { value: '', text: '' },
  language: localStorageLanguage || 'en',
  translations: localStorageLanguage
    ? constants.LANGUAGE_MAPPING[localStorageLanguage]
    : ENTranslations,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'TABLE_EXPAND':
      return { ...state, tableExpanded: true };
    case 'TABLE_COLLAPSE':
      return { ...state, tableExpanded: false };
    case 'SET_SNACKBAR':
      return { ...state, snackbar: { value: action.value, text: action.text } };
    case 'HIDE_HEADER':
      return { ...state, hideHeader: true };
    case 'SHOW_HEADER':
      return { ...state, hideHeader: false };
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.value,
        translations: constants.LANGUAGE_MAPPING[action.value],
      };
    default:
      return { ...state };
  }
}

export { initialState };
