import React from 'react';
import PropTypes from 'prop-types';

class StateProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.state;
    this.setState = this.setState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state !== this.props.state) {
      this.setState(nextProps.state);
    }
  }

  render() {
    return this.props.children(this.state, this.setState);
  }
}

StateProvider.defaultProps = {
  state: {},
};

StateProvider.propTypes = {
  state: PropTypes.object,
  children: PropTypes.func.isRequired,
};

export default StateProvider;
