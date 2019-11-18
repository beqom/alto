export const DEFAULT_LABELS = {
  errorFormula: 'There is an error in formula',
  a11ySortLabel: 'Click to sort this column by Ascending or Descending',
  checkboxLabel: 'Check to select a row',
};

export const DATAGRID_CHECKBOX_WIDTH = 32;
export const DATAGRID_SCROLLBAR_SIZE = 17;
export const DATAGRID_HEADER_ROW_INDEX = 1;

const emptyBoundingClientRect = { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };

export const DATAGRID_INITIAL_STATE_RESIZER = {
  column: null,
  parent: emptyBoundingClientRect,
  target: emptyBoundingClientRect,
  container: emptyBoundingClientRect,
  resizing: false,
};
