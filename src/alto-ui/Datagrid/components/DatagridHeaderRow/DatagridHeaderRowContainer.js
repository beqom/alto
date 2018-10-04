import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import DatagridHeaderRow from './DatagridHeaderRow';

class DatagridHeaderRowContainer extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.context.isDisplayedRowsSelected !== nextProps.context.isDisplayedRowsSelected)
      return true;
    return !isEqual(this.props.columns, nextProps.columns);
  }

  render() {
    return <DatagridHeaderRow {...this.props} />;
  }
}

DatagridHeaderRowContainer.propTypes = {
  columns: PropTypes.array,
  context: PropTypes.shape({
    isDisplayedRowsSelected: PropTypes.bool,
  }),
};

export default DatagridHeaderRowContainer;
