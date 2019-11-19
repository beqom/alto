const getTitleValue = value => ([undefined, null].includes(value) ? '' : value.toString());
export default getTitleValue;
