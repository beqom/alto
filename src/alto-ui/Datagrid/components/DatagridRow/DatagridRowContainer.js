import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import DatagridRow from './DatagridRow';

class DatagridRowContainer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.columns, nextProps.columns || this.props.row, nextProps.row);
  }

  render() {
    return <DatagridRow {...this.props} />;
  }
}

DatagridRowContainer.propTypes = {
  columns: PropTypes.array,
  row: PropTypes.object,
};

export default DatagridRowContainer;
