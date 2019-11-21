const getStaticAndFrozenColumns = columns =>
  columns.reduce(
    (acc, col) => ({
      staticColumns: [...acc.staticColumns, ...(!col.frozen ? [col] : [])],
      frozenColumns: [...acc.frozenColumns, ...(col.frozen ? [col] : [])],
    }),
    {
      staticColumns: [],
      frozenColumns: [],
    }
  );

export default getStaticAndFrozenColumns;
