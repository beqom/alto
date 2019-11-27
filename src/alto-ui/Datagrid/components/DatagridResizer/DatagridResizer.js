import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import { bemClass } from '../../../helpers/bem';

import './DatagridResizer.scss';

const DatagridResizer = ({
  left,
  top,
  handleHeight,
  height,
  maxLeft,
  maxRight,
  resizing,
  onStart,
  onStop,
}) => {
  const [leftValue, setLeftValue] = useState(0);
  const [x, setX] = useState(0);

  if (left !== leftValue) {
    setX(0);
    setLeftValue(left);
  }

  const handleStop = () => {
    onStop(x);
  };

  const handleDrag = (e, { x: xValue }) => {
    setX(xValue);
  };
  const resizerElement = useMemo(
    () => (
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
    ),
    [resizing, left]
  );

  return (
    <Draggable
      axis="x"
      position={{ x, y: 0 }}
      bounds={{ left: maxLeft - left, right: maxRight - left, top: 0, bottom: 0 }}
      onStart={onStart}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      {resizerElement}
    </Draggable>
  );
};

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
