/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

const diff = (a, b) => {
  const aEntries = Object.entries(a);
  return (
    aEntries.length !== Object.values(b).length ||
    aEntries.some(([key, value]) => typeof value !== 'function' && value !== b[key])
  );
};

class StateProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      __PREVIOUS_STATE__: props.state,
      ...props.state,
    };
    this.setState = this.setState.bind(this);
    this.refsMap = props.refs.reduce(
      (acc, refName) => ({ ...acc, [refName]: React.createRef() }),
      {}
    );
  }

  static getDerivedStateFromProps(props, state) {
    if (diff(props.state, state.__PREVIOUS_STATE__)) {
      return {
        __PREVIOUS_STATE__: props.state,
        ...props.state,
      };
    }
    return null;
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
