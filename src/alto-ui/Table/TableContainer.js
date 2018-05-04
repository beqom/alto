import React from 'react';

import Table from './Table';

class TableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOnGroup = this.handleClickOnGroup.bind(this);

    this.state = {
      collapsedGroups: {},
    };
  }

  handleClickOnGroup(groupId) {
    const stateGroupId = this.state.collapsedGroups[groupId];
    const collapsedGroups = {
      ...this.state.collapsedGroups,
      [groupId]: !stateGroupId,
    };
    this.setState({ collapsedGroups });
  }

  render() {
    return (
      <Table
        {...this.props}
        collapsedGroups={this.state.collapsedGroups}
        handleClickOnGroup={this.handleClickOnGroup}
      />
    );
  }
}

export default TableContainer;
