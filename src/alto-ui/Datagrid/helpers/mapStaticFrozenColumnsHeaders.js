/**
 * Mapping column headers to frozen and static. In case that there is no column headers
 * function return passed static and frozen columns
 * @param columnHeaders array of column headers
 * @param staticColumns
 * @param frozenColumns
 * @return {*|{frozenColumnHeaders: *, staticColumnHeaders: *}} object with frozen and static headers
 */
const mapStaticFrozenColumnsHeaders = (columnHeaders, staticColumns, frozenColumns) => {
  if (!columnHeaders) {
    return {
      staticColumnHeaders: staticColumns,
      frozenColumnHeaders: frozenColumns,
    };
  }
  return columnHeaders.reduce(
    (acc, col) => ({
      staticColumnHeaders: [...acc.staticColumnHeaders, ...(!col.frozen ? [col] : [])],
      frozenColumnHeaders: [...acc.frozenColumnHeaders, ...(col.frozen ? [col] : [])],
    }),
    {
      staticColumnHeaders: [],
      frozenColumnHeaders: [],
    }
  );
};

export default mapStaticFrozenColumnsHeaders;
