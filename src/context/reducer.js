const initialState = {
  tableExpanded: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'TABLE_EXPAND':
      return { ...state, tableExpanded: true };
    case 'TABLE_COLLAPSE':
      return { ...state, tableExpanded: false };
    default:
      return { ...state };
  }
}

export { initialState };
