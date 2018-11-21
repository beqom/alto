import React from 'react';
import PropTypes from 'prop-types';

class StateProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.state;
    this.setState = this.setState.bind(this);
    this.refsMap = props.refs.reduce(
      (acc, refName) => ({ ...acc, [refName]: React.createRef() }),
      {}
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state !== this.props.state) {
      this.setState(nextProps.state);
    }
  }

  render() {
    return this.props.children(this.state, this.setState, this.refsMap);
  }
}

StateProvider.defaultProps = {
  state: {},
  refs: [],
};

StateProvider.propTypes = {
  state: PropTypes.object,
  children: PropTypes.func.isRequired,
  refs: PropTypes.arrayOf(PropTypes.string),
};

export default StateProvider;
