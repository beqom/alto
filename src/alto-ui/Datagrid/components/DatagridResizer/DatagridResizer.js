import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import { bemClass } from '../../../helpers/bem';

import './DatagridResizer.scss';

class DatagridResizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      props,
      x: 0,
    };

    this.handleDrag = this.handleDrag.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.left !== state.props.left) return { x: 0, props };
    return null;
  }

  handleStart() {
    this.props.onStart();
  }

  handleStop() {
    this.props.onStop(this.state.x);
  }

  handleDrag(e, { x }) {
    this.setState({ x });
  }

  render() {
    const { left, top, handleHeight, height, maxLeft, maxRight, resizing } = this.props;
    const { x } = this.state;

    return (
      <Draggable
        axis="x"
        position={{ x, y: 0 }}
        bounds={{ left: maxLeft - left, right: maxRight - left - 5, top: 0, bottom: 0 }}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
      >
        <div
          className={bemClass('DatagridResizer', { dragging: resizing })}
          style={{
            height: handleHeight,
            left,
            top,
          }}
        >
          <div className="DatagridResizer__ruler" style={{ height }} />
        </div>
      </Draggable>
    );
  }
}

DatagridResizer.displayName = 'DatagridResizer';

DatagridResizer.defaultProps = {};

DatagridResizer.propTypes = {
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  handleHeight: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  maxLeft: PropTypes.number.isRequired,
  maxRight: PropTypes.number.isRequired,
  resizing: PropTypes.bool.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
};

export default DatagridResizer;
